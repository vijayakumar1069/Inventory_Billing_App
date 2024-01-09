import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      closeMobileNav();
    } else {
      console.error("Element not found with ID:", sectionId);
    }
  };

  return (
    <nav
      className={`bg-[#0766AD] p-4 ${scrolled ? "fixed top-0 w-full z-50" : ""}`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <h1>Vijay's Inventory</h1>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <ScrollLink
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md"
            onClick={() => scrollToSection("home")}
          >
            Home
          </ScrollLink>

          <ScrollLink
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md"
            onClick={() => scrollToSection("about")}
          >
            About
          </ScrollLink>

          <ScrollLink
            to="our-clients"
            spy={true}
            smooth={true}
            duration={500}
            className="text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md"
            onClick={() => scrollToSection("our-clients")}
          >
            Our Clients
          </ScrollLink>

          <ScrollLink
            to="contact-us"
            spy={true}
            smooth={true}
            duration={500}
            className="text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded-md"
            onClick={() => scrollToSection("contact-us")}
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
              to="/signup"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full hover:shadow-md transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="md:hidden">
          <button
            className="text-white focus:outline-none transition duration-300 transform hover:scale-110"
            onClick={toggleMobileNav}
          >
            ☰
          </button>
        </div>

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
