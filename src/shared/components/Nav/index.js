// @flow
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import {
  ROOT_PAGE_ROUTE,
  ABOUT_PAGE_ROUTE,
  REPOS_LIST_PAGE_ROUTE,
} from '../../routes';

const Navigation = (): React.Element<any> => (
  <ul>
    <li>
      <NavLink to={ROOT_PAGE_ROUTE}>Home</NavLink>
    </li>
    <li>
      <NavLink to={ABOUT_PAGE_ROUTE}>About</NavLink>
    </li>
    <li>
      <NavLink to={REPOS_LIST_PAGE_ROUTE}>Repo list</NavLink>
    </li>
  </ul>
);

export default Navigation;
