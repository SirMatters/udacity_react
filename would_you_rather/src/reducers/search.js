import { SEARCH_QUESTIONS } from '../actions/search';

export const searchString = (state = null, action) => {
  switch (action.type) {
    case SEARCH_QUESTIONS:
      return action.searchString;
    default:
      return state;
  }
};
