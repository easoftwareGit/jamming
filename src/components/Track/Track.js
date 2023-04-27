import React from "react";

import './Track.css';

export default function Track(props) {
  return (
    <div className="Track">
      <div className="TrackInfo">
        <div className="TrackName">
          {props.track.name}          
        </div>
        <div>
          {props.track.artist}
        </div>
      </div>
    </div>
  );
}
