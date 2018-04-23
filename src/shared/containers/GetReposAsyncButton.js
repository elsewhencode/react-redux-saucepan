// @flow

import { connect, type MapDispatchToProps } from 'react-redux';

import { fetchReposList } from '../reducers/reposList';
import Button from '../components/Button';

const mapDispatchToProps: MapDispatchToProps<*, *, *> = (dispatch: Dispatch) => ({
  fetchReposList: () => {
    dispatch(fetchReposList());
  },
});

export default connect(null, mapDispatchToProps)(Button);
