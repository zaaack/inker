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

const rootCss = css`
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: ${Utils.SideBarWidth + 5}px;
  padding-right: 5px;
  box-sizing: border-box;
  transform: translateX(-100%);
  transition: all .3s ease-in-out;
  overflow-y: auto;

  &::before {
    content: '';
    background-color: rgb(46, 46, 46);
    position: absolute;
    left: 0;
    top: 0;
    width: ${Utils.SideBarWidth}px;
    height: 100%;
    z-index: -1;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  &.visible {
    transform: translateX(0);
  }
  & > .top-bar {
    overflow: hidden;
    box-shadow: 0 3px 2px rgba(0, 0, 0, .48);
    width: ${Utils.SideBarWidth}px;

    .btn-back {
      width: ${Utils.TopBarIconSize}px;
      height: ${Utils.TopBarIconSize}px;
      cursor: pointer;
      float: right;
    }
  }
  & > .content {
    padding: ${Utils.TopBarHeight + 30}px 20px 30px;
    box-sizing: border-box;
    .item {
      margin: 0 auto 30px;
      cursor: pointer;
      opacity: .7;

      &.selected {
        opacity: 1;
      }
      .cover {
        max-width: 100%;
        max-height: 280px;
        background: no-repeat center top;
        background-size: cover;
        display: block;
        margin: 0 auto;
      }
      .title {
        margin-top: 10px;
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
  current: SVGFile | null,
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
              className={cx('item', current && item.content === current.content && 'selected')}
              onClick={
                e => {
                  onItemClick(item, i)
                  ;(e.target as HTMLElement).scrollIntoView()
                }
              }
            >
              <img src={Utils.svg2dataUrl(item.content)} alt="" className="cover"/>
              <div className="title">{item.title || item.name}</div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export type Actions = typeof actions
export type State = ReturnType<typeof init>['state']
