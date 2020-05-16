import { showLoading, hideLoading } from 'react-redux-loading';
import { saveLikeToggle, saveTweet } from '../utils/api';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const ADD_TWEET = 'ADD_TWEET';

export const receiveTweets = (tweets) => ({
  type: RECEIVE_TWEETS,
  tweets,
});

const toggleTweet = ({ id, authedUser, hasLiked }) => ({
  type: TOGGLE_TWEET,
  id,
  authedUser,
  hasLiked,
});

const addTweet = (tweet) => ({
  type: ADD_TWEET,
  tweet,
});

export const handleAddTweet = (text, replyingTo) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveTweet({ text, author: authedUser, replyingTo })
      .then((tweet) => {
        dispatch(addTweet(tweet));
        console.log('got data', tweet);
      })
      .then(() => dispatch(hideLoading()));
  };
};

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
