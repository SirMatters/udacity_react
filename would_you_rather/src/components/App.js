import React from 'react';
import { connect } from 'react-redux';
import { getInitialData } from '../actions/shared';

import Nav from './Nav';
import QuestionList from './QuestionList';
import LeaderBoard from './LeaderBoard';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(getInitialData());
  }

  render() {
    return (
      <div className='App'>
        <Nav />
        {/* <QuestionList /> */}
        <LeaderBoard />
      </div>
    );
  }
}
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(App);
