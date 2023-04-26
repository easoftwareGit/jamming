import React from "react";

import './PlayList.css';
import './PlayListHeader';
// import TrackList from "../TrackList/TrackList";
import TrackListContainer from "../TrackList/TrackListContainer";
import PlayListHeader from "./PlayListHeader";

export default function PlayList() {
  return (
    <div className="AppList PlayList">
      <TrackListContainer headerObj={<PlayListHeader />}/>
      {/* <PlayListHeader />
      <TrackList /> */}
    </div>
  );
}