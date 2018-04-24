// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

// webpack does have HMR but we need `react-hot-loader`
// to let us keep the state when hot reloading
import { hot } from 'react-hot-loader';

import App from '../shared/App';
import initStore from '../shared/store';

const preloadedState: string = window.__PRELOADED_STATE__;
const rootElement: Element = document.getElementById('app');
const store: Store = initStore(preloadedState);

const wrapApp: (typeof App, Store) => React$Element<any> = (AppComponent, reduxStore) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppComponent state={window.__PRELOADED_STATE__} />
    </BrowserRouter>
  </Provider>
);

const appWithHotReload = hot(module)(App);

ReactDOM.render(wrapApp(appWithHotReload, store), rootElement);
