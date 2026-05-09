import React from "react";

function FilterBar({ filters, setFilters, categories = [] }) {

  const handleChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      price: "",
      sort: ""
    });
  };

  return (
    <div className="container my-3">
      <div className="row g-2 justify-content-center">

        {/* CATEGORY (DYNAMIC) */}
        <div className="col-md-3">
          <select
            className="form-select"
            value={filters.category}
            onChange={(e) => handleChange("category", e.target.value)}
          >
            <option value="">All Categories</option>

            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* PRICE */}
        <div className="col-md-3">
          <select
            className="form-select"
            value={filters.price}
            onChange={(e) => handleChange("price", e.target.value)}
          >
            <option value="">All Prices</option>
            <option value="low">Below 1000</option>
            <option value="mid">1000 - 3000</option>
            <option value="high">Above 3000</option>
          </select>
        </div>

        {/* SORT */}
        <div className="col-md-3">
          <select
            className="form-select"
            value={filters.sort}
            onChange={(e) => handleChange("sort", e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
          </select>
        </div>

        {/* CLEAR */}
        <div className="col-md-2">
          <button
            className="btn btn-outline-dark w-100"
            onClick={clearFilters}
          >
            Clear
          </button>
        </div>

      </div>
    </div>
  );
}

export default FilterBar;