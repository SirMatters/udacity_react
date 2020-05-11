// App code
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

const RECEIVE_DATA = 'RECEIVE_DATA';

// action creators
const addTodoAction = (todo) => ({
  type: ADD_TODO,
  todo,
});

const removeTodoAction = (id) => ({
  type: REMOVE_TODO,
  id,
});

const toggleTodoAction = (id) => ({
  type: TOGGLE_TODO,
  id,
});

const addGoalAction = (goal) => ({
  type: ADD_GOAL,
  goal,
});

const removeGoalAction = (id) => ({
  type: REMOVE_GOAL,
  id,
});

const recieveDataAction = (todos, goals) => ({
  type: RECEIVE_DATA,
  todos,
  goals,
});

//ASYNC action creators

function handleDeleteTodo(todo) {
  return (dispatch) => {
    dispatch(removeTodoAction(todo.id));

    return API.deleteTodo(todo.id).catch(() => {
      dispatch(addTodoAction(todo));
      alert('An error occured. Try again');
    });
  };
}

function handleToggleTodo(todo) {
  return (dispatch) => {
    dispatch(toggleTodoAction(todo.id));
    return API.saveTodoToggle(todo.id).catch(() => {
      dispatch(toggleTodoAction(todo.id));
      alert('Sth went wrong. Please, try again later');
    });
  };
}

function handleAddTodo(name, cb) {
  return (dispatch) => {
    API.saveTodo(name)
      .then((todo) => {
        dispatch(addTodoAction(todo));
        cb();
      })
      .catch(() => {
        alert('There was an error. Try again');
      });
  };
}

function handleDeleteGoal(goal) {
  return (dispatch) => {
    dispatch(removeGoalAction(goal.id));
    return API.deleteGoal(goal.id).catch(() => {
      dispatch(addGoalAction(goal));
      alert('Error. Please try again');
    });
  };
}

function handleAddGoal(name, cb) {
  return (dispatch) => {
    API.saveGoal(name)
      .then((goal) => {
        dispatch(addGoalAction(goal));
        cb();
      })
      .catch(() => {
        alert('Sth went wrong. Try again later');
      });
  };
}

function handleRecieveData() {
  return (dispatch) => {
    Promise.all([API.fetchTodos(), API.fetchGoals()]).then(([todos, goals]) => {
      dispatch(recieveDataAction(todos, goals));
    });
  };
}

//
// MIDDLEWARE
//

const checker = (store) => (next) => (action) => {
  if (
    (action.type === ADD_TODO &&
      action.todo.name.toLowerCase().includes('bitcoin')) ||
    (action.type === ADD_GOAL &&
      action.goal.name.toLowerCase().includes('bitcoin'))
  ) {
    return alert('Nope, bad idea');
  }

  return next(action);
};

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log(`The action: ${action.type}`);
  const result = next(action);
  console.log(`The new state: ${JSON.stringify(store.getState())}`);
  console.groupEnd();

  return result;
};

const remindOnNewTodo = (store) => (next) => (action) => {
  if (action.type === ADD_TODO) {
    alert(`Dont forget to ${action.todo.name}`);
  }

  return next(action);
};

const cheerUpOnGoal = (store) => (next) => (action) => {
  if (action.type === ADD_GOAL) {
    alert("That's a great goal!");
  }

  return next(action);
};

const thunk = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch);
  }
  return next(action);
};

//
// REDUCERS
//

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.todo];
    case REMOVE_TODO:
      return state.filter((t) => t.id !== action.id);
    case TOGGLE_TODO:
      return state.map((t) => {
        return t.id !== action.id ? t : { ...t, complete: !t.complete };
      });
    case RECEIVE_DATA:
      return action.todos;
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return [...state, action.goal];
    case REMOVE_GOAL:
      return state.filter((g) => g.id !== action.id);
    case RECEIVE_DATA:
      return action.goals;
    default:
      return state;
  }
}

function loading(state = true, action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return false;
    default:
      return state;
  }
}

const store = Redux.createStore(
  Redux.combineReducers({
    todos,
    goals,
    loading,
  }),
  Redux.applyMiddleware(thunk, checker, logger)
);

store.subscribe(() => {
  const { goals, todos } = store.getState();

  document.getElementById('goals').innerHTML = '';
  document.getElementById('todos').innerHTML = '';

  goals.forEach((g) => addGoalToDom(g));
  todos.forEach((t) => addTodoToDOM(t));
});

// DOM code
function generateId() {
  return (
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
  );
}

function addTodo() {
  const input = document.getElementById('todo');
  const name = input.value;
  input.value = '';

  store.dispatch(addTodoAction({ id: generateId(), name, complete: false }));
}

function addGoal() {
  const input = document.getElementById('goal');
  const name = input.value;
  input.value = '';

  store.dispatch(addGoalAction({ id: generateId(), name }));
}

function toggleTodo(e) {
  const todoId = e.target.id.split('-')[2];
  store.dispatch(toggleTodoAction(todoId));
}

function removeTodo(e) {
  const todoId = e.target.id.split('-')[2];
  store.dispatch(removeTodoAction(todoId));
}

document.getElementById('todoBtn').addEventListener('click', addTodo);
document.getElementById('goalBtn').addEventListener('click', addGoal);

function addTodoToDOM(todo) {
  const node = document.createElement('li');
  const text = document.createTextNode(todo.name);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `cb-todo-${todo.id}`;
  checkbox.onclick = toggleTodo;

  const deleteButton = document.createElement('span');
  deleteButton.id = `rm-todo-${todo.id}`;
  deleteButton.innerText = ' X';
  deleteButton.style.color = 'red';
  deleteButton.addEventListener('click', removeTodo);

  node.appendChild(checkbox);
  node.appendChild(text);
  node.appendChild(deleteButton);

  if (todo.complete) {
    node.style.textDecoration = 'line-through';
    checkbox.checked = 'true';
  }

  document.getElementById('todos').appendChild(node);
}

function addGoalToDom(goal) {
  const node = document.createElement('li');
  const text = document.createTextNode(goal.name);
  node.appendChild(text);

  document.getElementById('goals').appendChild(node);
}
