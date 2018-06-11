import * as Hydux from 'hydux'
import withReact, { React } from 'hydux-react'
import { ActionsType } from 'hydux/lib/types'
import * as App from './App'
import * as mutator from 'hydux-mutator'
import './types'

const { Cmd } = Hydux

let app = withReact<App.State, App.Actions>(
  document.getElementById('root'), {
    debug: true,
  }
)(Hydux.app)

if (process.env.NODE_ENV === 'development') {
  const devTools = require('hydux/lib/enhancers/devtools').default
  const logger = require('hydux/lib/enhancers/logger').default
  const hmr = require('hydux/lib/enhancers/hmr').default
  app = logger()(app)
  app = devTools()(app)
  app = hmr()(app)
}

const ctx = app({
  init: App.init,
  actions: App.actions,
  view: App.view,
})

if (__DEV__) {
  window['ctx'] = ctx
  window['mutator'] = mutator
}
