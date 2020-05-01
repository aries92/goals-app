import { gql } from "apollo-boost";

export const REGISTER = gql`
  mutation createUser($email: String, $password: String) {
    createUser(email: $email, password: $password)
  }
`;
