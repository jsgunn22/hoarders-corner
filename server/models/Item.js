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
  },
  isPublic: {
    type: Boolean,
  },
  community: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
