import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";

const application: Application = express();
application.use(express.json());
application.use(cors());
application.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

const port = process.env.PORT || 3001;

application.post("/status-change", (req: Request, res: Response) => {
  console.log("Body", req.body.event);
  fetch ("https://api.monday.com/v2", {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : 'YOUR_API_KEY_HERE'
   },
   body: JSON.stringify({
     query : `query { assets (ids: [${req.body.event.pulseId}]) { id name url }}`
   })
  }).then(response => {
    console.log("Item Response", response)
    res.status(200).send(req.body);
  }).catch(error => {
    console.log('Item Error', error)
    res.status(500).send(error);
  });

});

application.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
