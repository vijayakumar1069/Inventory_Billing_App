import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Update from "./pages/Update";
import PrivateRoute from "./components/PrivateRoute";
import Inventorytracking from "./sidebar-pages/Inventorytracking";
import Addition from "./sidebar-pages/Addition";
import SearchingAndFiltering from "./sidebar-pages/SearchingAndFiltering";
import Notications from "./sidebar-pages/Notications";
import Invoice from "./sidebar-pages/Invoice";
import PageContent from "./components/PageContent";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";

import Layout from "./components/Layout";
import AddProduct from "./products/AddProduct";

function App() {
  const { currentUser } = useSelector((state) => state.admin);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/update" element={<Update />}></Route>
          </Route>
          <Route element={<Layout />}>
            <Route path="/products" element={<AddProduct />} />
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Route>
          {/* <Route
            path="/addition"
            element={
              <Layout>
                <Addition />
              </Layout>
            }
          ></Route>
          <Route
            path="/inventory"
            element={
              <Layout>
                <Inventorytracking />
              </Layout>
            }
          ></Route>
          <Route
            path="/search"
            element={
              <Layout>
                <SearchingAndFiltering />
              </Layout>
            }
          ></Route>
          <Route
            path="/notifications"
            element={
              <Layout>
                <Notications />
              </Layout>
            }
          ></Route>
          <Route
            path="/invoice"
            element={
              <Layout>
                <Invoice />
              </Layout>
            }
          ></Route>
          <Route
            path="/product"
            element={
              <Layout>
                <ProductManagement />
              </Layout>
            }
          ></Route>{" "} */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
