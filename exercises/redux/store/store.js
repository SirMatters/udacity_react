function createStore {
  let state;
  let listeners = [];

  const getStore = () => store
  const subscribe = (listener) => {
    listeners.push(listener)

    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  return {
    getStore,
    subscribe
  } 
}