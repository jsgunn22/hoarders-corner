const mongoose = require("mongoose");

const { Schema } = mongoose;

const communitySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
