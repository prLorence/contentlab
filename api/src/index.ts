import express, { Request, Response } from 'express';
import { CommonRoutesConfig } from './base/common-routes';
import * as http from 'http';
import { BookRoutes } from './books/routes';

//NOTE: GET /items: Fetch all items from the MongoDB database.
//NOTE: POST /items: Add a new item to the MongoDB database.
//NOTE: PUT /items/:id: Update an existing item in the MongoDB database.
//NOTE: DELETE /items/:id: Delete an item from the MongoDB database.
//NOTE: Discord webhook when an item is created, updated or deleted
//NOTE: Open weather api that shows the temperature today, store it each request
//NOTE: Random Cat Facts api at the bottom of the screen

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];

app.use(express.json());

routes.push(new BookRoutes(app))

server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
    // our only exception to avoiding console.log(), because we
    // always want to know when the server is done starting up
    console.log(`server listening at http://localhost:${port}`);
});



