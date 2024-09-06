import { CommonRoutesConfig } from "../base/common-routes";
import express, { Request, Response } from 'express';
import { createTask, deleteTask, getAllTasks, TaskRequest, updateTask } from "./services";

export class BookRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "TaskRoutes")
    }
    configureRoutes(): express.Application {
        this.app.route("/tasks").get(async (_, res: Response) => {
            try {
                const tasks = await getAllTasks();
                res.json(tasks);
            } catch (error) {
                console.error('Error retrieving tasks:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        })

        this.app.route("/tasks").post(async (req: Request, res: Response) => {
            try {
                const taskData: TaskRequest = req.body; // Capture the data from the request body
                const newTask = await createTask(taskData);
                return res.status(201).json(newTask);
            } catch (error) {
                console.error('Error creating task:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        })

        this.app.route("/tasks/:id").put(async (req: Request, res: Response) => {
            try {
                console.log('Received update request for task:', req.params.id);
                console.log('Update data:', req.body);

                const updatedTask = await updateTask(req.params.id, req.body);
                if (updatedTask) {
                    console.log('Task updated successfully:', updatedTask);
                    res.json(updatedTask);
                } else {
                    console.log('Task not found for update');
                    res.status(404).json({ error: 'Task not found' });
                }
            } catch (error) {
                console.error('Error updating task:', error);
                res.status(400).json({ error: error });
            }
        })

        this.app.route("/tasks/:id").delete(async (req: Request, res: Response) => {
            try {
                const deletedTask = await deleteTask(req.params.id);
                if (deletedTask) {
                    res.json({ message: `Task ${deletedTask} deleted` });
                } else {
                    res.status(404).json({ error: 'Task not found' });
                }
            } catch (error) {
                console.error('Error deleting task:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        })

        return this.app
    }
}
