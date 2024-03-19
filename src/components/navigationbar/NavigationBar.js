import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  InputBase,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import SearchIcon from "@mui/icons-material/Search";

import { useAuth } from "../../contexts/AuthContext"


const NavigationBar = () => {
  const {authUser, 
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    isAdmin,
    setIsAdmin
  } = useAuth()
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setAuthUser(null);
    navigate('/login');
  };

  const handleSearch = () => {
    // Send search query to backend
    console.log("search")
    fetch(`/api/products?search=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle search results
        console.log(data);
      })
      .catch((error) => {
        // Handle network error
      });
  };

  return (
    <AppBar position="static">
      <Toolbar className="toolbar-container">
        <div className="left-section">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <ShoppingCart />
          </IconButton>
          <Typography variant="h6" style={{ marginLeft: 8 }}>
            upGrad Eshop
          </Typography>
        </div>
        {isLoggedIn && (
          <div className="center-section">
            <InputBase
              placeholder="   Search... "
              className="search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              endAdornment={
                <IconButton color="inherit" onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              }
            />
          </div>
        )}
        <div className="right-section">
          {isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} to="/home" className="home-button">
                <u>Home</u>
              </Button>
              {isAdmin && (
                <Button color="inherit" component={Link} to="/add-products" className="add-products-button">
                  <u>Add Products</u>
                </Button>
              )}
              <Button color="inherit" onClick={handleLogout} className="logout-button">
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login" >
                <u>Log In</u>
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                <u>Sign Up</u>
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
