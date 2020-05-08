function createStore {
  let store = {}
  const getStore = () => store
  return {
    getStore
  } 
}