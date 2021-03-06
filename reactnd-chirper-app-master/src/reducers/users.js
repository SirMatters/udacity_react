import { RECEIVE_USERS } from '../actions/users';

const tweets = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return { ...state.users, ...action.users };
    default:
      return state;
  }
};

export default tweets;
