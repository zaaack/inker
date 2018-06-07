import * as Utils from 'utils'
import * as tinycolor from 'tinycolor2'

const defaultStyleProps = {
  'font-family': '"PingFang SC"',
  'font-size': '16px',
  'font-weight': '400',
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
  border: '0px none rgb(0, 0, 0)',
  'border-width': '0px',
  'border-radius': '0px',
  'border-color': 'rgb(0, 0, 0)',
  'border-left': '0px none rgb(0, 0, 0)',
  'border-right': '0px none rgb(0, 0, 0)',
  'border-top': '0px none rgb(0, 0, 0)',
  'border-bottom': '0px none rgb(0, 0, 0)',
  'box-shadow': 'none',
  'box-sizing': 'content-box',
  width: '400px',
  height: '800px',
  padding: '0px',
  margin: '0px',
  filter: 'none',
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
  const m = val.match(/url\(["']([^\)]*?)["']\)/)
  return m && /^[#\.]/.test(m[1]) ? m[1] : null
}
function getEl(el: SVGElement | null, root: SVGElement): SVGElement | null {
  if (!el) return null
  if (el.tagName === 'use') {
    let href = el.getAttribute('xlink:href')
    if (href) {
      let el = root.querySelector(href) as SVGElement | null
      return el && getEl(el, root)
    }
    return null
  } else {
    return el
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
function transformStyle(
  key: string, val: string, styles: object,
  tag: string, elStyle: CSSStyleDeclaration,
  root: SVGSVGElement,
): [string, string] | void {
  const originalKey = key
  switch (key) {
    case 'fill': {
      if (tag === 'text' || tag === 'tspan') {
        key = 'color'
      } else if (
        elStyle.backgroundColor === defaultStyleProps['background-color']
      ) {
        key = 'background-color'
        const url = getUrlVal(val)
        if (!url) break
        let el = getEl(root.querySelector(url) as SVGElement | null, root)
        if (!el) return
        if (el instanceof SVGGradientElement) {
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
            val = `linear-gradient(${degree}deg, ${steps.filter(Boolean).join(', ')})`
          } else {
            console.error(new Error('unimplemented'))
            return
          }
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
      key = 'border-radius'
      val = '50%'
      break
    case 'mask': {
      let sel = getUrlVal(val)
      if (!sel) return
      const mask = root.querySelector(sel)
      if (!mask) return
      const children = getChildren(mask as SVGElement, root)
      if (
        children.length === 1
      ) {
        if (children[0].tagName === 'rect') {
          const s = getStyle(children[0], root)
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

export function getStyle(el: SVGElement, root: SVGSVGElement) {
  const tag = el.tagName
  const elStyle = getComputedStyle(el)
  let styles = {}
  // todo: href
  let hasBorder = elStyle.getPropertyValue('border').indexOf('none') < 0
  for (let key in defaultStyleProps) {
    let val = elStyle.getPropertyValue(key)
    if (!filterStyle(key, val)) {
      continue
    }
    let result = transformStyle(key, val, styles, tag, elStyle, root)
    if (result) {
      [key, val] = result
      styles[Utils.slug(key)] = val
    }
  }
  if (
    el.parentElement &&
    el.parentElement.tagName === 'g' &&
    el.parentElement instanceof SVGElement
  ) {
    styles = { ...getStyle(el.parentElement, root), ...styles }
  }
  console.log('styles', styles)
  return styles
}
