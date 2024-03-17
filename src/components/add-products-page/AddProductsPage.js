import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddProductsPage.css";

function AddProductsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productManufacturer, setProductManufacturer] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImageURL, setProductImageURL] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isModifyPage = location.pathname === "/modify-product";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Perform form validation if needed

      // Example: Checking if product quantity and price are valid numbers
      if (isNaN(productQuantity) || isNaN(productPrice)) {
        throw new Error("Quantity and price must be valid numbers");
      }

      // Example: Sending form data to server
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productName,
          category: productCategory,
          manufacturer: productManufacturer,
          quantity: parseInt(productQuantity),
          price: parseFloat(productPrice),
          imageURL: productImageURL,
          description: productDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      setSuccessMessage(`Product ${productName} ${isModifyPage ? 'modified' : 'added'} successfully`);

      // Clear form fields after successful submission
      setProductName("");
      setProductCategory("");
      setProductManufacturer("");
      setProductQuantity("");
      setProductPrice("");
      setProductImageURL("");
      setProductDescription("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="add-products-container">
      <div className="heading-container">
        <h1>{isModifyPage ? 'Modify Product' : 'Add Product'}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Manufacturer"
            value={productManufacturer}
            onChange={(e) => setProductManufacturer(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Available Quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={productImageURL}
            onChange={(e) => setProductImageURL(e.target.value)}
            required
          />
          <input
            placeholder="Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
          <button type="submit">{isModifyPage ? 'MODIFY PRODUCT' : 'SAVE PRODUCT'}</button>
        </div>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default AddProductsPage;
