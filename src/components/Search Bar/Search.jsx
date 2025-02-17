import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    // console.log(value);
    onSearch(value); 
  };

  return (
    <div className="flex justify-center items-center my-10 md:w-1/2 rounded-2xl" style={{width: '100%'}}>
  <input
    type="text"
    className="w-1/2 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Search for product..."
    value={query}
    onChange={handleInputChange}
  />
</div>

  );
}