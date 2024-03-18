// ProductDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  useEffect(() => {
    // Fetch product details using id
    fetch(`/api/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const handleOrder = () => {
    // Handle placing order with selected quantity
    console.log(`Ordered ${quantity} units of ${product.name}`);
  };

  return (
    <div>
      {product ? (
        <div className="product-details-container">
          <div className="product-image-container">
            <img src={product.imageURL} alt={product.name} />
          </div>
          <div className="product-info-container">
            <h2>{product.name}</h2>
            <p>Available Quantity: {product.quantity}</p>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
              max={product.quantity} // Set maximum quantity as available quantity
            />
            <button onClick={handleOrder}>PLACE ORDER</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetailsPage;
