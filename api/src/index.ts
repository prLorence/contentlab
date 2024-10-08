import express from 'express';
import { CommonRoutesConfig } from './base/common-routes';
import * as http from 'http';
import { BookRoutes } from './tasks/routes';
import { dbConn } from './db';
import cors from "cors";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3001;
const routes: Array<CommonRoutesConfig> = [];

app.use(express.json());
app.use(cors());

routes.push(new BookRoutes(app))

dbConn()

server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
    console.log(`server listening at http://localhost:${port}`);
});
