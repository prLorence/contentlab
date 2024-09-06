import mongoose from "mongoose";
import { Task } from "../db";
import { sendDiscordMessge } from "../external/discord";
import { getWeatherData, WeatherData } from "../external/open-weather";
import { getCatFact } from "../external/cat-fact";

export interface TaskRequest {
    title: string;
    status: string;
    deadline: Date;
}

export interface TaskResponse {
    tasks?: any;
    taskId?: string;
    weather: WeatherData;
    catFact: string;
}

export async function createTask(taskData: TaskRequest): Promise<string> {
    try {
        console.log('Received task data:', taskData);

        if (!taskData.title) {
            throw new Error('Title is required');
        }

        const newTask = new Task({
            title: taskData.title,
            status: taskData.status || "TODO", // Use the provided Status or default to "TODO"
            deadline: taskData.deadline,
        });

        console.log('Created new Task object:', newTask);

        const savedTask = await newTask.save();
        console.log('Saved task:', savedTask);

        sendDiscordMessge(`> New task created! \`${savedTask.title}\``)

        return savedTask.id;
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

        task.title = updateData.title ?? task.title;
        task.status = updateData.status ?? task.status;
        task.deadline = updateData.deadline ?? task.deadline;

        const updatedTask = await task.save();

        sendDiscordMessge(`> Task updated! ${updatedTask.title} (${updatedTask.status})`)

        console.log('Updated task:', updatedTask);

        const response: TaskResponse = {
            taskId: updatedTask.id,
            weather: await getWeatherData(),
            catFact: await getCatFact()
        }

        return response;
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
        const response: TaskResponse = {
            tasks: await Task.find(),
            weather: await getWeatherData(),
            catFact: await getCatFact()
        }

        return response;
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
        const response: TaskResponse = {
            weather: await getWeatherData(),
            catFact: await getCatFact()
        }

        sendDiscordMessge(`> Removed task \`${task.title}\``)

        await Task.findByIdAndDelete(id);

        return response;
    } catch (error) {
        throw error;
    }
}
