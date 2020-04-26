import { withAuth } from "../../utils/helpers";
import { getChatMessages, createChat, sendMessage } from "./service";
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    getChatMessages(userId: Int): [Message]
  }
  extend type Mutation {
    createChat(userId: Int): String
    sendMessage(chatId: Int, text: String, typeId: Int): String
  }
  type Message {
    id: Int
    text: String
    chatId: Int
    type: String
  }
`;

export const resolvers = {
  Query: {
    getChatMessages: withAuth(async (_: any, { userId }: any) => {
      return await getChatMessages(userId);
    })
  },
  Mutation: {
    createChat: withAuth(async (_: any, { userId }: any) => {
      return await createChat(userId);
    }),
    sendMessage: withAuth(async (_: any, { chatId, text, typeId }: any) => {
      return await sendMessage(chatId, text, typeId);
    })
  }
};
