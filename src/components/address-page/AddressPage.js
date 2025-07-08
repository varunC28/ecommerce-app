import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddressPage.css";
import Creatable from "react-select/creatable";
import { useAuth } from "../../contexts/AuthContext";
import { apiConfig } from "../../config";
import { Snackbar, Alert } from '@mui/material';

function AddressDetails() {
  const { authUser, isLoggedIn, isAdmin } = useAuth();
  const [options, setOptions] = useState([]);
  const [selectedAddress, setSelectedAddresss] = useState("");
  const { productid, quantity } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    zipcode: "",
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
    const token = localStorage.getItem("USERTOKEN");
    if (!token || token === "null" || token === "undefined") {
      setErrorMessage("You must be logged in to view addresses. Please log in again.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return;
    }
    try {
      const response = await fetch(apiConfig.apiBaseUrl + "/addresses", {
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
    if (address.zipcode.trim() === "") {
      alert("Enter zipcode");
      return false;
    }
    if (address.landmark.trim() === "") {
      alert("Enter landmark");
      return false;
    }
    return true;
  };
  const handleSaveAddress = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    if (!validateform()) {
      return;
    }
    try {
      const token = localStorage.getItem("USERTOKEN");
      if (!token || token === "null" || token === "undefined") {
        setErrorMessage("You must be logged in to add an address. Please log in again.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
        return;
      }
      const payload = {
        name: address.name,
        contactNumber: address.contactNumber,
        city: address.city,
        landmark: address.landmark,
        street: address.street,
        state: address.state,
        zipcode: address.zipcode
      };
      const headers = {
        "Content-Type": "application/json",
        "X-Auth-Token": token,
      };
      const response = await fetch(apiConfig.apiBaseUrl + "/addresses", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        let errorText = "Failed to add address";
        try {
          const data = await response.json();
          errorText = data.message || JSON.stringify(data);
        } catch (e) {
          errorText = await response.text();
        }
        setErrorMessage(errorText);
        setSuccessMessage("");
        throw new Error(errorText);
      } else {
        setErrorMessage("");
        setSuccessMessage("Address saved successfully!");
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
        zipcode: "",
        user: "",
      });
    } catch (error) {
      if (!successMessage) {
        setErrorMessage("Failed to add address: " + error.message);
      }
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
      <br />

        {/* Error and Success Messages */}
        {errorMessage && (
          <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage("")}> 
            <Alert onClose={() => setErrorMessage("")} severity="error">{errorMessage}</Alert>
          </Snackbar>
        )}
        {successMessage && (
          <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage("")}> 
            <Alert onClose={() => setSuccessMessage("")} severity="success">{successMessage}</Alert>
          </Snackbar>
        )}

        {/* Select Address Dropdown */}
        <div className="select-address-div">
          <span>Select Address</span>
          <select name="address" className="select-address" onChange={handleAddress} value={selectedAddress}>
            <option key="" value="">
              Select
            </option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <h3>-OR-</h3>
        <h2>Add Address</h2>

        {/* Address Form */}
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
            name="zipcode"
            value={address.zipcode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-field">
          <button type="button" onClick={handleSaveAddress}>
            Save Address
          </button>
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
