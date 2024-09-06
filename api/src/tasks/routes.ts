import { CommonRoutesConfig } from "../base/common-routes";
import express, { Request, Response } from 'express';
import { createTask, getAllTasks, TaskRequest } from "./services";

export class BookRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "TaskRoutes")
    }
    configureRoutes(): express.Application {
        this.app.route("/tasks").get(async (_, res: Response) => {
            const tasks = await getAllTasks()
            return res.json(tasks)
        })

        this.app.route("/tasks").post(async (req: Request, res: Response) => {
            try {
                const taskData: TaskRequest = req.body; // Capture the data from the request body
                const newTask = await createTask(taskData);
                return res.status(201).json(newTask.id ?? 0);
            } catch (error) {
                console.error('Error creating task:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        })

        this.app.route("/tasks/:id").put((req: Request, res: Response) => {
            return res.send("/PUT tasks")
        })

        this.app.route("/tasks/:id").delete((req: Request, res: Response) => {
            return res.send("/DELETE tasks")
        })

        return this.app
    }
}
