import * as React from 'react'
import * as Hydux from 'hydux'
export * from './utils'
import * as Utils from 'utils'
import { SVGFile, Rect, Line, RectLayer, IconRectRefKey, RectKey } from './utils'
import * as Style from './style'

const { Cmd } = Hydux

export const init = () => ({
  state: {
    artboard: null as SVGFile | null,
    hover: null as RectLayer | null,
    selected: null as RectLayer | null,
    containerId: 'artboard_' + Math.random().toString(36).slice(2),
    rootRect: Rect.empty,
    root: null as null | SVGSVGElement,
    scale: 1,
    css: '',
    ratio: 1,
    isDragging: false,
    initDrag: {
      x: 0,
      y: 0,
    },
    initScroll: {
      x: 0,
      y: 0,
    }
  },
  cmd: Cmd.ofSub<Actions>(
    _ => {
      window.addEventListener('mouseup', _.dragEnd)
      window.addEventListener('mousemove', _.dragMove)
    }
  )
})

export const LineWidth = 1

function calcRectBorderLines(rect: Rect, rootRect: Rect, scale: number): Line[] {
  function initHorizon(top: number): Line {
    return {
      rect: {
        left: 0,
        top,
        width: rootRect.width * scale,
        height: LineWidth,
      },
      length: rootRect.width * scale,
      direction: 'horizon',
    }
  }
  function initVertical(left: number): Line {
    return {
      rect: {
        left,
        top: 0,
        width: LineWidth,
        height: rootRect.height * scale,
      },
      length: rootRect.height * scale,
      direction: 'vertical',
    }
  }
  return [
    initVertical(rect.left * scale - LineWidth), // left
    initVertical((rect.left + rect.width) * scale), // right
    initHorizon(rect.top * scale - LineWidth), // top
    initHorizon((rect.top + rect.height) * scale), // bottom
  ]
}
const hoverableTags = new Set(['g', 'svg', 'rect', 'text', 'tspan', 'path', 'image', 'circle', 'clipPath', 'ellipse', 'a', 'line', 'marker', 'polygon', 'polygon', 'polyline', 'use'])

export function getNodeRect(el: SVGElement, rootRect: Rect) {
  const rect = Rect.fromEl(el)
  rect.left -= rootRect.left
  rect.top -= rootRect.top
  return rect
}

function bindSvgEvents(el: SVGElement, state: State, actions: Actions, rootRect: Rect, root: SVGSVGElement) {
  if (!hoverableTags.has(el.tagName)) return
  if (el[IconRectRefKey]) return

  const rect = getNodeRect(el, rootRect)
  el[RectKey] = rect
  if (
    el.tagName === 'g' &&
    [].some.call(el.children, (n: SVGElement) => n.tagName === 'path') &&
    rect.width < 100 && rect.height < 100 &&
    el.children.length
  ) { // Fix SVGGElement cannot click on rect
    let $rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    $rect.id = 'icon-rect'
    // $rect.setAttribute('x', String(rect.left))
    // $rect.setAttribute('y', String(rect.top))
    $rect.setAttribute('width', rect.width.toFixed(2))
    $rect.setAttribute('height', rect.height.toFixed(2))
    $rect.setAttribute('fill', 'rgba(0, 0, 0, 0)')
    $rect.setAttribute('stroke-width', '0')

    $rect[IconRectRefKey] = el
    el.insertBefore($rect, el.children[0])
    // el = $rect
    // root.appendChild($rect)
  }
  {
    let node = el[IconRectRefKey] || el
    const rect = getNodeRect(node, rootRect)
    el.addEventListener('mouseover', e => {
      e.stopPropagation()
      actions.handleMouseover({
        node,
        rect,
        lines: scale => calcRectBorderLines(rect, rootRect, scale),
      })
    }, false)
    el.addEventListener('mouseout', e => {
      e.stopPropagation()
      actions.handleMouseout()
    }, false)
    el.addEventListener('click', e => {
      Utils.log('click', node)
      e.stopPropagation()
      actions.handleClick({
        node,
        rect,
        lines: scale => calcRectBorderLines(rect, rootRect, scale),
      })
      // const css = Style.getCss(node, rect, root)
      // actions.setCss(css)
    }, false)
  }

  for (let i = 0; i < el.children.length; i++) {
    let node = el.children[i] as SVGElement
    if (
      node instanceof SVGElement &&
      hoverableTags.has(node.tagName)
    ) {
      bindSvgEvents(node, state, actions, rootRect, root)
    }
  }
}

let rafId = 0
export const actions = {
  setRoot: (root: SVGSVGElement, rect: Rect) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return { rootRect: rect, root }
  },
  setCss: (css: string) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return { css }
  },
  setArtboard: (artboard: SVGFile) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return [
      { ...state, artboard, hover: null, selected: null },
      Cmd.ofSub(
        actions => {
          Utils.log('init')
          const wrapper = document.getElementById(state.containerId)!
          wrapper.innerHTML = ''
          wrapper.innerHTML = artboard.content
          const svg = wrapper.getElementsByTagName('svg')[0]
          svg.id = 'artboard-svg'
          if (!svg.getAttribute('width')) {
            svg.setAttribute('width', String(svg.viewBox.baseVal.width))
          }
          if (!svg.getAttribute('height')) {
            svg.setAttribute('height', String(svg.viewBox.baseVal.height))
          }
          const rect = Rect.fromEl(svg)
          svg.style.width = rect.width + 'px'
          svg.style.height = rect.height + 'px'
          wrapper.draggable = false
          svg['draggable'] = false
          actions.setRoot(svg, { ...Rect.empty, width: rect.width, height: rect.height })
          Style.fixLineHeight(svg)
          bindSvgEvents(svg, state, actions, rect, svg)
          actions.setScale(state.scale)
        }
      )
    ]
  },
  setScale: (scale: number) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return [
      { ...state, scale },
      Cmd.ofSub(
        _ => {
          const svg = document.getElementById(state.containerId)!.children[0] as SVGSVGElement
          svg.style.width = state.rootRect.width * scale + 'px'
          svg.style.height = state.rootRect.height * scale + 'px'
        }
      )
    ]
  },
  scaleUp: () => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return [state, Cmd.ofSub(_ =>
      actions.setScale(
        Math.min(state.scale + .25, 5)
      ))
    ]
  },
  scaleDown: () => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return [state, Cmd.ofSub(_ =>
      actions.setScale(
        Math.max(state.scale - .25, .25)
      ))
    ]
  },
  handleMouseover: (layer: RectLayer) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return { hover: layer }
  },
  handleMouseout: () => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    // return { hover: null }
  },
  handleClick: (selected: RectLayer | null) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return { hover: null, selected }
  },
  dragStart: (e: React.MouseEvent<any>) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    e.stopPropagation()
    if (state.isDragging) {
      return
    }
    state.isDragging = true
    state.initDrag.x = e.screenX
    state.initDrag.y = e.screenY
    state.initScroll.x = document.documentElement.scrollTop
    state.initScroll.y = document.documentElement.scrollLeft
    Utils.log('dragStart', state)
  },
  dragMove: (e: MouseEvent) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    e.stopPropagation()
    if (!state.isDragging) {
      return
    }
    let deltaX = e.screenX - state.initDrag.x
    let deltaY = e.screenY - state.initDrag.y
    state.initDrag.x = e.screenX
    state.initDrag.y = e.screenY
    let scrollLeft = state.initScroll.x - deltaX
    let scrollTop = state.initScroll.y - deltaY
    Utils.log('dragMove', deltaX, deltaY, scrollLeft, scrollTop)
    rafId && cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(
      () => {
        // el.style.transform = `translate(${deltaX}px, ${deltaY}px)`
        // window.scrollTo(scrollLeft, scrollTop)
        window.scrollBy(-deltaX, -deltaY)
      }
    )
  },
  dragEnd: (e: MouseEvent) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    Utils.log('dragEnd')
    state.isDragging = false
  },
}
export type Actions = typeof actions
export type State = ReturnType<typeof init>['state']
