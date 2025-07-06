import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import CategoryTabs from "../category-tabs/CategoryTabs";
import ProductCard from "../product-card/ProductCard";
import SortingDropdown from "../sorting-dropdown/SortingDropdown";
import { Snackbar, Alert } from "@mui/material";
import "./Home.css";
import { apiConfig } from "../../config";

const Home = () => {
  const location = useLocation();
  // Access URL parameters using useParams
  const { name } = useParams();
  const ecommerceurl = apiConfig.apiBaseUrl + "/products";

  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Check if state parameter exists
    if (location.state && location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);
    }
  }, [location]);

  const navigate = useNavigate();

  const fetchDataAndContinue = async () => {
    try {
      const response = await fetch(ecommerceurl);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setDisplayProducts(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchDataAndContinue();
  }, []);

  useEffect(() => {
    if (name) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
      setDisplayProducts(filteredProducts);
    } else {
      setDisplayProducts(products);
    }
  }, [name, products]);

  const handleSort = (sortType) => {
    let sortedProducts = [...displayProducts];
    switch (sortType) {
      case "price-low-to-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high-to-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-a-to-z":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-to-a":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    setDisplayProducts(sortedProducts);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`${ecommerceurl}/${productId}`, {
        method: "DELETE",
        headers: {
          "X-Auth-Token": localStorage.getItem("USERTOKEN"),
        },
      });
      if (response.ok) {
        // Remove the deleted product from the state
        setProducts(products.filter((product) => product.id !== productId));
        setDisplayProducts(displayProducts.filter((product) => product.id !== productId));
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="category-tabs-container">
        <CategoryTabs />
      </div>
      <div className="sorting-container">
        <SortingDropdown onSort={handleSort} />
      </div>
      <div className="products-container">
        {displayProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            id={product.id}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {successMessage && (
        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage("")}
        >
          <Alert onClose={() => setSuccessMessage("")} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Home;
