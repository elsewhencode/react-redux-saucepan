// @flow
import { connect } from 'react-redux';

import Table from '../../../components/Table';
import {
  preLoadedDataIsViewd,
  fetchReposList,
  type ArrayOfReposType,
} from './../reducer';
import type { AppStateType } from './../../../rootReducer';

// FIXME: waiting for the MapDispatchToProps to be fixed.
// link: https://github.com/flowtype/flow-typed/pull/2105
type MapStateToProps = AppStateType => {
  data: ArrayOfReposType,
  loading: boolean,
  dataFetchedByServer: boolean,
};

type DispatchStateToProps = Dispatch => {|
  preLoadedDataIsViewd: void => mixed,
  fetchData: void => mixed,
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
  fetchData: () => {
    dispatch(fetchReposList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
