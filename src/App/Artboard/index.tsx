import * as React from 'react'
import * as Hydux from 'hydux'
import { css, cx } from 'emotion'

const { Cmd } = Hydux

export interface SVGFile {
  name: string
  content: string
}

export interface Rect {
  left: number
  top: number
  width: number
  height: number
}

export interface RectLayer {
  dom: SVGElement
  rect: Rect
}

export const init = {
  state: () => ({
    artboard: null as SVGFile | null,
    hover: null as RectLayer | null,
    selected: [] as RectLayer[],
    containerId: 'artboard_' + Math.random().toString(36).slice(2)
  }),
  cmd: () =>
    Cmd.none,
}

const hoverableTags = new Set(['g', 'svg', 'rect', 'text', 'tspan', 'path', 'image', ''])
function bindSvgEvents(el: SVGElement, actions: Actions, rootRect: ClientRect | DOMRect) {
  const rect: Rect = el.getBoundingClientRect()
  rect.left -= rootRect.left
  rect.top -= rootRect.top
  el.addEventListener('mouseover', () => {
    actions.handleMouseover({
      dom: el,
      rect,
    })
  })
  el.addEventListener('mouseout', () => {
    actions.handleMouseout()
  })
  el.addEventListener('click', () => {
    actions.handleClick({
      dom: el,
      rect,
    })
  })
  for (let i = 0; i < el.children.length; i++) {
    const node = el.children[i]
  }
}

export const actions = {
  setArtboard: (artboard: SVGFile) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return [
      { ...state, artboard, hover: null, selected: [] },
      Cmd.ofSub(
        _ => {
          const wrapper = document.getElementById(state.containerId)!
          wrapper.innerHTML = artboard.content
          const svg = wrapper.getElementsByTagName('svg')[0]
          svg.onload = () => {
            const rect = svg.getBoundingClientRect()
            wrapper.style.width = rect.width + 'px'
            wrapper.style.height = rect.height + 'px'
            bindSvgEvents(svg, actions, wrapper.getBoundingClientRect())
          }
        }
      )
    ]
  },
  handleMouseover: (layer: RectLayer) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return { ...state, hover: layer }
  },
  handleMouseout: () => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return { ...state, hover: null }
  },
  handleClick: (layer: RectLayer) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    const selected = state.selected.filter(s => s.dom !== layer.dom)
    selected.push(layer)
    return { ...state, hover: null, selected }
  },
}

const rootCss = css`
  position: relative;

  & > .wrapper {
    position: relative;
    & > .container {
      position: absolute;
      left: 0;
      top: 0;
      * > svg {
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    &.indicator {

    }
  }
`

export const view = (state: State, actions: Actions) => {
  return (
    <div className={rootCss}>
      <div className="wrapper">
        <div className="container" id={state.containerId} />
      </div>
    </div>
  )
}
export type Actions = typeof actions
export type State = ReturnType<typeof init.state>
