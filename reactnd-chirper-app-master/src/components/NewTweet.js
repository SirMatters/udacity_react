import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddTweet } from '../actions/tweets';

class NewTweet extends Component {
  state = {
    text: '',
  };

  onChange = (e) => {
    const text = e.target.value;
    this.setState(() => ({ text }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAddTweet({ text, id }));

    this.setState(() => ({ text: '' }));

    // TODO: redirect to home view
  };

  render() {
    const { text } = this.state;

    const tweetLeft = 280 - text.length;
    return (
      <div>
        <h3 className='center'> Compose new tweet</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.onChange}
            className='textarea'
            maxLength={280}
          />
          {tweetLeft <= 100 && <div className='tweet-length'>{tweetLeft}</div>}
          <button className='btn' disabled={text === ''}>
            SUBMIT
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewTweet);
