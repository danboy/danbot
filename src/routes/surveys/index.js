import {getSlackSurveysFromCache} from "../../services/index.js";
import { launchSurveyButton } from "../../utils/components.js";

const addSurveys = (app, receiver) => {

  receiver.router.post('/survey/send', async (req,res) => {
    const cache = await getSlackSurveysFromCache()
    const title = req.body.title || 'End of Day Recap';
    if(!cache) return res.send({cache: cache});
    const toSend = Object.keys(cache).filter((name) => name.includes(title));
    if (toSend.length > 0) {
      toSend.forEach(async (block) => {
        const survey = launchSurveyButton(cache[block].survey);
        const channel = cache[block].audience.channel_ids[0]?.slack_channel_id;
        if(!channel) return;
        return await app.client.chat.postMessage({
          token: process.env.SLACK_BOT_TOKEN,
          channel,
          blocks: survey.blocks,
          text: null,
        });
      })
      res.send({cache})
    }else{
      res.send({ error: `no surveys found for ${title}`});
    }
  })

  return receiver;
}

export default addSurveys;
