import axios from 'axios';
import { useEffect, useState } from 'react';

function TodoModel() {
  let [todos, setTodos] = useState([]);
  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = () => {
    axios
      .get('/todomodel')
      .then((res) => {
        setTodos(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addTodo = (event) => {
    event.preventDefault();
    let todoObject = {
      status: event.target.status.value,
      title: event.target.title.value,
      description: event.target.description.value,
    };
    axios
      .post(`/todomodel/create`, todoObject)
      .then((res) => {
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card-container">
      <h1>Todo Form</h1>
      <form onSubmit={addTodo} className="box">
        <select name="status" className="todo-user-input">
          <option value="1">Complete</option>
          <option value="0">incomplete</option>
        </select>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          className="todo-user-input"
        />
        <textarea
          placeholder="Enter Description"
          name="description"
          cols="20"
          rows="5"
          className="todo-user-input"
        ></textarea>

        <button>Add</button>
      </form>
      {todos.map((val, index) => (
        <div className="card">
          <p>Status:{val.status ? 'complete' : 'incomplete'}</p>
          <p>Title:{val.title}</p>
          <p>Description:{val.description}</p>
          <p>createdAt:{val.createdAt}</p>
          <p>updatedAt:{val.updatedAt}</p>
        </div>
      ))}
    </div>
  );
}
export default TodoModel;
