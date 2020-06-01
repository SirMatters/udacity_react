import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class QuestionItem extends React.Component {
  render() {
    const { question, qid } = this.props;
    return (
      <Link to={`/questions/${qid}`} className='question-item'>
        {JSON.stringify(question)}
      </Link>
    );
  }
}

const mapStateToProps = ({ questions }, { qid }) => {
  const question = questions[qid];
  return { question, qid };
};

export default withRouter(connect(mapStateToProps)(QuestionItem));
