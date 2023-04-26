import React from "react";

import './PlayList.css';
import './PlayListHeader';
import TrackList from "../TrackList/TrackList";
import PlayListHeader from "./PlayListHeader";

export default function PlayList() {
  return (
    <div className="AppList PlayList">
      <PlayListHeader />
      {/* <input 
        type='text'
        placeholder="Playlist Name..."
      >
      </input> */}
      <TrackList />
    </div>
  );
}