import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddressPage.css";
import Creatable from "react-select/creatable";
import { useAuth } from "../../contexts/AuthContext";
import { apiConfig } from "../../config";

function AddressDetails() {
  const { authUser, isLoggedIn, isAdmin } = useAuth();
  const [options, setOptions] = useState([]);
  const [selectedAddress, setSelectedAddresss] = useState("");
  const { productid, quantity } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    fetchAddress();
  }, [navigate]); // Empty dependency array ensures useEffect only runs once on component mount

  const [address, setAddress] = useState({
    id: "",
    name: "",
    contactNumber: "",
    city: "",
    landmark: "",
    street: "",
    state: "",
    zipCode: "",
    user: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlenextclick = () => {
    if (selectedAddress === "") {
      alert("Select Address");
      return;
    } else {
      navigate(
        "/confirm-order/" + productid + "/" + quantity + "/" + selectedAddress
      );
    }
  };

  const fetchAddress = async () => {
    try {
      const response = await fetch(apiConfig.apiBaseUrl + "/addresses", {
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
        // Convert original options to new format
        const dataoptions = data.map((option) => {
          // Remove id and user properties from the object
          const { id, user, ...rest } = option;
          // Create label by stringifying the remaining properties
          var add = "";

          add += rest.name + "-->";
          // add += rest.contactNumber + " ";
          add += rest.city + ", ";
          // add += rest.landmark + " ";
          add += rest.street + " ";
          // add += rest.state + " ";
          // add += rest.zipcode + " ";

          const label = add;
          // Return the object with id and label properties
          return { id, label };
        });
        console.log(dataoptions);
        setOptions(dataoptions);
      } else {
        console.error("Failed to fetch address");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const validateform = () => {
    if (address.name.trim() === "") {
      alert("Enter Name");
      return false;
    }
    if (address.contactNumber.trim() === "" || address.contactNumber.trim().length<10) {
      alert("Enter Valid Contact Number");
      return false;
    }
    if (address.street.trim() === "") {
      alert("Enter street");
      return false;
    }
    if (address.city.trim() === "") {
      alert("Enter City");
      return false;
    }
    if (address.state.trim() === "") {
      alert("Enter state");
      return false;
    }
    if (address.zipCode.trim() === "") {
      alert("Enter zipcode");
      return false;
    }
    return true;
  };
  const handleSaveAddress = async () => {
    if (!validateform()) {
      return;
    }
    // Implement logic to save address
    try {
      const response = await fetch(apiConfig.apiBaseUrl + "/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": localStorage.getItem("USERTOKEN"),
        },
        body: JSON.stringify({
          name: address.name,
          contactNumber: address.contactNumber,
          city: address.city,
          landmark: address.landmark,
          street: address.street,
          state: address.state,
          zipCode: address.zipCode, // fixed typo here
          user: localStorage.getItem("USERID"),
        }),
      });
      if (!response.ok) {
        console.log(response.status);
        throw new Error("Failed to add address");
      }
      await fetchAddress();
      setAddress({
        id: "",
        name: "",
        contactNumber: "",
        city: "",
        landmark: "",
        street: "",
        state: "",
        zipCode: "",
        user: "",
      });
      alert("Address saved successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddress = (event) => {
    setSelectedAddresss(event.target.value);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
    <div className="address-container">
      <div className="address-header">
        <h2>Delivery Address</h2>
        <p>Select an existing address or add a new one</p>
      </div>

      <div className="existing-addresses">
        <h3>Existing Addresses</h3>
        <select
          value={selectedAddress}
          onChange={handleAddress}
          className="address-select"
        >
          <option value="">Select an address</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="new-address-form">
        <h3>Add New Address</h3>
        <div className="form-fields">
          <div className="input-field">
            <input
              placeholder="Name *"
              type="text"
              name="name"
              value={address.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Contact Number *"
              type="text"
              name="contactNumber"
              value={address.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Street *"
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <input
              placeholder="City *"
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <input
              placeholder="State *"
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
              placeholder="Zip Code *"
              type="text"
              name="zipCode"
              value={address.zipCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-field">
            <button type="button" onClick={handleSaveAddress}>
              Save Address
            </button>
          </div>
        </div>
      </div>

      <div className="next-button">
        <button style={{ backgroundColor: "white", color: "black" }} onClick={goBack}>
          BACK
        </button>
        <button type="button" onClick={handlenextclick}>
          NEXT
        </button>
      </div>
    </div>
    </>
    
  );
}

export default AddressDetails;
