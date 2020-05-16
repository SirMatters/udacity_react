export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';
import { saveLikeToggle } from '../utils/helpers';

export const receiveTweets = (tweets) => ({
  type: RECEIVE_TWEETS,
  tweets,
});

const toggleTweet = ({ tweetId, authedUser, hasLiked }) => ({
  type: TOGGLE_TWEET,
  tweetId,
  authedUser,
  hasLiked,
});

export const handleToggleTweet = (info) => {
  return (dispatch) => {
    dispatch(toggleTweet(info));

    return saveLikeToggle(info).catch((err) => {
      console.warn('Error occured:', err);
      dispatch(toggleTweet(info));
      alert('Sorry, try again later ');
    });
  };
};
