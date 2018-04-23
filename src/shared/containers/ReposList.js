// @flow
import { connect, type MapStateToProps } from 'react-redux';

import { type ReposListStateType } from './../reducers/reposList';
import Table from './../components/Table';

const mapStateToProps: MapStateToProps<*, *, *> = ({
  reposList,
}: {
  reposList: ReposListStateType,
}): {} => ({
  reposList,
});

export default connect(mapStateToProps, {})(Table);
