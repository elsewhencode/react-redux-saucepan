// @flow
import axios from 'axios';

import type { RepoType } from '../../api';

// action constants
export const GET_REPOS_LIST_REQUEST: 'GET_REPOS_LIST_REQUEST' =
  'GET_REPOS_LIST_REQUEST';
export const GET_REPOS_LIST_SUCCESS: 'GET_REPOS_LIST_SUCCESS' =
  'GET_REPOS_LIST_SUCCESS';
export const GET_REPOS_LIST_FAILURE: 'GET_REPOS_LIST_FAILURE' =
  'GET_REPOS_LIST_FAILURE';
export const PRE_LOADED_DATA_IS_VIEWED: 'PRE_LOADED_DATA_IS_VIEWED' =
  'PRE_LOADED_DATA_IS_VIEWED';

export type ArrayOfReposType = RepoType[];
// Typing Redux state immutability by adding
// didn't use 'exact' for this reason https://github.com/facebook/flow/issues/2405
export type ReposListStateType = {
  +loading: boolean,
  +dataFetchedByServer: boolean,
  +error: ?string,
  +data: ArrayOfReposType,
};

// Using disjoint unions, Flow will be able to understand your reducers much better.
export type ReposListActionTypes =
  | {| +type: typeof GET_REPOS_LIST_REQUEST |}
  | {| +type: typeof PRE_LOADED_DATA_IS_VIEWED |}
  | {| +type: typeof GET_REPOS_LIST_SUCCESS, payload: RepoType[] |}
  | {| +type: typeof GET_REPOS_LIST_FAILURE, error: string |};

// FIXME: check if state is partial
type GetState = () => ReposListStateType;
type PromiseAction = Promise<ReposListActionTypes>;
type Dispatch = (
  action: ReposListActionTypes | PromiseAction | Array<ReposListActionTypes>,
) => any;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export const initialState: ReposListStateType = {
  loading: false,
  dataFetchedByServer: __SERVER__,
  error: null,
  data: [],
};

// Reducer type
export type ReposListReducerType = (
  ReposListStateType,
  action: ReposListActionTypes,
) => ReposListStateType;
// Reducer
const reducer: ReposListReducerType = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPOS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_REPOS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        // let client know data is preloaded by server and only for one time
        // there is no need to fetch again on componentDidMount
        // (preventing double fetch when you land on the page)
        dataFetchedByServer: __SERVER__, // Am i on server side?
        data: action.payload,
      };
    case PRE_LOADED_DATA_IS_VIEWED:
      return {
        ...state,
        dataFetchedByServer: false,
      };
    case GET_REPOS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;

// The thunk can be used to delay the dispatch of an action,
// The inner function receives the store methods dispatch and getState as parameters.
export function fetchReposList(org: string = 'facebook'): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: GET_REPOS_LIST_REQUEST });

    try {
      const { data }: { data: RepoType[] } = await axios.get(`https://api.github.com/orgs/${org}/repos`);

      dispatch({ type: GET_REPOS_LIST_SUCCESS, payload: data });
    } catch (error) {
      // sending generic error message
      dispatch({
        type: GET_REPOS_LIST_FAILURE,
        error: 'We cannot load the list of repos',
      });
    }
  };
}
export function preLoadedDataIsViewd(): ReposListActionTypes {
  return {
    type: PRE_LOADED_DATA_IS_VIEWED,
  };
}
