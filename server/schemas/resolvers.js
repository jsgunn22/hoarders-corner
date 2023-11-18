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
      return Community.find().populate([{ path: "users" }, { path: "items" }])
      
    },
    community: async (parent, { communityId }) => {
      return Community.findOne({ _id: communityId }).populate([
        { path: "users" },
        { path: "items" },
      ]);
    },
    items: async () => {
      return Item.find();
    },
    item: async (parent, { itemId }) => {
      return Item.findOne({ _id: itemId });
    },
    messages: async () => {
      return Message.find();
    },
    message: async (parent, { messageId }) => {
      return Message.findOne({ _id: messageId });
    },
    myMessages: async (parent, args, context) => {
      if (context.user) {
        // const objectId = new ObjectId(context.user.id); // TEST ID REMOVE
        const myMessages = await User.findById(context.user._id).populate([
          { path: "messagesSent" },
          { path: "messagesReceived" },
        ]);

        return myMessages;
      }
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
    addCommunity: async (parent, { name }) => {
      return Community.create({ name });
    },
    joinCommunity: async (parent, { communityId, userId }) => {
      const community = await Community.findOne({ _id: communityId })
      if (!community.users.includes(userId)) {
        community.users.push(userId);
        await community.save();
      }


      return Community.findOne({ _id: communityId }).populate("users");
    },
  },
};

module.exports = resolvers;
