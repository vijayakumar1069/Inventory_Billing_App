// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className= " max-full bg-[#092635]  rounded-lg p-4">
      <ul className="flex items-center justify-between">
        <Link to="/dashboard">
          <li>
            <h1 className="text-white text-3xl font-extrabold hover:text-gray-300 transition duration-300 transform hover:scale-105">
              VIJAY's Inventory
            </h1>
          </li>
        </Link>
        <Link to="/update" className='mr-11'>
          <li className="ml-4">
            <img
              src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
              alt="profile"
              className="w-14 h-14 object-cover p-2 rounded-full hover:shadow-lg hover:bg-[#DC84F3] transition duration-300"
            />
          </li>
        </Link>
      </ul>
    </div>
  );
}
