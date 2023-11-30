import React from "react";
import Header from "../components/Header";
import {
  FaShoppingBag,
  FaArrowLeft,
  FaUser,
  FaCartPlus,
  FaCheck,
} from "react-icons/fa";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

export default function Dashboard() {
  return (
    <div className="mx-2 my-3 p-2 ">
      <div className="p-2 flex flex-col gap-4 justify-between    flex-wrap  sm:flex-row   ">
        <div className="flex  items-center gap-5 bg-slate-500 p-3  rounded-lg ">
          <FaShoppingBag
            size={30}
            className="bg-yellow-300 rounded-full w-10 h-8 "
          />
          <div className=" flex flex-col ">
            <h3>Total Sales</h3>
            <p>$ 5432</p>
          </div>
        </div>
        <div className="flex  items-center gap-5 bg-slate-500 p-3 rounded-lg">
          <FaArrowLeft
            size={30}
            className="bg-yellow-300 rounded-full w-10 h-8 "
          />
          <div className="  flex flex-col">
            <h3>Total Expenses</h3>
            <p>$ 5432</p>
          </div>
        </div>
        <div className="flex  items-center gap-5 bg-slate-500 p-3 rounded-lg">
          <FaUser size={30} className="bg-yellow-300 rounded-full w-10 h-8 " />
          <div className=" flex flex-col">
            <h3>Total User</h3>
            <p>$ 5432</p>
          </div>
        </div>
        <div className="flex  items-center gap-5 bg-slate-500 p-3 rounded-lg">
          <FaCartPlus
            size={30}
            className="bg-yellow-300 rounded-full w-10 h-8 "
          />
          <div className=" flex flex-col">
            <h3>Total customers</h3>
            <p>$ 5432</p>
          </div>
        </div>
        <div className="flex  items-center gap-5 bg-slate-500 p-3 rounded-lg">
          <FaCheck size={30} className="bg-yellow-300 rounded-full w-10 h-8 " />
          <div className=" flex flex-col">
            <h3>Total Orders</h3>
            <p>5432</p>
          </div>
        </div>
      </div>
      <div className="flex bg-red-400 flex-col my-5 sm:flex-row justify-between w-full flex-wrap p-3   ">
        <div className="flex-grow ">
          <BarChart style={{ width: "100%", height: "400px" }} />
        </div>
        <div className="">
          <PieChart />
        </div>
      </div>
    </div>
  );
}
