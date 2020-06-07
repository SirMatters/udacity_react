import {
  GET_QUESTIONS,
  ADD_QUESTION,
  ANSWER_QUESTION,
  NULLIFY_ANSWER,
} from '../actions/questions';

export const questions = (state = {}, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return { ...state, ...action.questions };
    case ADD_QUESTION:
      const { question } = action;
      return { ...state, [question.id]: question };
    case ANSWER_QUESTION:
      const { qid, answer, author } = action;
      // for optimistic update add if answer is passed
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: [...state[qid][answer].votes, author],
          },
        },
      };
    case NULLIFY_ANSWER:
      return nullifyAnswer(state, qid, author);
    default:
      return state;
  }
};

function nullifyAnswer(state, qid, author) {
  const answeredOption = state[qid].optionOne.votes.includes(author)
    ? 'optionOne'
    : 'optionTwo';
  return {
    ...state,
    [qid]: {
      ...state[qid],
      [answeredOption]: {
        ...state[qid][answeredOption],
        votes: [...state[qid][answeredOption].votes].filter(
          (e) => e !== author
        ),
      },
    },
  };
}
