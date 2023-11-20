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

export const MESSAGE_READ = gql`
  mutation markMessageRead($_id: ID) {
    markMessageRead(_id: $_id) {
      _id
    }
  }
`;

export const ADD_COMMUNITY = gql`
  mutation addCommunity($name: String!) {
    addCommunity(name: $name) {
      _id
      name
    }
  }
`;
export const JOIN_COMMUNITY = gql`
  mutation joinCommunity($communityId: ID!) {
    joinCommunity(communityId: $communityId) {
      _id
      name
    }
  }
`;
export const ADD_ITEM = gql`
  mutation createItem(
    $name: String!
    $description: String!
    $owner: String!
    $isPublic: Boolean!
    $ownerId: ID!
    $community: String!
  ) {
    addItem(
      name: $name
      description: $description
      owner: $owner
      isPublic: $isPublic
      ownerId: $ownerId
      community: $community
    ) {
      _id
      name
      description
      owner
      isPublic
      ownerId
      community
    }
  }
`;
