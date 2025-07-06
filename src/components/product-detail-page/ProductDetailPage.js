// ProductDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./ProductDetailPage.css"
import CategoryTabs from '../category-tabs/CategoryTabs';
import { apiConfig } from '../../config';

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    console.log('Fetching product details...');
    console.log(id);
    fetch(`${apiConfig.apiBaseUrl}/products/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Received product data:', data);
        setProduct(data);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);
  
  const navigate = useNavigate();

  const handleOrder = () => {
    if(quantity==="") {
      alert("Enter Quantity");
      return;
    }
    navigate('/address-page/' + id + "/" + quantity);
    // Handle placing order with selected quantity
    // console.log(`Ordered ${quantity} units of ${product.name}`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <h2>Product Details</h2>
      </div>

      <div className="product-detail-content">
        <div className="product-image-section">
          <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
        </div>
        
        <div className="product-info-section">
          <h3>{product.name}</h3>
          <p className="product-description">{product.description}</p>
          
          <div className="product-details">
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
            <p><strong>Available Items:</strong> {product.availableItems}</p>
            <p><strong>Price:</strong> ${product.price}</p>
          </div>

          <div className="order-section">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              max={product.availableItems}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
            />
            
            <button onClick={handleOrder} className="order-button">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
