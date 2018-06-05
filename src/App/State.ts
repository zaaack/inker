import * as Hydux from 'hydux'

const { Cmd } = Hydux



export const init = {
  state: () => ({
  }),
  cmd: () =>
    Cmd.none,
}
export const actions = {
  update: () => (state: State, actions: Actions): Hydux.AR<State, Actions> => {

    return [state, Cmd.none]
  },
}

export type Actions = typeof actions
export type State = ReturnType<typeof init.state>
