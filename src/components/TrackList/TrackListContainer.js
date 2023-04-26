import React from "react";

import TrackListHeader from "./TrackListHeader";
import TrackList from "./TrackList";

export default function TrackListContainer({headerObj}) {    
  return (
    <div className="TrackListContainer">  
      <TrackListHeader headerObj={headerObj}/>
      <TrackList />        
    </div>
  )
}