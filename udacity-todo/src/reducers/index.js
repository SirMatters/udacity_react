import { CombineReducers } from 'redux';

import todos from './todos';
import goals from './goals';
import loading from './loading';

export default CombineReducers({
  loading,
  todos,
  goals,
});
