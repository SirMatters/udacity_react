export const SET_AUTHED_USER = 'SET_AUTHED_USER';

const authedUser = (user) => ({
  type: SET_AUTHED_USER,
  user,
});

export default authedUser;
