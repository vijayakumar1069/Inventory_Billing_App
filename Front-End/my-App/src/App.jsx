import { useState } from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {


  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<Signup/>}></Route>
        <Route path="/home" element={<Dashboard/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>

    </Router>
    
      
    </>
  );
}

export default App;
