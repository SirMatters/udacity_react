import React, { Component } from 'react';
import handleInitialData from '../actions/shared';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';
import NewTweet from './NewTweet';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    // return <div>{this.props.authedUser ? <Dashboard /> : <LoadingBar />}</div>;
    return <div>{this.props.authedUser ? <NewTweet /> : <LoadingBar />}</div>;
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(App);
