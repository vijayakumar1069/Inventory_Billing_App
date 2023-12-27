import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { IoAdd } from "react-icons/io5";
  
export const UpdateInvoice = () => {
  const [previnvoiceDetails, setPrevInvoiceDetails] = useState();
  const params = useParams();
  const paramsid = params.id;
  const [errormessage, setErrorMessage] = useState(false);
  const [successmessage, setSuccessMessage] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [gst, SetGst] = useState(0);
  const [total, setTotalPrice] = useState(0);
  const [formdata, setFormdata] = useState("");
  const navigate = useNavigate();
  const handlechange = (e) => {
    setFormdata(e.target.value);
  };

  const calculatesubtoal = () => {
    if (previnvoiceDetails && previnvoiceDetails.products) {
      const sub = previnvoiceDetails.products.reduce(
        (acc, product) => acc + product.productprice * product.productquantity,
        0
      );

      setSubtotal(sub);
    }
  };
  const calculategst = () => {
    if (previnvoiceDetails && previnvoiceDetails.products) {
      let gstperctentage = 0.18;
      SetGst(gstperctentage * subtotal);
    }
  };
  const calculatetoatl = () => {
    setTotalPrice(subtotal + gst);
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch(
        `/api/invoices/updateexistinginvoice/${paramsid}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formdata }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setErrorMessage(data.message);
        return setSuccessMessage(false);
      }
  
      // Update the status in the component state
      setPrevInvoiceDetails((prevInvoice) => ({
        ...prevInvoice,
        status: data.invoice.status,
      }));
   
  
      setSuccessMessage("Invoice updated successfully");
      navigate("/invoicedetails");
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage(false);
    }
  };
  
  const handledelete = async (delete_id) => {
    console.log("hii");
    try {
      const res = await fetch(
        `/api/invoices/deleteproductfrominvoice/${paramsid}?delete_id=${delete_id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      console.log(data);
      setPrevInvoiceDetails((previnvoice) => ({
        ...previnvoice,
        invoiceNumber: data.invoiceNumber,
        products: data.products,
        customer: data.customer,
      }));
      console.log(previnvoiceDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await fetch(`/api/invoices/updateinvoice/${paramsid}`);

        if (res.ok) {
          const data = await res.json();

          if (data.invoice) {
            // Set the invoice details in your state
            setPrevInvoiceDetails((prevInvoice) => ({
              ...prevInvoice,
              invoiceNumber: data.invoice.invoiceNumber,
              products: data.invoice.products,
              customer: data.invoice.customer,
              status: data.invoice.status,
            }));
          } else {
            setErrorMessage("Invoice not found");
          }
        } else {
          // Handle non-OK status codes
          setErrorMessage("Failed to fetch invoice details");
        }
      } catch (error) {
        setErrorMessage("Error fetching invoice details");
      }
    };
    fetching();
  }, [paramsid]);
  useEffect(() => {
    calculatesubtoal();
    calculategst();
    calculatetoatl();
  }, [previnvoiceDetails, calculatetoatl]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center p-3">
        Invoice Products Details
      </h1>

      {previnvoiceDetails ? (
        <form
          onSubmit={handlesubmit}
          className="bg-white p-4 rounded-md shadow-md w-full sm:w-5/6 mx-auto"
        >
          <div className="mb-4">
            <label className="text-lg  font-semibold">Invoice Number :</label>
            <input
              type="number"
              placeholder="Invoice Number"
              value={previnvoiceDetails.invoiceNumber}
              className="border rounded-md p-2 w-full"
              readOnly
            />
          </div>

          <div className="mb-4 ">
            <label className="text-lg  font-semibold">Products :</label>

            <table className="w-full  p-2 ">
              <thead className="bg-[#eec8ab] border-l border-r ">
                <tr>
                  <th className="py-2 text-center border-l border-r-[#706233] border-r font-semibold text-lg  ">
                    Product Name
                  </th>
                  <th className="py-2 text-center border-l border-r-[#706233] border-r font-semibold text-lg ">
                    Quantity
                  </th>
                  <th className="py-2 text-center border-l border-r-[#706233] border-r font-semibold text-lg ">
                    Price / Quantity
                  </th>
                  <th className="py-2 text-center border-l border-r-[#706233] border-r font-semibold text-lg ">
                    Total Price
                  </th>
                  <th className="py-2 text-center border-l border-r border-r-[#706233] font-semibold text-lg ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {previnvoiceDetails?.products?.map((product, index) => (
                  <tr
                    key={index}
                    className="border-t bg-[#eceae7] hover:bg-[#B0A695] "
                  >
                    <td className="py-2  font-semibold text-lg  border-l border-r-[#0C356A] border-r   text-[#2B3499] text-center">
                      {product.productname}
                    </td>
                    <td className="py-2 font-semibold text-lg border-l border-r-[#0C356A] border-r  text-[#2B3499] text-center">
                      {product.productquantity}
                    </td>
                    <td className="py-2 font-semibold text-lg border-l border-r-[#0C356A] border-r  text-[#2B3499] text-center">
                      {product.productprice}
                    </td>
                    <td className="py-2 font-semibold text-lg border-l border-r-[#0C356A] border-r  text-[#2B3499] text-center">
                      {product.productprice * product.productquantity}
                    </td>
                    <td className="py-2 font-semibold text-lg border-l border-r-[#0C356A] border-r  text-[#2B3499] text-center ">
                      <div className="flex items-center gap-2 sm:gap-5 sm:justify-center ">
                        <Link>
                          <button
                            type="button"
                            onClick={() => {
                              handledelete(product._id);
                            }}
                            className="bg-red-500 text-white p-2 rounded "
                          >
                            <FontAwesomeIcon icon={faXmark} />
                          </button>
                        </Link>

                        <Link
                          to={`/updateinvoiceexistingproductquantity/${paramsid}?productid=${product._id}`}
                          className="bg-blue-500 text-white p-2 rounded"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Link
              to={`/addproduct/${paramsid}`}
              className="flex items-center p-3 bg-[#EC8F5E] justify-center font-semibold text-[#060913] mt-5 rounded-lg uppercase"
            >
              {" "}
              <IoAdd size={32} />
              Product
            </Link>

            <div className="flex flex-col bg-slate-400 mt-7 p-3 rounded-lg ">
              <div className="grid grid-cols-2 gap-6 ">
                <div className="text-left">
                  <h3 className="w-32">Sub Total</h3>
                </div>
                <div className="text-right">$ {subtotal.toFixed(2)}</div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-left">
                  <h3 className="w-64">GST %</h3>
                </div>
                <div className="text-right">$ {gst.toFixed(2)}</div>
              </div>
              <div className="grid grid-cols-2 gap-6 border-t-4 ">
                <div className="text-left">
                  <h3 className="w-32">Grand Total</h3>
                </div>
                <div className="text-right">$ {total.toFixed(2)}</div>
              </div>
            </div>

            <div className="my-6  ">
              <label className="text-lg  font-semibold ">
                Customer Details :{" "}
              </label>
              <div className="flex gap-5 relative left-10">
                <label className="font-semibold text-[#495E57]"> Name :</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={previnvoiceDetails.customer.name}
                  className="text-[#001524] "
                />
              </div>
              <div className="flex gap-5 relative left-10">
                <label className="font-semibold text-[#495E57]">Email :</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={previnvoiceDetails.customer.email}
                  className="text-[#001524] "
                />
              </div>
              <div className="flex gap-5 relative left-10">
                <label className="font-semibold text-[#495E57]">
                  Address :
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  value={previnvoiceDetails.customer.address}
                  className="text-[#001524] "
                />
              </div>
            </div>
          </div>

          <div className="flex gap-5 items-center p-2 sm:justify-end sm:relative sm:top-[-100px]">
            <label className="text-lg  font-semibold">Status : </label>
            <select
              id="status"
              onChange={handlechange}
              className=" bg-[#EADBC8]"
              defaultValue={previnvoiceDetails? previnvoiceDetails.status:"Pending"}
              
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          

          <button className="p-3 border bg-[#001524] text-white uppercase rounded-lg w-full font-semibold hover:bg-[#22668D] ">
            Update
          </button>
          {errormessage && (
            <p className="text-center font-semibold text-red-700">
              {errormessage}
            </p>
          )}
          {successmessage && (
            <p className="text-center font-semibold text-green-700">
              {successmessage}
            </p>
          )}
        </form>
      ) : (
        <p>No products</p>
      )}
    </div>
  );
};
