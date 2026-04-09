import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/navbar.jsx";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const count = todos.length;

  const handleAdd = (e) => {
    if (todo.trim() === "") return;

    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all Todos?")) {
      setTodos([]);
    }
  };

  const handleEdit = (e) => {
    const clickedId = e.target.name;

    const newTodos = todos.map((item) => {
      if (item.id === clickedId) {
        setTodo(item.todo);
      }
      return item;
    });
    setTodos(newTodos);
    const deltTodos = todos.filter((item) => item.id !== clickedId);
    setTodos(deltTodos);
  };

  const handleDelete = (e) => {
    const clickedId = e.target.name;

    if (confirm("Are you sure you want to delete this todo?")) {
      const newTodos = todos.filter((item) => item.id !== clickedId);
      setTodos(newTodos);
    }
  };

  const handleCheckbox = (e) => {
    const clickedId = e.target.name;
    const newTodos = todos.map((item) => {
      if (item.id === clickedId) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((item) => {
    if (filter === "active") return !item.isCompleted;
    if (filter === "done") return item.isCompleted;
    return true;
  });

  const handleAll = () => {
    setFilter("all");
  };

  const handleActive = () => {
    setFilter("active");
  };

  const handleDone = () => {
    setFilter("done");
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#0f1117] min-h-[86vh] text-white">
        <div className="card p-5">
          <div className=" bg-slate-900 min-h-[50vh] p-10 rounded-lg border border-slate-600">
            <h2 className="font-bold text-2xl mb-4">Add a Todo</h2>
            <input
              onKeyDown={handleEnter}
              onChange={handleChange}
              value={todo}
              placeholder="What needs to be done?"
              className="w-1/3 px-4 py-2 rounded-lg mr-3 mb-5
              text-lg
  bg-[#1f2937] 
  border border-[#374151] 
  text-white placeholder-slate-400 
  outline-none 
  focus:border-amber-200"
            />
            <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
              {count} tasks
            </span>
            <div className="buttons flex gap-5">
              <button
                onClick={handleAdd}
                className="border font-bold px-4 py-2 my-2 rounded-lg hover:bg-slate-700 transition"
              >
                Save
              </button>
              <button
                onClick={handleClearAll}
                className="border font-bold px-4 py-2 my-2 rounded-lg hover:bg-slate-700 transition"
              >
                Clear all
              </button>
            </div>

            <div className="border-t border-slate-700 my-4"></div>
            <div className="mytodos flex justify-between">
              <h3 className="text-2xl flex items-center font-bold">
                Your Todos
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={handleAll}
                  className="border font-bold px-4 py-2 my-2 rounded-lg hover:bg-slate-700 transition"
                >
                  All
                </button>
                <button
                  onClick={handleActive}
                  className="border font-bold px-4 py-2 my-2 rounded-lg hover:bg-slate-700 transition"
                >
                  Active
                </button>
                <button
                  onClick={handleDone}
                  className="border font-bold px-4 py-2 my-2 rounded-lg hover:bg-slate-700 transition"
                >
                  Done
                </button>
              </div>
            </div>

            <div className="todos">
              {filteredTodos.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex justify-between  bg-slate-900/80 border border-slate-700 px-4 rounded-lg mt-5  hover:bg-slate-800 hover:scale-102 transition-transform duration-200 items-center"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        name={item.id}
                        onChange={handleCheckbox}
                        checked={item.isCompleted}
                        type="checkbox"
                        className="accent-purple-900"
                      />
                      <div className={item.isCompleted ? "line-through" : ""}>
                        {item.todo}
                      </div>
                    </div>
                    <div className="buttons flex gap-5">
                      <button
                        name={item.id}
                        onClick={handleEdit}
                        className="border font-bold px-4 py-2 my-3 rounded-lg hover:bg-slate-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        name={item.id}
                        onClick={handleDelete}
                        className="border font-bold px-4 py-2 my-3 rounded-lg hover:bg-slate-700 transition"
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
      </div>
    </>
  );
}
