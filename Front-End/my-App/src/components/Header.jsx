import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-gray-700 mt-10 rounded-lg p-4">
      <ul className="flex items-center justify-between">
        <Link to="/">
          <li>
            <h1 className="uppercase text-white text-2xl font-semibold hover:text-gray-300 transition duration-300 transform hover:scale-105">
              VIJAY's Inventory
            </h1>
          </li>
        </Link>
        <Link to="/update">
          <li>
            <img
              src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
              alt="profile"
              className="w-20 h-20 object-cover p-3 rounded-full hover:shadow-lg hover:bg-[#DC84F3] transition duration-300"
            />
          </li>
        </Link>
      </ul>
    </div>
  );
}
