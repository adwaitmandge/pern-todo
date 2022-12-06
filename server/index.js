const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(express.json()); //req.body
app.use(cors());

//create todos

//RETURNING * is used anytime you insert or update or delete, anytime you perform these actions, you are would want to return the data

//DO NOT USE RETURNING * WITH POSTGRES COMMANDS THAT USE 'SELECT' BECAUSE SELECT BY DEFAULT RETURNS STUFF
app.post("/todos", async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const newTodo = await pool.query(
      "insert into todo(description) values($1) returning *",
      [description]
    );
    console.log(newTodo);
    //newTodo is basically an object containing information about our insert operation, the actual data inserted can be found in a property called rows which is an array and it is always going to contain the informatino that was inserted
    res.json(newTodo);
    console.log(req.body);
  } catch (error) {
    console.error(error);
  }
});

//get all todos

//The query returned from any CRUD operation is always going to be an object, any information about the record that was CRUDed can be found in the rows property of that object
//No need to add RETURNING to select operation as select always returns back some data
app.get("/todos", async (req, res) => {
  const allTodos = await pool.query("select * from todo");
  console.log(allTodos.rows);
  res.json(allTodos.rows);
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fetchTodo = await pool.query(
      "select * from todo where todo_id = $1",
      [id]
    );
    res.json(fetchTodo.rows[0]);
    console.log(fetchTodo.rows[0]);
  } catch (error) {
    console.log("OH NO, ERROR!", error);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    console.log(id, description);
    const updatedTodo = await pool.query(
      "update todo set description = $1 where todo_id=$2",
      [description, id]
    );
    res.json("todo was updated");
  } catch (error) {
    console.log("ERROR OCCURRED!", error);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await pool.query(
      "delete from todo where todo_id = $1",
      [id]
    );
    res.json(deletedTodo);
  } catch (error) {
    console.log("ERROR OCCURRED!", error);
  }
});

app.listen(5000, () => {
  console.log("On port 5000");
});
