// @flow

import React, { Fragment } from 'react';

import ReposList from './ReposList';
import GetReposAsyncButton from './GetReposAsyncButton';

type Props = {};

// eslint-disable-next-line react/prefer-stateless-function
export default class ReposListPage extends React.Component<Props> {
  render() {
    return (
      <Fragment>
        <ReposList />
        <GetReposAsyncButton />
      </Fragment>
    );
  }
}
