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
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.admin);
  const [details, setDetails] = useState({});
  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await fetch(
          `/api/dashboard/getdashboarddetails/${currentUser._id}`
        );
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        }
        setDetails(data);
      } catch (error) {
        console.error("Error fetching dashboard details:", error);
      }
    };
    fetching();
  }, [currentUser._id]);

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
    <div className="mx-2 my-3 p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div className="bg-[#F4EAE0] p-3 rounded-lg flex items-center gap-5 hover:scale-x-105 transition duration-300">
          <FaShoppingBag
            size={30}
            className="bg-yellow-300 rounded-full w-10 h-8"
          />
          <div className="flex flex-col items-center">
            <h3 className="text-[#4068f8] font-semibold uppercase">
              Total Product Value
            </h3>
            <p className="text-xl font-semibold text-[#000000]">
              $ {details.costoftotalproduct}
            </p>
          </div>
        </div>

        <div className="bg-[#F4EAE0] p-3 rounded-lg shadow-md flex items-center gap-5 hover:scale-x-105 transition duration-300">
          <FaArrowLeft
            size={30}
            className="bg-yellow-300 rounded-full w-10 h-8"
          />
          <div className="flex flex-col items-center ">
            <h3 className="text-[#426af8] font-semibold uppercase">
              Total Sales
            </h3>
            <p className="text-xl font-semibold text-[#000000]">
              $ {details.totalinvoicecost}
            </p>
          </div>
        </div>

        <div className="bg-[#F4EAE0] p-3 rounded-lg flex items-center gap-5 hover:scale-x-105 transition duration-300">
          <FaUser size={30} className="bg-yellow-300 rounded-full w-10 h-8" />
          <div className="flex flex-col items-center">
            <h3 className="text-[#375fec] font-semibold uppercase">
              Total Customer
            </h3>
            <p className="text-xl font-semibold text-[#000000]">
              {details.totalcustomer}
            </p>
          </div>
        </div>

        <div className="bg-[#F4EAE0] p-3 rounded-lg flex items-center gap-5 hover:scale-x-105 transition duration-300">
          <FaCartPlus
            size={30}
            className="bg-yellow-300 rounded-full w-10 h-8"
          />
          <div className="flex flex-col items-center">
            <h3 className="text-[#3d62e6] font-semibold uppercase">
              Out Of Stock
            </h3>
            <p className="text-xl font-semibold text-[#EF4040]">
              {details.outofstock}
            </p>
          </div>
        </div>

        <div className="bg-[#F4EAE0] p-3 rounded-lg flex items-center gap-5 hover:scale-x-105 transition duration-300">
          <FaCheck size={30} className="bg-yellow-300 rounded-full w-10 h-8" />
          <div className="flex flex-col items-center">
            <h3 className="text-[#3858ce] uppercase font-semibold">
              Orders Placed
            </h3>
            <p className="text-xl font-semibold text-[#000000]">
              {details.totalinvoices}
            </p>
          </div>
        </div>
      </div>

      <div className="my-5">
        <h1 className="text-2xl font-bold mb-4">Top Selling Product</h1>
        {details.topProducts && details.topProducts.length > 0 ? (
          <div className="w-full md:w-2/3 mx-auto bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <PieChart data={pieChartData} />
          </div>
        ) : (
          <p className="text-xl font-semibold text-[#000000]">
            No data available for top-selling products.
          </p>
        )}
      </div>

      <div className="my-5">
        <h1 className="text-2xl font-bold mb-4">Top Buying Customer</h1>
        {details.topCustomers && details.topCustomers.length > 0 ? (
          <div className="w-full md:w-2/3 mx-auto bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <PieChart data={pieCustomerChartData} />
          </div>
        ) : (
          <p className="text-xl font-semibold text-[#000000]">
            No data available for top buying customers.
          </p>
        )}
      </div>

      <div className="my-5">
        <h1 className="text-2xl font-bold mb-4">Top Invoices</h1>
        {details.topInvoices && details.topInvoices.length > 0 ? (
          <div className="w-full md:w-2/3 mx-auto bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <PieChart data={pieInvoiceChartData} />
          </div>
        ) : (
          <p className="text-xl font-semibold text-[#000000]">
            No data available for top invoices.
          </p>
        )}
      </div>
    </div>
  );
}
