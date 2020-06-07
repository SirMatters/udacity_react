import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class QuestionItem extends React.Component {
  render() {
    const { question, qid, author } = this.props;
    return (
      <Link
        to={`/questions/${qid}`}
        className='question-item d-flex align-items-center'
      >
        <span className='mb-0 mr-auto'>
          <span className='option-text-list'>{question.optionOne.text}</span>
          <span> or </span>
          <span className='option-text-list'>{question.optionTwo.text}</span>
        </span>
        <div className='ml-auto'>
          <span className='user-info'>{author.name}</span>
          <img alt='avatar' className='user-avatar' src={author.avatarURL} />
        </div>
      </Link>
    );
  }
}

const mapStateToProps = ({ questions, users }, { qid }) => {
  const question = questions[qid];
  const author = users[question.author];
  return { question, qid, author };
};

export default withRouter(connect(mapStateToProps)(QuestionItem));
