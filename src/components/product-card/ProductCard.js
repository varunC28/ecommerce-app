// ProductCard.js

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import { ShoppingCart, Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css"; // Import the CSS file
import { useAuth } from "../../contexts/AuthContext";

const ProductCard = ({ product }) => {
  const { id, name, imageUrl, price, description } = product;
  const navigate = useNavigate();

  // Delete state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");
  const ecommerceurl = "http://localhost:8080/api/products";
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    isAdmin,
    setIsAdmin,
  } = useAuth();
  //

  // useEffect(() => {
  //   // Fetch products and categories from backend
  //   fetchProducts();
  // }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/products/${id}");
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

  const handleBuyClick = () => {
    // Handle buy button click
    navigate(`/product-detail-page/${id}`);
    console.log(id);
  };

  const handleEditClick = () => {
    navigate(`/modify-product/${id}`);
  };

  const handleDeleteClick = (product) => {
    fetchProducts();
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      // Perform deletion action here, e.g., send delete request to server
      // Example: const response = await fetch(`/api/products/${productToDelete.id}`, { method: 'DELETE' });
      const auth = "Bearer " + authUser["USERTOKEN"];
      const response = await fetch(ecommerceurl + "/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",

          Authorization: auth,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      // Assuming deletion is successful
      setDeleteSuccessMessage(
        `Product ${productToDelete.name} deleted successfully`
      );
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error if deletion fails
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Card className="card">
        <img src={imageUrl} alt={name} className="image" />
        <CardContent className="name-price">
          <Typography variant="h6" className="name">
            {name}
          </Typography>
          <Typography variant="h6" className="price">
            ₹ {price}
          </Typography>
        </CardContent>
        <Typography variant="body2" className="description">
          {description}
        </Typography>
        <div className="buttons">
          <Button
            variant="contained"
            style={{ backgroundColor: "#3f51b5" }}
            onClick={handleBuyClick}
          >
            BUY
          </Button>
          <div className="admin-button">
            {isAdmin && (
              <>
                <Button onClick={handleEditClick} style={{ color: "#3f51b5" }}>
                  <Edit />
                </Button>
                <Button
                  onClick={() => handleDeleteClick(product)}
                  style={{ color: "#3f51b5" }}
                >
                  <Delete />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete {productToDelete?.name}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={confirmDelete}>Confirm</Button>
            <Button onClick={cancelDelete}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Card>
      {/* Delete Success Message */}
      {deleteSuccessMessage && (
        <Snackbar
          className="delete-success-message"
          open={!!deleteSuccessMessage}
          autoHideDuration={100000000}
          onClose={() => setDeleteSuccessMessage("")}
        >
          <Alert onClose={() => setDeleteSuccessMessage("")} severity="success">
            {deleteSuccessMessage}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default ProductCard;
