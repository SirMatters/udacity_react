/* 
users have the same actions as any event affects
both users and questions
*/
export const GET_DATA = 'GET_DATA';

export const getUsers = (users) => ({
  type: GET_DATA,
  users,
});
