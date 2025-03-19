import addSurveys from './surveys/index.js';

export const addRoutes = (receiver) => {

  addSurveys(receiver)

  return receiver;
}
