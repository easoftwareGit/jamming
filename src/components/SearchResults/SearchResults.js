import { useState } from 'react';
import "../App/App.css";
import "./SearchResults.css";

//import TrackList from '../TrackList/TrackList';
import TrackListContainer from '../TrackList/TrackListContainer';
import SearchHeader from './SearchResultsHeader';

export default function SearchResults() {
  return (
    <div className='AppList SearchResults' >
      <TrackListContainer headerObj={<SearchHeader />}/>
      {/* <TrackListContainer headerObj={'Search Results'}/> */}
      {/* <h2>Results</h2>
      <TrackList /> */}
    </div>
  );
}