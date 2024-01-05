// App.js
import React from "react";
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
import { UpdateInvoice } from "./Invoice Creation/UpdateInvoice";
import { AddProductToInvoiceInUpdatePage } from "./Invoice Details/AddProductToInvoiceInUpdatePage";
import { UpdateExistingInvoiceProductDetails } from "./Invoice Creation/UpdateExistingInvoiceProductDetails";
import Navbar from "./Landing page/Navbar";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";
import VerifySignup from "./pages/VerifySignup";
import {About }from "./Landing page/About";
import {OurClients} from "./Landing page/OurClients";
import ContactUs from "./Landing page/ContactUs";
import Home from "./Landing page/Home";
import CompoenetWrapper from "./Landing page/CompoenetWrapper";

function App() {
  const { currentUser } = useSelector((state) => state.admin);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
   

        {currentUser ? (
          <>
            <Route element={<PrivateRoute />}>
              <Route path="/update/" element={<Update />} />
              <Route path="/editproduct/:id" element={<Editproduct />} />
              <Route path="/editcustomer/:id" element={<Editcustomer />} />
              <Route path="/updateinvoice/:id" element={<UpdateInvoice />} />
              <Route
                path="/addproduct/:id"
                element={<AddProductToInvoiceInUpdatePage />}
              />
              <Route
                path="/reset-password/:userId/:token"
                element={<NewPassword />}
              />
              <Route path="/verify/:id/:token" element={<VerifySignup />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/updateinvoiceexistingproductquantity/:id"
                element={<UpdateExistingInvoiceProductDetails />}
              />
              <Route element={<Layout />}>
                <Route path="/products" element={<AddProduct />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path="/invoicedetails" element={<InvoiceDetails />} />
              </Route>
            </Route>
          </>
        ) : (
          <>
              
                <Route path="/" element={<CompoenetWrapper/>} />
                
                   
           
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
