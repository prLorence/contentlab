import mongoose from "mongoose"

export const TaskSchema = new mongoose.Schema({
    Title: String,
    Status: String,
    Deadline: Date,
});
