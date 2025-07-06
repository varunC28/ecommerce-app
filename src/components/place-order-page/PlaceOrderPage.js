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
    console.log(1);
    try {
      const response = await fetch(`${apiConfig.apiBaseUrl}/addresses/${addressid}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": localStorage.getItem("USERTOKEN"),
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
    try {

      console.log("Quantity "+ quantity);
      console.log("\nUser Id "+ localStorage.getItem("USERID"));
      console.log("\nProduct Id "+ productid);
      console.log("\nAddress Id "+ addressid);

      const response = await fetch(`${apiConfig.apiBaseUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          'X-Auth-Token': localStorage.getItem("USERTOKEN"),


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
    <div className="order-details-container">
      <div className="order-header">
        <h2>Confirm Order</h2>
        <p>Review your order details before confirming</p>
      </div>

      {product && (
        <div className="product-details">
          <h3>Product Details</h3>
          <div className="product-info">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-text">
              <h4>{product.name}</h4>
              <p>Category: {product.category}</p>
              <p>Manufacturer: {product.manufacturer}</p>
              <p>Price: ${product.price}</p>
              <p>Quantity: {quantity}</p>
              <p>Total: ${(product.price * quantity).toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {address && (
        <div className="address-details">
          <h3>Delivery Address</h3>
          <div className="address-info">
            <p><strong>{address.name}</strong></p>
            <p>{address.street}</p>
            <p>{address.city}, {address.state} {address.zipcode}</p>
            <p>Contact: {address.contactNumber}</p>
            {address.landmark && <p>Landmark: {address.landmark}</p>}
          </div>
        </div>
      )}

      <div className="order-actions">
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
