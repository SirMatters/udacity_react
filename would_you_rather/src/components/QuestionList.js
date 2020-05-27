import React from 'react';
import { connect } from 'react-redux';
import QuestionItem from './QuestionItem';

class QuestionList extends React.Component {
  render() {
    const { questionIds } = this.props;
    return (
      <ul className='qustion-list'>
        {questionIds.map((q) => (
          <li key={q}>
            <QuestionItem id={q} />
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = ({ questions, searchString }) => {
  return {
    questionIds: Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
      .filter((q) => questions[q].optionOne.text + questions[q].optionTwo.text),
  };
};

export default connect(mapStateToProps)(QuestionList);
