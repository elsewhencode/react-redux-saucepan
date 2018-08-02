// @flow
import compression from 'compression';
import express from 'express';

import routing from './routing';
import { PORT, ASSETS_PATH, HOST } from '../../config';
import log from '../util/log';

const app: express$Application = express();
app.use(compression());

app.use(ASSETS_PATH, express.static('dist'));
app.use(express.static('static'));

// compress the requeted js file
app.get('*.js', (req: express$Request, res: express$Response, next) => {
  req.url = `${req.url}.gz`;
  res.set('Content-Encoding', 'gzip');
  next();
});

routing(app);

app.listen(PORT, HOST, (err) => {
  if (err) {
    return log(err);
  }
  return log(`😎  Listening on port ${PORT}. Open http://${HOST}:${PORT} in your browser.`);
});
