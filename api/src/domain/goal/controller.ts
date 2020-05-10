import { ApolloError, gql } from "apollo-server-express";
import { IGoalComplete, IGoalCreate } from "../../types";
import { withAuth } from "../../utils/helpers";
import { addGoal, deleteGoal, getGoals, setGoal } from "./service";

export const typeDefs = gql`
  extend type Query {
    goals: [Goal]
  }
  extend type Mutation {
    addGoal(userId: Int, text: String): Goal
    deleteGoal(id: Int): String
    setGoal(id: Int, complete: Boolean, userId: Int): Goal
  }
  type Goal {
    id: Int
    text: String
    complete: Boolean
    userId: Int
  }
`;

export const resolvers = {
  Query: {
    goals: withAuth(async () => await getGoals())
  },
  Mutation: {
    addGoal: withAuth(async (_: any, { userId, text }: IGoalCreate) => {
      try {
        return await addGoal(userId, text);
      } catch (e) {
        throw new ApolloError(e.message);
      }
    }),
    setGoal: withAuth(
      async (_: any, { id, complete, userId }: IGoalComplete) => {
        try {
          return await setGoal(id, complete, userId);
        } catch (e) {
          throw new ApolloError(e.message);
        }
      }
    ),
    deleteGoal: withAuth(async (_: any, { id }: { id: number }) => {
      try {
        return await deleteGoal(id);
      } catch (e) {
        throw new ApolloError(e.message);
      }
    })
  }
};
