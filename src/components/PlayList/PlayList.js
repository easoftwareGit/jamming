import React from "react";

import './PlayList.css';
import './PlayListHeader';
import TrackListContainer from "../TrackList/TrackListContainer";
import PlayListHeader from "./PlayListHeader";

const testPlayList = [
  {
    id: 1,    
    name: 'The Camera Eye',
    artist: 'Rush',
    album: "Moving Pictures"
  },
  {
    id: 2,    
    name: 'Why',
    artist: 'Joe Satriani',
    album: "The Extremist"
  },
  {
    id: 3,    
    name: 'Shoot to Thrill',
    artist: 'AC/DC',
    album: "Back in Black"
  }
];

export default function PlayList() {
  return (
    <div className="AppList PlayList">
      <TrackListContainer 
        tracks={testPlayList}
        headerObj={<PlayListHeader />}
      />
    </div>
  );
}