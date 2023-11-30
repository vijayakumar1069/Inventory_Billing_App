
// src/components/Layout.js

import React from 'react';
import Sidebar from './Sidebar';
import PageContent from './PageContent';
import Header from './Header';
import {Outlet} from "react-router-dom"

const Layout = ({ children }) => {
  return (
    <div className=" ">
      <div className="">
      <Header />
      </div>
      <div className="flex  ">
     
      <div className="bg-white"> <Sidebar /></div>
      <div className="flex-1 flex-wrap"><Outlet/></div>
      </div>
      
     
      
    </div>
  );
};

export default Layout;
