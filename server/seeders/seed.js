const db = require("../config/connection");
const { User, Community, Item, Message } = require("../models");
const cleanDB = require("./cleanDB");
const userSeeds = require("./userSeeds.json");
const communitySeeds = require("./communitySeeds.json");
const itemSeeds = require("./itemSeeds.json");
const messageSeeds = require("./messageSeeds.json");

db.once("open", async () => {
  try {
    await cleanDB("User", "users"); // removes existing users from db for fresh start.  Duplicated for other models
    await cleanDB("Community", "communities");
    await cleanDB("Item", "items");
    await cleanDB("Message", "messages");

    const communities = await Community.create(communitySeeds);

    const getUsers = await User.create(userSeeds);

    // pushes create items to users an communities
    try {
      for (let i = 0; i < itemSeeds.length; i++) {
        const { _id, owner, community } = await Item.create(itemSeeds[i]);
        await User.findOneAndUpdate(
          { username: owner },
          { $addToSet: { items: _id } }
        );

        await Community.findOneAndUpdate(
          { name: community },
          { $addToSet: { items: _id } }
        );
      }
    } catch (error) {
      console.log(error);
    }

    // pushes created messages to Users
    try {
      for (let i = 0; i < messageSeeds.length; i++) {
        const { _id, sender, recipient } = await Message.create(
          messageSeeds[i]
        );
        //to user that is recipient
        await User.findOneAndUpdate(
          {
            username: recipient,
          },
          {
            $addToSet: { messagesReceived: _id },
          }
        );
        // to user that is
        await User.findOneAndUpdate(
          {
            username: sender,
          },
          {
            $addToSet: { messagesSent: _id },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }

    // Randomly adds communities to existing users
    for (let c = 0; c < communities.length; c++) {
      const { _id } = getUsers[Math.floor(Math.random() * getUsers.length)];

      await User.findByIdAndUpdate(_id, {
        $addToSet: { communities: communities[c]._id },
      });
    }

    console.log("db seeded");
    process.exit(0);
  } catch (error) {
    throw error;
  }
});
