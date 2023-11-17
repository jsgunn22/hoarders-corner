const { User, Community, Item, Message } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    communities: async () => {
      return Community.find().populate("users")
    },
    community: async (parent, { communityId }) => {
      return Community.findOne({_id: communityId }).populate("users");
    },
    items: async () => {
      return Item.find()
    },
    item: async (parent, { itemId }) => {
      return Item.findOne({_id: itemId})
    },
    messages: async () => {
      return Message.find()
    },
    message: async (parent, { messageId }) => {
      return Message.findOne({_id: messageId})
    }
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
      return Community.create({ name })
      
    },
    joinCommunity: async (parent, {communityId, userID}) => {
      const community = await Community.findOne({_id: communityId});
     
      if (!community.users.includes(userID)) {
        community.users.push(userID);
        await community.save();
      }
     
      return Community.findOne({_id: communityId}).populate("users");
     
    }
  },
};

module.exports = resolvers;
