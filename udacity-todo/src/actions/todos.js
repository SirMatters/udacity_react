import API from 'goals-todos-api';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

const addTodoAction = (todo) => ({
  type: ADD_TODO,
  todo,
});

const removeTodoAction = (id) => ({
  type: REMOVE_TODO,
  id,
});

const toggleTodoAction = (id) => ({
  type: TOGGLE_TODO,
  id,
});

export function handleDeleteTodo(todo) {
  return (dispatch) => {
    dispatch(removeTodoAction(todo.id));

    return API.deleteTodo(todo.id).catch(() => {
      dispatch(addTodoAction(todo));
      alert('An error occured. Try again');
    });
  };
}

export function handleToggleTodo(todo) {
  return (dispatch) => {
    dispatch(toggleTodoAction(todo.id));
    return API.saveTodoToggle(todo.id).catch(() => {
      dispatch(toggleTodoAction(todo.id));
      alert('Sth went wrong. Please, try again later');
    });
  };
}

export function handleAddTodo(name, cb) {
  return (dispatch) => {
    API.saveTodo(name)
      .then((todo) => {
        dispatch(addTodoAction(todo));
        cb();
      })
      .catch(() => {
        alert('There was an error. Try again');
      });
  };
}
