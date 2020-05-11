// TODO: add goals remove

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
    this.props.store.dispatch(handleDeleteTodo(todo));
  };

  toggleItem = (item) => {
    this.props.store.dispatch(toggleTodoAction(item.id));
    return API.saveTodoToggle(item.id).catch(() => {
      this.props.store.dispatch(toggleTodoAction(item.id));
      alert('Sth went wrong. Please, try again later');
    });
  };

  addItem = (e) => {
    e.preventDefault();

    return API.saveTodo(this.input.value)
      .then((todo) => {
        this.props.store.dispatch(addTodoAction(todo));
        this.input.value = '';
      })
      .catch(() => {
        alert('There was an error. Try again');
      });
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
class Goals extends React.Component {
  removeItem = (item) => {
    this.props.store.dispatch(removeGoalAction(item.id));
    return API.deleteGoal(item.id).catch(() => {
      this.props.store.dispatch(addGoalAction(item));
      alert('Error. Please try again');
    });
  };

  addItem = (e) => {
    e.preventDefault();

    return API.saveGoal(this.input.value)
      .then((item) => {
        this.store.dispatch(addGoalAction(item));
        this.input.value = '';
      })
      .catch(() => {
        alert('Sorry, there was an error. Try again');
      });
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

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;

    store.subscribe(() => this.forceUpdate());

    Promise.all([API.fetchTodos(), API.fetchGoals()]).then(([todos, goals]) => {
      store.dispatch(recieveDataAction(todos, goals));
    });
  }

  render() {
    const { store } = this.props;
    const { todos, goals, loading } = store.getState();

    if (loading) {
      return <h1>Loading</h1>;
    }

    return (
      <div>
        <Todos store={store} todos={todos} />
        <Goals store={store} goals={goals} />
      </div>
    );
  }
}

ReactDOM.render(<App store={store} />, document.getElementById('app'));
