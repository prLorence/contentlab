import mongoose from "mongoose"

export const TaskSchema = new mongoose.Schema({
    title: String,
    status: String,
    deadline: Date,
});
