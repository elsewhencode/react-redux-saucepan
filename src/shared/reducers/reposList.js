// @flow
import get from './../../utils/apiCall';

// action constants
export const GET_REPOS_LIST_REQUEST: 'GET_REPOS_LIST_REQUEST' = 'GET_REPOS_LIST_REQUEST';
export const GET_REPOS_LIST_SUCCESS: 'GET_REPOS_LIST_SUCCESS' = 'GET_REPOS_LIST_SUCCESS';
export const GET_REPOS_LIST_FAILURE: 'GET_REPOS_LIST_FAILURE' = 'GET_REPOS_LIST_FAILURE';

// Typing Redux state immutability by adding +

export type RepoType = {
  +name: string,
  +id: number,
};

// didn't use 'exact' for this reason https://github.com/facebook/flow/issues/2405
export type ReposListStateType = {
  +loading: boolean,
  +loaded: boolean,
  +error: ?string,
  +reposList: RepoType[],
};

// Using disjoint unions, Flow will be able to understand your reducers much better.
export type ReposListActionTypes =
  | {| +type: typeof GET_REPOS_LIST_REQUEST |}
  | {| +type: typeof GET_REPOS_LIST_SUCCESS, payload: RepoType[] |}
  | {| +type: typeof GET_REPOS_LIST_FAILURE, error: string |};

// FIXME: check if state is partial
type GetState = () => ReposListStateType;
type PromiseAction = Promise<ReposListActionTypes>;
type Dispatch = (action: ReposListActionTypes | PromiseAction | Array<ReposListActionTypes>) => any;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export const initialState: ReposListStateType = {
  loading: false,
  loaded: false,
  error: null,
  reposList: [],
};

// Reducer
export default function reducer(
  state: ReposListStateType = initialState,
  action: ReposListActionTypes,
): ReposListStateType {
  switch (action.type) {
    case GET_REPOS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case GET_REPOS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        reposList: action.payload,
      };
    case GET_REPOS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
}

// The thunk can be used to delay the dispatch of an action,
// The inner function receives the store methods dispatch and getState as parameters.
export function fetchReposList(): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: GET_REPOS_LIST_REQUEST });

    try {
      const { body } = await get('/api/chart');
      dispatch({ type: GET_REPOS_LIST_SUCCESS, payload: body });
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      // sending generic error message
      dispatch({
        type: GET_REPOS_LIST_FAILURE,
        error: 'We cannot load the list of repos',
      });
    }
  };
}
