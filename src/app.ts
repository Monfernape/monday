import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";

const application: Application = express();
application.use(express.json());
application.use(cors())
application.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "*");
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
      next();
    })

const port = process.env.PORT || 3001;

application.post("/monday", (req: Request, res: Response) => {
  console.log("Body", req.body);
  res.status(201).send(req.body);
});

application.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
