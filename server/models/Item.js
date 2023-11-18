const mongoose = require("mongoose");

const { Schema } = mongoose;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  owner: {
    type: String,
    required: true,
    // should it reference User and when creating a new one we can get the users
    // username via token/context
    // type: Schema.Types.ObjectId, ref: "User"
  },
  isPublic: {
    type: Boolean,
  },
  community: {
    type: String,
    required: true
  },
  ownerId: {type: Schema.Types.ObjectId, ref: "User"},
  community: {
    type: String,
    required: true,
  },
  ownerId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
