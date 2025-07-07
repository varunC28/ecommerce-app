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
    <div className="product-details-container">
      <div className="product-image-section">
        <img
          src={product.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={product.name}
          className="product-detail-image"
          onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x200?text=No+Image"; }}
        />
      </div>
      <div className="product-info-container">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontWeight: 700 }}>{product.name}</h2>
          <span style={{
            background: '#3f51b5',
            color: '#fff',
            borderRadius: '20px',
            padding: '6px 18px',
            marginLeft: 18,
            fontWeight: 500,
            fontSize: '1rem',
            display: 'inline-block',
          }}>
            Available Quantity: {product.availableItems}
          </span>
        </div>
        <div style={{ marginBottom: 10, fontSize: '1.1rem' }}>
          <b>Category:</b> {product.category}
        </div>
        <div style={{ marginBottom: 18, color: '#444', fontSize: '1.05rem' }}>
          <b>Description:</b> {product.description}
        </div>
        <div style={{ marginBottom: 18, color: '#e53935', fontWeight: 400, fontSize: '1.3rem' }}>
          ₹ {product.price}
        </div>
        <div className="input-quantity" style={{ marginBottom: 18, width: '100%' }}>
          <input
            type="number"
            min="1"
            max={product.availableItems}
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            placeholder="Enter Quantity"
            style={{
              border: '2px solid lightgray',
              borderRadius: '5px',
              padding: '8px',
              width: '250px',
              height: '30px',
              fontSize: '1.1rem',
              marginBottom: 10,
              outline: 'none',
            }}
          />
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={handleOrder}
            style={{
              width: '80%',
              background: '#3f51b5',
              color: '#fff',
              border: 'none',
              borderRadius: '7px',
              padding: '12px 0',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
