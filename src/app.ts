import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { RestClient } from "typed-rest-client/RestClient";

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
const api = new RestClient(undefined, 'https://api.monday.com/v2')

application.post("/status-change", async (req: Request, res: Response) => {
  console.log("Body", req.body.event);
  try {
    const item = await api.create('/', JSON.stringify({
      query: `query { assets (ids: [${req.body.event.pulseId}]) { id name url }}`
    }))
    res.status(200).send(item)
  } catch (error) {
    res.status(500).send(error)
  }
});

application.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
