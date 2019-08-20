import createSagaMiddleware from 'redux-saga'
import { compose, createStore, applyMiddleware } from 'redux'

import { saga, reducer } from './ducks'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
const enhancers = [applyMiddleware(...middlewares)]

const composeEnhancers =
    process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose

const store = createStore(reducer, composeEnhancers(...enhancers))

sagaMiddleware.run(saga)

export default store
