import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reducer as formReducer } from 'redux-form'

import collections from 'src/collections'

const isServer = typeof window === 'undefined'

const composeEnhancers = !isServer && process.env.NODE_ENV === 'development'
  // eslint-disable-next-line no-underscore-dangle
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose

const rootReducer = combineReducers({
  ...collections.reducers,
  form: formReducer,
})
const sagaMiddleware = createSagaMiddleware()

const enhancer = composeEnhancers(applyMiddleware(
  sagaMiddleware,
))

export const configureStore = (initialState = {}) => {
  const store = createStore(rootReducer, initialState, enhancer)

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(collections.sagas)
  }

  store.runSagaTask()

  return store
}
