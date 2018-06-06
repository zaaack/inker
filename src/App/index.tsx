// DesignViewer

//  svg -> ast -> layers  stwithyles -> save icons (batched)
import * as React from 'react'
import * as Hydux from 'hydux'
import * as State from './State'
import { css, cx } from 'emotion'
import * as Artboard from './Artboard'

const { Cmd } = Hydux

const rootCss = css`
`

export const init = State.init
export const actions = State.actions
export type State = State.State
export type Actions = State.Actions

export const view = (state: State.State, actions: State.Actions) => {
  return (
    <div style={{ width: 517, height: 800 }}>
      {Artboard.view(state.artboard, actions.artboard)}
    </div>
  )
}
