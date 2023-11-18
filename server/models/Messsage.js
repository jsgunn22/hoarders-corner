const mongoose = require("mongoose");

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
  },
  {
    timestamps: true, // gets the createdAt date
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
