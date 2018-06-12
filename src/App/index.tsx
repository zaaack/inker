// DesignViewer

//  svg -> ast -> layers  stwithyles -> save icons (batched)
import * as React from 'react'
import * as Hydux from 'hydux'
import * as State from './State'
import { css, cx } from 'emotion'
import * as Artboard from './Artboard'
import * as SideBar from './SideBar'
import * as PropsBar from './PropsBar'
import * as Utils from 'utils'
import * as Icons from 'Icons'
import TopBar from 'App/Widgets/TopBar'
import { getIn, setIn, updateIn } from 'hydux-mutator'

const { Cmd } = Hydux

enum Consts {
  iconWidth = Utils.TopBarIconSize,
  titleMarginLeft = 20,
}

const rootCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .top-bar-inner {
    flex: 1;
    display: flex;
    align-items: center;

    .btn-menu {
      width: ${Consts.iconWidth}px;
      height: ${Consts.iconWidth}px;
      cursor: pointer;
    }

    .title {
      margin-left: ${Consts.titleMarginLeft}px;
      color: rgb(232, 232, 232);
      transition: all .3s ease-in-out;
    }
  }
`

export const init = State.init
export const actions = State.actions
export type State = State.State
export type Actions = State.Actions

export const view = (state: State.State, actions: State.Actions) => {
  return (
    <div className={rootCss}>
      {Artboard.view(state.artboard, actions.artboard)}
      {PropsBar.view(state.propsbar, actions.propsbar)}
      <TopBar className="top-bar">
        <div className="top-bar-inner">
          <div className="btn-menu" onClick={_ => actions.sidebar.toggle()}>
            <Icons.Menu />
          </div>
          <div className="title" style={{ transform: `translateX(${state.sidebar.visible ? Utils.SideBarWidth - Consts.iconWidth - Consts.titleMarginLeft : 0}px)` }}>
            {getIn(state, _ => _.artboard.artboard!.title) || ''}
          </div>
        </div>
      </TopBar>
      {SideBar.view(state.sidebar, actions.sidebar, actions.artboard.setArtboard)}
    </div>
  )
}
