import React from "react";
import './SearchBar.css';

export default function SearchBar({ searchText, onSearchTextChange }) {

  return (
    <form className="SearchBar">
      <input 
        type='text'
        value={searchText}
        placeholder='Search...'
        className="SearchText"  
      >
      </input>
      <button className="SearchButton">
        Search
      </button>
    </form>
  );
}