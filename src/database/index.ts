import Dexie from 'dexie'
import Design, { File } from './Design'
import Profile from './Profile'

export interface Project {

}

export class InkerDB extends Dexie {
  designs!: Dexie.Table<Design, number>
  files!: Dexie.Table<File, number>
  profiles!: Dexie.Table<Profile, number>

  public constructor() {
    super('InkerDB')
    this.version(1).stores({
      designs: '++id,name',
    })
    this.hooks()
  }

  hooks() {
    Object.keys(this).forEach(
      key => {
        let field = this[key]
        if (field instanceof this.Table) {
          field.hook('updating', function (id, obj, tx) {
            obj.updated = new Date()
            obj.synced = null
          })
        }
      }
    )
  }
}

const db = new InkerDB()
export default db

export { default as Design } from './Design'
export { default as Profile } from './Profile'
