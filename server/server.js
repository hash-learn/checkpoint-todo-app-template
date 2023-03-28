const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


const fs = require('fs');

const todos = JSON.parse(fs.readFileSync('./todos.json'));
/*
the schema for a todo should be as follows:
{
    id: number (unique identifier for the todo item - should be auto generated),
    text: string,
    complete: boolean
}

the below API endpoint should return all the todos in the todos.json file
Sample response:
[
    {
        "id": 1,
        "text": "Learn React",
        "complete": false
    },
    {
        "id": 2,
        "text": "Learn Node",
        "complete": false
    },   
    ]
*/
app.get('/todos', (req, res) => {
});


// the below API endpoint should add a new todo to the todos.json file
/*
Sample request body:
{
    "text": "Learn Express"
}
Sample response:
{
    "id": 3,
    "text": "Learn Express",
    "complete": false
}
*/
app.post('/todo/new', (req, res) => {

});

// the below API endpoint should delete a todo from the todos.json file
/*
Sample request:
DELETE /todo/delete/1
Sample response:
{
    "id": 1,
    "text": "Learn React",
    "complete": false
}
*/
app.delete('/todo/delete/:id', (req, res) => {

});

// the below API endpoint should toggle the complete status of a todo in the todos.json file
/*
Sample request:
GET /todo/complete/1
Sample response:
{
    "id": 1,
    "text": "Learn React",
    "complete": true
}
*/
app.get('/todo/complete/:id', (req, res) => {

});

app.listen(5000, () => console.log("Server is running on port 5000"));


