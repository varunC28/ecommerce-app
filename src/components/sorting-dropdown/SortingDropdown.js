import React, { useState } from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import './SortingDropdown.css';

const SortingDropdown = ({ onSort }) => {
  const [sortBy, setSortBy] = useState('default');

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    onSort(newSortBy);
  };

  return (
    <div className="sorting-container">
      <FormControl>
      
      <Select
        labelId="sorting-dropdown-label"
        id="sorting-dropdown"
        value={sortBy}
        onChange={handleSortChange}
      >
        <MenuItem value="default">Default</MenuItem>
        <MenuItem value="price-high-to-low">Price High to Low</MenuItem>
        <MenuItem value="price-low-to-high">Price Low to High</MenuItem>
        <MenuItem value="name-a-to-z">Name A to Z</MenuItem>
        <MenuItem value="name-z-to-a">Name Z to A</MenuItem>
      </Select>
    </FormControl>
    </div>
  );
};

export default SortingDropdown;
