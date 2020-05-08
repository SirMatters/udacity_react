// library code
function createStore(reducer) {
  let state;
  let listeners = [];

  const getState = () => state;
  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((l) => l());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

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
  type: REMOVE_TODO,
  id,
});

const addGoal = (goal) => ({
  type: ADD_GOAL,
  goal,
});

const removeGoal = (id) => ({
  type: REMOVE_GOAL,
  id,
});

// reducer function
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.todo];
    case REMOVE_TODO:
      return state.filter((t) => t.id !== action.todo.id);
    case TOGGLE_TODO:
      return state.map((t) =>
        t.id !== action.todo.id ? todo : { ...t, complete: !t.complete }
      );
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return [...state, action.goal];
    case REMOVE_GOAL:
      return state.filter((g) => g.id !== action.goal.id);
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

const store = createStore(app);

store.subscribe(() => {
  console.log(`The new state is ${JSON.stringify(store.getState())}`);
});
