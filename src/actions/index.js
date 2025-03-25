import { launchSurvey } from "./launchSurvey.js";

export const addActions = (app) => {
  app.action('launch_survey', launchSurvey({ app }));
  return app;
}
