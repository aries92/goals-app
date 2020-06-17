import { ApolloError, AuthenticationError, gql } from "apollo-server-express";
import { IUser } from "../../types";
import { createUser, getUser, getUsers, login } from "./service";

export const typeDefs = gql`
  extend type Query {
    user(email: String): String
    users: [User]
  }
  extend type Mutation {
    getUser(email: String): String
    createUser(email: String, password: String): String
    login(email: String, password: String): String
  }
  type User {
    id: Int
    email: String
  }
`;

export const resolvers = {
  Query: {
    user: async (_: any, { email }: any) => await getUser(email),
    users: async () => await getUsers()
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
