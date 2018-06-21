
export interface SVGFile {
  name: string
  title: string
  content: string
  uid: string
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

  function fromClient(r: ClientRect | DOMRect): Rect {
    return {
      left: r.left,
      top: r.top,
      width: r.width,
      height: r.height,
    }
  }
  export function fromEl(el: Element): Rect {
    if (el[TextFixedRect]) {
      console.log('TextFixedRect', el[TextFixedRect])
      return { ...el[TextFixedRect] }
    }
    return fromClient(el.getBoundingClientRect())
  }
}

export interface RectLayer {
  node: SVGElement
  rect: Rect
  lines: Line[]
}
export const IconRectRefKey = '@svg-measure/icon-ref'
export const TextFixedRect = '@svg-measure/text-fixed-rect'
