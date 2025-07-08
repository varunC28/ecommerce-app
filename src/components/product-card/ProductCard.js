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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { useAuth } from "../../contexts/AuthContext";
import { apiConfig } from "../../config";

const ProductCard = ({product,id,onDelete}) => {
  const { id1, name, imageUrl, price, description } = product;
  const navigate = useNavigate();

  // Delete state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");
  const ecommerceurl = apiConfig.apiBaseUrl + "/products";
  const {
    isAdmin,
  } = useAuth();
  
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiConfig.apiBaseUrl}/products/${id}`);
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

  const handleDeleteConfirm = async () => {
    const token = localStorage.getItem("USERTOKEN");
    if (!token || token === "null" || token === "undefined") {
      alert("You must be logged in to delete a product. Please log in again.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return;
    }
    try {
      const response = await fetch(`${ecommerceurl}/${productToDelete.id}`, {
        method: "DELETE",
        headers: {
          "X-Auth-Token": token,
        },
      });
      if (response.ok) {
        setDeleteSuccessMessage("Product deleted successfully");
        onDelete(productToDelete.id);
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Card className="card">
        <CardContent>
          <div className="image">
            <img
              src={imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
              alt={name}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x200?text=No+Image"; }}
            />
          </div>
          <div className="name-price">
            <span className="name">{name}</span>
            <span>${price}</span>
          </div>
          <div className="name-price-description">
            <div className="description">{description}</div>
          </div>
          <div className="buttons">
            <Button
              variant="contained"
              color="primary"
              onClick={handleBuyClick}
            >
              Buy Now
            </Button>
            {isAdmin && (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleEditClick}
                  startIcon={<Edit />}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteClick(product)}
                  startIcon={<Delete />}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{productToDelete?.name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Message */}
      {deleteSuccessMessage && (
        <Snackbar
          open={!!deleteSuccessMessage}
          autoHideDuration={6000}
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