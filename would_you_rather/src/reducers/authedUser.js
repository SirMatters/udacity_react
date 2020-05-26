import { AUTHENTICATE_USER } from '../actions/authedUser';

export const authedUser = (state = null, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return action.uid;
    default:
      state;
  }
};
