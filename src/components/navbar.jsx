import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white flex justify-between items-center px-10 py-4">
        <h1 className="text-3xl font-bold">Taskify</h1>

        <ul className="flex gap-10 text-xl font-medium">
          <li className="cursor-pointer hover:text-gray-200 transition">Home</li>
          <li className="cursor-pointer hover:text-gray-200 transition">Your Todos</li>
        </ul>
      </nav>
  );
};

export default Navbar;