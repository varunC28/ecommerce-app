import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, TextField } from '@mui/material';
import { ShoppingCart, Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, isAdmin }) => {
  const { id, name, image, price, description } = product;
  const navigate = useNavigate();

  // Delete state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');

  const handleBuyClick = () => {
    // Handle buy button click
  };

  const handleEditClick = () => {
    navigate(`/modify-product/${id}`);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      // Perform deletion action here, e.g., send delete request to server
      // Example: const response = await fetch(`/api/products/${productToDelete.id}`, { method: 'DELETE' });
      
      // Assuming deletion is successful
      setDeleteSuccessMessage(`Product ${productToDelete.name} deleted successfully`);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting product:', error);
      // Handle error if deletion fails
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Card key={id}>
      <CardContent>
        <img src={image} alt={name} />
        <Typography variant="h5">{name}</Typography>
        <Typography variant="subtitle1">{price}</Typography>
        <Typography variant="body2">{description}</Typography>
        <Button onClick={handleBuyClick}><ShoppingCart /> Buy</Button>
        {isAdmin && (
          <>
            <Button onClick={handleEditClick}><Edit /> Edit</Button>
            <Button onClick={() => handleDeleteClick(product)}><Delete /> Delete</Button>
          </>
        )}
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete {productToDelete?.name}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmDelete}>Confirm</Button>
          <Button onClick={cancelDelete}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Success Message */}
      {deleteSuccessMessage && (
        <Snackbar open={!!deleteSuccessMessage} autoHideDuration={6000} onClose={() => setDeleteSuccessMessage('')}>
          <Alert onClose={() => setDeleteSuccessMessage('')} severity="success">
            {deleteSuccessMessage}
          </Alert>
        </Snackbar>
      )}
    </Card>
  );
};

export default ProductCard;
