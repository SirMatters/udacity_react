import React from 'react';
import { connect } from 'react-redux';
import { getInitialData } from '../actions/shared';
import { authenticateUser } from '../actions/authedUser';

class App extends React.Component {
  componentDidMount() {
    //FIXME: remove auth from here
    this.props.dispatch(authenticateUser('placeholder'));
    this.props.dispatch(getInitialData());
  }

  render() {
    return (
      <div className='App'>
        {this.props.authedUser ? this.props.authedUser : 'please, login'}
      </div>
    );
  }
}
const mapStateToProps = ({ authedUser }) => ({ authedUser });

export default connect(mapStateToProps)(App);
