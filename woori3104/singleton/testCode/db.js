const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const MongoDbUrl = "mongodb://localhost:27017/testServer";

class MongoSingleton {
  static _client = null;
  constructor() {}
  static async getClient() {
    if (!MongoSingleton._client) {
      console.log('new Connect')
      MongoSingleton._client = await MongoClient.connect(MongoDbUrl, {
        useUnifiedTopology: true,
      });
    } else {
      console.log("MongoDB is Connected")
    }
    return MongoSingleton._client;
  }
}

module.exports = MongoSingleton;