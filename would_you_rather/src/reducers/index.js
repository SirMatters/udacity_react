import { combineReducers } from 'redux';
import { questions } from './questions';
import { authedUser } from './authedUser';
import { users } from './users';

const reducers = combineReducers({
  authedUser,
  users,
  questions,
});

export default reducers;
