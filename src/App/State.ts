import * as Hydux from 'hydux'
import * as Artboard from './Artboard'
import * as SideBar from './SideBar'
import * as PropsBar from './PropsBar'
import * as Parse5 from 'parse5'
import * as Utils from '../utils'
import * as Styles from 'App/Artboard/Style'
const testSvg = require('../test/fixtures/svg-measure.svg')
// const testSvg = require('../test/fixtures/uikit/xd/Category.svg')
// const testSvg = require('../test/fixtures/work/1.svg')
// const testSvg = require('../test/fixtures/shadow.svg')
// const testSvg = require('../test/fixtures/gravit/shadow.svg')

const { Cmd } = Hydux

export const init = () => {
  const subInits = Hydux.combineInit({
    artboard: Artboard.init(),
    sidebar: SideBar.init(),
    propsbar: PropsBar.init(),
  })
  let dom = Parse5.parse(testSvg)
  let title = Utils.findOne(dom, _ => _.tagName === 'title')
  let name = 'svg-measure'
  return {
    state: subInits.state,
    cmd: Cmd.batch<Actions>(
      subInits.cmd,
      Cmd.ofSub(
        _ => {
          _.artboard.setArtboard({
            name,
            content: testSvg,
            title: title ? title.innerText : name
          })
        }
      )
    )
  }
}

export const actions = {
  artboard: Artboard.actions,
  sidebar: SideBar.actions,
  propsbar: PropsBar.actions,
}

Utils.replaceAction(
  actions,
  _ => _.artboard.handleClick,
  selected => (action, ps: State, pa) => {
    let res = action(selected)
    if (selected && ps.artboard.root) {
      let css = Styles.getCss(selected.node, selected.rect, ps.artboard.root)
      pa.propsbar.setSelected(selected, css)
    }
    return res
  }
)

export type Actions = typeof actions
export type State = ReturnType<typeof init>['state']
