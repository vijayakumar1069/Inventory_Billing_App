import React from "react";
import Sidebar from "./Sidebar";

import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="">
      <div className="w-full ">
        <Header />
      </div>
      <div className="flex ">
        <div className="bg-white">
          <Sidebar />
        </div>
        <div className="flex-1 flex-wrap">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
