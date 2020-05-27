export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';

export const authenticateUser = (uid) => ({
  type: AUTHENTICATE_USER,
  uid,
});
