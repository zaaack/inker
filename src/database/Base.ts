import db from './index'

interface Base {
  created: Date
  updated: Date
  synced: Date
}

namespace Base {
  export function init<T extends Base>(input: Input<T, Base>): T {
    let base: Base = {
      created: new Date(),
      updated: new Date(),
      synced: new Date(0),
    }
    return {
      ...input as any,
      ...base,
    }
  }

  export type Input<T extends U, U = Base> = { [k in Exclude<keyof T, keyof U>]: T[k] }
}

export default Base
