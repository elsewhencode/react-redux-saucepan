// @flow
import { combineReducers } from 'redux';

// importing reducers and their relavant types
import type {
  ReposListStateType,
  // fixme: this type comes as undefined
  // ReposListReducerType,
} from './pages/ReposPage/reducer';
import reposList from './pages/ReposPage/reducer';

// type of reducers combineReducers takes
type Parameters = {
  reposList: any, // fixme: this shouldnt be any
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
