const models = require("../models");
const db = require("../config/connection");

// helper function to clear the db when seeding for a fresh start
module.exports = async (modelName, collectionName) => {
  try {
    let modelExists = await models[modelName].db.db.listCollections({
      name: collectionName,
    });

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (error) {
    throw error;
  }
};
