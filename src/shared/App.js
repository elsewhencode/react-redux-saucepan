// @flow
import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';

import NotFoundPage from './pages/NotFoundPage';
import ReposListPage from './pages/ReposListPage';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import Navigation from './components/Nav';

import { ABOUT_PAGE_ROUTE, ROOT_PAGE_ROUTE, REPOS_LIST_PAGE_ROUTE } from '../shared/routes';

export default function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path={ROOT_PAGE_ROUTE} component={HomePage} />
        <Route exact path={ABOUT_PAGE_ROUTE} component={AboutPage} />
        <Route exact path={REPOS_LIST_PAGE_ROUTE} component={ReposListPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
