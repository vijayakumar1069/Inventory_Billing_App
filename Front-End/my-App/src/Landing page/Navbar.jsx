import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };
  const [scrolled, setScrolled] = useState(false);

  // Add an event listener to track scrolling
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Attach the event listener when the component mounts
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`bg-[#0766AD] p-4 ${
        scrolled ? "fixed top-0 w-full z-50" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <h1>Vijay's Inventory</h1>
        </div>
        {/* Buttons shown in desktop view */}
        <div className="hidden md:flex items-center space-x-6">
          <ScrollLink
            to="home"
            smooth={true}
            className="text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md"
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="about"
            smooth={true}
            className="text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md"
          >
            About
          </ScrollLink>
          <ScrollLink
            to="our-clients"
            smooth={true}
            className="text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md"
          >
            Our Clients
          </ScrollLink>
          <ScrollLink
            to="contact-us"
            smooth={true}
            className="text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md"
          >
            Contact Us
          </ScrollLink>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full hover:shadow-md transition duration-300"
            >
              Log In
            </Link>
            <Link
              to="/"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full hover:shadow-md transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
        {/* Hamburger icon shown in mobile view */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none transition duration-300 transform hover:scale-110"
            onClick={toggleMobileNav}
          >
            ☰
          </button>
        </div>
        {/* Mobile view: buttons displayed in a column */}
        {/* {isMobileNavOpen && (
          <div className="md:hidden flex flex-col w-full absolute top-16 text-center z-[20] bg-[#5F6F52] rounded-lg shadow-xl p-2">
            <Link to="home" className="text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md">
            Home
          </Link>
            <Link to="about"
              className="text-[#000000] hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md"
              onClick={closeMobileNav}
            >
              About
            </Link>
            <Link  to="our-clients"
              className="text-[#000000] hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md"
              onClick={closeMobileNav}
            >
              Our Clients
            </Link >
            <Link to="contactus"
              className="text-[#000000] hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md"
              onClick={closeMobileNav}
            >
              Contact Us
            </Link>
            <div className="flex items-center space-x-4 mx-auto">
              <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-[#000000] font-bold py-2 px-4 rounded-full hover:shadow-md transition duration-300" onClick={closeMobileNav}>
                Log In
              </Link>
              <Link to="/" className="bg-green-500 hover:bg-green-700 text-[#000000] font-bold py-2 px-4 rounded-full hover:shadow-md transition duration-300" onClick={closeMobileNav}>
                Sign Up
              </Link>
            </div>
          </div>
        )} */}
        {/* Mobile view: buttons displayed in a column */}
        {isMobileNavOpen && (
          <div className="md:hidden fixed top-0 left-0 w-full h-full bg-[#5F6F52] z-50">
            <div className="flex flex-col items-center justify-center h-full">
              <ScrollLink
                to="home"
                smooth={true}
                className="text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md"
                onClick={() => {
                  scrollToSection("home");
                  closeMobileNav();
                }}
              >
                Home
              </ScrollLink>
              <ScrollLink
                to="about"
                smooth={true}
                className="text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md"
                onClick={() => {
                  scrollToSection("about");
                  closeMobileNav();
                }}
              >
                About
              </ScrollLink>

              <ScrollLink
                to="our-clients"
                smooth={true}
                className="text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md"
                onClick={() => {
                  scrollToSection("our-clients");
                  closeMobileNav();
                }}
              >
                Our Clients
              </ScrollLink>
              <ScrollLink
                to="contact-us"
                smooth={true}
                className="text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md"
                onClick={() => {
                  scrollToSection("contact-us");
                  closeMobileNav();
                }}
              >
                Contact Us
              </ScrollLink>
              <div className="flex items-center space-x-4 mt-4">
                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-700 text-[#000000] font-bold py-2 px-4 rounded-full hover:shadow-md transition duration-300"
                  onClick={closeMobileNav}
                >
                  Log In
                </Link>
                <Link
                  to="/"
                  className="bg-green-500 hover:bg-green-700 text-[#000000] font-bold py-2 px-4 rounded-full hover:shadow-md transition duration-300"
                  onClick={closeMobileNav}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
