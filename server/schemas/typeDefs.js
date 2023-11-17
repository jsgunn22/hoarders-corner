const typeDefs = `
 type User {
    _id: ID
    username: String
    email: String
    avatar: String
    messagesSent: [Message]
    messagesReceived: [Message]
    communities: [Community]
 }

 type Community {
   _id: ID
   name: String
   items: [Item]
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
    communities: [Community]
    messages: [Message]
    myMessages: User
 }

 type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
 }
`;

module.exports = typeDefs;
