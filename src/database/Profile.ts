import Base from 'database/Base'

interface Profile extends Base {
  name: string
  unit: {
    name: string
    rate: number
  },
  colors: { [k: string]: string }
  lengths: { [k: string]: string }
}

namespace Profile {
  const init = (input: Base.Input<Profile>) => Base.init(input)
}

export default Profile
