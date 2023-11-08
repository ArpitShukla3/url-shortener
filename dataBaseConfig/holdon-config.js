const { MongoClient } = require("mongodb");
async function run() {
  const uri =
    "mongodb+srv://arpit900shukla:9569907043@<cluster-url>?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect();
  }
  run().catch(console.dir);