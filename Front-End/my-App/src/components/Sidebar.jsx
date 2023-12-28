import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-24 sm:w-48 md:w-64 bg-[#86B6F6] text-white overflow-hidden">
      <ul className="flex flex-col gap-7 p-1">
        <li className="bg-white text-black p-3 text-center rounded-lg hover:bg-red-600 transform hover:scale-105 transition duration-300">
          <Link to="/dashboard" className="text-sm">
            Dashboard
          </Link>
        </li>
        <li className="bg-white text-center text-black p-3 rounded-lg hover:bg-red-600 transform hover:scale-105 transition duration-300">
          <Link to="/products">Product</Link>
        </li>
        <li className="bg-white text-center text-black p-3 rounded-lg hover:bg-red-600 transform hover:scale-105 transition duration-300">
          <Link to="/customer">Customers</Link>
        </li>
        <li className="bg-white text-center text-black p-3 rounded-lg hover:bg-red-600 transform hover:scale-105 transition duration-300">
          <Link to="/invoice">Invoice</Link>
        </li>
        <li className="bg-white text-center text-black p-3 rounded-lg hover:bg-red-600 transform hover:scale-105 transition duration-300">
          <Link to="/invoicedetails">Invoice Details</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
