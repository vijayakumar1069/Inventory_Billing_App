import React, { useState } from "react";

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <h1>Vijay's Inventory</h1>
        </div>
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none transition duration-300 transform hover:scale-110"
            onClick={toggleMobileNav}
          >
            ☰
          </button>
        </div>
        <div
          className={`${
            isMobileNavOpen ? "flex" : "hidden"
          } md:flex items-center md:space-x-6 absolute top-16 right-4 left-4 bg-gray-800 rounded-lg shadow-xl p-4`}
        >
          <button className="text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md">
            About
          </button>
          <button className="text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md">
            Our Clients
          </button>
          <button className="text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md">
            Contact Us
          </button>
          <div className="md:flex items-center space-x-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full hover:shadow-md transition duration-300">
              Log In
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full hover:shadow-md transition duration-300">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
