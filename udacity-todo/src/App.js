import React from 'react';
import ConnectedTodos from './components/Todos';
import ConnectedGoals from './components/Goals';
import { connect } from 'react-redux';
import { handleRecieveData } from './actions/shared';

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleRecieveData());
  }

  render() {
    if (this.props.loading) {
      return <h1>Loading</h1>;
    }

    return (
      <div>
        <ConnectedTodos />
        <ConnectedGoals />
      </div>
    );
  }
}

export default connect((state) => ({
  loading: state.loading,
}))(App);
