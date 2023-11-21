const typeDefs = `
 type User {
    _id: ID
    username: String
    email: String
    messagesSent: [Message]
    messagesReceived: [Message]
    communities: [Community]
    items: [Item]
 }

 type Community {
   _id: ID
   name: String
   items: [Item]
   users: [User]
 }

 type Item {
   _id: ID
   name: String
   description: String
   owner: String
   isPublic: Boolean
   ownerId: User
   community: String

 }

 type Message {
   _id: ID
   sender: String
   recipient: String
   createdAt: String
   content: String
   isRead: Boolean
 }

 type Auth {
    token: ID!
    user: User
 }


 type Query {
    users: [User]
    me: User
    communities: [Community]!
    community(communityId: ID!): Community
    myCommunities: User
    items: [Item]
    itemByCommunity(communityId: String!): Community
    item(itemId: ID!): Item
    myHoards: User
    messages: [Message]
    message(messageId: ID!): Message
    myMessages: User
 }

 type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addCommunity(name: String!): Community
    joinCommunity(communityId: ID!): Community
    leaveCommunity(communityId: ID!): User

    createItem(name: String!, description: String!, owner: String!, isPublic: Boolean!, community: String!, communityId: String!): Item
    addItemToCommunity(itemId: ID!, communityId: ID!): Item
    
    sendMessage(sender: String!, recipient: String!, content: String): Message
    markMessageRead(_id: ID): Message
 }
`;

module.exports = typeDefs;
