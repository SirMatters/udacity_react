import { GET_USERS, TOGGLE_ADDED, TOGGLE_ANSWERED } from '../actions/users';

export const users = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, ...action.users };
    case TOGGLE_ANSWERED:
      let newState = {
        ...state,
        [action.author]: {
          ...state[action.author],
          answers: {
            ...state[action.author].answers,
            [action.qid]: action.answer,
          },
        },
      };
      return newState;
    case TOGGLE_ADDED:
      let newQuestions = [...state[action.author].questions];
      if (newQuestions.includes(action.qid)) {
        // nullify question add in case of server err
        newQuestions = newQuestions.filter((qid) => qid !== action.qid);
      } else {
        newQuestions.push(action.qid);
      }

      return {
        ...state,
        [action.author]: {
          ...state[action.author],
          questions: newQuestions,
        },
      };
    default:
      return state;
  }
};
