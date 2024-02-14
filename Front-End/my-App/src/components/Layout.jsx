import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="w-full">
        <Header />
      </div>
      <div className="flex flex-1">
        <div className="bg-white w-1/4 md:w-1/4 lg:w-1/6 ">
          <Sidebar />
        </div>
        <div className="flex-1 w-full bg-white p-2 md:p-4 lg:p-6 xl:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
