import {getSlackSurveysFromCache} from "../../services/index.js";

const addSurveys = (receiver) => {

  receiver.router.post('/survey/send', async (req,res) => {
    const cache = await getSlackSurveysFromCache()
    const title = req.body.title || 'End of Day Recap';
    console.log(cache)
    const toSend = Object.keys(cache).filter((name) => name.includes(title));
    if (toSend.length > 0) {
      res.send({cache})
    }else{
      res.send({ error: `no surveys found for ${title}`});
    }
  })

  return receiver;
}

export default addSurveys;
