import React from "react";
import PlaylistListHeader from "./PlaylistListHeader";
import PlaylistListItem from '../PlaylistListItem/PlaylistListItem'
import "../App/App.css";
import './PlaylistList.css'

export default function PlaylistList(props) {
  return (    
    <div className='AppList PlaylistListContainer' >
      <PlaylistListHeader 
        userName={props.userName}
        onNewPlaylist={props.onNewPlaylist}
      />
      {props.playlistList.map((playlistItem) => {
        return (
          <PlaylistListItem 
            name={playlistItem.name}
            key={playlistItem.id}
            id={playlistItem.id}
            onGetTracks={props.onGetTracks}            
          />  
        );
      })}
    </div>
  );
}
