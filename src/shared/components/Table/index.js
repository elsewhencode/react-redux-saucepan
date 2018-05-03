// @flow
import React, { Component, Fragment } from 'react';

import Loading from './../Loading';

// this coponent suppose to be a neutral table that renders any array of JSON based on give keys
// Because of its independecne it's placed in compoenent folder.
type Props = {
  // flow-disable-next-line
  data: { id: number }[],
  columnKeys: string[],
  loading: boolean,
  dataFetchedByServer: boolean,
  preLoadedDataIsViewd: () => mixed,
  fetchData: () => mixed,
};

export default class Table extends Component<Props> {
  componentDidMount() {
    const { dataFetchedByServer, fetchData } = this.props;

    // first time visiting this component, no need to fetch the data
    if (!dataFetchedByServer) {
      fetchData();
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
    const {
      data, loading, dataFetchedByServer, columnKeys,
    } = this.props;

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
              {columnKeys.map(column => <th key={column}> {column} </th>)}
            </tr>
          </thead>
          <tbody>
            {data.map(repoItem => (
              <tr key={repoItem.id}>
                {columnKeys.map(key => <td key={key}> {repoItem[key]} </td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}
