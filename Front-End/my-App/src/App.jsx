import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Update from "./pages/Update";
import PrivateRoute from "./components/PrivateRoute";

import { useSelector } from "react-redux";

import Layout from "./components/Layout";
import AddProduct from "./products/AddProduct";
import Editproduct from "./products/Editproduct";
import Customer from "./Customers/Customer";
import Editcustomer from "./Customers/Editcustomer";
import Invoice from "./Invoice Creation/Invoice";
import InvoiceDetails from "./Invoice Details/InvoiceDetails";

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
          <Route path="/editproduct/:id" element={<Editproduct />}></Route>
          <Route path="/editcustomer/:id" element={<Editcustomer />}></Route>
          <Route element={<Layout />}>
            <Route path="/products" element={<AddProduct />} />
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/customer" element={<Customer />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/invoicedetails" element={<InvoiceDetails />} />
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
