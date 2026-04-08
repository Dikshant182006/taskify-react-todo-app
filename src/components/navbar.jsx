import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#0f1117] h-[14vh] text-white flex justify-between p-6 w-full border-b border-b-slate-700">
      <span className="bg-linear-to-r from-white to-purple-600 bg-clip-text text-transparent text-3xl font-bold">
        Taskify
      </span>
      <ul className="flex items-center gap-5 px-5 py-5">
        <li className="bg-linear-to-r from-white to-purple-300 bg-clip-text text-transparent text-xl ">Home</li>
        <li className="bg-linear-to-r from-white to-purple-300 bg-clip-text text-transparent text-xl ">Your Todos</li>
      </ul>
    </nav>
  );
};

export default Navbar;
