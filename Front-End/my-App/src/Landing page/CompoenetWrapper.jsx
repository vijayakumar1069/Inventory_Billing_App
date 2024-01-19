import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import { About } from "./About";
import ContactUs from "./ContactUs";
import { OurClients } from "./OurClients";

export default function CompoenetWrapper() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <OurClients />
      <ContactUs />
    </div>
  );
}
