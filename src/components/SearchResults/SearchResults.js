import React from "react";
import "../App/App.css";
import "./SearchResults.css";

import TrackListContainer from '../TrackList/TrackListContainer';
import SearchHeader from './SearchResultsHeader';


export default function SearchResults(props) {

  return (
    <div className='AppList SearchResults' >
      <TrackListContainer
        tracks={props.tracks}    
        headerObj={<SearchHeader />}
        addToPlayList={true}
        onAdd={props.onAdd}
      />
    </div>
  );
}
