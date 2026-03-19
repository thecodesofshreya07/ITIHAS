import React from "react";
import "./Stories.css";

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SearchBar = ({ value, onChange, placeholder = "Search historical events..." }) => {
  return (
    <div className="search-wrapper" style={{ flex: 1, minWidth: "220px", position: "relative" }}>
      <SearchIcon />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search stories"
      />
    </div>
  );
};

export default SearchBar;
