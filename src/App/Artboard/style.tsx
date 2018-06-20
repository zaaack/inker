import * as Utils from 'utils'
import * as tinycolor from 'tinycolor2'
import * as MathJS from 'mathjs'
import { Rect, IconRectRefKey } from './State'

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
const SVGUseStyleKey = '@svg-measure/svg-use-styles'

function mergeStyle(arg: Styles, ...args: Styles[]) {
  let styles = arg as Styles
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    for (const key in arg) {
      if (skipValues.has(arg[key])) continue
      styles[key] = arg[key]
    }
  }
  return styles
}

function getSVGStyle(el: SVGElement, root: SVGSVGElement): Styles {
  const RulesKey = '@svg-measure/rules'
  function parseStyle(rulesStr: string) {
    let rule = {} as { [k: string]: string }
    rulesStr
      .split(';')
      .map(s => s.trim())
      .forEach(_ => {
        let [k, v] = _.split(':').map(s => s.trim())
        if (v) {
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
      let selector = header.trim()
      let rule = styles[selector] || (styles[selector] = {})
      mergeStyle(rule, parseStyle(rulesStr))
    }
    return styles
  }
  let cssRules = root[RulesKey]
  if (!cssRules) {
    let css = ([].slice.call(root.querySelectorAll('style')) as HTMLStyleElement[])
      .map(s => s.textContent)
      .join('')
    cssRules = root[RulesKey] = parseStyles(css)
  }
  let elStyle = parseStyle(el.getAttribute('style') || '')
  let attrStyle = getAttrs(el).reduce((acc, attr) => {
    acc[attr.name] = attr.value
    return acc
  }, {})
  let parenStyle = {}
  if (
    el.parentElement && (['text', 'tspan', 'g'].indexOf(el.parentElement.tagName) >= 0)
  ) {
    let pTag = el.parentElement.tagName
    parenStyle = getSVGStyle(el.parentElement as any, root)
    let inheritAttrs = GInheritAttrs
    if (pTag !== 'g') {
      inheritAttrs = TextInheritAttrs
    }
    for (const key in parenStyle) {
      if (!inheritAttrs.has(key)) {
        parenStyle[key] = undefined
      }
    }
  }
  const classStyle = Object.keys(cssRules)
  .filter(sel => el.matches(sel))
  .map(s => cssRules[s] || {})
  let style = mergeStyle(
    parenStyle,
    attrStyle,
    ...classStyle,
    elStyle,
  )
  let comStyle = getComputedStyle(el)
  ;['letter-spacing'].forEach(
    key => {
      style[key] = comStyle.getPropertyValue(key)
    }
  )
  console.log('svgstyle', el.tagName, el.className && el.className.baseVal, style)
  console.log(parenStyle, attrStyle, classStyle, elStyle)
  return style
}

export type Styles = { [k: string]: string }
const GInheritAttrs = new Set(['filter', 'fill', 'fill-opacity', 'stroke', 'font-size', 'font-weight', 'font-family', 'font-style', 'letter-spacing', 'mask'])
const TextInheritAttrs = new Set(['fill', 'stroke', 'font-size', 'font-weight', 'font-family', 'font-style', 'text-decoration', 'line-spacing'])
const defaultStyleProps = {
  'font-size': bodyStyle('font-size'),
  'font-weight': bodyStyle('font-weight'),
  color: 'rgb(0, 0, 0)',
  'line-spacing': '',
  'letter-spacing': 'normal',
  'font-style': 'normal',
  'text-decoration': '',
  'line-height': 'normal',
  'background-color': 'rgba(0, 0, 0, 0)',
  'background-image': 'none',
  'background-repeat': 'repeat',
  'background-position': '0% 0%',
  'background-size': 'auto',
  opacity: '1',
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
  if (!(key in defaultStyleProps) || /^\d+$/.test(key) || val === defaultStyleProps[key] || skipValues.has(val)) {
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
function getRealEl(el: SVGElement | null, root: SVGSVGElement): SVGElement | null {
  if (!el) return null
  if (el.tagName === 'use') {
    const hrefKey = 'xlink:href'
    let href = el.getAttribute(hrefKey)
    if (href) {
      let realEl = root.querySelector(href) as SVGElement | null
      realEl = realEl && getRealEl(realEl, root)
      if (realEl) {
        realEl = realEl.cloneNode() as SVGElement
        let elStyle = getSVGStyle(el, root)
        let realElStyle = { ...realEl[SVGUseStyleKey], ...getSVGStyle(realEl, root) }
        for (const key in elStyle) {
          if (key !== hrefKey) {
            realElStyle[key] = elStyle[key]
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

function getRefElByVal(val: string | null, root: SVGSVGElement) {
  if (!val) return null
  const url = getUrlVal(val)
  if (!url) return null
  try {
    let el = getRealEl(root.querySelector(url) as SVGElement | null, root)
    if (!el) return null
    return el
  } catch (error) {
    return null
  }
}

function getRealChildren(el: SVGElement, root: SVGSVGElement) {
  let children = [] as SVGElement[]
  for (let i = 0; i < el.children.length; i++) {
    let child = getRealEl(el.children[i] as SVGElement, root)
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
    m = MathJS.multiply(m, [[rgba.r], [rgba.g], [rgba.b], [rgba.a], [255]])
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
  ) {
    if (el.tagName === 'use') {
      let realEl = getRealEl(el, root)
      if (realEl) {
        this.SVGStyle = {
          ...getSVGStyle(realEl, root),
          ...this.SVGStyle,
        }
      }
    }
  }

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
      const cos = deltaX / Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
      const rad = Math.acos(cos)
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
      let degree = (-(rad + (deltaX < 0 ? Math.PI / 2 : 0)) + Math.PI / 2) / Math.PI * 180
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
    elStyle: Styles,
  ): [string | void, string | void] | void {
    const { root, rect } = this
    const originalKey = key
    const tag = this.el.tagName
    switch (key) {
      case 'fill': {
        if (tag === 'text' || tag === 'tspan') {
          key = 'color'
          val = parseColor(val)
        } else if (!elStyle.backgroundColor || elStyle.backgroundColor === defaultStyleProps['background-color']) {
          if (this.el[IconRectRefKey]) {
            key = 'color'
          } else {
            key = 'background-color'
          }
          let el = getRefElByVal(val, root)
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
      case 'line-spacing':
        key = 'line-height'
        val = val + 'px'
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
        const children = getRealChildren(mask as SVGElement, root)
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
    let style = {} as Styles
    if (el.tagName === 'rect') {
      let width = getAttr(el, 'stroke-width', this.root)
      let color = getAttr(el, 'stroke', this.root) || 'black'
      let widthNum = width && Number(parseFloat(width).toFixed(1))
      if (widthNum) {
        style['border'] = `${widthNum}px solid ${formatColor(color)}`
      }
    }
    return style
  }

  getShadowFromFilter(filterVal: string) {
    const { root, rect } = this
    let filter = getRefElByVal(filterVal, root) as SVGFilterElement | null
    if (!filter) return
    let colorMatrix = filter.querySelector('feColorMatrix') as SVGFEColorMatrixElement | null
    let fill = getAttr(filter, 'fill', root) || 'black'
    let color = (fill && getColorWithMatrix(colorMatrix, fill)) || 'black'
    let $offset = filter.querySelector('feOffset') as SVGFEOffsetElement | null
    let $blur = filter.querySelector('feGaussianBlur') as SVGFEGaussianBlurElement | null
    let $composite = filter.querySelector('feComposite') as SVGFECompositeElement | null
    let $componentTransfer = filter.querySelector(
      'feComponentTransfer',
    ) as SVGFEComponentTransferElement | null
    let $flood = filter.querySelector('feFlood') as SVGFEFloodElement | null
    if ($offset || $blur || $composite || $componentTransfer || $flood) {
      const containsOut = (attr: string | null) => {
        let out = (attr || '').toLowerCase()
        return out.includes('out') || out === 'blur' // xd only has blur
      }

      let $resultEl = $offset || $blur || $composite
      let isOut = $resultEl ? containsOut(getAttr($resultEl, 'result', root)) : true
      if ($componentTransfer) {
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
      } else if ($flood) {
        // xd
        let alpha = Number($flood.getAttribute('flood-opacity') || '1')
        if (!isNaN(alpha)) {
          color = formatColor(tinycolor(color).setAlpha(alpha))
        }
      }
      let dx = $offset && getAttr($offset, 'dx', root) || '0'
      let dy = $offset && getAttr($offset, 'dy', root) || '0'
      let blur = $blur && getAttr($blur, 'stdDeviation', root) || '0'
      return (isOut ? '' : 'inset ') + `${dx}px ${dy}px ${parseInt(blur || '0', 10) * 2}px ${color}`
    }
    return
  }
  // Handle sketch shadow with inner shadow
  getShadowNodes(node: SVGElement) {
    let group = null as SVGGElement | null
    if (
      (node.tagName === 'rect' || node.tagName === 'use') &&
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
        const realNode = getRealEl(node, root)
        if (!realNode) continue
        let filterAttrVal = getAttr(realNode, 'filter', root)
        let shadow = filterAttrVal && this.getShadowFromFilter(filterAttrVal)
        if (shadow) {
          boxShadow.push(shadow)
        } else {
          styles = { ...styles, ...this.getBorderStyles(node) }
          let background = getAttr(node, 'fill', this.root)
          if (background) {
            styles['background-color'] = formatColor(background)
          }
        }
      }
      if (boxShadow.length) {
        styles['box-shadow'] = Array.from(new Set(boxShadow).keys()).join(', ')
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

  globalStyles() {
    let styles = {
      ...this.getBorderStyles(this.el),
      ...this.getShadowStyles(),
      ...this.getRectStyles(),
    }
    return styles
  }
  optimizeStyle(styles: Styles) {
    // optimize
    if (styles.width === styles.height && styles.width) {
      let radius = styles['border-radius']
      let width = parseInt(styles.width, 10)
      if (`${width / 2}px` === radius) {
        styles['border-radius'] = '50%'
      }
    }
    if (styles['font-size'] && /^\d+$/.test(styles['font-size'])) {
      styles['font-size'] = styles['font-size'] + 'px'
    }
    if (
      styles['font-size'] &&
      styles['line-hight'] &&
      styles['line-hight'].endsWith('px')
    ) {
      let lineHight = parseInt(styles['line-hight'], 10)
      let fontSize = parseInt(styles['font-size'], 10)
      styles['line-hight'] = String(Number((lineHight / fontSize).toFixed(2)))
    }
  }
  getStyle() {
    const { root, rect, el, SVGStyle } = this
    const StyleKey = '@svg-measure/styles'
    if (el[StyleKey]) return el[StyleKey]
    let styles = {} as Styles
    for (let key in defaultStyleProps) {
      let val = SVGStyle[key]
      if (!val) continue
      if (!filterStyle(key, val)) continue
      let result = this.transformAttrToStyle(key, val, styles, SVGStyle)
      if (result) {
        let [k, v] = result
        if (k && v) {
          [key, val] = [k, v]
          styles[Utils.slug(key)] = val
        }
      }
    }
    Object.assign(styles, this.globalStyles())
    this.optimizeStyle(styles)
    el[StyleKey] = styles
    return styles
  }
}

export function getCss(el: SVGElement, rect: Rect, root: SVGSVGElement) {
  const styles = new StyleParser(el, rect, root).getStyle()
  const css = Object.keys(styles).reduce((acc, k) => {
    return acc.push(`${k}: ${styles[k]};\n`), acc
  }, [] as string[])
  return css.join('')
    .replace(/(\D)0px/g, '$10')
    .replace(/(\D)0\./g, '$1.')

}
