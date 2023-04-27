import React from "react";
import "../App/App.css";
import "./SearchResults.css";

import TrackListContainer from '../TrackList/TrackListContainer';
import SearchHeader from './SearchResultsHeader';

const testSearchResults = [
  {
    id: 4,    
    name: 'Dance the Night Away',
    artist: 'Van Halen',
    album: "Van Halen II"
  },
  {
    id: 5,    
    name: 'Little Guitars',
    artist: 'Van Halen',
    album: "Diver Down"
  },
  {
    id: 6,    
    name: 'Jump',
    artist: 'Van Halen',
    album: "1984"
  }
];


export default function SearchResults() {
  return (
    <div className='AppList SearchResults' >
      <TrackListContainer         
        headerObj={<SearchHeader />}
      />
    </div>
  );
}