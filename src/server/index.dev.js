// @flow
import express from 'express';

/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
/* eslint-enable import/no-extraneous-dependencies */

import webpackConfig from '../../scripts/webpack.dev';
import html from './html';
import { PORT, HOST, ASSETS_PATH } from '../../config';

const app: express$Application = express();
app.use(express.static('static'));

const compiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    heartbeat: 2000,
    log: false,
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
  }),
);
app.use(webpackHotMiddleware(compiler));

// just throws back an empty html page.
app.get('*', (req: express$Request, res: express$Response) => {
  res.status(200).send(
    html({
      'app.css': `${ASSETS_PATH}app.css`,
      'app.js': `${ASSETS_PATH}app.js`,
      'vendor.js': '',
    }),
  );
});

app.listen(PORT, HOST, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return;
  }
  // eslint-disable-next-line no-console
  console.log(`😎  Server running at ${HOST}:${PORT} (Auto Refresh)`);
});
