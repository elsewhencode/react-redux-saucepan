// @flow
import compression from 'compression';
import express from 'express';

import routing from './routing';
import { WEB_PORT, ASSETS_PATH, HOST } from './../../config';

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

app.listen(WEB_PORT, () => {
  console.log(`Server running on ${HOST}:${WEB_PORT} (production)`);
});
