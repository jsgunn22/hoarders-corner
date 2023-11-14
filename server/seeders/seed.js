const db = require("../config/connection");
const {} = require("../models");

db.once("open", async () => {
  try {
    // INSERT SEED OPERATIONS HERE
    console.log("db seeder");
    process.exit(0);
  } catch (error) {
    throw error;
  }
});
