// SortDropdown.js
import React, { useState } from 'react';
import { Switch } from '@mui/material';

const SortDropdown = ({ onSortChange }) => {
  const [selected, setSelected] = useState('date');
  const [isAscending, setIsAscending] = useState(true);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    onSortChange({ sortBy: value, order: isAscending ? 'asc' : 'desc' });
  };

  const handleToggleOrder = () => {
    setIsAscending(!isAscending);
    onSortChange({ sortBy: selected, order: isAscending ? 'desc' : 'asc' });
  };

  return (
    <div style={{ marginTop: '10px', display: 'inline-block', position: 'relative' }}>
      <select
        value={selected}
        onChange={handleChange}
        style={{
          width: '200px',
          height: '35px',
          backgroundColor: '#2C2C3E', // Purple background
          color: '#EDEDED', // Light text
          border: 'none',
          borderRadius: '8px',
          padding: '0 10px',
          fontSize: '14px',
          outline: 'none',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          appearance: 'none',
          backgroundImage: 'linear-gradient(to right, #2C2C3E 10%, transparent 90%)',
          backgroundSize: '200% 100%',
          backgroundPosition: 'right center',
          transition: 'background-position 0.3s ease',
        }}
        onFocus={(e) => {
          e.target.style.backgroundPosition = 'left center';
        }}
        onBlur={(e) => {
          e.target.style.backgroundPosition = 'right center';
        }}
      >
        <option value="created_at">Sort by Date</option>
        <option value="votes">Sort by Popularity</option>
        <option value="comment_count">Most Comments</option>
      </select>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: '10px'
      }}>
        <span style={{
          color: '#EDEDED',
          marginRight: '5px',
          transition: 'transform 0.3s ease'
        }}>
          {isAscending ? '▲' : '▼'}
        </span>
        <Switch
          checked={!isAscending}
          onChange={handleToggleOrder}
          style={{
            color: '#EDEDED'
          }}
        />
      </div>
    </div>
  );
};

export default SortDropdown;
