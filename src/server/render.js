// @flow

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet } from 'styled-components';

import initStore from '../shared/store';
import html from './html';
import App from '../shared/App';
import { type AppStateType } from './../shared/reducers';

export default function render(
  location: string,
  plainPartialState: ?AppStateType, // state may be given
) {
  // TODO: check this context thing
  // This context object contains the results of the render
  const routerContext: Object = {};
  // TODO: check this or statement
  const store: Store = plainPartialState
    ? initStore(plainPartialState)
    : initStore();
  const wrapApp = (
    <Provider store={store}>
      <StaticRouter location={location} context={routerContext}>
        <App />
      </StaticRouter>
    </Provider>
  );
  const sheet = new ServerStyleSheet();
  const appHtml: string = renderToString(sheet.collectStyles(wrapApp));
  const styleTags: string = sheet.getStyleTags(); // or sheet.getStyleElement()
  return html(plainPartialState, appHtml, styleTags);
}
