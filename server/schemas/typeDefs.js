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
   users: [User]
 }

 type Item {
   _id: ID
   name: String
   description: String
   owner: String
   isPublic: Boolean
   community: String
   ownerId: User
   ownerId: User
<<<<<<< HEAD
   ownerId: User
=======
>>>>>>> d950ded (correctly adds users to communities)
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
    items: [Item]
    item(itemId: ID!): Item
    messages: [Message]
    message(messageId: ID!): Message
    myMessages: User
 }

 type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCommunity(name: String!): Community
    joinCommunity(communityId: ID!, userId: ID!): Community
    createItem(name: String!, description: String!, owner: String!, isPublic: Boolean!, ownerId: ID!, community: String!): Item
    addItemToCommunity(itemId: ID!, communityId: ID!): Item
    sendMessage(sender: String!, recipient: String!, content: String): Message
 }
`;

module.exports = typeDefs;
