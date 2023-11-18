import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage(
    $sender: String!
    $recipient: String!
    $content: String!
  ) {
    sendMessage(sender: $sender, recipient: $recipient, content: $content) {
      _id
    }
  }
`;
