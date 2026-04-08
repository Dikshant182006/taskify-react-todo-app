import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [todo, setTodo] = useState(""); // this is input
  // loading data
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const count = todos.length;

  // saving data
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleEdit = (e) => {
    const id = e.target.name;
    const selectedText = todos.find((item) => item.id === id);
    setTodo(selectedText.todo);
    const newTodos = todos.filter((item) => item.id !== id); //Keep all todos whose id is not equal to clicked id.
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
    if (todo.trim() === "") return;

    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]; //it makes new array and by spread operator it takes all old todos
    setTodos(newTodos);
    setTodo("");
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

  const handleClear = (e) => {
    if(confirm("Are you sure you want to delete all todos?")) {
      setTodos([]);
      setTodo("");
    }
  }

  const handleEnter = (e) => {
    if(e.key === "Enter") {
      handleAdd();
    }
  }

  return (
    <>
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 h-screen">
      <Navbar />
      <div className="w-[90vw] mx-auto mt-8 rounded-2xl bg-slate-800 shadow-xl p-8 min-h-[50vh] text-[#e2e8f0]">
        <h2 className="text-3xl font-bold mb-4">Add a Todo</h2>

        <div className="flex flex-col w-1/3 gap-3 mt-3">
        <div className="flex gap-3">
          <input
            onChange={handleChange}
            onKeyDown={handleEnter}
            value={todo}
            type="text"
            placeholder="Enter your task"
            className="bg-slate-800 text-white placeholder-gray-400 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
          />
          <p className="bg-gradient-to-r from-sky-400 to-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:cursor-pointer flex gap-2 items-center">Count<span>{count}</span></p>
          </div>
          <div className="flex gap-5">
          <button
            onClick={handleAdd} disabled={todo.trim().length <= 3}
            className="bg-green-700 disabled:bg-red-500 text-white font-semibold px-5 py-2 rounded-lg hover:cursor-pointer"
          >
            Save
          </button>
          <button onClick={handleClear} disabled={todos.length <= 0}
          className="bg-green-700 disabled:bg-red-500 text-white font-semibold px-5 py-2 rounded-lg hover:cursor-pointer ">Clear All</button>
        </div>
        </div>

        <h2 className="text-3xl font-bold mt-10 mb-4">Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && (
            <div className="font-bold my-4">
              No todos available. Add your first task.
            </div>
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
                    checked={item.isCompleted}
                    className="accent-black cursor-pointer"
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex gap-5">
                  <button
                    name={item.id}
                    onClick={handleEdit}
                    className="bg-purple-700 ml-5 px-4 py-2 rounded-lg font-semibold hover:bg-purple-800 transition cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    name={item.id}
                    className="bg-[#dc2626] px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </>
  );
}
