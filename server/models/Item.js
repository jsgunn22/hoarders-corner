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
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isPublic: {
    type: Boolean,
  },
  community: {
    type: Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
