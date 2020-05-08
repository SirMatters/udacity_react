import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CreateNewUser from './components/CreateNewUser';
import UserList from './components/UserList';

/*
This exercise will help you put together and practice all of the concepts you've
learned thus far. It will also help you form a strong foundational knowledge of
React and prepare you for your first project.

The instructions for this project are located in the `instructions.md` file.
*/

class App extends Component {
  state = {
    users: {},
  };

  handleAddNewUser = ({ firstName, lastName, userName }) => {
    if (this.state.users[userName]) {
      alert('User with such username already exists');
    } else {
      this.setState((currentState) => ({
        users: {
          ...currentState.users,
          [userName]: {
            firstName,
            lastName,
            gamesPlayed: 0,
          },
        },
      }));
    }
  };

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>ReactND - Coding Practice</h1>
        </header>
        <CreateNewUser addNewUser={this.handleAddNewUser} />
        <UserList {...this.state} />
      </div>
    );
  }
}

export default App;
