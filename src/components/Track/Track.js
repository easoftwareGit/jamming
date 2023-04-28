import React from "react";

import './Track.css';

export default function Track(props) {

  function AddTrack() {    
    props.onAdd(props.track);
  }

  function RemoveTrack() {
    props.onRemove(props.track);    
  }

  function RenderButton() {
    if (props.addToPlayList) {
      return (
        <button 
          className="TrackButton" 
          id="AddTrack"
          onClick={AddTrack}
        >
          +
        </button>
      );
    } else {
      return (
        <button 
          className="TrackButton" 
          id="RemoveTrack"
          onClick={RemoveTrack}
        >
          -
        </button>
      );
    }
  }

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
      <div className="TrackButtonContainer">
        {RenderButton()}
      </div>
    </div>
  );
}
