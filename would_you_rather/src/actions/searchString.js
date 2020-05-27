export const SEARCH_QUESTIONS = 'SEARCH_QUESTIONS';

export const searchQuestions = (searchString) => ({
  type: SEARCH_QUESTIONS,
  searchString,
});
