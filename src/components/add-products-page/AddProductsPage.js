import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Creatable from "react-select/creatable";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import "./AddProductsPage.css";
import { apiConfig } from "../../config";

function AddProductsPage({ isModifyPage }) {
  const ecommerceurl = apiConfig.apiBaseUrl + "/products";
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const [setData, setSetData] = useState(new Set());

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    manufacturer: "",
    availableItems: "",
    price: "",
    imageUrl: "",
    description: "",
  });
  const { id } = useParams();
  console.log("11");
  console.log("productId==" + id);
  console.log("isModifyPage==" + isModifyPage);

  useEffect(() => {
    axios
      .get(ecommerceurl + "/categories")
      .then((response) => {
        // Assuming your server returns data in an array format
        // Modify this according to your actual API response structure
        const formattedOptions = response.data.map((item) => ({
          value: item,
          label: item,
        }));
        console.log(formattedOptions);
        setOptions(formattedOptions);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures useEffect only runs once on component mount

  const handleCategory = (newValue, actionMeta) => {
    setSelectedOption(newValue);
    console.log("Option selected:", newValue);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isModifyPage && id) {
      // Fetch product details for modification
      fetch(`${ecommerceurl}/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            id: data.id,
            name: data.name,
            category: data.category,
            manufacturer: data.manufacturer,
            availableItems: data.availableItems.toString(),
            price: data.price.toString(),
            imageUrl: data.imageUrl,
            description: data.description,
          });
          // Set the selected category option
          setSelectedOption({ value: data.category, label: data.category });
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [id, isModifyPage, selectedOption]);

  const validateForm = () => {
    if(formData.name.trim() === "") {
      alert("Enter Product Name");
      //document.getElementById("username").focus(); 
      return false;
    }
    if(selectedOption === null || selectedOption.value==="") {
      alert("Select Category");
      //document.getElementById("username").focus(); 
      return false;
    }
    if(formData.manufacturer=== "") {
        alert("Enter Manufacturer Name");
        //document.getElementById("username").focus(); 
        return false;
    }
    if(formData.availableItems=== "") {
      alert("Enter Available Quantity");
      //document.getElementById("username").focus(); 
      return false;
    }
    if(formData.price=== "") {
      alert("Enter Price");
      //document.getElementById("username").focus(); 
      return false;
    }
    return true;
  }

  const handleModifyProduct = async () => {
    const token = localStorage.getItem("USERTOKEN");
    if (!token || token === "null" || token === "undefined") {
      alert("You must be logged in to modify a product. Please log in again.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return;
    }
    try {
      if(!validateForm()) {
        return ;
      }
      const response = await fetch(ecommerceurl + "/" + formData.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": token,
        },
        body: JSON.stringify({
          name: formData.name,
          category: selectedOption.value,
          manufacturer: formData.manufacturer,
          availableItems: parseInt(formData.availableItems),
          price: parseFloat(formData.price),
          imageUrl: formData.imageUrl,
          description: formData.description,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      //const data = await response.json();
      setSuccessMessage(
        `Product ${formData.name} ${
          isModifyPage ? "modified" : "added"
        } successfully`
      );
    } catch (error) {
      alert(error);
    }
  };

  {
    /* Modify Success Message */
  }
  {
    successMessage && (
      <Snackbar
        className="delete-success-message"
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => successMessage("")}
      >
        <Alert onClose={() => successMessage("")} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    );
  }

  const handleAddProduct = async () => {
    const token = localStorage.getItem("USERTOKEN");
    if (!token || token === "null" || token === "undefined") {
      alert("You must be logged in to add a product. Please log in again.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return;
    }
    try {
      if(!validateForm()) {
        return ;
      }
      const response = await fetch(ecommerceurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": token,
        },
        body: JSON.stringify({
          name: formData.name,
          category: selectedOption.value,
          manufacturer: formData.manufacturer,
          availableItems: parseInt(formData.availableItems),
          price: parseFloat(formData.price),
          imageUrl: formData.imageUrl,
          description: formData.description,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      //const data = await response.json();
      setSuccessMessage(
        `Product ${formData.name} ${
          isModifyPage ? "modified" : "added"
        } successfully`
      );
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
    <div className="add-products-container">
      <h2>{isModifyPage ? "Modify Product" : "Add Product"}</h2>
      <form>
        <div className="form-fields">
          <div className="name-field">
            {isModifyPage && <span>Product Name</span>}
            <input
              type="text"
              name="name"
              placeholder={!isModifyPage && "Product Name"}
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="category-field">
            {isModifyPage && <span>Category</span>}
            <Creatable
              isClearable
              isDisabled={isLoading}
              isLoading={isLoading}
              onChange={handleCategory}
              options={options}
              placeholder={!isModifyPage && "Select Category"}
              value={selectedOption}
            />
          </div>
          <div className="manufacturer-field">
            {isModifyPage && <span>Manufacturer</span>}
            <input
              type="text"
              name="manufacturer"
              placeholder={!isModifyPage && "Manufacturer"}
              required
              value={formData.manufacturer}
              onChange={handleChange}
            />
          </div>
          <div className="available-items-field">
            {isModifyPage && <span>Available Items</span>}
            <input
              type="number"
              name="availableItems"
              placeholder={!isModifyPage && "Available Items"}
              required
              value={formData.availableItems}
              onChange={handleChange}
            />
          </div>
          <div className="price-field">
            {isModifyPage && <span>Price</span>}
            <input
              type="number"
              name="price"
              placeholder={!isModifyPage && "Price"}
              required
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="image-url-field">
            {isModifyPage && <span>Image URL</span>}
            <input
              type="text"
              name="imageUrl"
              placeholder={!isModifyPage && "Image URL"}
              required
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>
          <div className="description-field">
            {isModifyPage && <span>Discription</span>}
            <input
              type="text"
              name="description"
              placeholder={!isModifyPage && "Discription"}
              required
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {!isModifyPage && (
            <>
              <button type="button" onClick={handleAddProduct}>
                {"SAVE PRODUCT"}
              </button>
            </>
          )}
          {isModifyPage && (
            <>
              <button type="button" onClick={handleModifyProduct}>
                {"MODIFY PRODUCT"}
              </button>
            </>
          )}
        </div>
      </form>

      {successMessage && (
        // <div className="success-message">{successMessage}</div>
        <Snackbar
          className="add-modify-success-message"
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage("")}
        >
          <Alert onClose={() => setSuccessMessage("")} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
    </>
  );
}

export default AddProductsPage;
