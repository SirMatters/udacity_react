import React from 'react';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/shared';
import { roundNumber } from '../utils/utils';
import { Redirect } from 'react-router-dom';

class Question extends React.Component {
  state = {
    // style class for options
    optionOne: ['question-option'],
    optionTwo: ['question-option'],
  };

  componentDidMount() {
    const { authedUser } = this.props;
    if (this.props.question) {
      const { optionOne, optionTwo } = this.props.question;
      if ([...optionOne.votes, ...optionTwo.votes].includes(authedUser)) {
        const [chosenOption, dismissedOption] = optionOne.votes.includes(
          authedUser
        )
          ? ['optionOne', 'optionTwo']
          : ['optionTwo', 'optionOne'];
        this.setState((prevState) => ({
          ...prevState,
          [chosenOption]: [...prevState[chosenOption], 'chosen'],
          [dismissedOption]: [...prevState[dismissedOption], 'dismissed'],
        }));
      }
    }
  }

  handleMouseEnter = (hoveredOption) => {
    // run only if not voted yet
    if (!this.props.isAnswered) {
      const nonHoveredOption =
        hoveredOption === 'optionOne' ? 'optionTwo' : 'optionOne';
      this.setState((prevState) => ({
        [nonHoveredOption]: [...prevState[nonHoveredOption], 'no-hover'],
        [hoveredOption]: [...prevState[hoveredOption], 'hover'],
      }));
    }
  };

  handleMouseLeave = () => {
    const { optionOne, optionTwo } = this.state;
    // clear hover and no-hover class on both options when leave
    this.setState({
      optionOne: [...optionOne].filter(
        (c) => !['hover', 'no-hover'].includes(c)
      ),
      optionTwo: [...optionTwo].filter(
        (c) => !['hover', 'no-hover'].includes(c)
      ),
    });
  };

  onClick = (chosenOption, qid) => {
    const { dispatch, authedUser, isAnswered } = this.props;
    /* TODO: ask mentor
    here I do not use conditional dispatch to check if a uses has already answered the question
    is it the best approach or conditional dispatching is preferable?
    The only potential issue I see - more code typing if voting could be done not from the only one component
    */

    if (!isAnswered) {
      dispatch(handleAnswerQuestion(authedUser, qid, chosenOption));
      const dismissedOption =
        chosenOption === 'optionOne' ? 'optionTwo' : 'optionOne';

      this.setState((prevState) => ({
        [chosenOption]: [...prevState[chosenOption], 'chosen'],
        [dismissedOption]: [...prevState[dismissedOption], 'dismissed'],
      }));
    }
  };

  render() {
    const { question, qid, author, authedUser } = this.props;

    if (!question) {
      return <Redirect to='/not_found' />;
    }

    const isAnswered = [
      ...question.optionOne.votes,
      ...question.optionTwo.votes,
    ].includes(authedUser);

    const totalAnswers = [
      ...question.optionOne.votes,
      ...question.optionTwo.votes,
    ].length;
    const optionOneAnswers = roundNumber(
      (question.optionOne.votes.length / totalAnswers) * 100,
      1
    );

    const optionTwoAnswers = roundNumber(
      (question.optionTwo.votes.length / totalAnswers) * 100,
      1
    );

    /* TODO: ask mentor:
    is it a good approach to define classes within state like it is done in the component so it will be more React-way?
    if so, is the best implementation chosen?
    */
    return (
      <div className='question-display d-flex flex-column'>
        <h1>Would you rather?</h1>
        <div className='author-info ml-auto mr-auto'>
          <span>by </span>
          <span className='user-info'>
            {author.name}
            <img
              alt='avatar'
              className='user-avatar'
              src={author.avatarURL}
            ></img>
          </span>
        </div>
        <div className='option-container'>
          <div
            className={this.state.optionOne.join(' ')}
            onClick={() => this.onClick('optionOne', qid)}
            onMouseEnter={() => this.handleMouseEnter('optionOne')}
            onMouseLeave={this.handleMouseLeave}
          >
            <p>{question.optionOne.text}</p>
            {isAnswered ? (
              <p className='vote-info'>
                {question.optionOne.votes.length}({optionOneAnswers}%)
              </p>
            ) : null}
          </div>
          <div
            className={this.state.optionTwo.join(' ')}
            onClick={() => this.onClick('optionTwo', qid)}
            onMouseEnter={() => this.handleMouseEnter('optionTwo')}
            onMouseLeave={this.handleMouseLeave}
          >
            <p>{question.optionTwo.text}</p>
            {isAnswered ? (
              <p className='vote-info'>
                {question.optionTwo.votes.length}({optionTwoAnswers}%)
              </p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { qid } = props.match.params;
  const question = questions[qid];
  let author = '';
  if (question) {
    author = users[question.author];
  }
  /*TODO: ask mentor:
  as connect() function basically creates a container component
  is it a good approach to perform value computations within the function
  so the component itself will be more 'display' - like ?
  */
  return {
    question,
    authedUser,
    qid,
    author,
  };
};

export default connect(mapStateToProps)(Question);
