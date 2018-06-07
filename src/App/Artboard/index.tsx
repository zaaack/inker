import * as React from 'react'
import * as Hydux from 'hydux'
import { css, cx } from 'emotion'
import * as State from './State'
import * as Utils from 'utils'

export type State = State.State
export type Actions = State.Actions
export const init = State.init
export const actions = State.actions
type Rect = State.Rect
type RectLayer = State.RectLayer
type Line = State.Line

namespace Marker {
  export const fontSize = 13
  export const height = 24
  export const padding = 5
  export const margin = 10
  export function getWidth(num: number) {
    const charCount = Math.round(num).toString().length + 2
    return charCount * (Marker.fontSize + 1) + Marker.padding * 2
  }
}

const rootCss = css`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 100px;

  & > .wrapper {
    position: relative;
    & > .container {
      position: relative;
      width: auto;
      height: auto;

      * > svg {
        position: absolute;
        left: 0;
        top: 0;
        * {
          pointer-events: all;
          cursor: pointer;
        }
      }
    }

    & > .indicator {
      &, * {
        pointer-events: none;
      }
      .rect, .line {
        position: absolute;
      }
      .rect {
        transform: translate(-${State.lineWidth}px, -${State.lineWidth}px);
        &.selected {
          border: ${State.lineWidth}px solid red;
        }
        &.hover {
          border: ${State.lineWidth}px dashed green;
        }
      }
      .line {
        &.selected {
          background-color: red;
          border: 0 dashed red;
        }
        &.hover {
          background-color: green;
          border: 0 solid green;
        }
        &.dashed {
          background-color: transparent;
        }
      }
      .rect.selected, .line.hover {
        &::before,
        &::after {
          display: inline-block;
          padding: 4px 6px;
          background: orangered;
          color: white;
          font-size: 12px;
          line-height: 1;
          position: absolute;
          border-radius: 5px;
        }
        &::before {
          top: -26px;
          left: 50%;
          transform: translateX(-50%);
        }
        &::after {
          left: 0;
          top: 50%;
          transform: translate(-120%, -50%);
        }
      }
      .rect.selected {
        &::before {
          content: attr(data-width);
        }
        &::after {
          content: attr(data-height);
        }
      }
      .line.hover {
        &[data-direction="horizon"]::before {
          content: attr(data-length);
        }
        &[data-direction="vertical"]::after {
          content: attr(data-length);
        }
      }
    }
  }
  .css {
    position: fixed;
    right: 50px;
    top: 50px;
    white-space: pre-wrap;
    background: white;
    font-size: 14px;
    width: 200px;
  }
`

function caleDistanceLines(hover: RectLayer | null, selected: RectLayer | null, rootRect: Rect): Line[] {
  if (!hover || !selected) {
    return []
  }

  let hoverLines = [] as Line[]
  const hoverRect = hover.rect

  function initLine(): Rect {
    return {
      left: hoverRect.left + (hoverRect.width - State.lineWidth) / 2,
      top: hoverRect.top + (hoverRect.height - State.lineWidth) / 2,
      width: State.lineWidth,
      height: State.lineWidth,
    }
  }

  function calcLine(lines: Line[], rect: Rect, direction: 'horizon' | 'vertical') {
    let start = direction === 'horizon'
      ? 'left'
      : 'top' as 'left' | 'top'
    let size = direction === 'horizon'
      ? 'width'
      : 'height' as 'width' | 'height'

    const line = initLine()
    const debug = type => console.debug(type, line, hoverRect, rect)
    let extraLine = null as Rect | null
    if (
      hoverRect[start] >= rect[start] &&
      hoverRect[start] + hoverRect[size] <= rect[start] + rect[size]
    ) { // inner
      line[start] = rect[start]
      line[size] = hoverRect[start] - rect[start]
      debug('inner')
      extraLine = initLine()
      extraLine[start] = hoverRect[start] + hoverRect[size]
      extraLine[size] = (rect[start] + rect[size]) - (hoverRect[start] + hoverRect[size])
    } else if (
      hoverRect[start] <= rect[start] &&
      hoverRect[start] + hoverRect[size] >= rect[start] + rect[size]
    ) { // outter
      line[start] = hoverRect[start]
      line[size] = rect[start] - hoverRect[start]
      debug('outter')
      extraLine = initLine()
      extraLine[start] = rect[start] + rect[size]
      extraLine[size] = (hoverRect[start] + hoverRect[size]) - (rect[start] + rect[size])
    } else if (hoverRect[start] >= rect[start] + rect[size]) { // right/bottom
      line[start] = rect[start] + rect[size]
      line[size] = hoverRect[start] - (rect[start] + rect[size])
      debug('right/bottom')
    } else if (
      hoverRect[start] + hoverRect[size] <= rect[start] + rect[size]
    ) { // left/top
      line[start] = hoverRect[start] + hoverRect[size]
      line[size] = rect[start] - hoverRect[start] - hoverRect[size]
      debug('left/top')
    }
    if (line[size] < 0) {
      line[size] = -line[size]
      line[start] = line[start] - line[start]
    }
    if (line[size]) {
      lines.push({
        rect: line,
        length: line[size],
        direction,
      })
    }
    if (extraLine && extraLine[size]) {
      lines.push({
        rect: extraLine,
        length: line[size],
        direction,
      })
    }
  }
  const { rect, lines } = selected
  calcLine(hoverLines, rect, 'horizon')
  calcLine(hoverLines, rect, 'vertical')
  return hoverLines
}

function scaleRect(rect: Rect, scale: number) {
  return {
    left: rect.left * scale,
    top: rect.top * scale,
    width: rect.width * scale,
    height: rect.height * scale,
  }
}

function Line(
  { line, scale, type, dashed }:
  { line: Line, scale: number, type: string, dashed?: boolean }
) {
  const style = scaleRect(line.rect, scale)
  if (dashed) {
    if (line.direction === 'horizon') {
      style['borderBottomWidth'] = style.height
      style.height = 0
    } else {
      style['borderRightWidth'] = style.width
      style.width = 0
    }
  }
  return (
    <div
      className={cx('line', type, dashed && 'dashed')}
      style={style}
      data-length={Math.round(line.length) + 'px'}
      data-direction={line.direction}
    />
  )
}

export const view = (state: State, actions: Actions) => {
  return (
    <div className={rootCss}>
      <div className="wrapper">
        <div className="container" id={state.containerId} />
        <div className="indicator">
          {state.selected && ([
            <div
              key={'rect'}
              className="rect selected"
              style={scaleRect(state.selected.rect, state.scale)}
              data-width={Math.round(state.selected.rect.width) + 'px'}
              data-height={Math.round(state.selected.rect.height) + 'px'}
            />,
            state.selected.lines.map(
              (line, j) => (
                <Line
                  key={j}
                  line={line}
                  scale={state.scale}
                  type="selected"
                />
              )
            )
          ])}
          {state.hover && (
              <div
                className="rect hover"
                style={scaleRect(state.hover.rect, state.scale)}
              />
          )}
          {caleDistanceLines(
            state.hover,
            state.selected,
            state.rootRect,
          ).map(
            (line, i) => (
              <Line
                key={i}
                line={line}
                scale={state.scale}
                type="hover"
                dashed
              />
            )
          )}
        </div>
      </div>
      <div className="css">{state.css}</div>
    </div>
  )
}
