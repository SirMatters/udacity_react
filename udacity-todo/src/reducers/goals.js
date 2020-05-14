import * as GoalsActions from '../actions/goals';

export default function goals(state = [], action) {
  switch (action.type) {
    case GoalsActions.ADD_GOAL:
      return [...state, action.goal];
    case GoalsActions.REMOVE_GOAL:
      return state.filter((g) => g.id !== action.id);
    case RECEIVE_DATA:
      return action.goals;
    default:
      return state;
  }
}
