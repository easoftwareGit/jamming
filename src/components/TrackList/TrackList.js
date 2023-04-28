import React from "react";

import Track from "../Track/Track";

export default function TrackList(props) {  
 
  return (        
    <div className="TrackList">      
      {props.tracks.map((track) => {
        return (
          <Track 
            track={track}
            key={track.id}
            addToPlayList={props.addToPlayList}
            onRemove={props.onRemove}
            onAdd={props.onAdd}
          />
        );
      })}
    </div>
  );
}