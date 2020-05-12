const Context = React.createContext();

class App extends React.Component {
  render() {
    const name = 'Tyler';
    return (
      <Context.Provider value={name}>
        <Parent />
      </Context.Provider>
    );
  }
}

class Parent extends React.Component {
  render() {
    const name = 'Tyler';
    return (
      <div>
        <h1>Parent</h1>
        <Child />
      </div>
    );
  }
}

class Child extends React.Component {
  render() {
    return (
      <div>
        <h3>Child</h3>
        <GrandChild />
      </div>
    );
  }
}

class GrandChild extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {(name) => <h3>GrandChild name:{name}</h3>}
      </Context.Consumer>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
