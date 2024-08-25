import React, { useEffect, useState, useRef } from "react";
import "./Card.css"; 
import { useDispatchCart, useCart } from "./ContextReducer";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = options ? Object.keys(options) : [];

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(""); // Message text state
  const navigate = useNavigate();

  // Calculate final price
  let finalPrice = qty * (options[size] ? parseInt(options[size]) : 0);

  const handleAddToCart = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      // If user is not logged in, show login prompt message
      setMessage("Please log in first!");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000); // Hide after 2 seconds
      return;
    }

    // Proceed with adding to cart if the user is logged in
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    if (food.length > 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
      } else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, photo: props.foodItem.img });
      }
    } else {
      try {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          photo: props.foodItem.img
        });
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    }

    // Show message for item added to cart
    setMessage("Item added to cart!");
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000); // Hide after 2 seconds
  };

  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, []);

  return (
    <div className="mt-3 position-relative">
      <div className="card" style={{ width: "19rem", height: "100%" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="Delicious food"
          height={"170px"}
          style={{ objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title">{props.foodItem.name}</h5>
          </div>
          <div>
            <div className="container d-flex justify-content-between align-items-center p-0 mb-2">
              <select className="form-select bg-success text-white rounded" onChange={(e) => setQty(e.target.value)} value={qty}>
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select className="form-select bg-success text-white rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)} value={size}>
                {priceOptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fs-5">Total price:</span>
              <div className="fw-bold">₹{finalPrice}</div>
            </div>
          </div>
          <hr />
          <div className="mt-auto">
            <button className="btn btn-success w-100" onClick={handleAddToCart}>
              <i className="fas fa-shopping-cart me-2"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
      {/* Message */}
      {showMessage && (
        <div className="added-to-cart-message">
          {message}
        </div>
      )}
    </div>
  );
}
