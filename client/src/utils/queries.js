import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      avatar
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      avatar
    }
  }
`;

export const QUERY_COMMUNITIES = gql`
  {
    communities {
      _id
      name
      items {
        _id
        name
        description
        isPublic
        community
      }
    }
  }
`;

export const QUERY_MY_MESSAGES = gql`
  query myMessages {
    myMessages {
      messagesSent {
        _id
        sender
        recipient
        createdAt
        content
      }
      messagesReceived {
        _id
        sender
        recipient
        createdAt
        content
        isRead
      }
    }
  }
`;
