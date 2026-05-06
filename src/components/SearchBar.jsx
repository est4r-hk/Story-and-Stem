import { useState, useEffect } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(query);
    }, 300); // debounce delay

    return () => clearTimeout(delay);
  }, [query, onSearch]);

  return (
    <div className="d-flex justify-content-center my-3">
      <input
        type="text"
        className="form-control w-50 me-2"
        placeholder="Search clothes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;