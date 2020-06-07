import React from 'react';
import { connect } from 'react-redux';
import QuestionItem from './QuestionItem';

class QuestionList extends React.Component {
  // more options could be available later on
  state = { display: 'not-answered', searchString: '' };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ display: value });
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
        <div className='list-controls input-group mt-4'>
          <select
            name='display-type'
            value={this.state.display}
            onChange={this.handleChange}
            className='form-control'
          >
            <option value='answered'>My answered</option>
            <option value='not-answered'>Not answered</option>
          </select>
          <input
            type='text'
            placeholder='Search Questions'
            onChange={this.handleSearch}
            value={this.state.searchString}
            className='form-control w-75'
          />
        </div>
        <ul className='list-group mt-2'>
          {questionIds.map((qid) => (
            <li
              className=' list-group-item my-1 list-group-item-light rounded box-shadow'
              key={qid}
            >
              <QuestionItem qid={qid} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ questions, authedUser }) => ({
  questions,
  authedUser,
});

export default connect(mapStateToProps)(QuestionList);
