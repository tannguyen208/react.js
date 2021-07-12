import app from './devTools' // for development

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './hooks/useAuth'
import {store, persistor} from './redux/store'
import AppRouter from './routes/routes'
import Preloader from './components/preloader'
import reportWebVitals from './reportWebVitals'
import './bootstrap'

function renderApp() {
  // create singleton for app here ...

  // react render elements
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate
        loading={<Preloader by="Store:: PersistGate" />}
        persistor={persistor}
      >
        <AuthProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </AuthProvider>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  )
}

app.then(renderApp)
reportWebVitals()
