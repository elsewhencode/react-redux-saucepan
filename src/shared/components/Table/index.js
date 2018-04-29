// @flow
import React, { Component, Fragment } from 'react';

import Loading from './../Loading';
import type { RepoType } from '../../reducers/reposList';

// // FIXME: there is a flow-typed issue that gives flow error per each defined prop type here
type Props = {
  data: RepoType[],
  loading: boolean,
  dataFetchedByServer: boolean,
  preLoadedDataIsViewd: () => mixed,
  fetchReposList: () => mixed,
};

export default class Table extends Component<Props> {
  componentDidMount() {
    const { dataFetchedByServer, fetchReposList } = this.props;

    // first time visiting this component, no need to fetch the data
    if (!dataFetchedByServer) {
      fetchReposList();
    }
  }

  componentWillUnmount() {
    const { preLoadedDataIsViewd, dataFetchedByServer } = this.props;

    // serverside renedered data is old now, next time it will be fetched by client
    if (dataFetchedByServer) {
      preLoadedDataIsViewd();
    }
  }

  render() {
    const { data, loading, dataFetchedByServer } = this.props;

    return (
      <Fragment>
        <p>
          Component and its data were served by{' '}
          {dataFetchedByServer ? 'server ' : 'client '}. Data fetch did{' '}
          {dataFetchedByServer ? ' not' : ''} happen on componentDidMount
        </p>

        {loading && <Loading />}
        <table border="1">
          <thead>
            <tr>
              <td>name</td>
              <td>id</td>
              <td>stars</td>
              <td>forks</td>
            </tr>
          </thead>
          <tbody>
            {data.map(repoItem => (
              <tr key={repoItem.id}>
                <td>{repoItem.name}</td>
                <td>{repoItem.id}</td>
                <td>{repoItem.stargazers_count}</td>
                <td>{repoItem.forks_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}
