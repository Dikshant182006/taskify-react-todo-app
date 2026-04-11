import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/navbar.jsx";

export default function App() {
  const [todo, setTodo] = useState("");
  const [filter, setFilter] = useState("all");

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const count = todos.length;

  const handleAdd = () => {
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
    const selectedTodo = todos.find((item) => item.id === clickedId);

    if (selectedTodo) {
      setTodo(selectedTodo.todo);
      const updatedTodos = todos.filter((item) => item.id !== clickedId);
      setTodos(updatedTodos);
    }
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

  return (
    <>
      <Navbar />

      <div className="min-h-[86vh] bg-slate-900 text-white px-3 py-6 sm:px-6 ">
        <div className="max-w-5xl mx-auto">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-purple -900/20">
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Task Manager
                </h1>
                <p className="text-slate-300 text-sm sm:text-base mt-1">
                  Manage your daily work in a clean and modern way
                </p>
              </div>

              <div className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium w-fit">
                {count} total tasks
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 mb-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Add New Todo</h2>

              <div className="flex flex-col lg:flex-row gap-3">
                <input
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  value={todo}
                  placeholder="Write your next task..."
                  className="w-full lg:flex-1 px-4 py-3 rounded-xl text-sm sm:text-base bg-[#111827]/80 border border-slate-600 text-white placeholder-slate-400 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition"
                />

                <button
                  onClick={handleAdd}
                  className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition font-semibold shadow-lg shadow-purple-900/30 cursor-pointer"
                >
                  Save Task
                </button>
              </div>

              <div className="mt-4">
                <button
                  onClick={handleClearAll}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-500 hover:bg-white/10 transition font-medium cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h3 className="text-xl sm:text-2xl font-bold">Your Todos</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-xl font-medium transition border cursor-pointer ${
                    filter === "all"
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "border-slate-500 hover:bg-white/10"
                  }`}
                >
                  All
                </button>

                <button
                  onClick={() => setFilter("active")}
                  className={`px-4 py-2 rounded-xl font-medium transition border cursor-pointer ${
                    filter === "active"
                      ? "bg-amber-500 border-amber-500 text-black"
                      : "border-slate-500 hover:bg-white/10"
                  }`}
                >
                  Active
                </button>

                <button
                  onClick={() => setFilter("done")}
                  className={`px-4 py-2 rounded-xl font-medium transition border cursor-pointer ${
                    filter === "done"
                      ? "bg-green-600 border-green-600 text-white"
                      : "border-slate-500 hover:bg-white/10"
                  }`}
                >
                  Done
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredTodos.length === 0 ? (
                <div className="text-center py-10 rounded-2xl border border-dashed border-slate-600 bg-white/5">
                  <p className="text-slate-300 text-sm sm:text-base">
                    No todos available here.
                  </p>
                </div>
              ) : (
                filteredTodos.map((item) => (
                  <div
                    key={item.id}
                    className="group flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-4 transition shadow-md"
                  >
                    <div className="flex items-start gap-3 w-full">
                      <input
                        name={item.id}
                        onChange={handleCheckbox}
                        checked={item.isCompleted}
                        type="checkbox"
                        className="mt-1 accent-purple-500 w-4 h-4"
                      />

                      <div className="flex-1">
                        <p
                          className={`text-sm sm:text-base ${
                            item.isCompleted
                              ? "line-through text-slate-400"
                              : "text-white"
                          }`}
                        >
                          {item.todo}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {item.isCompleted ? "Completed task" : "Pending task"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto ">
                      <button
                        name={item.id}
                        onClick={handleEdit}
                        className="px-4 py-2 rounded-xl border border-blue-400/40 text-blue-300 hover:bg-blue-500/10 transition font-medium w-full sm:w-auto cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        name={item.id}
                        onClick={handleDelete}
                        className="px-4 py-2 rounded-xl border border-red-400/40 text-red-300 hover:bg-red-500/10 transition font-medium w-full sm:w-auto cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}