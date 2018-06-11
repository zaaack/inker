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
  left: 0;
  top: 0;
  width: ${Utils.SideBarWidth}px;
  box-sizing: border-box;
  transform: translateX(-100%);
  transition: all .3s ease-in-out;
  background-color: rgb(46, 46, 46);

  &.visible {
    transform: translateX(0);
  }
  & > .top-bar {
    overflow: hidden;
    .btn-back {
      width: 40px;
      height: 40px;
      cursor: pointer;
      float: right;
    }
  }
  & > .content {
    padding: ${Utils.TopBarHeight + 30}px 72px 30px;
    .item {
      margin: 0 auto 30px;
      .cover {
        width: 236px;
        height: 280px;
        background: no-repeat center top;
        background-size: cover;
      }
      .title {
        margin-top: 12px;
        font-size: 18px;
        color: rgb(255, 255, 255);
        text-align: center;
      }
    }
  }
`

export function view(
  state: State,
  actions: Actions,
  onItemClick: (artboard: SVGFile, i: number) => void
) {
  return (
    <div className={cx(rootCss, state.visible && 'visible')}>
      <TopBar className="top-bar">
        <div className="btn-back" onClick={_ => actions.toggle()}>
          <Icons.ArrayLeft />
        </div>
      </TopBar>
      <div className="content">
        {state.artboards.map(
          (item, i) => (
            <div
              className="item"
              onClick={
                e => {
                  onItemClick(item, i)
                  ;(e.target as HTMLElement).scrollIntoView()
                }
              }
            >
              <div className="cover" style={{ backgroundImage: `url(${Utils.svg2dataUrl(item.content)})` }} />
              <div className="title">{item.name}</div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export type Actions = typeof actions
export type State = ReturnType<typeof init>['state']
