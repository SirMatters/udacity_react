import React from 'react';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/shared';

class Question extends React.Component {
  state = {
    answer: '',
  };

  componentDidMount() {
    const { authedUser } = this.props;
    const { optionOne, optionTwo } = this.props.question;
    if (optionOne.votes.includes(authedUser)) {
      this.setState({ answer: 'optionOne' });
    }
    if (optionTwo.votes.includes(authedUser)) {
      this.setState({ answer: 'optionTwo' });
    }
  }

  onClick = (e, qid) => {
    e.preventDefault();
    const { dispatch, authedUser } = this.props;
    //TODO: ask mentor if it is a good practice or should be done as conditional dispatch? If voting is possible not from one component, it could be bad?
    dispatch(handleAnswerQuestion(authedUser, qid, e.target.id));
    this.setState({ answer: e.target.id });
  };
  render() {
    const { question, qid } = this.props;
    const totalAnswers = [
      ...question.optionOne.votes,
      ...question.optionTwo.votes,
    ].length;
    // TODO: ask mentor is it a good approach to define classes of chosen answer this way?

    let optionOneClass = 'question-option';
    let optionTwoClass = 'question-option';
    if (this.state.answer === 'optionOne') {
      optionOneClass += ' chosen';
      optionTwoClass += ' dismissed';
    } else if (this.state.answer === 'optionTwo') {
      optionTwoClass += ' chosen';
      optionOneClass += ' dismissed';
    }

    return (
      <div className='question-display '>
        <h1>Would you rather?</h1>
        <div className='option-container'>
          <button
            id='optionOne'
            className={optionOneClass}
            onClick={(e) => this.onClick(e, qid)}
            disabled={this.state.answer ? true : false}
          >
            {question.optionOne.text}
          </button>
          <button
            id='optionTwo'
            className={optionTwoClass}
            onClick={(e) => this.onClick(e, qid)}
            disabled={this.state.answer ? true : false}
          >
            {question.optionTwo.text}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ questions, authedUser }, props) => {
  const { qid } = props.match.params;
  const question = questions[qid];
  return { question, authedUser, qid };
};

export default connect(mapStateToProps)(Question);
