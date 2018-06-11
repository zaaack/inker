import * as React from 'react'
import * as Hydux from 'hydux'
import { SVGFile } from 'App/Artboard/State'
import { cx, css } from 'emotion'
import TopBar from 'App/Widgets/TopBar'
import * as Icons from 'Icons'
import * as Utils from 'utils'

const { Cmd } = Hydux

export const init = () => ({
  state: {
    visible: true,
    artboards: [] as SVGFile[],
  },
  cmd: Cmd.none,
})
export const actions = {
  toggle: (visible?: boolean) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    if (typeof visible === 'undefined') {
      visible = !state.visible
    }
    return { visible }
  },
  setArtboards: (artboards: SVGFile[]) => (state: State, actions: Actions): Hydux.AR<State, Actions> => ({
    artboards
  })
}

const width = 379
const rootCss = css`
  width: ${width}px;
  height: 100%;
  position: fixed;
  right: 0;
  top: ${Utils.TopBarHeight}px;
  width: ${Utils.SideBarWidth}px;
  box-sizing: border-box;
  transform: translateX(100%);
  transition: all .3s ease-in-out;
  background-color: rgb(46, 46, 46);

  &.visible {
    transform: translateX(0);
  }
`

export function view(
  state: State,
  actions: Actions,
  onItemClick: (artboard: SVGFile, i: number) => void
) {
  return (
    <div className={cx(rootCss, state.visible && 'visible')}>
      <div className="item">
      </div>
    </div>
  )
}

export type Actions = typeof actions
export type State = ReturnType<typeof init>['state']
