import { RECEIVE_TWEETS, TOGGLE_TWEET } from '../actions/tweets';

const tweets = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return { ...state.tweets, ...action.tweets };
    case TOGGLE_TWEET:
      return '';
    default:
      return state;
  }
};

export default tweets;
