import { useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      console.log(jsonData);
      setTodos(jsonData);
    } catch (err) {
      console.log("OH NO!", err);
    }
  };

  const handleDelete = async (todo_id) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${todo_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      setTodos((todos) => todos.filter((todo) => todo.todo_id !== todo_id));
      console.log("todo deleted");
    } catch (err) {
      console.log("OH NO!", err);
    }
  };

  console.log(todos);
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            const { description, todo_id } = todo;
            return (
              <tr key={todo_id}>
                <td>{description}</td>
                <td>
                  <EditTodo />
                </td>
                <td>
                  <button
                    className="btn btn-danger" 
                    onClick={() => handleDelete(todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
