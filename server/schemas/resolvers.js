const { User, Community, Item, Message } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const resolvers = {
  Query: {
    // user queries
    users: async () => {
      return User.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    // community queries
    communities: async () => {
      return Community.find().populate("items");
    },
    //message queries
    messages: async () => Message.find(),
    myMessages: async () => {
      // if (context.user) {
      const objectId = new ObjectId("6557c41935d492c3cfc890e1"); // TEST ID REMOVE
      const myMessages = await User.findById(
        objectId /* context.user._id */
      ).populate([{ path: "messagesSent" }, { path: "messagesReceived" }]);
      // }
      return myMessages;
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
