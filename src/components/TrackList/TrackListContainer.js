import React from "react";

import TrackListHeader from "./TrackListHeader";
import TrackList from "./TrackList";
// import TrackListTest from "./TrackListTest";

export default function TrackListContainer({headerObj}) {    
  return (
    <div className="TrackListContainer">  
      <TrackListHeader headerObj={headerObj}/>
      <TrackList />        
    </div>
  )
}