const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log(`The action: ${action.type}`);
  const result = next(action);
  console.log(`The new state: ${JSON.stringify(store.getState())}`);
  console.groupEnd();

  return result;
};

export default logger;
