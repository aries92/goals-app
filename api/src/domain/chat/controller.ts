import { ApolloError, gql, PubSub } from "apollo-server-express";
import { withAuth } from "../../utils/helpers";
import { createChat, getChatMessages, sendMessage } from "./service";

const pubsub = new PubSub();
const MESSAGE_SENT = "MESSAGE_SENT";

export const typeDefs = gql`
  extend type Query {
    getChatMessages(userId: Int): [Message]
  }
  extend type Mutation {
    createChat(userId: Int): String
    sendMessage(chatId: Int, text: String, typeId: Int): String
  }
  extend type Subscription {
    messageSent: [Message]
  }
  type Message {
    id: Int
    text: String
    chatId: Int
    type: String
  }
`;

export const resolvers = {
  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterator([MESSAGE_SENT])
    }
  },
  Query: {
    getChatMessages: withAuth(async (_: any, { userId }: any) => {
      try {
        return await getChatMessages(userId);
      } catch (e) {
        throw new ApolloError(e.message);
      }
    })
  },
  Mutation: {
    createChat: withAuth(async (_: any, { userId }: any) => {
      try {
        return await createChat(userId);
      } catch (e) {
        throw new ApolloError(e.message);
      }
    }),
    sendMessage: withAuth(async (_: any, { chatId, text, typeId }: any) => {
      try {
        await pubsub.publish(MESSAGE_SENT, {messageSent: {chatId, text, typeId}});
        return await sendMessage(chatId, text, typeId);
      } catch (e) {
        throw new ApolloError(e.message);
      }
    })
  }
};
