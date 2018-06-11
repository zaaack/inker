import * as Hydux from 'hydux'
import * as Artboard from './Artboard'
import * as SideBar from './SideBar'
import * as Parse5 from 'parse5'
import * as Utils from '../utils'
const testSvg = require('../test/fixtures/svg-measure.svg')
// const testSvg = require('../test/fixtures/uikit/xd/Category.svg')
// const testSvg = require('../test/fixtures/work/1.svg')
// const testSvg = require('../test/fixtures/shadow.svg')
// const testSvg = require('../test/fixtures/gravit/shadow.svg')

const { Cmd } = Hydux

export const init = () => {
  const subInits = Hydux.combineInit({
    artboard: Artboard.init(),
    sidebar: SideBar.init()
  })
  let dom = Parse5.parse(testSvg)
  let title = Utils.findOne(dom, _ => _.tagName === 'title')
  console.log('testSvg', testSvg)
  window['testSvg'] = testSvg
  window['Utils'] = Utils
  window['dom'] = dom
  return {
    state: subInits.state,
    cmd: Cmd.batch<Actions>(
      subInits.cmd,
      Cmd.ofSub(
        _ => _.artboard.setArtboard({
          name: '',
          content: testSvg,
          title: title ? title.innerText : ''
        })
      )
    )
  }
}

export const actions = {
  artboard: Artboard.actions,
  sidebar: SideBar.actions,
}

export type Actions = typeof actions
export type State = ReturnType<typeof init>['state']
