// @flow
import React, { type Element } from 'react';

type Props = {
  reposList: {}[],
};

const Table = ({ reposList }: Props): Element<any> => (
  <table>
    <thead>
      <tr>{Object.keys(reposList[0] || {}).map(repoItemKey => <td>{repoItemKey}</td>)}</tr>
    </thead>
    <tbody>
      {reposList.map(repoItem => (
        <tr>{Object.keys(repoItem).map(repoItemKey => <td>{repoItem[repoItemKey]}</td>)}</tr>
      ))}
    </tbody>
  </table>
);

export default Table;
