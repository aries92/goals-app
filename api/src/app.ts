import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as hpp from "hpp";
import * as logger from "morgan";
import errorMiddleware from "./middlewares/error.middleware";

const env = process.env.NODE_ENV === "production";
const app = express();

if (env) {
  app.use(hpp());
  app.use(helmet());
  app.use(logger("combined"));
  app.use(cors({ origin: "your.domain.com", credentials: true }));
} else {
  app.use(logger("dev"));
  app.use(cors({ origin: true, credentials: true }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorMiddleware);

export default app;
