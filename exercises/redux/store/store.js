// App code
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

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

// reducer function

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
    default:
      return state;
  }
}

const store = Redux.createStore(
  Redux.combineReducers({
    todos,
    goals,
  }),
  Redux.applyMiddleware(checker)
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
