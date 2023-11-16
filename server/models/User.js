const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

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
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  communities: [{ type: Schema.Types.ObjectId, ref: "Community" }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
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
