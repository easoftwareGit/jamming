import React, { useState, useCallback } from "react";
import './SearchBar.css';

export default function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  function Search() {
    props.onSearch(searchTerm);
  }

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="SearchBar">
      <input 
        type='text'
        value={searchTerm}        
        placeholder='Enter a Song, Album or Artist'
        className="SearchText"  
        onChange={handleSearchTermChange}
      >
      </input>
      <button 
        className="SearchButton"
        onClick={Search}
      >
        Search
      </button>
    </div>
  );
}