import _app from 'hydux'
import withReact, { React } from 'hydux-react'
import { ActionsType } from 'hydux/lib/types'
import * as App from './App'

// let app = withPersist<State, Actions>({
//   key: 'time-game/v1'
// })(_app)
let app = withReact<State, Actions>(
  void 0, {
    debug: true,
  }
)(_app)

if (process.env.NODE_ENV === 'development') {
  const devTools = require('hydux/lib/enhancers/devtools').default
  const logger = require('hydux/lib/enhancers/logger').default
  const hmr = require('hydux/lib/enhancers/hmr').default
  app = logger()(app)
  app = devTools()(app)
  app = hmr()(app)
}

app({
  init: () => [App.init.state, App.init.cmd()],
  actions: App.actions,
  view: App.view,
})
