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

module Rect {
  export let empty: Rect = {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  }
}


export interface RectLayer {
  dom: SVGElement
  rect: Rect
  lines: Rect[]
}

export const init = {
  state: () => ({
    artboard: null as SVGFile | null,
    hover: null as RectLayer | null,
    selected: [] as RectLayer[],
    containerId: 'artboard_' + Math.random().toString(36).slice(2),
    rootRect: Rect.empty,
  }),
  cmd: () =>
    Cmd.none,
}

function clientRectToRect(r: ClientRect | DOMRect): Rect {
  return {
    left: r.left,
    top: r.top,
    width: r.width,
    height: r.height,
  }
}
const lineWidth = 2

function calcRectBorderLines(rect: Rect, rootRect: Rect): Rect[] {
  return [{ // left
    left: rect.left - lineWidth,
    top: 0,
    width: lineWidth,
    height: rootRect.height,
  }, { // top
    left: 0,
    top: rect.top - lineWidth,
    width: rootRect.width,
    height: lineWidth,
  },{ // right
    left: rect.left + rect.width,
    top: 0,
    width: lineWidth,
    height: rootRect.height,
  },{
    left: 0, // bottom
    top: rect.top + rect.height,
    width: rootRect.width,
    height: lineWidth,
  }]
}
const hoverableTags = new Set(['g', 'svg', 'rect', 'text', 'tspan', 'path', 'image', ''])
function bindSvgEvents(el: SVGElement, actions: Actions, _rootRect: ClientRect | DOMRect) {
  const rect = clientRectToRect(el.getBoundingClientRect())
  const rootRect = clientRectToRect(_rootRect)
  rect.left -= rootRect.left
  rect.top -= rootRect.top
  el.addEventListener('mouseover', () => {
    actions.handleMouseover({
      dom: el,
      rect,
      lines: calcRectBorderLines(rect, rootRect),
    })
  })
  el.addEventListener('mouseout', () => {
    actions.handleMouseout()
  })
  el.addEventListener('click', () => {
    actions.handleClick({
      dom: el,
      rect,
      lines: calcRectBorderLines(rect, rootRect),
    })
  })
  for (let i = 0; i < el.children.length; i++) {
    const node = el.children[i]
  }
}

export const actions = {
  setRootRect: (rect: Rect) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return { rootRect: rect }
  },
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
            const rootRect = wrapper.getBoundingClientRect()
            actions.setRootRect({ ...Rect.empty, width: rootRect.width, height: rootRect.height })
            bindSvgEvents(svg, actions, rootRect)
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
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 100px;

  & > .wrapper {
    width: auto;
    height: auto;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);

    & > .container {
      position: relative;
      width: auto;
      height: auto;

      * > svg {
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    &.indicator {
      .rect {
        position: absolute;
      }
      .rect {
        &.selected {
          border: 2px solid red;
        }
        &.hover {
          border: 2px dashed blueviolet;
        }
      }
      .line {
        &.selected {
          background-color: red;
        }
        &.hover {
          background-color: blueviolet;
        }
      }
    }
  }
`
export interface Line {
  rect: Rect
  length: number
}

function renderHoverLines(hover: RectLayer | null, selected: RectLayer[], rootRect: Rect) {
  if (!hover) {
    return null
  }

  let hoverLines = [] as Line[]
  const hoverRect = hover.rect

  function calcLine(line: Rect, rect: Rect, isX: boolean) {
    const start = isX ? 'left' : 'top' as 'left' | 'top'
    const size = isX ? 'width' : 'height' as 'width' | 'height'
    if (
      hoverRect[start] > rect[start] &&
      hoverRect[start] + hoverRect[size]  < rect[start] + rect[size]
    ) { // in
      line[start] = rect[start]
      line[size] = hoverRect[start] - rect[start]
    } else if (hoverRect[start] > rect[start]) { // right/bottom
      line[start] = rect[start] + rect.width
      line[size] = hoverRect[start]
    } else if (
      hoverRect[start] + hoverRect[size]  < rect[start] + rect[size]
    ) { // left/top
      line[start] = hoverRect[start] + hoverRect[size]
      line[size] = rect[start] - hoverRect[start] - hoverRect[size]
    }
    if (line[size] < 0) {
      line[size] = -line[size]
      line[start] = line[start] - line[start]
    }
  }

  for (const layer of selected) {
    const { rect, lines } = layer
    let hoverLineX: Rect = {
      left: 0,
      top: hoverRect.top + (hoverRect.height - lineWidth) / 2,
      width: 0,
      height: lineWidth,
    }
    let hoverLineY: Rect = {
      left: hoverRect.left + (hoverRect.width - lineWidth) / 2,
      top: 0,
      width: lineWidth,
      height: 0,
    }
    calcLine(hoverLineX, rect, true)
    calcLine(hoverLineY, rect, false)
    hoverLines.push({
      rect: hoverLineX,
      length: Number(hoverLineX.width.toFixed(2)),
    }, {
      rect: hoverLineY,
      length: Number(hoverLineY.height.toFixed(2)),
    })
  }
  return hoverLines.map(
    (line, i) => (
      <div
        className="rect line hover"
        key={i}
        style={line.rect}
        data-length={line.length}
      />
    )
  )
}

export const view = (state: State, actions: Actions) => {
  return (
    <div className={rootCss}>
      <div className="wrapper">
        <div className="container" id={state.containerId} />
        <div className="indicator">
          {state.selected.map(
            ({ rect, lines }, i) => [
              <div
                key={'rect' + i}
                className="rect selected"
                style={rect}
                data-width={rect.width}
                data-height={rect.height}
              />,
              lines.map(
                (line, j) => (
                  <div
                    key={`line_${i}_${j}`}
                    className="rect line selected"
                    style={line}
                  />
                )
              )
            ]
          )}
          {state.hover && (
              <div
                className="rect hover"
                style={state.hover.rect}
              />
          )}
          {renderHoverLines(state.hover, state.selected, state.rootRect)}
        </div>
      </div>
    </div>
  )
}
export type Actions = typeof actions
export type State = ReturnType<typeof init.state>
