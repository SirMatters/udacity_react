import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatTweet } from '../utils/helpers';

class Tweet extends Component {
  render() {
    return <div className='tweet'></div>;
  }
}

function mapStateToProps({ authedUser, tweets, users }, { id }) {
  const tweet = tweets[id];

  return {
    authedUser,
    tweet: formatTweet(tweet, users[tweet.author], authedUser),
  };
}

export default connect(mapStateToProps)(Tweet);
