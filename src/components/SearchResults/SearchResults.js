import React from "react";
import "../App/App.css";
import "./SearchResults.css";

import SearchHeader from './SearchResultsHeader';
import TrackList from "../TrackList/TrackList";

export default function SearchResults(props) {

  return (    
    <div className='AppList SearchResults' >
      <SearchHeader />
      <TrackList 
        tracks={props.tracks}
        addToPlayList={true}        
        onAdd={props.onAdd}        
      />
    </div>
  );
}
