import { useState } from "react";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [todo, setTodo] = useState(""); // this is input
  const [todos, setTodos] = useState([]); // this is data

  const handleEdit = (e) => {
    const id = e.target.name;

    // let todo = todos.filter((item) => item.id === id);              
    // setTodo(todo[0].todo);
    const selectedText = todos.find(item => item.id === id);
    setTodo(selectedText.todo)
    const newTodos = todos.filter((item) => item.id !== id);        //Keep all todos whose id is not equal to clicked id.
    setTodos(newTodos);
  };

  const handleDelete = (e) => {
    let id = e.target.name;

    if (confirm("Are you sure you want to delete?")) {
      const newTodos = todos.filter((item) => item.id !== id);
      setTodos(newTodos);
    }
  };

  const handleAdd = () => {
    if(todo.trim() === "") return;

    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]; //it makes new array and by spread operator it takes all old todos
    setTodos(newTodos);
    setTodo("");
    console.log(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;

    const newTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="w-[90vw] mx-auto mt-8 rounded-2xl bg-purple-300 p-8 min-h-[50vh]">
        <h2 className="text-3xl font-bold mb-4">Add a Todo</h2>

        <div className="flex items-center gap-3 mt-3">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            placeholder="Enter your task"
            className="flex-1 rounded-lg px-4 py-2 outline-none bg-white"
          />
          <button
            onClick={handleAdd}
            className="bg-purple-700 text-white font-semibold px-5 py-2 rounded-lg hover:bg-purple-800 transition"
          >
            Save
          </button>
        </div>

        <h2 className="text-3xl font-bold mt-10 mb-4">Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && (
            <div className="font-bold m-4">No Todos to display</div>
          )}
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex w-1/2 justify-between mt-5 items-center"
              >
                <div className="flex gap-4">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    value={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex gap-5">
                  <button
                    name={item.id}
                    onClick={handleEdit}
                    className="bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-800 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    name={item.id}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}