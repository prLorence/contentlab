import { CommonRoutesConfig } from "../base/common-routes";
import express, { Request, Response } from 'express';

export class BookRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "BookRoutes")
    }
    configureRoutes(): express.Application {
        this.app.route("/books").get((req: Request, res: Response) => {
            return res.send("/GET books")
        })

        this.app.route("/books").post((req: Request, res: Response) => {
            return res.send("/POST books")
        })

        this.app.route("/books/:id").put((req: Request, res: Response) => {
            return res.send("/PUT books")
        })

        this.app.route("/books/:id").delete((req: Request, res: Response) => {
            return res.send("/DELETE books")
        })

        return this.app
    }
}
