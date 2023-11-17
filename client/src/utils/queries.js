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
`