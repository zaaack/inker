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
