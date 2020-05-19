import cors from "cors";
import express from "express";
import http from "http";
import helmet from "helmet";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import query from "qs-middleware";
import { context } from "./utils/helpers";

const server = new ApolloServer({
  modules: [
    require("./domain/user/controller"),
    require("./domain/goal/controller"),
    require("./domain/chat/controller")
  ],
  context
});
const app = express();
const path = "/graphql";

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

app.use(helmet());
app.use(logger(":method :url :status - :response-time ms"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(query());

server.applyMiddleware({ app, path });

export default httpServer;
