import { useState } from "react";

// Controlled input: React state is the single source of truth
function SearchBar({ onFilterChange }) {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    onFilterChange(e.target.value); // send typed text UP to the parent
  };

  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search movies..."
      aria-label="Search movies by name"
      value={text}
      onChange={handleChange}
    />
  );
}

export default SearchBar;
