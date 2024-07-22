import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connect() {
    mongoose.set("strictQuery", true);
    console.log("ATLAS_URI:", process.env.ATLAS_URI)
    const db = await mongoose.connect(process.env.ATLAS_URI);
    console.log("Database Connected!");
    return db;
}

export default connect;
