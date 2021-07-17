import React from 'react'
import {__DEV__} from 'src/utils/isEnv'

const frame = Promise.resolve()

if (__DEV__) {
  const {worker} = require('./__mocks__/browser')
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  const ReactRedux = require('react-redux/lib')

  // @ts-ignore
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [[ReactRedux, 'useSelector']],
  })

  frame.then(() => {
    /**
     * Use a custom Service Worker script URL to resolve
     * @note You DO NOT need this in your application.
     * @see https://mswjs.io/docs/api/setup-worker/start#serviceworker
     */
    worker.start({
      quiet: false,
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    })
  })
}

export default frame
