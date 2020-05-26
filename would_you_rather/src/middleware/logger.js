export const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log(`Action: ${action.type}`);
  const nextState = next(action);
  console.log(`Next state: ${store.getState()}`);
  console.groupEnd();
  return nextState;
};
