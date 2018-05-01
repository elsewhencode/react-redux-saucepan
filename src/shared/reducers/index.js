// @flow
import { combineReducers } from 'redux';

// importing reducers and their relavant types
import reposList, {
  type ReposListStateType,
  type ReposListReducerType,
} from './reposList';

// type of reducers combineReducers takes
type Parameters = {
  reposList: ReposListReducerType,
};

export type AppStateType = {
  reposList: ReposListStateType,
};

// more info on this:
// https://stackoverflow.com/questions/34106975/react-redux-router-uncaught-error-expected-the-reducer-to-be-a-function
const rootReducer: any => AppStateType = combineReducers(({
  reposList,
}: Parameters));

export default rootReducer;
