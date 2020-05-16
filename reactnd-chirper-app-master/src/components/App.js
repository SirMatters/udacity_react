import React, { Component } from 'react';
import handleInitialData from '../actions/shared';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return <div>{this.props.authedUser && <Dashboard />}</div>;
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(App);
