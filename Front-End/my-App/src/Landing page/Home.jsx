import React from 'react';
import dashboard from "../assets/images/dashboard.png";
import { FaHandPointRight } from "react-icons/fa";

export default function Home() {
  return (
    <header className=' text-white' id='home'>
      <div className="flex flex-col sm:flex-row justify-between p-5">
        <div className="flex flex-col w-full md:w-1/2 mt-5 flex-1">
          <h1 className="text-6xl font-extrabold mb-4 uppercase text-[#fff]">
            Welcome to <span className="text-[#CD5C08]">Vijay's Inventory Billing App</span>
          </h1>
          <div className="flex items-center mb-4">
            <FaHandPointRight className='text-5xl mr-2 text-[#7D0A0A]' />
            <p className="text-lg text-[#fff]">
              Streamline your billing process with our powerful and user-friendly billing application.
              Manage inventory, generate invoices, and track your business transactions seamlessly.
            </p>
          </div>
          <div className="flex items-center mb-4">
            <FaHandPointRight className='text-3xl mr-2 text-[#7D0A0A]' />
            <p className="text-lg text-[#fff]">
              Enhance your business efficiency and stay organized with our comprehensive billing solution.
            </p>
          </div>
          <div className="flex items-center">
            <FaHandPointRight className='text-3xl mr-2 text-[#7D0A0A]' />
            <p className="text-lg text-[#fff]">
              Sign up now and experience the simplicity of managing your inventory and billing tasks in one place.
            </p>
          </div>
        </div>
        <div className="flex-1">
          <img className='rounded-lg mt-5' src={dashboard} alt="Dashboard" />
        </div>
      </div>
    </header>
  );
}
