// @flow
export type ManifestType = { 'app.css': string, 'app.js': string, 'vendor.js': string };

export default function generateHtmlPage(
  assets: ManifestType,
  plainPartialState: any = {},
  appHtml: string = '',
  styleTags: string = '',
): string {
  return `<!DOCTYPE html><html lang="en">
    <head>
      <title>react-redux-saucepan</title>
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
      <link rel="stylesheet" type="text/css" href="${assets['app.css']}" />
      ${styleTags}
      </head>
    <body>
        <div id="app">${appHtml}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(plainPartialState)}
        </script>
        <script src="${assets['app.js']}"></script>

        <script src="${assets['vendor.js']}"></script>
      </body>
    </html>`;
}
