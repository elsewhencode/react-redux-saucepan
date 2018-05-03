// @flow
import React, { Fragment } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';

import NotFoundPage from './pages/NotFoundPage';
import ReposPage from './pages/ReposPage';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import Navigation from './components/Nav';

import {
  ABOUT_PAGE_ROUTE,
  ROOT_PAGE_ROUTE,
  REPOS_LIST_PAGE_ROUTE,
} from '../shared/routes';

export default function App() {
  return (
    <Fragment>
      <Navigation />
      <Switch>
        <Route exact path={ROOT_PAGE_ROUTE} component={HomePage} />
        <Route exact path={ABOUT_PAGE_ROUTE} component={AboutPage} />
        <Route exact path={REPOS_LIST_PAGE_ROUTE} component={ReposPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Fragment>
  );
}
