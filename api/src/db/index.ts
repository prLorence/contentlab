import mongoose from "mongoose";
import { TaskSchema } from "./schema";

export async function dbConn() {
    // TODO: move this to env file
    await mongoose.connect('mongodb://root:root@localhost:27017'); // if your database has auth enabled
}

export const Task = mongoose.model('task', TaskSchema);
