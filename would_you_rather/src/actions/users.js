/* 
users have the same actions as any event affects
both users and questions
*/
export const GET_USERS = 'GET_USERS';

export const getUsers = (users) => ({
  type: GET_USERS,
  users,
});
