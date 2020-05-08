import React, { Component } from 'react';

class CreateNewUser extends Component {
  state = {
    newUser: {
      firstName: '',
      lastName: '',
      userName: '',
    },
  };

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState((currState) => ({
      newUser: {
        ...currState.newUser,
        [name]: value,
      },
    }));
  };

  fieldsNotFilled = () => {
    let total = 1;
    for (let i in this.state.newUser) {
      total *= this.state.newUser[i].length;
    }
    return total === 0;
  };

  onAddNewUser = (event) => {
    event.preventDefault();
    this.props.addNewUser(this.state.newUser);
  };

  render() {
    const { firstName, lastName, userName } = this.state.newUser;
    return (
      <form>
        <input
          type='text'
          placeholder='First Name'
          value={firstName || ''}
          onChange={this.handleInput}
          name='firstName'
        />
        <input
          type='text'
          placeholder='Last Name'
          value={lastName || ''}
          onChange={this.handleInput}
          name='lastName'
        />
        <input
          type='text'
          placeholder='UserName'
          value={userName || ''}
          onChange={this.handleInput}
          name='userName'
        />
        <button onClick={this.onAddNewUser} disabled={this.fieldsNotFilled()}>
          Add new user
        </button>
      </form>
    );
  }
}

export default CreateNewUser;
