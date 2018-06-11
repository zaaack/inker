// DesignViewer

//  svg -> ast -> layers  stwithyles -> save icons (batched)
import * as React from 'react'
import * as Hydux from 'hydux'
import * as State from './State'
import { css, cx } from 'emotion'
import * as Artboard from './Artboard'
import * as SideBar from './SideBar'
import TopBar from 'App/Widgets/TopBar'

const { Cmd } = Hydux

const rootCss = css`
`

export const init = State.init
export const actions = State.actions
export type State = State.State
export type Actions = State.Actions

export const view = (state: State.State, actions: State.Actions) => {
  return (
    <div>
      {Artboard.view(state.artboard, actions.artboard)}
      <TopBar>
        <div className="btn-menu">
        </div>
        <div className="title"></div>
      </TopBar>
      {SideBar.view(state.sidebar, actions.sidebar, actions.artboard.setArtboard)}
    </div>
  )
}
