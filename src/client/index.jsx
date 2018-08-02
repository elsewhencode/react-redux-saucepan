// @flow

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AppWithHotReload from '../shared/App';
import initStore from '../shared/store';

// Read more about ErrorBoundries here:
// https://reactjs.org/docs/error-boundaries.html
import ErrorBoundry from './ErrorBoundry';

import 'sanitize.css';

const preloadedState: string = window.__PRELOADED_STATE__;
const rootElement: Element | null = document.getElementById('app');
const store: Store = initStore(preloadedState);

const provideAppwithStore = (
  AppComponent: typeof AppWithHotReload,
  reduxStore: Store,
): React.Element<any> => (
  <Provider store={reduxStore}>
    <ErrorBoundry>
      <BrowserRouter>
        {/* flow-disable-next-line Flow typings are not updated to React 16.3 yet
        more : https://github.com/facebook/flow/issues/6107 */}
        <React.StrictMode>
          <AppComponent state={window.__PRELOADED_STATE__} />
        </React.StrictMode>
      </BrowserRouter>
    </ErrorBoundry>
  </Provider>
);

if (rootElement instanceof HTMLElement) {
  render(provideAppwithStore(AppWithHotReload, store), rootElement);
}
