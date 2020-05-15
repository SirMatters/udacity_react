export const SET_AUTHED_USER = 'SET_AUTHED_USER';

export const authedUser = (user) => ({
  type: AUTHED_USER,
  user,
});
