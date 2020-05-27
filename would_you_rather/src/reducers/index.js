import { combineReducers } from 'redux';
import { questions } from './questions';
import { authedUser } from './authedUser';
import { searchString } from './searchString';
import { users } from './users';

const reducers = combineReducers({
  authedUser,
  users,
  questions,
  searchString,
});

export default reducers;
