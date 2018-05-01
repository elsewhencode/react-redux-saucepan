// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

// webpack does have HMR but we need `react-hot-loader`
// to let us keep the state when hot reloading
import { hot } from 'react-hot-loader';

import App from '../shared/App';
import initStore from '../shared/store';

// Read more about ErrorBoundries here:
// https://reactjs.org/docs/error-boundaries.html
import ErrorBoundry from './ErrorBoundry';

const preloadedState: string = window.__PRELOADED_STATE__;
const rootElement: Element | null = document.getElementById('app');
const store: Store = initStore(preloadedState);

const provideAppwithStore = (
  AppComponent: typeof App,
  reduxStore: Store,
): React.Element<any> => (
  <Provider store={reduxStore}>
    <ErrorBoundry>
      <BrowserRouter>
        <AppComponent state={window.__PRELOADED_STATE__} />
      </BrowserRouter>
    </ErrorBoundry>
  </Provider>
);

const appWithHotReload: typeof App = hot(module)(App);
if (rootElement instanceof HTMLElement) {
  ReactDOM.render(provideAppwithStore(appWithHotReload, store), rootElement);
}
