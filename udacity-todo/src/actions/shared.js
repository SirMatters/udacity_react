import API from 'goals-todos-api';

export const RECEIVE_DATA = 'RECEIVE_DATA';

const recieveDataAction = (todos, goals) => ({
  type: RECEIVE_DATA,
  todos,
  goals,
});

export function handleRecieveData() {
  return (dispatch) => {
    Promise.all([API.fetchTodos(), API.fetchGoals()]).then(([todos, goals]) => {
      dispatch(recieveDataAction(todos, goals));
    });
  };
}
