const List = (props) => (
  <ul>
    {props.items.map((i) => (
      <li key={i.id}>
        <span
          onClick={() => props.toggle && props.toggle(i)}
          style={{ textDecoration: i.complete ? 'line-through' : 'none' }}
        >
          {i.name}
        </span>
        <button onClick={() => props.remove(i)}>X</button>
      </li>
    ))}
  </ul>
);

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

const ConnectedTodos = ReactRedux.connect((state) => ({
  todos: state.todos,
}))(Todos);

class Goals extends React.Component {
  removeItem = (goal) => {
    this.props.dispatch(handleDeleteGoal(goal));
  };

  addItem = (e) => {
    e.preventDefault();
    this.props.dispatch(
      handleAddGoal(this.input.value, () => (this.input.value = ''))
    );
  };

  render() {
    return (
      <div>
        <h1>Goals to achieve</h1>
        <input type='text' ref={(input) => (this.input = input)} />
        <button onClick={this.addItem}>Add Goal</button>
        <List items={this.props.goals} remove={this.removeItem} />
      </div>
    );
  }
}

const ConnectedGoals = ReactRedux.connect((state) => ({
  goals: state.goals,
}))(Goals);

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

const ConnectedApp = ReactRedux.connect((state) => ({
  loading: state.loading,
}))(App);

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <ConnectedApp />
  </ReactRedux.Provider>,
  document.getElementById('app')
);
