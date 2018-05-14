// @flow
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';
import type { AppStateType } from './rootReducer';
// TODO: review the type
const middlewares: [any] = [thunkMiddleware];

export default function initStore(loadedState?: AppStateType | string): Store {
  const composeEnhancers = __DEVELOP__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

  return createStore(
    rootReducer,
    loadedState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
}
