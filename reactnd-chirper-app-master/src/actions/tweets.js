export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';

const receiveTweets = (tweets) => ({
  type: RECEIVE_TWEETS,
  tweets,
});

export default receiveTweets;
