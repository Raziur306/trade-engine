import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import env from "./config/env";
import { validateRequestBody } from "./utils";
import { sendTradeCallMessage } from "./controllers/tradingController";


const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).send({ status: `Hello World am alive on ${env.PORT}!` });
});

router.post(
  env.TRADECALL_API_ENDPOINT,
  validateRequestBody([
    "shillerName",
    "coin",
    "callPrices",
    "position",
    "takeProfits",
    "stopLosses",
    "message",
  ]),
  sendTradeCallMessage
);

app.use("/tradecalls", router);

export default app;
