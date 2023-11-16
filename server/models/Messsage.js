const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  },
  {
    timestamps: true, // gets the createdAt date
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
