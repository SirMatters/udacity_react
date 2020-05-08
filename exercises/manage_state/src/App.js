import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Game';
import Score from './Score';

class App extends Component {
  state = {
    numCorrect: 0,
    numQuestions: 0,
  };

  handleAnswer = (isTrue) => {
    this.setState((currentState) => ({
      numCorrect: isTrue ? ++currentState.numCorrect : currentState.numCorrect,
      numQuestions: ++currentState.numQuestions,
    }));
  };

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>ReactND - Coding Practice</h1>
        </header>
        <Game onAnswer={this.handleAnswer} />
        <Score {...this.state} />
      </div>
    );
  }
}

export default App;
