import { GET_DATA } from '../actions/users';

export const users = (state = {}, action) => {
  switch (action.type) {
    case GET_DATA:
      return { ...state, ...action.users };
    default:
      return state;
  }
};
