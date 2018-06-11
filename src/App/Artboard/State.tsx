import * as React from 'react'
import * as Hydux from 'hydux'
import { css, cx } from 'emotion'
import * as Style from './style'

const { Cmd } = Hydux

export interface SVGFile {
  name: string
  title: string
  content: string
}

export interface Rect {
  left: number
  top: number
  width: number
  height: number
}

export interface Line {
  rect: Rect
  length: number
  direction: 'horizon' | 'vertical'
}
export namespace Rect {
  export let empty: Rect = {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  }
}

export interface RectLayer {
  node: SVGElement
  rect: Rect
  lines: Line[]
}

export const init = () => ({
  state: {
    artboard: null as SVGFile | null,
    hover: null as RectLayer | null,
    selected: null as RectLayer | null,
    containerId: 'artboard_' + Math.random().toString(36).slice(2),
    rootRect: Rect.empty,
    scale: 1,
    css: '',
    ratio: 1
  }
})

function clientRectToRect(r: ClientRect | DOMRect): Rect {
  return {
    left: r.left,
    top: r.top,
    width: r.width,
    height: r.height,
  }
}
export const lineWidth = 2

function calcRectBorderLines(rect: Rect, rootRect: Rect): Line[] {
  function initHorizon(top: number): Line {
    return {
      rect: {
        left: 0,
        top,
        width: rootRect.width,
        height: lineWidth,
      },
      length: rootRect.width,
      direction: 'horizon',
    }
  }
  function initVertical(left: number): Line {
    return {
      rect: {
        left,
        top: 0,
        width: lineWidth,
        height: rootRect.height,
      },
      length: rootRect.height,
      direction: 'vertical',
    }
  }
  return [
    initVertical(rect.left - lineWidth), // left
    initVertical(rect.left + rect.width), // right
    initHorizon(rect.top - lineWidth), // top
    initHorizon(rect.top + rect.height), // bottom
  ]
}
const hoverableTags = new Set(['g', 'svg', 'rect', 'text', 'tspan', 'path', 'image', 'circle', 'clipPath', 'ellipse', 'a', 'line', 'marker', 'polygon', 'polygon', 'polyline'])

export function getNodeRect(el: SVGElement, rootRect: Rect) {
  const rect = clientRectToRect(el.getBoundingClientRect())
  rect.left -= rootRect.left
  rect.top -= rootRect.top
  return rect
}

const rectRefKey = '@svg-measure/refG'
const rectKey = '@svg-measure/rect'
function bindSvgEvents(el: SVGElement, state: State, actions: Actions, rootRect: Rect, root: SVGSVGElement) {
  if (!hoverableTags.has(el.tagName)) {
    return
  }
  const rect = getNodeRect(el, rootRect)

  if (
    el.tagName === 'g' &&
    [].some.call(el.children, (n: SVGElement) => n.tagName === 'path')
  ) { // Fix SVGGElement cannot click on rect
    let $rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    $rect.setAttribute('x', String(rect.left))
    $rect.setAttribute('y', String(rect.top))
    $rect.setAttribute('width', rect.width.toFixed(2))
    $rect.setAttribute('height', rect.height.toFixed(2))
    $rect.setAttribute('fill', 'rgba(0, 0, 0, 0)')
    $rect.setAttribute('stroke-width', '0')

    $rect[rectRefKey] = el
    el.insertBefore($rect, el.children[0])
  }
  {
    let node = el[rectRefKey] || el
    const rect = getNodeRect(node, rootRect)
    el.addEventListener('mouseover', e => {
      e.stopPropagation()
      actions.handleMouseover({
        node,
        rect,
        lines: calcRectBorderLines(rect, rootRect),
      })
    }, false)
    el.addEventListener('mouseout', e => {
      e.stopPropagation()
      actions.handleMouseout()
    }, false)
    el.addEventListener('click', e => {
      console.log('click', node)
      e.stopPropagation()
      actions.handleClick({
        node,
        rect,
        lines: calcRectBorderLines(rect, rootRect),
      })
      const css = Style.getCss(node, rect, root)
      actions.setCss(css)
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

export const actions = {
  setRootRect: (rect: Rect) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return { rootRect: rect }
  },
  setCss: (css: string) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return { css }
  },
  setArtboard: (artboard: SVGFile) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return [
      { ...state, artboard, hover: null, selected: null },
      Cmd.ofSub(
        actions => {
          console.log('init')
          const wrapper = document.getElementById(state.containerId)!
          wrapper.innerHTML = ''
          wrapper.innerHTML = artboard.content
          const svg = wrapper.getElementsByTagName('svg')[0]
          const rect = svg.getBoundingClientRect()
          wrapper.style.width = rect.width + 'px'
          wrapper.style.height = rect.height + 'px'
          const rootRect = clientRectToRect(wrapper.getBoundingClientRect())
          actions.setRootRect({ ...Rect.empty, width: rootRect.width, height: rootRect.height })
          bindSvgEvents(svg, state, actions, rootRect, svg)
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
  handleMouseover: (layer: RectLayer) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return { ...state, hover: layer }
  },
  handleMouseout: () => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return { ...state, hover: null }
  },
  handleClick: (selected: RectLayer | null) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return { ...state, hover: null, selected }
  },
}
export type Actions = typeof actions
export type State = ReturnType<typeof init>['state']
