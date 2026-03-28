import { useState } from 'react'
import Navbar from './components/navbar'

export default function App() {
  return (
    <>
      <nav className="bg-purple-800 text-white flex justify-between items-center px-10 py-4">
        <h1 className="text-3xl font-bold">Taskify</h1>

        <ul className="flex gap-10 text-xl font-medium">
          <li className="cursor-pointer hover:text-gray-200 transition">Home</li>
          <li className="cursor-pointer hover:text-gray-200 transition">Your Todos</li>
        </ul>
      </nav>

      <div className="w-[90vw] mx-auto mt-8 rounded-2xl bg-purple-200 p-8 min-h-[50vh]">
        <h2 className="text-3xl font-bold mb-4">Add a Todo</h2>

        <div className="flex items-center gap-3 mt-3">
          <input
            type="text"
            placeholder="Enter your task"
            className="flex-1 rounded-lg px-4 py-2 outline-none"
          />
          <button className="bg-purple-700 text-white font-semibold px-5 py-2 rounded-lg hover:bg-purple-800 transition">
            Add
          </button>
        </div>

        <h2 className="text-3xl font-bold mt-10 mb-4">Your Todos</h2>

        <div className="flex gap-3 mt-4">
          <button className="bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-800 transition">
            Edit
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition">
            Delete
          </button>
        </div>
      </div>
    </>
  );
}