// @flow
// routes
import {
  ERROR_PAGE_ROUTE,
  ROOT_PAGE_ROUTE,
  ABOUT_PAGE_ROUTE,
  REPOS_LIST_PAGE_ROUTE,
  REPO_DETAILS_PAGE_ROUTE,
} from '../shared/routes';

// these functions load the data
import { fetchReposList, fetchRepoDetails } from './controller';
import render from './render';

export default (app: express$Application) => {
  app.get([ROOT_PAGE_ROUTE, ABOUT_PAGE_ROUTE], (req: express$Request, res: express$Response) => {
    res.status(200).send(render(req.url));
  });

  app.get(
    REPOS_LIST_PAGE_ROUTE,
    async ({ params, url }: express$Request, res: express$Response) => {
      res.status(200).send(render(url, await fetchReposList(params.clientid)));
    },
  );

  app.get(
    REPO_DETAILS_PAGE_ROUTE,
    async ({ params, url }: express$Request, res: express$Response) => {
      res.status(200).send(render(url, await fetchRepoDetails(params.org, params.name)));
    },
  );

  app.get(ERROR_PAGE_ROUTE, () => {
    // FIXME: propper error needed
    throw Error('Fake Internal Server Error');
  });

  app.get('*', (req: express$Request, res: express$Response) => {
    res.status(404).send(render(req.url));
  });

  app.use((err: ?Error, req: express$Request, res: express$Response): mixed => {
    console.error(err);
    res.status(500).send('Something went wrong!');
  });
};
