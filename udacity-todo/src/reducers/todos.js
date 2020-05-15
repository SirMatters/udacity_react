import * as TodoActions from '../actions/todos';
import { RECEIVE_DATA } from '../actions/shared';

export default function todos(state = [], action) {
  switch (action.type) {
    case TodoActions.ADD_TODO:
      return [...state, action.todo];
    case TodoActions.REMOVE_TODO:
      return state.filter((t) => t.id !== action.id);
    case TodoActions.TOGGLE_TODO:
      return state.map((t) => {
        return t.id !== action.id ? t : { ...t, complete: !t.complete };
      });
    case RECEIVE_DATA:
      return action.todos;
    default:
      return state;
  }
}
