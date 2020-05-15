export default logger = store = next = (action) => {
  console.group(action.type);
  console.log(`The action: ${action.type}`);
  const nextState = next(action);
  console.log(`The new state: ${store.getState()}`);
  console.groupEnd();
  return nextState;
};
