import React from 'react';
import { connect } from 'react-redux';
import {
  handleAddTodo,
  handleDeleteTodo,
  handleToggleTodo,
} from '../actions/todos';
import List from '../components/List';

class Todos extends React.Component {
  removeItem = (todo) => {
    this.props.dispatch(handleDeleteTodo(todo));
  };

  toggleItem = (todo) => {
    this.props.dispatch(handleToggleTodo(todo));
  };

  addItem = (e) => {
    e.preventDefault();
    this.props.dispatch(
      handleAddTodo(this.input.value, () => (this.input.value = ''))
    );
  };

  render() {
    return (
      <div>
        <h1>Items To Do</h1>
        <input type='text' ref={(input) => (this.input = input)} />
        <button onClick={this.addItem}>Add todo</button>
        <List
          toggle={this.toggleItem}
          remove={this.removeItem}
          items={this.props.todos}
        />
      </div>
    );
  }
}

export default connect((state) => ({
  todos: state.todos,
}))(Todos);
