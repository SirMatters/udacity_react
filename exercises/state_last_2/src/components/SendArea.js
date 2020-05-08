import React, { Component } from 'react';

class SendArea extends Component {
  constructor(props) {
    super(props);
    this.state = { msg: '' };
  }

  isDisabled = () => {
    return this.state.msg === '';
  };

  handleChange = (e) => {
    const msg = e.target.value;
    this.setState((currState) => ({
      msg,
    }));
  };

  onNewMsg = (e) => {
    e.preventDefault();
    this.props.onNewMsg(this.state.msg);
    this.setState({ msg: '' });
  };

  render() {
    return (
      <div>
        <form className='input-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Enter your message...'
            onChange={this.handleChange}
            value={this.state.msg}
          />
          <div className='input-group-append'>
            <button
              className='btn submit-button'
              onClick={this.onNewMsg}
              disabled={this.isDisabled()}
            >
              SEND
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SendArea;
