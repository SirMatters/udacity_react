import React from 'react';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/shared';

class Question extends React.Component {
  onClick = (e, qid) => {
    e.preventDefault();
    const { dispatch, authedUser } = this.props;
    dispatch(handleAnswerQuestion(authedUser, qid, e.target.id));
  };
  render() {
    const { question, qid, authedUser } = this.props;
    const { answers } = authedUser; // provide default value for keys

    return (
      <div className='question-display'>
        <h1>Would you rather?</h1>
        <div id='optionOne' className='' onClick={(e) => this.onClick(e, qid)}>
          {question.optionOne.text}
        </div>
        <div
          id='optionTwo'
          className='question-option'
          onClick={(e) => this.onClick(e, qid)}
        >
          {question.optionTwo.text}
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
