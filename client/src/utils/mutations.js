import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String) {
    login(email: email, password: password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $password: String!
    $avatar: String
  ) {
    addUser(username: username, email: email, password: password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
