import React, { Component } from 'react';
import User from './User';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = { displayGames: true };
  }

  toggleGamesShow = () => {
    this.setState((currentState) => ({
      displayGames: !currentState.displayGames,
    }));
  };
  render() {
    const { users } = this.props;
    const displayUsers = [];
    for (let u in users) {
      displayUsers.push({ userName: u, ...users[u] });
    }
    return (
      <ul>
        <button onClick={this.toggleGamesShow}>
          {this.state.displayGames ? 'Hide games' : 'Show games'}
        </button>
        {displayUsers.map((u) => (
          <li key={u.userName}>
            <User {...u} displayGames={this.state.displayGames} />
          </li>
        ))}
      </ul>
    );
  }
}

export default UserList;
