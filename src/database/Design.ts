import Base from './Base'
import Dexie from 'dexie'
import db from './index'

export interface File extends Base {
  id: number
  type: 'SVGFile',
  content: string | Blob | Uint8Array
}

export namespace File {
  export const init = (input: Base.Input<File>) => Base.init(input)
}

export interface ArtboardLite {
  name: string
  title: string
  thumbnail: Blob
  file_id: number
}

export interface Artboard extends ArtboardLite {
  content: string
}

interface Design extends Base {
  id: number
  name: string
  artboards: ArtboardLite[]
  profile_id?: number
}

namespace Design {
  export let init = (input: Base.Input<Design>) => Base.init(input)
  export let getArtboard = async (lite: ArtboardLite) => {
    let file = await db.files.get(lite.file_id)
    if (file) {
      return {
        ...lite,
        content: file.content,
      } as Artboard
    }
  }
  export let getProfile = async (o: Design) => {
    if (o.profile_id) {
      return db.profiles.get(o.profile_id)
    }
  }
}

export default Design
