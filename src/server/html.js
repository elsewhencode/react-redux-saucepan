// @flow
import { ASSETS_PATH, APP_NAME } from '../../config';

export default function generateHtmlPage(
  plainPartialState: any = {},
  appHtml: string = '',
  styleTags: string = '',
): string {
  return `<!DOCTYPE html><html lang="en">
    <head>
      <title>${APP_NAME}</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="HandheldFriendly" content="True">
      <meta name="MobileOptimized" content="320">
      <meta
        name="viewport"
        content="width=device-width,height=device-height,
        user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0"
      />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="stylesheet" type="text/css" href="${ASSETS_PATH}app.css" />
      ${styleTags}
      </head>
    <body>
        <div id="app">${appHtml}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(plainPartialState)}
        </script>
        <script src="${ASSETS_PATH}app.js"></script>
      </body>
    </html>`;
}
