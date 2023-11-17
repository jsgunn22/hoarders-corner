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
 }

 type Item {
   _id: ID
   name: String
   description: String
   owner: String
   isPublic: Boolean
   community: String
 }

 type Auth {
    token: ID!
    user: User
 }

 type Query {
    users: [User]
    me: User
    communities: [Community]
 }

 type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
 }
`;

module.exports = typeDefs;
