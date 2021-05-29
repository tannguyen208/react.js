import React from 'react'
import { __DEV__ } from 'src/utils/isEnv'

let appReady = Promise.resolve()

if (__DEV__) {
  const worker = require('./__mocks__/browser').worker
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  const ReactRedux = require('react-redux/lib')

  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [[ReactRedux, 'useSelector']],
  })

  appReady = worker.start({
    /**
     * Use a custom Service Worker script URL to resolve
     * @note You DO NOT need this in your application.
     * @see https://mswjs.io/docs/api/setup-worker/start#serviceworker
     */
    quiet: false,
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
}

export default appReady
