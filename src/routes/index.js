import addSurveys from './surveys/index.js';

export const addRoutes = (app, receiver) => {

  addSurveys(app, receiver)

  return receiver;
}
