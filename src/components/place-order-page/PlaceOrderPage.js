import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PlaceOrderPage.css";
import { useAuth } from "../../contexts/AuthContext";
import { apiConfig } from "../../config";

function OrderDetails({ selectedAddress }) {
  const navigate = useNavigate();
  const { productid, quantity, addressid } = useParams();
  const [product, setProduct] = useState(null);
  const [address, setAddress] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    console.log("Fetching product details...");
    console.log(productid);
    fetch(`${apiConfig.apiBaseUrl}/products/${productid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Received product data:", data);
        setProduct(data);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, []);

  useEffect(() => {
    fetchAddressDetails();
  }, []);

  const { authUser, isLoggedIn, isAdmin } = useAuth();
  const fetchAddressDetails = async () => {
    const token = localStorage.getItem("USERTOKEN");
    if (!token || token === "null" || token === "undefined") {
      alert("You must be logged in to view addresses. Please log in again.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return;
    }
    console.log(1);
    try {
      const response = await fetch(`${apiConfig.apiBaseUrl}/addresses/${addressid}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": token,
        },
      });
      console.log(3);
      if (response.ok) {
        console.log(4);
        const data = await response.json();
        setAddress(data);
        console.log(data);
      } else {
        console.error("Failed to fetch address");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleConfirmOrder = async () => {
    const token = localStorage.getItem("USERTOKEN");
    if (!token || token === "null" || token === "undefined") {
      alert("You must be logged in to place an order. Please log in again.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return;
    }
    try {

      console.log("Quantity "+ quantity);
      console.log("\nUser Id "+ localStorage.getItem("USERID"));
      console.log("\nProduct Id "+ productid);
      console.log("\nAddress Id "+ addressid);

      const response = await fetch(`${apiConfig.apiBaseUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          'X-Auth-Token': token,


        },
        body: JSON.stringify({
          quantity: parseInt(quantity),
          user:localStorage.getItem("USERID") ,
          product: productid,
          address: addressid
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add order");
      }

      //const data = await response.json();
      setSuccessMessage(
        'Order placed successfully'
      );
    } catch (error) {
      alert(error);
    }
    navigate("/home", { state: { successMessage: "Order placed successfully" } });
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="place-order-container">
      <div className="place-order-card">
        <div className="product-details">
          <div className="place-order-title">{product?.name}</div>
          <div className="place-order-label">Quantity: <b>{quantity}</b></div>
          <div className="place-order-label">Category: <b>{product?.category}</b></div>
          <div style={{marginTop: '10px'}}>{product?.description}</div>
          <div className="place-order-price">Total Price : ₹ {product?.price * quantity}</div>
        </div>
        <div className="address-details">
          <div className="place-order-title">Address Details :</div>
          <div className="place-order-label">{address?.name}</div>
          <div className="place-order-label">Contact Number: {address?.contactNumber}</div>
          <div>{address?.street}, {address?.city}</div>
          <div>{address?.state}</div>
          <div>{address?.zipCode}</div>
        </div>
      </div>
      <div className="place-order-btn-row">
        <button onClick={goBack} className="back-button">
          Back
        </button>
        <button onClick={handleConfirmOrder} className="confirm-button">
          Confirm Order
        </button>
      </div>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
