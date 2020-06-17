import { ApolloError, gql, PubSub } from "apollo-server-express";
import { withAuth } from "../../utils/helpers";
import { getMessages, sendMessage } from "./service";

const pubsub = new PubSub();
const MESSAGE_SENT = "MESSAGE_SENT";

export const typeDefs = gql`
  extend type Query {
    messages(userIdList: [Int]): [Message]
    chatId(userIdList: [Int]): Int
  }
  extend type Mutation {
    sendMessage(userIdList: [Int], userId: Int, text: String): String
  }
  extend type Subscription {
    messageSent: [Message]
  }
  type Message {
    id: Int
    text: String
    chatId: Int
    userId: String
  }
`;

export const resolvers = {
  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterator([MESSAGE_SENT])
    }
  },
  Query: {
    messages: withAuth(async (_: any, { userIdList }: any) => {
      try {
        return await getMessages(userIdList);
      } catch (e) {
        throw new ApolloError(e.message);
      }
    })
  },
  Mutation: {
    sendMessage: withAuth(async (_: any, { userIdList, userId, text }: any) => {
      try {
        const message = await sendMessage(userIdList, userId, text);
        await pubsub.publish(MESSAGE_SENT, {
          messageSent: {
            chatId: message.chatId,
            userId: message.userId,
            text: message.text
          }
        });
      } catch (e) {
        throw new ApolloError(e.message);
      }
    })
  }
};
