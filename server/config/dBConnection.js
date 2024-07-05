import mongoose from "mongoose";

async function connect() {
  /* In memory MongoDB */
  /* const mongoDB = await MongoMemoryServer.create();
    const getUri = mongoDB.getUri(); */

  mongoose.set("strictQuery", true);
  const db = await mongoose.connect(process.env.ATLAS_URI);
  console.log("Database Connected!");
  return db;
}

export default connect;
