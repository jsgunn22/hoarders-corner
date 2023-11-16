const mongoose = require("mongoose");

const { Schema } = mongoose;

const communitySchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  name: {
    type: String,
    require: true,
    trim: true,
  },
});

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
