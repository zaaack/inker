import * as Hydux from 'hydux'
import * as Artboard from './Artboard'
import * as SideBar from './SideBar'
import * as PropsBar from './PropsBar'
import * as Parse5 from 'parse5'
import * as Utils from '../utils'
import * as Styles from 'App/Artboard/style'
import * as Dropzone from 'react-dropzone'
// const testSvg = require('../test/fixtures/uikit/xd/Category.svg')
// const testSvg = require('../test/fixtures/work/1.svg')
// const testSvg = require('../test/fixtures/shadow.svg')
// const testSvg = require('../test/fixtures/gravit/shadow.svg')
const getTestSVG = async () => (await import('../test/fixtures/uikit/xd/Category.svg')).default as string
const { Cmd } = Hydux
async function loadDemo(_: Actions) {
  if (!__DEV__ || !window['@demo-loaded']) {
    window['@demo-loaded'] = true
    const testSvg = await getTestSVG()
    // const testSvg = require('../test/fixtures/svg-measure.svg')
    let dom = Parse5.parse(testSvg)
    let title = Utils.findOne(dom, _ => _.tagName === 'title')
    let name = 'svg-measure'
    _.artboard.setArtboard({
      name,
      content: testSvg,
      title: title ? title.innerText : name,
      uid: Utils.uid(),
    })
    _.sidebar.setArtboards([{
      name,
      content: testSvg,
      title: title ? title.innerText : name,
      uid: Utils.uid(),
    }])
    _.sidebar.toggle(true)
  }
}

enum KeyCodes {
  ctrl = 17,
  cmd = 91,
  minus = 189,
  plus = 187,
}
async function bindScaleEvents(_: Actions) {
  window.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey) {
      if (e.keyCode === KeyCodes.minus) {
        _.artboard.scaleDown()
        e.stopPropagation()
        e.preventDefault()
      } else if (e.keyCode === KeyCodes.plus) {
        _.artboard.scaleUp()
        e.stopPropagation()
        e.preventDefault()
      }
    }
  })
}

export const init = () => {
  const subInits = Hydux.combineInit({
    artboard: Artboard.init(),
    sidebar: SideBar.init(),
    propsbar: PropsBar.init(),
  })
  return {
    state: {
      ...subInits.state,
      dropzoneIsVisible: false,
      dropzoneIsLoading: false,
    },
    cmd: Cmd.batch<Actions>(
      subInits.cmd,
      Cmd.ofSub(
        async _ => {
          loadDemo(_)
          bindScaleEvents(_)
        }
      )
    )
  }
}
function readSvgFile(file: File) {
  return new Promise<Artboard.SVGFile | FileReaderProgressEvent>(
    (res, rej) => {
      const reader = new FileReader()
      reader.onload = () => {
        const svgStr = reader.result
        let title = (svgStr.match(/<title>([^<]*?)<\/title>/) || []).map(s => s.trim())[1]
        res({
          name: file.name,
          title: title ? title.innerText : name,
          content: svgStr,
          uid: Utils.uid(),
        })
      }
      reader.onabort = (e) => {
        console.error('file reading was aborted', e)
        res(e)
      }
      reader.onerror = e => {
        console.error('file reading was failed', e)
        res(e)
      }
      reader.readAsText(file)
    }
  )
}

let isFirstUpload = true

export const actions = {
  artboard: Artboard.actions,
  sidebar: SideBar.actions,
  propsbar: PropsBar.actions,
  toggleDropzon: (visible: boolean, loading?: boolean) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return {
      dropzoneIsVisible: visible,
      dropzoneIsLoading: Utils.defaults(loading, !state.dropzoneIsLoading),
    }
  },
  onDrop: (accepted: Dropzone.ImageFile[], rejected: Dropzone.ImageFile[], event: React.DragEvent<HTMLDivElement>) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {

    return [
      state,
      Cmd.ofSub(
        async _ => {
          if (isFirstUpload) {
            _.sidebar.setArtboards([])
            isFirstUpload = false
          }
          _.toggleDropzon(true, true)
          type TaskItem = Artboard.SVGFile | FileReaderProgressEvent
          try {
            let groups = await Promise.all(
              accepted.map(readSvgFile)
            )
            let svgFiles = ([] as TaskItem[]).concat(...groups).filter(
              (res): res is Artboard.SVGFile => {
                if ('target' in res) {
                  console.error(new Error(`Read svg file error`), res)
                  return false
                }
                return true
              }
            )
            for (const svgFile of svgFiles) {
              await _.sidebar.appendArtboards([svgFile])
              await Utils.sleep(10)
            }
            _.sidebar.toggle(true)
            _.artboard.setArtboard(svgFiles[0])
          } finally {
            _.toggleDropzon(false, false)
          }
        }
      )
    ]
  },
  onDragEnter: () => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return { dropzoneIsVisible: true }
  },
  onDragLeave: () => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return { dropzoneIsVisible: false }
  },
}

Utils.overrideAction(
  actions,
  _ => _.artboard.handleClick,
  selected => (action, ps: State, pa) => {
    let res = action(selected)
    if (selected && ps.artboard.root) {
      let css = Styles.getCss(selected.node, ps.artboard.root, selected.rect)
      Utils.log(selected.node, css)
      pa.propsbar.setSelected(selected, css)
    } else {
      pa.propsbar.setSelected(selected, '')
    }
    return res
  }
)

export type Actions = typeof actions
export type State = ReturnType<typeof init>['state']
