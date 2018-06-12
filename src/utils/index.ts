import * as LruCache from 'lru-cache'
export * from './consts'
export * from './dom-query'
import { injectGlobal } from 'emotion'
import * as Hydux from 'hydux'

injectGlobal`
  body {
    padding: 0;
    margin: 0;
    background-color: rgb(32, 31, 31);
  }
`

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

export function replaceAction<S, A, PS, PA, A1>(
  parentActions: PA,
  getter: (_: PA) => (a1: A1) => (s: S, a: A) => any,
  wrapper?: (a1: A1) => (
    action: (a1: A1) => Hydux.ActionCmdResult<S, A>,
    parentState: PS,
    parentActions: PA,
    state: S,
    actions: A,
  ) => Hydux.ActionResult<S, A>,
)
export function replaceAction<S, A, PS, PA, A1, A2>(
  parentActions: PA,
  getter: (_: PA) => (a1: A1, a2: A2) => (s: S, a: A) => any,
  wrapper?: (a1: A1, a2: A2) => (
    action: (a1: A1, a2: A2) => Hydux.ActionCmdResult<S, A>,
    parentState: PS,
    parentActions: PA,
    state: S,
    actions: A,
  ) => Hydux.ActionResult<S, A>,
)
/**
 * Wrap a child action with parentState, parentActions.
 * @param action The action to be wrapped
 * @param wrapper
 * @param parentState
 * @param parentActions
 */
export function replaceAction<S, A, PS, PA>(
  parentActions: PA,
  getter: (_: PA) => Hydux.UnknownArgsActionType<S, A>,
  wrapper?: (...args) => (
    action: (...args) => Hydux.ActionCmdResult<S, A>,
    parentState: PS,
    parentActions: PA,
    state: S,
    actions: A,
  ) => Hydux.ActionResult<S, A>,
): any {
  if (!wrapper) {
    return parentActions
  }
  let action = getter(parentActions)
  const wrappedAction = (...args) => (state: S, actions: A, parentState: PS, parentActions: PA) => {
    const normalAction = (...args) => Hydux.runAction(action(...args), state, actions)
    return wrapper(...args)(normalAction, parentState, parentActions, state, actions)
  }
  let keys = (getter.toString().match(/((?:[\w_$]+\.)+[\w_$]+)/) || [])[1].split('.').slice(1)
  let cursor = parentActions
  let replaced = false
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (cursor[key] === action) {
      cursor[key] = wrappedAction
      replaced = true
      break
    }
    cursor = cursor[key] = { ...cursor[key] }
  }
  if (!replaced) {
    console.error(new Error(`Cannot find action in parentActions`), parentActions, getter, parentActions)
  }
  return parentActions
}
