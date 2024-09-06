import express, { Request, Response } from 'express';

//NOTE: GET /items: Fetch all items from the MongoDB database.
//NOTE: POST /items: Add a new item to the MongoDB database.
//NOTE: PUT /items/:id: Update an existing item in the MongoDB database.
//NOTE: DELETE /items/:id: Delete an item from the MongoDB database.
//NOTE: Discord webhook when an item is created, updated or deleted
//NOTE: Open weather api that shows the temperature today, store it each request
//NOTE: Random Cat Facts api at the bottom of the screen

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



