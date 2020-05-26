import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getInitialData } from '../actions/shared';

import Nav from './Nav';
import List from './List';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(getInitialData());
  }

  render() {
    return (
      <div className='App'>
        {this.props.authedUser ? (
          <Fragment>
            <Nav />
            <List items={[1, 2]} />
          </Fragment>
        ) : (
          'please, auth'
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(App);
