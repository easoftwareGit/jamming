import React from "react";

import './PlayList.css';
import './PlayListHeader';
import TrackListContainer from "../TrackList/TrackListContainer";
import PlayListHeader from "./PlayListHeader";

export default function PlayList(props) {

  return (
    <div className="AppList PlayList">
      <TrackListContainer 
        tracks={props.tracks}
        headerObj={<PlayListHeader />}
        addToPlayList={false}
        onRemove={props.onRemove}
      />
    </div>
  );
}