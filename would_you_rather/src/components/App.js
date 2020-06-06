import React from 'react';
import { connect } from 'react-redux';
import { getInitialData } from '../actions/shared';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import QuestionList from './QuestionList';
import Leaderboard from './Leaderboard';
import NewQuestion from './NewQuestion';
import Question from './Question';
import Login from './Login';
import FourORour from './FourOFour';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(getInitialData());
  }

  render() {
    return (
      <Router>
        <div className='app'>
          {this.props.authedUser ? (
            <div>
              <Nav />
              <div className='container'>
                <Switch>
                  <Route path='/' exact component={QuestionList} />
                  <Route path='/leaderboard' component={Leaderboard} />
                  <Route path='/new' component={NewQuestion} />
                  <Route path='/questions/:qid' component={Question} />
                  <Route component={FourORour} />
                </Switch>
              </div>
            </div>
          ) : (
            <Login />
          )}
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(App);
