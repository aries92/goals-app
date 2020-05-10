import { ApolloError, AuthenticationError, gql } from "apollo-server-express";
import { IUser } from "../../types";
import { createUser, getUser, login } from "./service";

export const typeDefs = gql`
  extend type Query {
    user(email: String): String
  }
  extend type Mutation {
    getUser(email: String): String
    createUser(email: String, password: String): String
    login(email: String, password: String): String
  }
`;

export const resolvers = {
  Query: {
    user: async (_: any, { email }: any) => await getUser(email)
  },
  Mutation: {
    createUser: async (_: any, { email, password }: IUser) => {
      try {
        return await createUser(email, password);
      } catch (e) {
        throw new ApolloError(e.message);
      }
    },
    login: async (_: any, { email, password }: IUser) => {
      try {
        return await login(email, password);
      } catch (e) {
        throw new AuthenticationError(e.message);
      }
    }
  }
};
