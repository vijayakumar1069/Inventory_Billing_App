// src/components/Sidebar.js

import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen  relative bottom-0  w-24 bg-lime-800 sm:w-48  md:w-64  text-white">
      <ul className="flex flex-col gap-7  p-1 ">
        <li className="boder border-red-500 bg-white text-black p-3 text-center rounded-lg hover:bg-red-600">
          <Link to="/dashboard" className="text-sm ">Dashboard</Link>
        </li>
        <li className="boder border-red-500 bg-white text-center  text-black p-3 rounded-lg hover:bg-red-600">
          <Link to="/products">Product </Link>
        </li>
        <li  className="boder border-red-500 bg-white text-center  text-black p-3 rounded-lg hover:bg-red-600">
          <Link to="/customer">Customers</Link>
        </li>
         <li className="boder border-red-500 bg-white text-center  text-black p-3 rounded-lg hover:bg-red-600">
          <Link to="/invoice">Invoice</Link>
        </li>

        {/* <li>
          <Link to="/addition">Addition</Link>
        </li>
        <li>
          <Link to="/search">Searching and Filtering</Link>
        </li>
        <li>
          <Link to="/notifications">Notifications</Link>
        </li>  */}
      </ul>
    </div>
  );
};

export default Sidebar;
