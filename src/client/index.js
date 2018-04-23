// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

// webpack does have HMR but we need `react-hot-loader`
// to let us keep the state when hot reloading
import { AppContainer } from 'react-hot-loader';

import App from '../shared/App';
import initStore from '../shared/store';

const preloadedState: string = window.__PRELOADED_STATE__;
const rootElement: Element | null = document.getElementById('app');
const store: Store = initStore(preloadedState);

const wrapApp: (typeof App, Store) => React$Element<any> = (AppComponent, reduxStore) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent state={window.__PRELOADED_STATE__} />
      </AppContainer>
    </BrowserRouter>
  </Provider>
);

if (rootElement) {
  ReactDOM.render(wrapApp(App, store), rootElement);
  if (module.hot) {
    if (module.hot.accept) {
      // flow-disable-next-line: suppressing method of unknown type
      module.hot.accept('../shared/App', async () => {
        // FIXME: require
        // eslint-disable-next-line global-require
        const NextApp: typeof App = require('../shared/App').default;

        ReactDOM.render(wrapApp(NextApp, store), rootElement);
      });
    }
  }
}
