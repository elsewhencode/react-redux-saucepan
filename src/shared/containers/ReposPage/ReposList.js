// @flow
import { connect } from 'react-redux';

import Table from '../../components/Table';
import {
  preLoadedDataIsViewd,
  type RepoType,
  fetchReposList,
} from './../../reducers/reposList';
import type { AppStateType } from './../../reducers';

// FIXME: waiting for the MapDispatchToProps to be fixed.
// link: https://github.com/flowtype/flow-typed/pull/2105
type MapStateToProps = AppStateType => {
  data: RepoType[],
  loading: boolean,
  dataFetchedByServer: boolean,
};

type DispatchStateToProps = Dispatch => {|
  preLoadedDataIsViewd: void => mixed,
  fetchReposList: void => mixed,
|};

// mapStateToProps of type MapStateToProps,
const mapStateToProps: MapStateToProps = ({
  reposList: { data, loading, dataFetchedByServer },
}) => ({
  data,
  loading,
  dataFetchedByServer,
});

// mapDispatchToProps of type DispatchStateToProps,
const mapDispatchToProps: DispatchStateToProps = (dispatch: Dispatch) => ({
  preLoadedDataIsViewd: () => {
    dispatch(preLoadedDataIsViewd());
  },
  fetchReposList: () => {
    dispatch(fetchReposList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
