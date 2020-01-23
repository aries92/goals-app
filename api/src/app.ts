import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import logger from "morgan";
import errorMiddleware from "./middlewares/error.middleware";
import { ApolloServer } from "apollo-server-express";
import query from "qs-middleware";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
const path = "/graphql";

app.use(hpp());
app.use(helmet());
app.use(logger("combined"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);
app.use(query());

server.applyMiddleware({ app, path });

export default app;
