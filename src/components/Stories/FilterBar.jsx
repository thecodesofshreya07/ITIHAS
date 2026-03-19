import React from "react";
import "./Stories.css";

const FilterBar = ({ 
  selectedEra, 
  onEraChange, 
  eras = ["All", "Ancient", "Medieval", "Modern"],
  selectedRegion,
  onRegionChange,
  regions = ["All", "Europe", "Americas", "Asia"]
}) => {
  return (
    <div className="filter-group" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <div className="filter-item">
        <label htmlFor="era-select" style={{ display: "none" }}>Filter by Era</label>
        <select
          id="era-select"
          className="filter-select"
          value={selectedEra}
          onChange={(e) => onEraChange(e.target.value)}
          aria-label="Filter by era"
        >
          {eras.map((era) => (
            <option key={era} value={era}>
              {era === "All" ? "All Eras" : era}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="region-select" style={{ display: "none" }}>Filter by Region</label>
        <select
          id="region-select"
          className="filter-select"
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
          aria-label="Filter by region"
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region === "All" ? "All Regions" : region}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
