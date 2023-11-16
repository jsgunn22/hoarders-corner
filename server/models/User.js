const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Item = require("./Item");
const Community = require("./Community");
const Message = require("./Messsage");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    requred: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  items: [Item.schema],
  communities: [Community.schema],
  messages: [Message.schema],
});

// hashes password on creation or update
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10; // configures the encryption level
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// tests password for authentication
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
