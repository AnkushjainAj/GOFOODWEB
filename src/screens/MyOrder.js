import React, { useEffect, useState } from "react";
import Ftr from '../components/Ftr';
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);

  const fetchMyOrder = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      const response = await fetch("http://localhost:5001/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOrderData(data.orderData); // Access orderData from the response
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          {orderData ? (
            orderData.order_data && orderData.order_data.length > 0 ? (
              orderData.order_data
                .slice(0)
                .reverse()
                .map((order, orderIndex) => (
                  <React.Fragment key={orderIndex}>
                    <div className="mb-3">
                      {order[0]?.Order_date && (
                        <div className="m-auto mt-5">
                          {/* <h4 className="text-primary">{new Date(order[0].Order_date).toLocaleDateString()}</h4> */}
                          <hr />
                        </div>
                      )}
                      {order.slice(1).map((arrayData, index) => (
                        <div key={`${orderIndex}-${index}`} className="col-12 col-md-6 col-lg-4 mb-3">
                          <div
                            className="card mt-3 shadow-sm border-light"
                            style={{ width: "100%", maxHeight: "400px" }}
                          >
                            <img
                              src={arrayData.photo}
                              className="card-img-top"
                              alt={arrayData.name}
                              style={{ height: "180px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{arrayData.name}</h5>
                              <p className="card-text">Qty: {arrayData.qty}</p>
                              <p className="card-text">Size: {arrayData.size}</p>
                              <p className="card-text">
                                Date: {new Date(order[0].Order_date).toLocaleDateString()}
                              </p>
                              <div className="d-inline ms-2 fs-5 text-success">
                                ₹{arrayData.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </React.Fragment>
                ))
            ) : (
              <div className="text-center mt-5">
                <h5>No orders found.</h5>
                <img src="path/to/empty-state-image.png" alt="No Orders" style={{ maxWidth: '200px' }} />
              </div>
            )
          ) : (
            <div className="text-center mt-5">
              <div >No Data Found
              </div>
            </div>
          )}
        </div>
      </div>

      <Ftr />
    </div>
  );
}
