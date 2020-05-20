const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log('Dispatching:', action.type);
  const newState = next(action);
  console.log('New state:', store.getState());
  console.groupEnd();
  return newState;
};

export default logger;
