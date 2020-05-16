import { RECEIVE_TWEETS, TOGGLE_TWEET } from '../actions/tweets';

const tweets = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return { ...state, ...action.tweets };
    case TOGGLE_TWEET:
      return {
        ...state,
        [action.tweetId]: {
          ...state[action.tweetId],
          likes: action.hasLiked
            ? state[action.tweetId].likes.filter((u) => u !== action.authedUser)
            : [...state[action.tweetId].likes, action.authedUser],
        },
      };
    default:
      return state;
  }
};

export default tweets;
