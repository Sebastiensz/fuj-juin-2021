import { MongoClient } from "mongodb";

(async () => {
  try {
    // Connection URI
    const uri = "mongodb://localhost:27017/?poolSize=20&writeConcern=majority";
    // Create a new MongoClient
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
      // Connect the client to the server
      await client.connect();
      // Establish and verify connection
      await client.db("admin").command({ ping: 1 });
      console.log("Connected successfully to server");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
      console.log("closed");
    }
  } catch (err) {
    console.log("err:", err);
  }
})();
