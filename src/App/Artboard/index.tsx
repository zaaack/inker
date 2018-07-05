import * as React from 'react'
import * as Hydux from 'hydux'
import { css, cx } from 'emotion'
export * from './State'
import * as State from './State'
import * as Utils from 'utils'

export type State = State.State
export type Actions = State.Actions
export const init = State.init
export const actions = State.actions
type Rect = State.Rect
type RectLayer = State.RectLayer
type Line = State.Line

const rootCss = css`
  position: relative;
  padding: ${Utils.TopBarHeight + 100}px ${Utils.SideBarWidth + 100}px;
  display: inline-block;

  & > .wrapper {
    position: relative;
    display: inline-block;
    & > .container {
      position: relative;
      display: inline-block;

      & > svg {
        display: inline-block;
        background: white;
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
        transform: translate(-${State.LineWidth}px, -${State.LineWidth}px);
        &.selected {
          border: ${State.LineWidth}px solid red;
        }
        &.hover {
          border: ${State.LineWidth}px dashed green;
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
          opacity: .8;
        }
        &::before {
          top: -22px;
          left: 50%;
          transform: translateX(-50%);
        }
        &::after {
          left: 0;
          top: 50%;
          transform: translate(-102%, -50%);
        }

        &.reverse {
          &::before {
            top: auto;
            bottom: -22px;
            left: 50%;
            transform: translateX(-50%);
          }
          &::after {
            left: auto;
            right: 0;
            top: 50%;
            transform: translate(102%, -50%);
          }
        }
      }
      .rect.selected {
        &::before {
          content: attr(data-width);
        }
        &::after {
          content: attr(data-height);
        }
        &[data-width="0px"]::before,
        &[data-height="0px"]::after {
          display: none;
        }
      }
      .line.hover {
        &[data-direction="horizon"]::before,
        &[data-direction="vertical"]::after {
          content: attr(data-length);
        }
        &[data-length="0px"]::before,
        &[data-length="0px"]::after  {
          display: none;
        }
      }
    }
  }
  .css {
    position: fixed;
    right: 50px;
    top: 150px;
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
      left: hoverRect.left + (hoverRect.width - State.LineWidth) / 2,
      top: hoverRect.top + (hoverRect.height - State.LineWidth) / 2,
      width: State.LineWidth,
      height: State.LineWidth,
    }
  }

  function calcLine(lines: Line[], rect: Rect, direction: 'horizon' | 'vertical') {
    let isHorizon = direction === 'horizon'
    let start = direction === 'horizon'
      ? 'left'
      : 'top' as 'left' | 'top'
    let size = direction === 'horizon'
      ? 'width'
      : 'height' as 'width' | 'height'
    let reverse = false
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
      reverse = true
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
      reverse = true
    } else if (hoverRect[start] >= rect[start]) { // right/bottom
      line[start] = rect[start] + rect[size]
      line[size] = hoverRect[start] - (rect[start] + rect[size])
      debug('right/bottom')
      let delta = hoverRect[start] - rect[start]
      if (delta < rect[size] / 2) {
        extraLine = initLine()
        extraLine[start] = rect[start]
        extraLine[size] = delta
      }
    } else if (
      hoverRect[start] + hoverRect[size] <= rect[start] + rect[size]
    ) { // left/top
      line[start] = hoverRect[start] + hoverRect[size]
      line[size] = rect[start] - hoverRect[start] - hoverRect[size]
      debug('left/top')
      let delta = rect[start] + rect[size] - (hoverRect[start] + hoverRect[size])
      if (delta < rect[start] / 2) {
        extraLine = initLine()
        extraLine[start] = hoverRect[start] + hoverRect[size]
        extraLine[size] = delta
      }
    }
    if (line[size] < 0) {
      line[size] = -line[size]
      line[start] = line[start] - line[size]
    }
    if (line[size]) {
      lines.push({
        rect: line,
        length: line[size],
        direction,
        reverse: !isHorizon && reverse,
      })
    }
    if (extraLine && extraLine[size]) {
      lines.push({
        rect: extraLine,
        length: extraLine[size],
        direction,
        reverse: isHorizon && reverse,
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
  { line, scale, type, dashed, reverse }:
  { line: Line, scale: number, type: string, dashed?: boolean, reverse?: boolean }
) {
  const style = scaleRect(line.rect, scale)
  if (line.direction === 'horizon') {
    style.height = State.LineWidth
  } else {
    style.width = State.LineWidth
  }
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
      className={cx('line', type, dashed && 'dashed', reverse && 'reverse')}
      style={style}
      data-length={Math.round(line.length) + 'px'}
      data-direction={line.direction}
    />
  )
}
let rafId = 0
export const view = (state: State, actions: Actions) => {
  const hideRectHint =
    state.hover &&
    state.selected &&
    state.hover.node !== state.selected.node
  return (
    <div
      className={rootCss}
      onMouseDown={actions.dragStart}
      onClick={_ => actions.handleClick(null)}
      // onMouseMove={actions.dragMove}
      // onMouseUp={actions.dragEnd}
      // onMouseOut={actions.dragEnd}
      // onMouseLeave={actions.dragEnd}
    >
      <div className="wrapper">
        <div className="container" id={state.containerId} />
        <div className="indicator">
          {state.selected && ([
            <div
              key={'rect'}
              className="rect selected"
              style={scaleRect(state.selected.rect, state.scale)}
              data-width={Math.round(hideRectHint ? 0 : state.selected.rect.width) + 'px'}
              data-height={Math.round(hideRectHint ? 0 : state.selected.rect.height) + 'px'}
            />,
            state.selected.lines(state.scale).map(
              (line, j) => (
                <Line
                  key={j}
                  line={line}
                  type="selected"
                  scale={1}
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
                reverse={line.reverse}
              />
            )
          )}
        </div>
      </div>
      <div className="css">{state.css}</div>
    </div>
  )
}
