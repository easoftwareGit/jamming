import React from "react";

import TrackListHeader from "./TrackListHeader";
import TrackList from "./TrackList";

export default function TrackListContainer(props) {  
  
  return (
    <div className="TrackListContainer">  
      <TrackListHeader headerObj={props.headerObj}/>
      <TrackList 
        tracks={props.tracks}
        addToPlayList={props.addToPlayList}
        onRemove={props.onRemove}
        onAdd={props.onAdd}
      />        
    </div>
  )
}
