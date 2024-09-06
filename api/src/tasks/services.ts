import mongoose from "mongoose";
import { Task } from "../db";

export interface TaskRequest {
    title: string,
    status: string,
    deadline: Date,
}

export async function createTask(taskData: TaskRequest) {
    try {
        console.log('Received task data:', taskData);

        if (!taskData.title) {
            throw new Error('Title is required');
        }

        const newTask = new Task({
            Title: taskData.title,
            Status: taskData.status || "TODO", // Use the provided Status or default to "TODO"
            Deadline: taskData.deadline,
        });

        console.log('Created new Task object:', newTask);

        const savedTask = await newTask.save();
        console.log('Saved task:', savedTask);
        return savedTask;
    } catch (error) {
        console.error('Error in createTask:', error);
        if (error instanceof mongoose.Error.ValidationError) {
            throw new Error('Validation error: ' + error.message);
        } else if (error instanceof mongoose.Error) {
            throw new Error('Database error: ' + error.message);
        } else {
            throw error;
        }
    }
}

export async function getAllTasks() {
    try {
        return await Task.find();
    } catch (error) {
        throw error;
    }
}

export async function updateTask(id: string, updateData: TaskRequest) {
    try {
        return await Task.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        throw error;
    }
}

export async function deleteTask(id: string) {
    try {
        return await Task.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}

