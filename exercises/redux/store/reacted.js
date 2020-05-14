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

const ConnectedTodos = connect((state) => ({
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

const ConnectedGoals = connect((state) => ({
  goals: state.goals,
}))(Goals);

class Provider extends React.Component {
  render() {
    return (
      <Context.Provider value={this.props.store}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

function connect(mapStateToProps) {
  return (Component) => {
    class ConnectedComponent extends React.Component {
      render() {
        console.log('in connected comp');
        return (
          <Context.Consumer>
            {(store) => <Receiver store={store} />}
          </Context.Consumer>
        );
      }
    }

    class Receiver extends React.Component {
      componentDidMount() {
        const { subscribe } = this.props.store;
        this.unsubscribe = subscribe(() => {
          this.forceUpdate();
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const { dispatch, getState } = this.props.store;
        const newProps = mapStateToProps(getState());
        return <Component {...newProps} dispatch={dispatch} />;
      }
    }
    console.log(`In func with ${Component}`);
    return ConnectedComponent;
  };
}

const Context = React.createContext();
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

const ConnectedApp = connect((state) => ({
  loading: state.loading,
}))(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('app')
);
