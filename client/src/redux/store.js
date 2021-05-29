import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducer'
import { __DEV__ } from 'src/utils/isEnv'

const persistConfig = {
  key: 'root',
  storage,
}

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
  ],
  devTools: __DEV__,
})

export const persistor = persistStore(store)
