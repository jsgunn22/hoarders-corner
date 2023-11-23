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
  query communities {
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
      users {
        _id
        username
      }
    }
  }
`;

export const QUERY_COMMUNITY = gql`
  query communityName($name: String!) {
    communityName(name: $name) {
      name
      _id
      
    }
  }

`


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

export const QUERY_MY_HOARDS = gql`
  query myHoards {
    myHoards {
      _id
      communities {
        _id
        name
        items {
          ownerId {
            _id
          }
        }
      }
    }
  }
`;

export const QUERY_MY_HOARD = gql`
  query myHoard($communityId: String!) {
    myHoard(communityId: $communityId) {
      _id
      community
      description
      isPublic
      name
      owner
    }
  }
`;

export const QUERY_COMMUNITY_ITEMS = gql`
  query itemByCommunity($communityId: String!) {
    itemByCommunity(communityId: $communityId) {
      _id
      name
      items {
        _id
        name
        description
        owner
        isPublic
        ownerId {
          _id
        }
      }
      users {
        _id
      }
    }
  }
`;

export const QUERY_MY_COMMUNITIES = gql`
  query myCommunities {
    myCommunities {
      _id
      username
      communities {
        _id
        name
        items {
          _id
          isPublic
          ownerId {
            _id
          }
        }
        users {
          _id
        }
      }
    }
  }
`;

export const QUERY_ITEM_NAME = gql`
  query itemName($name: String) {
    itemName(name: $name) {
      _id
      community
      description
      isPublic
      name
      owner
      ownerId
    }
  }

`