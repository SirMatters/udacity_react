/* 
users have the same actions as any event affects
both users and questions
*/
export const GET_USERS = 'GET_USERS';
export const TOGGLE_ADDED = 'TOGGLE_ADDED';
export const TOGGLE_ANSWERED = 'TOGGLE_ANSWERED';

export const getUsers = (users) => ({
  type: GET_USERS,
  users,
});

// toggle user state
// toggle in case if nullify will be allowed
// or it will be allowed to delete posted question
export const toggleAnswered = ({ author, qid, answer }) => ({
  type: TOGGLE_ANSWERED,
  author,
  qid,
  answer,
});

export const toggleAdded = ({ author, qid }) => ({
  type: TOGGLE_ADDED,
  author,
  qid,
});
