import React from "react";

export default function PlayListHeader() {
  return (
    <div className="PlayListHeader">
      <input 
        type='text'
        placeholder="Playlist Name..."
        className="PlayListName"
      >
      </input>
      <button className="SaveButton">
        Save
      </button>      
    </div>
  );
}