// @flow
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import type { ThunkMiddleware } from 'redux-thunk';

import rootReducer from './rootReducer';
import type { AppStateType } from './rootReducer';
// TODO: review the type
const middlewares: [ThunkMiddleware] = [thunkMiddleware];

type paremetersType = ?AppStateType | ?string;
export default function initStore(loadedState: paremetersType): Store {
  const composeEnhancers: any = __DEVELOP__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

  const store: Store = createStore(
    rootReducer,
    loadedState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  return store;
}
