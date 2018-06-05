// DesignViewer

//  svg -> ast -> layers  stwithyles -> save icons (batched)
import * as React from 'react'
import * as Hydux from 'hydux'
import * as State from './State'
import { css, cx } from 'emotion'
const { Cmd } = Hydux

const rootCss = css`
`

export const init = State.init
export const actions = State.actions

export const view = (state: State.State, actions: State.Actions) => {
  return (
    <div>

    </div>
  )
}
