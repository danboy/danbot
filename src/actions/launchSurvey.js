import {getSurveysFromCache} from "../services/index.js";

export const launchSurvey = ({app}) => {
  return async ({ body, action, ack, say }) => {
    await ack();
    const surveys = await getSurveysFromCache();
    const current_channel = body.channel;
    const command = {
      user_id: body.user.id,
      channel_id: body.channel.id,
      trigger_id: body.trigger_id,
    };
    const surveyId = action.value.split('|')[0];
    const title = action.value;
    const dateCreated = action.value.split('|')[2];
    const res = Object.keys(surveys).find(key => { 
      console.log({key, title, srv: surveys[key].response.title})
      return surveys[key].response.title === title
    });
    try {
      console.log({title, survey: res })
      //await triggerModal(app, surveyBody, command, current_channel, surveyId, dateCreated);
    } catch {
      await say(`Failed to load the survey "${title}". Please try again.`);
    }
  }
}
