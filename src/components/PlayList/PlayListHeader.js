import React from "react";

export default function PlayListHeader(props) {

  function handleNameChange(event) {
    props.onNameChange(event.target.value)
  }

  return (
    <div className="AppListHeader PlayListHeader">
      <input 
        type='text'
        placeholder="Playlist Name..."
        className="PlayListName"
        value={props.playListName}
        onChange={handleNameChange}
      >
      </input>
      <button 
        className="SaveButton"
        onClick={props.onSave}
      >
        Save
      </button>      
    </div>
  );
}