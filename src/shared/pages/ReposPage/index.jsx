// @flow

import React from 'react';

import ReposList from './containers/ReposList';
import GetReposAsyncButton from './containers/GetReposAsyncButton';

type Props = {};

// eslint-disable-next-line react/prefer-stateless-function
export default class ReposListPage extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        <GetReposAsyncButton />
        <ReposList columnKeys={['name', 'id', 'stargazers_count', 'forks_count']} />
      </React.Fragment>
    );
  }
}
