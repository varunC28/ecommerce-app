import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CategoryTabs from '../category-tabs/CategoryTabs';
import ProductCard from '../product-card/ProductCard';
import SortingDropdown from '../sorting-dropdown/SortingDropdown';
import './Home.css';

const Home = () => {
  const { isAdmin } = useAuth();
  const ecommerceurl = "http://localhost:8080/api/products";

  const [products, setProducts] = useState([]);
  const [sortingOption, setSortingOption] = useState('default');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products and categories from backend
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(ecommerceurl);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCategoryChange = (newCategory) => {
    // Handle category change here
    console.log("Selected category:", newCategory);
  };

  const handleSortingChange = (newSortBy) => {
    setSortingOption(newSortBy);
  };

  const handleDeleteProduct = (productId) => {
    // Remove the deleted product from the products array
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <div className="container">
      <div className="category">
        <CategoryTabs onSelectCategory={handleCategoryChange} />
      </div>
      <br />
      <div className="sort">
        <span id="sorting-dropdown-label">Sort By:</span>
        <SortingDropdown onSortChange={handleSortingChange} />
      </div>
      <div className="product-cards">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isAdmin={isAdmin}
            onDeleteProduct={handleDeleteProduct} // Pass the delete function
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
