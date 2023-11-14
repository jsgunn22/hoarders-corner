const mongoose = require("mongoose");

const appName = "INSERTAPPNAMEHERE"; // REPLACE

mongoose.connect(
  process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${appName}`
);

module.exports = mongoose.connection;
