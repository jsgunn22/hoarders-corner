const db = require("../config/connection");
const { User, Community, Item, Message } = require("../models");
const cleanDB = require("./cleanDB");
const userSeeds = require("./userSeeds.json");

db.once("open", async () => {
  try {
    await cleanDB("User", "users"); // removes existing users from db for fresh start.  Duplicated for other models
    await cleanDB("Community", "communitys");
    await cleanDB("Item", "items");
    await cleanDB("Message", "messages");

    await User.create(userSeeds);

    console.log("db seeded");
    process.exit(0);
  } catch (error) {
    throw error;
  }
});
