import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddressPage.css";
import Creatable from "react-select/creatable";
import { useAuth } from "../../contexts/AuthContext";

function AddressDetails() {
 const { authUser, isLoggedIn, isAdmin} = useAuth();
const user = "admin";

  const [address, setAddress] = useState({
    id: "",
    name: "",
    contactNumber: "",
    city: "",
    landmark: "",
    street: "",
    state: "",
    zipCode: "",
    user: user
  });
  const navigate = useNavigate();

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const body = JSON.stringify(address);
  console.log(body);

  const fetchAddress = async () => {
    try {
        const auth = "Bearer " + authUser["USERTOKEN"];
      const response = await fetch("http://localhost:8080/api/addresses" ,{
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: auth,

        },
        body:body
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSaveAddress = () => {
    // Implement logic to save address
    fetchAddress();
    console.log("Address saved:", address);
    // Redirect to next step or page
    navigate("/confirm-order");
  };

  return (
    <div className="address-details-container">
        <Creatable
              name="category"
        />
        <br />
      <h2>Add Address</h2>
      <div className="input-field">
        <input
        placeholder="Name"
          type="text"
          name="name"
          value={address.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-field">
        <input
        placeholder="Contact Number"
          type="text"
          name="contactNumber"
          value={address.contactNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-field">
        <input
         placeholder="Street"
          type="text"
          name="street"
          value={address.street}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-field">
        <input
        placeholder="City"
          type="text"
          name="city"
          value={address.city}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-field">
        <input
        placeholder="State"
          type="text"
          name="state"
          value={address.state}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-field">
        <input
        placeholder="Landmark"
          type="text"
          name="landmark"
          value={address.landmark}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-field">
        <input
        placeholder="Zip Code"
          type="text"
          name="zipCode"
          value={address.zipCode}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-field">
      <button onClick={handleSaveAddress}>Save Address</button>
      </div>
      
      <div className="next-button">
      <button style={{backgroundColor:"white", color:"black"}}>Back</button>
      <button >Next</button>
      </div>
    </div>
  );
}

export default AddressDetails;
