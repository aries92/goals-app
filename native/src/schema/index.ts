import { gql } from "apollo-boost";

export const SIGN_IN = gql`
  mutation SignIn($token: String) {
    signIn(token: $token) @client {
      user
    }
  }
`;
export const SIGN_OUT = gql`
  mutation SignOut {
    signOut @client
  }
`;

export const GET_USER = gql`
  query GetUser {
    user @client
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($userIdList: [Int], $userId: Int, $text: String) {
    sendMessage(userIdList: $userIdList, userId: $userId, text: $text)
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($userIdList: [Int]) {
    messages(userIdList: $userIdList) {
      id
      chatId
      text
      userId
    }
  }
`;

export const MESSAGE_SENT = gql`
  subscription MessageSent {
    messageSent {
      id
      chatId
      text
      userId
    }
  }
`;

export const SET_GOAL = gql`
  mutation SetGoal($id: Int, $complete: Boolean, $userId: Int) {
    setGoal(id: $id, complete: $complete, userId: $userId) {
      id
      complete
    }
  }
`;

export const DELETE_GOAL = gql`
  mutation DeleteGoal($id: Int) {
    deleteGoal(id: $id)
  }
`;

export const ADD_GOAL = gql`
  mutation AddGoal($userId: Int, $text: String) {
    addGoal(userId: $userId, text: $text) {
      id
      text
      userId
      complete
    }
  }
`;

export const GET_GOALS = gql`
  query Goals {
    goals {
      id
      text
      complete
      userId
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password)
  }
`;

export const REGISTER = gql`
  mutation CreateUser($email: String, $password: String) {
    createUser(email: $email, password: $password)
  }
`;
