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
import DropZone from 'react-dropzone'
import { getIn, setIn, updateIn } from 'hydux-mutator'
import * as Widgets from 'App/Widgets'

const { Cmd } = Hydux

enum Consts {
  iconWidth = Utils.TopBarIconSize,
  titleMarginLeft = 20,
}

const rootCss = css`
  .top-bar-inner {
    flex: 1;
    display: flex;
    align-items: center;

    .btn{
      width: ${Consts.iconWidth}px;
      height: ${Consts.iconWidth}px;
      cursor: pointer;

      &.github {
        z-index: 1;
      }
    }

    .title {
      flex: 1;
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
  let artboard = getIn(state, _ => _.artboard.artboard) || {
    title: '',
    name: '',
  }
  return (
    <DropZone
      disableClick
      style={{ position: 'relative' }}
      accept="image/svg+xml"
      onDrop={actions.onDrop}
      onDragEnter={actions.onDragEnter}
      onDragLeave={actions.onDragLeave}
      className={rootCss}
    >
      {Artboard.view(state.artboard, actions.artboard)}
      {PropsBar.view(state.propsbar, actions.propsbar)}
      <TopBar className="top-bar">
        <div className="top-bar-inner">
          <div className="btn menu" onClick={_ => actions.sidebar.toggle()}>
            <Icons.Menu />
          </div>
          <div className="title" style={{ transform: `translateX(${state.sidebar.visible ? Utils.SideBarWidth - Consts.iconWidth - Consts.titleMarginLeft : 0}px)` }}>
            {artboard.title || artboard.name}
          </div>
          <a
            href="https://github.com/zaaack/svg-measure"
            target="_blank"
            className="btn github"
          >
            <Icons.Github />
          </a>
        </div>
      </TopBar>
      {SideBar.view(
        state.sidebar,
        actions.sidebar,
        state.artboard.artboard,
        actions.artboard.setArtboard,
        actions.onDrop,
      )}
      {state.dropzoneActive && (
        <Widgets.DropHint />
      )}
    </DropZone>
  )
}
