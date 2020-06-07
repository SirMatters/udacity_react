import {
  getQuestions,
  addQuestion,
  answerQuestion,
  nullifyAnswer,
} from './questions';
import {
  _getUsers,
  _saveQuestion,
  _getQuestions,
  _saveQuestionAnswer,
} from '../utils/_DATA';
import { getUsers } from './users';
import { authenticateUser } from './authedUser';

const authId = 'sarahedo';

export const getInitialData = () => {
  return (dispatch) => {
    Promise.all([_getQuestions(), _getUsers()])
      .then((res) => {
        dispatch(getQuestions(res[0]));
        dispatch(getUsers(res[1]));
        // dispatch(authenticateUser(authId));
      })
      .catch((err) => {
        console.error(err);
        alert('Sth went wrong. Please reload the page');
      });
  };
};

export const handleAddQuestion = (optionOneText, optionTwoText, author) => {
  return (dispatch) => {
    _saveQuestion(optionOneText, optionTwoText, author)
      .then((question) => {
        dispatch(addQuestion(question)); // for both users and questions reducers
      })
      .catch((err) => {
        alert(
          'Sorry, the question could not be added. Please try again later.'
        );
        console.error(err);
      });
  };
};

export const handleAnswerQuestion = (author, qid, answer) => {
  return (dispatch) => {
    dispatch(answerQuestion(author, qid, answer));
    _saveQuestionAnswer({ authedUser: author, qid, answer }).catch((err) => {
      console.error(err);
      dispatch(nullifyAnswer(author, qid));
    });
  };
};
