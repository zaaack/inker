import * as LruCache from 'lru-cache'
export * from './consts'


export function slug(key: string) {
  key = key.replace(/([A-Z])/g, (_, c: string) => `-${c.toLowerCase()}`)
  if (/^webkit|moz|ms/.test(key)) {
    key = '-' + key
  }
  return key
}

export function deslug(key: string) {
  return key.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
}

const svg2DataUrlCache = new LruCache({ max: 100 })
export function svg2dataUrl(svg: string) {
  let dataUrl = svg2DataUrlCache.get(svg)
  if (!dataUrl) {
    dataUrl = `data:image/svg+xml;${btoa(encodeURI(svg))}`
    svg2DataUrlCache.set(svg, dataUrl)
  }
  return dataUrl
}
