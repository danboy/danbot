export const addRoutes = (receiver) => {

  //Example route
  receiver.router.get('/route', async (req, res) => {
      res.send({"success": "route"});
  });

  return receiver;
}
