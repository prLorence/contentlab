import mongoose from "mongoose";
import { TaskSchema } from "./schema";

export async function dbConn() {
    if (!process.env.MONGODB_CONN) {
        console.error("mongo db connection string not provided");
        return;
    }
    await mongoose.connect(process.env.MONGODB_CONN); // if your database has auth enabled
}

export const Task = mongoose.model('task', TaskSchema);
