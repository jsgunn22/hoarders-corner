const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    recipient: {
      type: String,
    },
    sender: {
      type: String,
    },
    content: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  }
  // {
  //   timestamps: true, // gets the createdAt date
  // }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
