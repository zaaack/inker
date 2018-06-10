import * as Utils from 'utils'
import * as tinycolor from 'tinycolor2'
import * as MathJS from 'mathjs'
import { Rect } from './State'

export enum Keys {
  shadowNodes = 'shadowNodes'
}
function bodyStyle(name: string) {
  return getComputedStyle(document.body).getPropertyValue(name)
}
export type Styles = { [k: string]: string }
const defaultStyleProps = {
  'font-family': bodyStyle('font-family'),
  'font-size': bodyStyle('font-size'),
  'font-weight': bodyStyle('font-weight'),
  color: 'rgb(0, 0, 0)',
  'letter-spacing': 'normal',
  'font-style': 'normal',
  'text-decoration': 'none solid rgb(0, 0, 0)',
  'line-height': 'normal',
  'background-color': 'rgba(0, 0, 0, 0)',
  'background-image': 'none',
  'background-repeat': 'repeat',
  'background-position': '0% 0%',
  'background-size': 'auto',
  transform: 'none',
  opacity: '1',
  transition: 'all 0s ease 0s',
  animation: 'none 0s ease 0s 1 normal none running',
  // border: '0px none rgb(0, 0, 0)',
  // 'border-width': '0px',
  // 'border-color': 'rgb(0, 0, 0)',
  // 'border-left': '0px none rgb(0, 0, 0)',
  // 'border-right': '0px none rgb(0, 0, 0)',
  // 'border-top': '0px none rgb(0, 0, 0)',
  // 'border-bottom': '0px none rgb(0, 0, 0)',
  'border-radius': '0px',
  'box-shadow': 'none',
  'box-sizing': 'content-box',
  padding: '0px',
  margin: '0px',
  // filter: 'none',
  fill: '',
  'fill-opacity': '1',
  rx: 0,
  ry: 0,
  mask: '',
  r: '0px',
}
const skipValues = new Set([
  '0px',
  'auto',
  'unset',
  'initial',
  'normal',
  'start',
  'none',
  'rgba(0, 0, 0, 0)',
  'transparent',
  'repeat',
])
const skipTransformValues = /(?:matrix|translate(:?[XYZ]|3d)?)\([^)]+\)/g

function filterStyle(key: string, val: string) {
  if (
    /^\d+$/.test(key) ||
    val === defaultStyleProps[key] ||
    skipValues.has(val)
  ) {
    return false
  }
  if (
    key === 'transform' &&
    /^\s*$/.test(val.replace(skipTransformValues, ''))
  ) {
    return false
  }
  return true
}

function getUrlVal(val: string): string | null {
  const m = val.match(/url\(["']?([^\)]*?)["']?\)/)
  return m ? m[1] : null
}

function getAttrs(el: SVGElement) {
  return [].filter.call(
    el.attributes,
    (attr: Attr) => ['id', 'class'].indexOf(attr.name) < 0
  )
}

function getEl(el: SVGElement | null, root: SVGElement): SVGElement | null {
  if (!el) return null
  if (el.tagName === 'use') {
    const hrefKey = 'xlink:href'
    let href = el.getAttribute(hrefKey)
    if (href) {
      let realEl = root.querySelector(href) as SVGElement | null
      realEl = realEl && getEl(realEl, root)
      if (realEl) {
        realEl = realEl.cloneNode() as SVGElement
        getAttrs(el).forEach(
          (attr: Attr) => {
            if (
              attr.name !== hrefKey
            ) {
              realEl!.setAttribute(attr.name, attr.value)
            }
          }
        )
      }
      return realEl
    }
    return null
  } else {
    return el
  }
}

function getElByVal(val: string | null, root: SVGSVGElement) {
  if (!val) return null
  const url = getUrlVal(val)
  if (!url) return null
  try {
    let el = getEl(root.querySelector(url) as SVGElement | null, root)
    if (!el) return null
    return el
  } catch (error) {
    return null
  }
}

function getChildren(el: SVGElement, root: SVGElement) {
  let children = [] as SVGElement[]
  for (let i = 0; i < el.children.length; i++) {
    let child = getEl(el.children[i] as SVGElement, root)
    if (child) {
      children.push(child)
    }
  }
  return children
}

function transformGradients(key: string, val: string, el: SVGGradientElement) {
  key = 'background-image'
  if (el instanceof SVGLinearGradientElement) {
    const getVal = (e: SVGAnimatedLength) => e.baseVal.value
    const deltaX = getVal(el.x2) - getVal(el.x1)
    const deltaY = getVal(el.y2) - getVal(el.y1)
    const cos = deltaY / Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY,2))
    const degree = Math.acos(cos)
    let steps: (string | void)[] = [].map.call(
      el.children,
      (el: SVGStopElement) => {
        const offset = el.getAttribute('offset')
        let color = el.getAttribute('stop-color')
        if (!color || !offset) return
        let rgba = tinycolor(color)
        const opacity = el.getAttribute('stop-opacity')
        if (opacity && opacity !== '1') {
          rgba.setAlpha(Number(opacity))
        }
        return `${rgba.getAlpha() === 1 ? rgba.toHexString() : rgba.toRgbString()} ${offset}`
      }
    )
    key = 'background-image'
    val = `linear-gradient(${Number(degree.toFixed(2))}deg, ${steps.filter(Boolean).join(', ')})`
    return [key, val] as [string, string]
  } else {
    console.error(new Error('unimplemented'))
    return ['', '']
  }
}

function transformAttrToStyle(
  key: string, val: string, styles: object,
  tag: string, elStyle: CSSStyleDeclaration,
  rect: Rect,
  root: SVGSVGElement,
): [string | void, string | void] | void {
  const originalKey = key
  switch (key) {
    case 'fill': {
      if (tag === 'text' || tag === 'tspan') {
        key = 'color'
      } else if (
        elStyle.backgroundColor === defaultStyleProps['background-color']
      ) {
        key = 'background-color'
        let el = getElByVal(val, root)
        if (!el) break // it's a normal background-color
        if (el instanceof SVGGradientElement) {
          [key, val] = transformGradients(key, val, el)
        } else {
          key = ''
          console.error(new Error('unimplemented'), key, val)
        }
      }
      break
    }
    case 'fill-opacity':
      key = 'opacity'
      break
    case 'rx':
    case 'ry':
      key = 'border-radius'
      if (styles[key] && styles[key] !== val) {
        val = originalKey === 'rx'
          ? `${val}/${styles[key]}`
          : `${styles[key]}/${val}`
      }
      break
    case 'r':
      if (tag === 'circle') {
        key = 'border-radius'
        val = '50%'
      } else {
        key = ''
      }
      break
    case 'mask': {
      let sel = getUrlVal(val)
      if (!sel) return
      let mask
      try {
        mask = root.querySelector(sel)
      } catch {
        // ignore
      }
      if (!mask) return
      const children = getChildren(mask as SVGElement, root)
      if (
        children.length === 1
      ) {
        if (children[0].tagName === 'rect') {
          const s = getStyle(children[0], rect, root)
          if (s['border-radius']) {
            styles['border-radius'] = s['border-radius']
          }
        } else if (children[0].tagName === 'circle') {
          const width = children[0].getAttribute('width')
          if (width) {
            const radius = parseInt(width, 10) / 2
            styles['border-radius'] = radius
          }
        }
      }
      return
    }
    default:
      break
  }
  return [key, val]
}

function getBorderStyles(el: SVGElement): Styles {
  if (
    el.tagName === 'rect'
  ) {
    let width = el.getAttribute('stroke-width')
    let color = el.getAttribute('stroke') || 'black'
    let widthNum = width && parseInt(width, 10)
    if (widthNum) {
      return { 'border': `${widthNum}px solid ${color}`}
    }
  }
  return {}
}

function getShadowFromFilter(filterVal: string, fill: string | null, root: SVGSVGElement) {
  // let realEl = getEl(el, root)
  // if (!realEl) return ''
  // let filter = getElByVal(el.getAttribute('filter'), root) as SVGFilterElement | null
  let filter = getElByVal(filterVal, root) as SVGFilterElement | null
  if (!filter) return
  let colorMatrix = filter.querySelector('feColorMatrix') as SVGFEColorMatrixElement | null
  fill = filter.getAttribute('fill') || fill
  let color = fill ? getColorWithMatrix(colorMatrix, fill) : 'black'
  let $offset = filter.querySelector('feOffset') as SVGFEOffsetElement | null
  let $blur = filter.querySelector('feGaussianBlur') as SVGFEGaussianBlurElement | null
  let $composite = filter.querySelector('feComposite') as SVGFECompositeElement | null
  let $componentTransfer = filter.querySelector('feComponentTransfer') as SVGFEComponentTransferElement | null
  if ($offset && $blur) {
    let isOut = false
    if ($composite) {
      isOut = $composite.getAttribute('operator') === 'out'
    } else if ($componentTransfer) {
      isOut = ($componentTransfer.getAttribute('in') || '').toLowerCase().includes('out')
    }
    let dx = $offset.getAttribute('dx')
    let dy = $offset.getAttribute('dy')
    let blur = $blur.getAttribute('stdDeviation')
    return (isOut ? '' : 'inset ') + `${dx}px ${dy}px ${parseInt((blur || '0'), 10) * 2}px ${color}`
  }
  return
}

function getColorWithMatrix(el: SVGFEColorMatrixElement | null, fill: string) {
  if (!el) {
    return tinycolor(fill).toRgbString()
  }
  let matrix = [] as number[][]
  let rgba = tinycolor(fill).toRgb()
  if (el && el.type.baseVal === SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_MATRIX) {
    for (let i = 0; i < el.values.baseVal.numberOfItems; i++) {
      const item = el.values.baseVal.getItem(i)
      if (i % 5 === 0) {
        matrix.push([])
      }
      matrix[matrix.length - 1][i % 5] = item.value
    }
    let m = MathJS.matrix(matrix)
    m = MathJS.multiply(m, [rgba.r, rgba.g, rgba.b, rgba.r])
    let ma = m.toJSON()
    let color = tinycolor({
      r: ma[0],
      g: ma[1],
      b: ma[2],
      a: ma[3],
    })
    return color.toRgbString()
  }
  return null
}

// Handle sketch shadow with inner shadow
function getShadowNodes(node: SVGElement) {
  if (
    node.tagName === 'rect' &&
    node.parentElement &&
    node.parentElement.tagName === 'g'
  ) {

    const { children } = node.parentElement
    let siblings = [].slice.call(children) as SVGElement[]
    if (
      siblings.every(
        el => el.tagName === 'use' || el.tagName === 'rect'
      )
    ) { // inner shadow with out shadow
      if (node.parentElement.getAttribute('filter')) {
        return siblings.concat(node.parentElement as any)
      }
      return siblings
    }
  }

  return null
}

function getShadowStyles(el: SVGElement, root: SVGSVGElement) {
  let styles = {} as Styles
  const shadowNodes = getShadowNodes(el)
  if (shadowNodes) {
    let boxShadow: string[] = []
    for (const node of shadowNodes) {
      const realNode = getEl(node, root)
      if (!realNode) continue
      let fill = node.getAttribute('fill')
      let filterAttrVal = realNode.getAttribute('filter')
      let shadow = filterAttrVal && getShadowFromFilter(filterAttrVal, fill, root)
      if (shadow) {
        boxShadow.push(shadow)
      } else {
        styles = { ...styles, ...getBorderStyles(node) }
      }
    }
    if (boxShadow.length) {
      styles['box-shadow'] = boxShadow.join(', ')
    }
  }
  return styles
}

function getRectStyles(el: SVGElement, rect: Rect) {
  const styles = {} as Styles
  if (['tspan', 'text'].indexOf(el.tagName) < 0) {
    styles['width'] = rect.width + 'px'
    styles['height'] = rect.height + 'px'
  }
  return styles
}

function initStyles(el: SVGElement, rect: Rect, root: SVGSVGElement) {
  let styles = {
    ...getBorderStyles(el),
    ...getShadowStyles(el, root),
    ...getRectStyles(el, rect),
  }
  // handle box shadow layer

  return styles
}

export function getStyle(el: SVGElement, rect: Rect, root: SVGSVGElement) {
  const tag = el.tagName
  const elStyle = getComputedStyle(el)
  let styles = initStyles(el, rect, root)
  for (let key in defaultStyleProps) {
    let val = elStyle.getPropertyValue(key)
    if (!filterStyle(key, val)) {
      continue
    }
    let result = transformAttrToStyle(key, val, styles, tag, elStyle, rect, root)
    if (result) {
      let [k, v] = result
      if (k && v) {
        [key, val] = [k, v]
        styles[Utils.slug(key)] = val
      }
    }
  }
  if (
    el.parentElement &&
    el.parentElement.tagName === 'g' &&
    el.parentElement instanceof SVGElement
  ) {
    styles = { ...getStyle(el.parentElement, rect, root), ...styles }
  }
  console.log('styles', styles)
  return styles
}

export function getCss(el: SVGElement, rect: Rect, root: SVGSVGElement) {
  const styles = getStyle(el, rect, root)
  return Object.keys(styles).reduce(
    (acc, k) => {
      return acc + `${k}: ${styles[k]};\n`
    }, ''
  )
}
