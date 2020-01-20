import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as hpp from "hpp";
import * as logger from "morgan";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();

app.use(hpp());
app.use(helmet());
app.use(logger("combined"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorMiddleware);

export default app;
