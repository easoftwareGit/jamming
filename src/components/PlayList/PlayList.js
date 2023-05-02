import React from "react";

import './PlayList.css';
import './PlayListHeader';
import TrackList from "../TrackList/TrackList";
import PlayListHeader from "./PlayListHeader";

export default function PlayList(props) {    
  return (
    <div className="AppList PlayList">
      <PlayListHeader 
        playListName={props.playListName}
        onNameChange={props.onNameChange}
        onSave={props.onSave}
      />
      <TrackList 
        tracks={props.tracks}        
        addToPlayList={false}
        onRemove={props.onRemove}
      />
    </div>
  );
}