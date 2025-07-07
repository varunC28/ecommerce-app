// CategoryTabs.js
import React, { useState, useEffect } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiConfig } from "../../config";
import "./CategoryTabs.css";

const CategoryTabs = () => {
  const ecommerceurl = apiConfig.apiBaseUrl + "/products/categories";
  const [options, setOptions] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from the backend
    axios
      .get(ecommerceurl)
      .then((response) => {
        console.log(response.data);
        var x = ["all", ...response.data];
        console.log(x);
        const formattedOptions = x.map((item) => ({
          value: item,
          label: item,
        }));
        setOptions(formattedOptions);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    // Set initial value to the first option once options are fetched
    if (options.length > 0) {
      setSelectedButton(options[0].value);
    }
  }, [options]);

  const handleButtonChange = (event, newButtonValue) => {
    setSelectedButton(newButtonValue);
    if (newButtonValue !== null) {
      if (newButtonValue === "all") {
        navigate("/home");
      } else {
        navigate("/category/" + newButtonValue);
      }
    }
  };

  return (
    <div className="category-tabs">
      <ToggleButtonGroup
        value={selectedButton}
        onChange={handleButtonChange}
        exclusive
      >
        {options.map((option, index) => (
          <ToggleButton key={index} value={option.value}>
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

export default CategoryTabs;
