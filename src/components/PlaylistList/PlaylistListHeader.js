import React from "react";

export default function PlaylistListHeader(props) {

  function NewPlayList() {
    props.onNewPlaylist();
  }

  return (
    <div className="AppListHeader PlaylistListHeader">
      <div className="PlaylistListInfo">
        <div className="UserName">
          {props.userName}
        </div>
        <div className="YourPlayLists">
          Your Play Lists
        </div>        
      </div>
      <div className="NewButtonContainer">
        <button 
          className="NewButton"
          onClick={NewPlayList}
        >
          New
        </button>
      </div>
    </div>
  );
}