import React, { Component } from 'react';

class Game extends Component {
  constructor(props) {
    super(props);
    const gameObj = this.startNewGame();
    this.state = gameObj;
    console.log(this.props);
  }
  handleAnswer = (e) => {
    let ans = e.target.getAttribute('istrue');
    if (
      (ans === 'true' &&
        this.state.value1 + this.state.value2 + this.state.value3 ===
          this.state.proposedAnswer) ||
      (ans === 'false' &&
        this.state.value1 + this.state.value2 + this.state.value3 !==
          this.state.proposedAnswer)
    ) {
      this.props.onAnswer(true);
    } else {
      this.props.onAnswer(false);
    }
    this.setState(this.startNewGame());
  };

  startNewGame = () => {
    let value1 = Math.floor(Math.random() * 10);
    let value2 = Math.floor(Math.random() * 10);
    let value3 = Math.floor(Math.random() * 10);
    let proposedAnswer =
      Math.floor(Math.random() * 3) + value1 + value2 + value3;
    console.log(proposedAnswer);
    return { value1, value2, value3, proposedAnswer };
  };

  render() {
    return (
      <div className='game'>
        <h2>Mental Math</h2>
        <div className='equation'>
          <p className='text'>{`${this.state.value1} + ${this.state.value2} + ${this.state.value3} = ${this.state.proposedAnswer}`}</p>
        </div>
        <button onClick={this.handleAnswer} istrue='true'>
          True
        </button>
        <button onClick={this.handleAnswer} istrue='false'>
          False
        </button>
        {/* <Score /> */}
      </div>
    );
  }
}

export default Game;
