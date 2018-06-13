import * as Utils from 'utils'
import * as tinycolor from 'tinycolor2'
import * as MathJS from 'mathjs'
import { Rect } from './State'

export enum Keys {
  shadowNodes = 'shadowNodes',
}
function bodyStyle(name: string) {
  return getComputedStyle(document.body).getPropertyValue(name)
}

function formatColor(color: tinycolorInstance | string) {
  if (typeof color === 'string') {
    color = tinycolor(color)
  }
  return color.getAlpha() === 1 ? color.toHexString() : color.toRgbString()
}
type CSSStyles = { [k: string]: { [k: string]: string } }
const SVGStyleKey = '@svg-measure/svg-styles'
const SVGUseStyleKey = '@svg-measure/svg-use-styles'
function getSVGStyle(el: SVGElement, root: SVGSVGElement): Styles {
  const RulesKey = '@svg-measure/rules'
  function parseStyle(rulesStr: string) {
    let rule = {} as { [k: string]: string }
    rulesStr
      .split(';')
      .map(s => s.trim())
      .forEach(_ => {
        let [k, v] = _.split(':').map(s => s.trim())
        if (k in defaultStyleProps) {
          rule[k] = v
        }
      })
    return rule
  }
  function parseStyles(css: string) {
    let styles = {} as CSSStyles
    let splits = css.split('}')
    for (let i = 0; i < splits.length; i++) {
      let [header, rulesStr] = splits[i].split('{')
      if (!rulesStr) continue
      let cls = (header.trim().match(/\.([\w-]+)/) || [])[1]
      let rule = styles[cls] || (styles[cls] = {})
      Object.assign(rule, parseStyle(rulesStr))
    }
    return styles
  }
  let style = el[SVGStyleKey]
  if (!style) {
    let cssRules = root[RulesKey]
    if (!cssRules) {
      let css = ([].slice.call(root.querySelectorAll('style')) as HTMLStyleElement[])
        .map(s => s.innerText)
        .join('')
      cssRules = root[RulesKey] = parseStyles(css)
    }
    let clses = (el.className && el.className.baseVal || '').split(/\s+/) as string[]
    let elStyle = parseStyles(el.getAttribute('style') || '')
    let attrStyle = getAttrs(el).reduce((acc, attr) => {
      acc[attr.name] = attr.value
      return acc
    }, {})
    let parenStyle = el.parentElement && el.parentElement.tagName === 'g' ? getSVGStyle(el.parentElement as any, root) : {}
    style = el[SVGStyleKey] = Object.assign.call(
      Object,
      attrStyle,
      ...clses.map(c => cssRules[c] || {}),
      elStyle,
      parenStyle,
    )
  }
  console.log('svgstyle', style, el.tagName, el.className && el.className.baseVal)
  return style
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
  if (/^\d+$/.test(key) || val === defaultStyleProps[key] || skipValues.has(val)) {
    return false
  }
  if (key === 'transform' && /^\s*$/.test(val.replace(skipTransformValues, ''))) {
    return false
  }
  return true
}

function getUrlVal(val: string): string | null {
  const m = val.match(/url\(["']?([^\)]*?)["']?\)/)
  return m ? m[1] : null
}

function getAttrs(el: SVGElement): Attr[] {
  return [].filter.call(el.attributes, (attr: Attr) => ['id', 'class'].indexOf(attr.name) < 0)
}

function getAttr(el: SVGElement, name: string, root: SVGSVGElement) {
  let val: string | null = el[SVGUseStyleKey] && el[SVGUseStyleKey][name]
  if (val) return val
  val = getSVGStyle(el, root)[name]
  if (val) return val
  return el.getAttribute(name)
}
function getEl(el: SVGElement | null, root: SVGSVGElement): SVGElement | null {
  if (!el) return null
  if (el.tagName === 'use') {
    const hrefKey = 'xlink:href'
    let href = el.getAttribute(hrefKey)
    if (href) {
      let realEl = root.querySelector(href) as SVGElement | null
      realEl = realEl && getEl(realEl, root)
      if (realEl) {
        realEl = realEl.cloneNode() as SVGElement
        let elStyle = getSVGStyle(el, root)
        let realElStyle = { ...realEl[SVGUseStyleKey], ...getSVGStyle(realEl, root) }
        for (const key in elStyle) {
          if (name !== hrefKey) {
            realElStyle[name] = elStyle[key]
          }
        }
        realEl[SVGUseStyleKey] = realElStyle
      }
      return realEl
    }
    return null
  }
  return el
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

function getChildren(el: SVGElement, root: SVGSVGElement) {
  let children = [] as SVGElement[]
  for (let i = 0; i < el.children.length; i++) {
    let child = getEl(el.children[i] as SVGElement, root)
    if (child) {
      children.push(child)
    }
  }
  return children
}

function parseColor(val: string) {
  try {
    let c = tinycolor(val)
    if (c.getAlpha() === 1) {
      val = c.toHexString()
    }
  } catch (error) {
    console.error(error)
  }
  return val
}

/** Sketch color */
function getColorWithMatrix(el: SVGFEColorMatrixElement | null, fill: string) {
  if (!el) {
    return formatColor(tinycolor(fill))
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
    m = MathJS.multiply(m, [[rgba.r], [rgba.g], [rgba.b], [rgba.a], [1]])
    let ma = m.toJSON().data
    let color = tinycolor({
      r: ma[0],
      g: ma[1],
      b: ma[2],
      a: ma[3],
    })
    return formatColor(color)
  }
  return fill
}

class StyleParser {
  constructor(
    public el: SVGElement,
    public rect: Rect,
    public root: SVGSVGElement,
    public SVGStyle = getSVGStyle(el, root),
  ) {}

  getAttr(name: string) {
    const { el, root } = this
    return getAttr(el, name, root)
  }
  transformGradients(el: SVGGradientElement, key: string, val: string) {
    key = 'background-image'
    if (el instanceof SVGLinearGradientElement) {
      const getVal = (e: SVGAnimatedLength) => e.baseVal.value
      const deltaX = getVal(el.x2) - getVal(el.x1)
      const deltaY = getVal(el.y2) - getVal(el.y1)
      const cos = deltaY / Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
      const degree = Math.acos(cos)
      let steps: (string | void)[] = [].map.call(el.children, (el: SVGStopElement) => {
        const offset = getAttr(el, 'offset', this.root)
        let color = getAttr(el, 'stop-color', this.root)
        if (!color || !offset) return
        let rgba = tinycolor(color)
        const opacity = getAttr(el, 'stop-opacity', this.root)
        if (opacity && opacity !== '1') {
          rgba.setAlpha(Number(opacity))
        }
        return `${formatColor(rgba)} ${offset}`
      })
      key = 'background-image'
      val = `linear-gradient(${Number(degree.toFixed(2))}deg, ${steps.filter(Boolean).join(', ')})`
      return [key, val] as [string, string]
    } else {
      console.error(new Error('unimplemented'))
      return ['', '']
    }
  }
  transformAttrToStyle(
    key: string,
    val: string,
    styles: object,
    tag: string,
    elStyle: Styles,
  ): [string | void, string | void] | void {
    const { root, rect } = this
    const originalKey = key
    switch (key) {
      case 'fill': {
        if (tag === 'text' || tag === 'tspan') {
          key = 'color'
          val = parseColor(val)
        } else if (!elStyle.backgroundColor || elStyle.backgroundColor === defaultStyleProps['background-color']) {
          key = 'background-color'
          let el = getElByVal(val, root)
          console.log('el', el && el.tagName, val)
          if (!el) {
            val = parseColor(val)
            break // it's a normal background-color
          }
          if (el instanceof SVGGradientElement) {
            [key, val] = this.transformGradients(el, key, val)
          } else {
            key = ''
            console.log(new Error('unimplemented'), key, val)
          }
        } else {
          console.log(new Error('unimplemeneted'), key, val)
        }
        break
      }
      case 'fill-opacity':
        key = 'opacity'
        break
      case 'rx':
      case 'ry':
        key = 'border-radius'
        val = /^\d+$/.test(val) ? val + 'px' : val
        if (styles[key] && styles[key] !== val) {
          val = originalKey === 'rx' ? `${val}/${styles[key]}` : `${styles[key]}/${val}`
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
        if (children.length === 1) {
          if (children[0].tagName === 'rect') {
            const s = new StyleParser(children[0], rect, root).getStyle()
            if (s['border-radius']) {
              styles['border-radius'] = s['border-radius']
            }
          } else if (children[0].tagName === 'circle') {
            const width = getAttr(children[0], 'width', root)
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

  getBorderStyles(el: SVGElement): Styles {
    if (el.tagName === 'rect') {
      let width = this.getAttr('stroke-width')
      let color = this.getAttr('stroke') || 'black'
      let widthNum = width && Number(parseFloat(width).toFixed(1))
      if (widthNum) {
        return { border: `${widthNum}px solid ${formatColor(color)}` }
      }
    }
    return {}
  }

  getShadowFromFilter(filterVal: string, fill: string | null) {
    const { root, rect } = this
    // let realEl = getEl(el, root)
    // if (!realEl) return ''
    // let filter = getElByVal(el.getAttribute('filter'), root) as SVGFilterElement | null
    let filter = getElByVal(filterVal, root) as SVGFilterElement | null
    if (!filter) return
    let colorMatrix = filter.querySelector('feColorMatrix') as SVGFEColorMatrixElement | null
    fill = getAttr(filter, 'fill', root) || fill
    let color = (fill && getColorWithMatrix(colorMatrix, fill)) || 'black'
    let $offset = filter.querySelector('feOffset') as SVGFEOffsetElement | null
    let $blur = filter.querySelector('feGaussianBlur') as SVGFEGaussianBlurElement | null
    let $composite = filter.querySelector('feComposite') as SVGFECompositeElement | null
    let $componentTransfer = filter.querySelector(
      'feComponentTransfer',
    ) as SVGFEComponentTransferElement | null
    if ($offset && $blur) {
      const containsOut = (attr: string | null) => (attr || '').toLowerCase().includes('out')
      let isOut = containsOut(getAttr($blur, 'result', root))
      if ($composite) {
        // ignore
      } else if ($componentTransfer) {
        // gravit
        let $feFuncA = $componentTransfer.querySelector('feFuncA') as SVGFEFuncAElement | null
        if ($feFuncA) {
          try {
            let alpha = $feFuncA.tableValues.baseVal.getItem(1).value
            color = formatColor(tinycolor(color).setAlpha(alpha))
          } catch (error) {
            console.error(error)
          }
        }
      }
      let dx = getAttr($offset, 'dx', root)
      let dy = getAttr($offset, 'dy', root)
      let blur = getAttr($blur, 'stdDeviation', root)
      return (isOut ? '' : 'inset ') + `${dx}px ${dy}px ${parseInt(blur || '0', 10) * 2}px ${color}`
    }
    return
  }
  // Handle sketch shadow with inner shadow
  getShadowNodes(node: SVGElement) {
    let group = null as SVGGElement | null
    if (
      node.tagName === 'rect' &&
      node.parentElement &&
      node.parentElement instanceof SVGGElement
    ) {
      group = node.parentElement
    } else if (node instanceof SVGGElement) {
      group = node
    }
    if (group) {
      const { children } = group
      let siblings = [].slice.call(children) as SVGElement[]
      if (siblings.every(el => el.tagName === 'use' || el.tagName === 'rect')) {
        // inner shadow with out shadow
        debugger
        if (getAttr(group, 'filter', this.root)) {
          return siblings.concat(node.parentElement as any)
        }
        return siblings
      }
    }
    return null
  }

  getShadowStyles() {
    const { el, root } = this
    let styles = {} as Styles
    const shadowNodes = this.getShadowNodes(el)
    if (shadowNodes) {
      let boxShadow: string[] = []
      for (const node of shadowNodes) {
        const realNode = getEl(node, root)
        if (!realNode) continue
        let fill = getAttr(node, 'fill', root)
        debugger
        let filterAttrVal = getAttr(realNode, 'filter', root)
        let shadow = filterAttrVal && this.getShadowFromFilter(filterAttrVal, fill)
        if (shadow) {
          boxShadow.push(shadow)
        } else {
          styles = { ...styles, ...this.getBorderStyles(node) }
        }
      }
      if (boxShadow.length) {
        styles['box-shadow'] = boxShadow.join(', ')
      }
    }
    return styles
  }

  getRectStyles() {
    const { el, root, rect } = this
    const styles = {} as Styles
    if (['tspan', 'text'].indexOf(el.tagName) < 0) {
      styles['width'] = Math.round(rect.width) + 'px'
      styles['height'] = Math.round(rect.height) + 'px'
    }
    return styles
  }

  initStyles() {
    let styles = {
      ...this.getBorderStyles(this.el),
      ...this.getShadowStyles(),
      ...this.getRectStyles(),
    }
    // handle box shadow layer

    return styles
  }
  getStyle() {
    const { root, rect, el, SVGStyle } = this
    const tag = el.tagName
    let styles = this.initStyles()
    for (let key in defaultStyleProps) {
      let val = SVGStyle[key]
      if (!val) continue
      if (!filterStyle(key, val)) continue
      let result = this.transformAttrToStyle(key, val, styles, tag, SVGStyle)
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
      styles = { ...new StyleParser(el.parentElement, rect, root).getStyle(), ...styles }
    }
    console.log('styles', styles)
    return styles
  }
}

export function getCss(el: SVGElement, rect: Rect, root: SVGSVGElement) {
  const styles = new StyleParser(el, rect, root).getStyle()
  const css = Object.keys(styles).reduce((acc, k) => {
    return acc + `${k}: ${styles[k]};\n`
  }, '')
  return css.replace(/(\D)0px/g, '$10')
}
