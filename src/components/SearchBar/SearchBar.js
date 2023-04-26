import { useState } from 'react';

export default function SearchBar({ searchText, onSearchTextChange }) {

  return (
    <form>
      <input 
        type='text'
        value={searchText}
        placeholder='Search...'        
      >
      </input>
      <button>
        Search
      </button>
    </form>
  );
}