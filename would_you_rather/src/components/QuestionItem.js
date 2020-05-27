import React from 'react';
import { connect } from 'react-redux';

class QuestionItem extends React.Component {
  render() {
    const { question } = this.props;
    return <div className='question-item'>{JSON.stringify(question)}</div>;
  }
}

const mapStateToProps = ({ questions }, { id }) => {
  const question = questions[id];
  return { question };
};

export default connect(mapStateToProps)(QuestionItem);
