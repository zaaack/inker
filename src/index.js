// @ts-nocheck
if (!__DEV__) {
  require('offline-plugin/runtime').install();
}
require('./main')

if (module.hot) {
  module.hot.accept()
}
