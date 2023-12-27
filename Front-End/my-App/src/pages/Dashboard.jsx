import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import PieChart from "../components/PieChart";
import {
  FaShoppingBag,
  FaArrowLeft,
  FaUser,
  FaCartPlus,
  FaCheck,
} from "react-icons/fa";

export default function Dashboard() {
  const [details, setDetails] = useState({});
  useEffect(() => {
    const fetching = async () => {
      const res = await fetch("/api/dashboard/getdashboarddetails");
      const data = await res.json();
      if (data.success == false) {
        console.log(data.message);
      }
      setDetails(data);
    };
    fetching();
  }, []);
  console.log(details.topCustomers);
  const pieChartData = {
    labels: details.topProducts
      ? details.topProducts.map((product) => product.productName)
      : [],
    datasets: [
      {
        data: details.topProducts
          ? details.topProducts.map((product) => product.totalsales)
          : [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  const pieCustomerChartData = {
    labels: details.topCustomers
      ? details.topCustomers.map((customer) => customer.name)
      : [],
    datasets: [
      {
        data: details.topCustomers
          ? details.topCustomers.map((customer) => customer.totalQuantity)
          : [],
        backgroundColor: ["#FF9F40", "#FFD740", "#FF6384"],
        hoverBackgroundColor: ["#FF9F40", "#FFD740", "#FF6384"],
      },
    ],
  };
  const pieInvoiceChartData = {
    labels: details.topInvoices
      ? details.topInvoices.map((invoice) => invoice.invoiceNumber)
      : [],
    datasets: [
      {
        data: details.topInvoices
          ? details.topInvoices.map((invoice) => invoice.totalCost)
          : [],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF9F40"],
        hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF9F40"],
      },
    ],
  };
  return (
    <div className="mx-2 my-3 p-2 ">
      <div className="p-2 flex flex-col gap-4 justify-between    flex-wrap  sm:flex-row   ">
        <div className="flex  items-center  gap-5 bg-[#F4EAE0] p-3  rounded-lg ">
          <FaShoppingBag
            size={30}
            className="bg-yellow-300 rounded-full w-10 h-8 "
          />
          <div className=" flex flex-col items-center">
            <h3 className="text-[#4068f8] font-semibold uppercase  ">
              Total Product Value
            </h3>
            <p className="text-xl font-semibold text-[#000000]">
              $ {details.costoftotalproduct}
            </p>
          </div>
        </div>
        <div className="flex  items-center gap-5 bg-[#F4EAE0] p-3 rounded-lg shadow-md">
          <FaArrowLeft
            size={30}
            className="bg-yellow-300 rounded-full w-10 h-8 "
          />
          <div className="  flex flex-col items-center">
            <h3 className="text-[#426af8] font-semibold uppercase">
              Total Sales
            </h3>
            <p className="text-xl font-semibold text-[#000000]">
              $ {details.totalinvoicecost}
            </p>
          </div>
        </div>
        <div className="flex  items-center gap-5 bg-[#F4EAE0] p-3 rounded-lg">
          <FaUser size={30} className="bg-yellow-300 rounded-full w-10 h-8 " />
          <div className=" flex flex-col items-center">
            <h3 className="text-[#375fec] font-semibold uppercase">
              Total Customer
            </h3>
            <p className="text-xl font-semibold text-[#000000]">
              {" "}
              {details.totalcustomer}
            </p>
          </div>
        </div>
        <div className="flex  items-center gap-5 bg-[#F4EAE0] p-3 rounded-lg">
          <FaCartPlus
            size={30}
            className="bg-yellow-300 rounded-full w-10 h-8 "
          />
          <div className=" flex flex-col items-center">
            <h3 className="text-[#3d62e6] font-semibold uppercase">
              Out Of STock
            </h3>
            <p className="text-xl font-semibold text-[#EF4040]">
              {details.outofstock}
            </p>
          </div>
        </div>
        <div className="flex  items-center gap-5 bg-[#F4EAE0] p-3 rounded-lg">
          <FaCheck size={30} className="bg-yellow-300 rounded-full w-10 h-8 " />
          <div className=" flex flex-col items-center">
            <h3 className="text-[#3858ce] uppercase font-semibold">
              Orders Placed
            </h3>
            <p className="text-xl font-semibold text-[#000000]">
              {details.totalinvoices}
            </p>
          </div>
        </div>
        <div className="flex flex-col my-5 sm:flex-row justify-between  flex-wrap p-3">
          <h1 className="text-2xl font-bold mb-4">Top Selling Product</h1>
          {details.topProducts && (
            <div className="sm:w-2/3 mx-auto ">
              <PieChart data={pieChartData} />
            </div>
          )}

          <h1 className="text-2xl font-bold my-4">Top Buying Customer</h1>
          {details.topCustomers && (
            <div className="sm:w-2/3 mx-auto">
              <PieChart data={pieCustomerChartData} />
            </div>
          )}

          <h1 className="text-2xl font-bold my-4">Top Invoices</h1>
          {details.topInvoices && (
            <div className="sm:w-2/3 mx-auto">
              <PieChart data={pieInvoiceChartData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
