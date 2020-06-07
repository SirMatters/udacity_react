export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';
export const NULLIFY_ANSWER = 'NULLIFY_ANSWER';

export const getQuestions = (questions) => ({
  type: GET_QUESTIONS,
  questions,
});

export const answerQuestion = (author, qid, answer) => ({
  type: ANSWER_QUESTION,
  qid,
  answer,
  author,
});

export const addQuestion = (question) => ({
  type: ADD_QUESTION,
  question,
});

// to make the flow convenient
// in future change answer may be allowed
export const nullifyAnswer = (author, qid) => ({
  type: NULLIFY_ANSWER,
  qid,
  author,
});
