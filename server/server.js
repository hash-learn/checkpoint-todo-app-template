const cors = require('cors');
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
*/
