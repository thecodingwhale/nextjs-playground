import logger from 'redux-logger'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import authenticationSaga from './containers/Authentication/sagas'

const saga = createSagaMiddleware()

const makeConfiguredStore = (reducer, initialState) => {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(logger, saga))
  )
}

const configureStore = (initialState, { isServer }) => {
  if (isServer) {
    initialState = initialState || {}
    return makeConfiguredStore(rootReducer, initialState)
  } else {
    // we need it only on client side
    const { persistStore, persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default
    const persistConfig = {
      key: 'nextjs',
      whitelist: [
        'authentication',
        'authentication.user',
      ], // make sure it does not clash with server keys
      storage
    }
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    const store = makeConfiguredStore(persistedReducer, initialState)
    store.__persistor = persistStore(store) // Nasty hack

    saga.run(authenticationSaga)

    return store
  }
}

export default configureStore