import { IGoalComplete, IGoalCreate } from "../../types";
import { getGoals, completeGoal, createGoal } from "./service";
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    goals: [Goal]
  }
  extend type Mutation {
    createGoal(userId: String, text: String): String
    completeGoal(id: String, complete: Boolean, userId: String): String
  }
  type Goal {
    id: String
    text: String
    complete: Boolean
  }
`;

export const resolvers = {
  Query: {
    goals: async () => await getGoals()
  },
  Mutation: {
    createGoal: async (_: any, { userId, text }: IGoalCreate) => {
      return await createGoal(userId, text);
    },
    completeGoal: async (_: any, { id, complete, userId }: IGoalComplete) => {
      return await completeGoal(id, complete, userId);
    }
  }
};
