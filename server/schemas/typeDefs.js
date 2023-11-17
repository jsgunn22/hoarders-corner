const typeDefs = `
 type User {
    _id: ID
    username: String
    email: String
    avatar: String
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
   community: String
 }

 type Message {
   _id: ID
   recipient: String
   sender: String
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
    communities: [Community]
    community(communityId: ID!): Community
    items: [Item]
    item(itemId: ID!): Item
    messages: [Message]
    message(messageId: ID!): Message
 }

 type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCommunity(name: String!): Community
    joinCommunity(communityId: ID!, userId: ID!): Community
 }
`;

module.exports = typeDefs;
