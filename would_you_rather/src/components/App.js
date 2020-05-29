import React from 'react';
import { connect } from 'react-redux';
import { getInitialData } from '../actions/shared';

import Nav from './Nav';
import QuestionList from './QuestionList';
import Leaderboard from './Leaderboard';
import NewQuestion from './NewQuestion';
import Question from './Question';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(getInitialData());
  }

  render() {
    return (
      <div className='App'>
        <Nav />
        {this.props.authedUser ? (
          <div>
            {/* <QuestionList /> */}
            <Leaderboard />
            {/* <NewQuestion /> */}
            {/* <Question qid={'8xf0y6ziyjabvozdd253nd'} /> */}
          </div>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(App);
