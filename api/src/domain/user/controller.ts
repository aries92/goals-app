import { IUser } from "../../types";
import { createUser, getUser, login, removeUser } from "./service";
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    user(email: String): String
  }
  extend type Mutation {
    getUser(email: String): String
    createUser(email: String, password: String): String
    removeUser(email: String): String
    login(email: String, password: String): Token
  }
  type Token {
    token: String
  }
`;

export const resolvers = {
  Query: {
    user: async (_: any, { email }: any) => await getUser(email)
  },
  Mutation: {
    createUser: async (_: any, { email, password }: IUser) => {
      return await createUser(email, password);
    },
    removeUser: async (_: any, { email }: any) => {
      return await removeUser(email);
    },
    login: async (_: any, { email, password }: IUser) => {
      return await login(email, password);
    }
  }
};
