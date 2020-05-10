import { gql } from "apollo-boost";

export const SET_GOAL = gql`
  mutation setGoal($id: Int, $complete: Boolean, $userId: Int) {
    setGoal(id: $id, complete: $complete, userId: $userId) {
      id
      complete
    }
  }
`;
export const DELETE_GOAL = gql`
  mutation deleteGoal($id: Int) {
    deleteGoal(id: $id)
  }
`;

export const ADD_GOAL = gql`
  mutation addGoal($userId: Int, $text: String) {
    addGoal(userId: $userId, text: $text) {
      id
      text
      userId
      complete
    }
  }
`;

export const GET_GOALS = gql`
  {
    goals {
      id
      text
      complete
      userId
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password)
  }
`;

export const REGISTER = gql`
  mutation createUser($email: String, $password: String) {
    createUser(email: $email, password: $password)
  }
`;
