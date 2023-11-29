import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Update from "./pages/Update";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/home" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/update" element={<Update />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
