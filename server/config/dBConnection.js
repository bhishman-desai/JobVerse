import mongoose from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";

async function connect() {
    /* In memory MongoDB */
    const mongoDB = await MongoMemoryServer.create();
    process.env.ATLAS_URI = mongoDB.getUri();

    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(process.env.ATLAS_URI);
    console.log("Database Connected!");
    return db;
}

export default connect;
