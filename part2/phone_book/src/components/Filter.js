import React from 'react';

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <p>Filter shown with</p>
      <input
        type="text"
        placeholder="Enter name to search"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;
