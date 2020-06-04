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
        style={{ maxHeight: '50px' }}
      >
        <span className='mb-0 mr-auto'>
          {question.optionOne.text} or {question.optionTwo.text}
        </span>
        <div className='ml-auto'>
          <span className='user-info'>{author.name}</span>
          <img className='user-image' src={author.avatarURL} />
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
