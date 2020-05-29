import React from 'react';
import { connect } from 'react-redux';
import QuestionItem from './QuestionItem';
import { searchQuestions } from '../actions/searchString';

class QuestionList extends React.Component {
  // more options could be available later on
  state = { display: 'answered', searchString: '' };

  handleChange = (e) => {
    const option = e.target.value;
    this.setState({ display: option });
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({ searchString: e.target.value });
  };

  render() {
    const { questions, authedUser } = this.props;

    // check if answered or unanswered questions should be shown
    const shouldContain = this.state.display === 'answered';

    // we need full questions info to check if user has answered the question
    const questionIds = Object.keys(questions)
      .filter(
        (qid) =>
          [
            ...questions[qid].optionOne.votes,
            ...questions[qid].optionTwo.votes,
          ].includes(authedUser) === shouldContain &&
          (
            questions[qid].optionOne.text + questions[qid].optionTwo.text
          ).includes(this.state.searchString)
      )
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

    return (
      <div className='question-list'>
        <div className='list-controls'>
          <select
            name='display-type'
            value={this.state.value}
            onChange={this.handleChange}
          >
            <option value='answered'>My answered</option>
            <option value='not-answered'>Not answered</option>
          </select>
          <input
            type='text'
            paceholder='Search Questions'
            onChange={this.handleSearch}
            value={this.state.searchString}
          />
        </div>
        <ul className='qustions-display'>
          {questionIds.map((q) => (
            <li key={q}>
              <QuestionItem id={q} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ questions, authedUser, searchString }) => ({
  questions,
  authedUser,
});

export default connect(mapStateToProps)(QuestionList);
