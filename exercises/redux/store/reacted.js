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
  removeItem = (item) => {
    this.props.store.dispatch(removeTodoAction(item.id));
  };

  toggleTodo = (item) => {
    this.props.store.dispatch(toggleTodoAction(item.id));
  };

  addItem = (e) => {
    e.preventDefault();
    const name = this.input.value;
    this.input.value = '';

    this.props.store.dispatch(
      addTodoAction({ id: generateId(), name, complete: false })
    );
  };

  render() {
    return (
      <div>
        <h1>Items To Do</h1>
        <input type='text' ref={(input) => (this.input = input)} />
        <button onClick={this.addItem}>Add todo</button>
        <List
          toggle={this.toggleTodo}
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
  };

  addItem = (e) => {
    e.preventDefault();
    const name = this.input.value;
    this.input.value = '';

    this.props.store.dispatch(addGoalAction({ id: generateId(), name }));
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
    console.log(loading);

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
