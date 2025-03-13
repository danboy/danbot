import {getSurveysFromCache} from "../services/index.js";
export const addRoutes = (receiver) => {

  //Example route
  receiver.router.get('/route', async (req, res) => {
      res.send({"success": "route"});
  });

  receiver.router.post('/survey/send', async (req,res) => {
    const surveys = await getSurveysFromCache()
    const title = req.body.title || 'End of Day Recap';
    res.send({surveys})
  })

  return receiver;
}
