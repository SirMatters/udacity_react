import { SEARCH_QUESTIONS } from '../actions/searchString';

export const searchString = (state = '', action) => {
  switch (action.type) {
    case SEARCH_QUESTIONS:
      return action.searchString;
    default:
      return state;
  }
};
