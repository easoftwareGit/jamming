import React from "react";
import './PlaylistListItem.css';

export default function PlaylistListItem(props) {

  function GetPlaylistTracks() {
    props.onGetTracks(props.id, props.name);
  }

  return (
    <div className="PlaylistListItem">
      <div className="PlaylistListItemInfo"> 
        <div className="PlaylistListName">
          {props.name}
        </div>
      </div>
      <div className="PlaylistListButoonContainer">
        <button
          className="PlaylistListButton"
          onClick={GetPlaylistTracks}          
        >
          Load
        </button>
      </div>
    </div>
  )
}