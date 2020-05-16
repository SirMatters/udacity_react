import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets';

const tweets = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return { ...state, ...action.tweets };
    case ADD_TWEET:
      const { tweet } = action;

      let replyingTo = {};
      if (tweet.replyingTo !== null) {
        replyingTo = {
          [tweet.replyingTo]: {
            ...state[tweet.replyingTo],
            replies: state[tweet.replyTo].replies.concat([tweet.id]),
          },
        };
      }
      return {
        ...state,
        [action.tweet.id]: action.tweet,
        ...replyingTo,
      };
    case TOGGLE_TWEET:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes: action.hasLiked
            ? state[action.id].likes.filter((u) => u !== action.authedUser)
            : [...state[action.id].likes, action.authedUser],
        },
      };
    default:
      return state;
  }
};

export default tweets;
