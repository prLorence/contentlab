import mongoose from "mongoose";
import { Task } from "../db";
import { sendDiscordMessge } from "../external/discord";

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
        sendDiscordMessge(`> New task created! \`${savedTask.Title}\``)
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

export async function updateTask(id: string, updateData: Partial<TaskRequest>) {
    try {
        console.log('Updating task with id:', id);
        console.log('Update data:', updateData);

        const task = await Task.findById(id);
        if (!task) {
            console.log('Task not found');
            return null;
        }

        task.Title = updateData.title ?? task.Title;
        task.Status = updateData.status ?? task.Status;
        task.Deadline = updateData.deadline ?? task.Deadline;

        const updatedTask = await task.save();

        sendDiscordMessge(`> Task updated! ${updatedTask.Title} ({${updatedTask.Status})`)

        console.log('Updated task:', updatedTask);

        return updatedTask;
    } catch (error) {
        console.error('Error in updateTask:', error);
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

export async function deleteTask(id: string) {
    try {
        const task = await Task.findById(id);
        if (!task) {
            console.log('Task not found');
            return null;
        }
        sendDiscordMessge(`> Removing task \`${task?.Title}\``)
        return await Task.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}

