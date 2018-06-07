import * as Hydux from 'hydux'
import * as Artboard from './Artboard'
const testSvg = require('../test/fixtures/uikit/Food/Category.svg')
// const testSvg = require('../test/fixtures/work/1.svg')

const { Cmd } = Hydux

export const init = {
  state: () => ({
    artboard: Artboard.init.state(),
  }),
  cmd: (): Hydux.CmdType<Actions> =>
    Cmd.batch(
      Cmd.ofSub(
        _ => _.artboard.setArtboard({
          name: '',
          content: testSvg,
        })
      ),
    )
}
export const actions = {
  artboard: Artboard.actions,
  update: () => (state: State, actions: Actions): Hydux.AR<State, Actions> => {

    return [state, Cmd.none]
  },
}

export type Actions = typeof actions
export type State = ReturnType<typeof init.state>
