import React, { useState, useCallback } from 'react';
import './App.css';

import AppHeader from './AppHeader';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

// const testPlayList = [
//   {
//     id: 1,    
//     name: 'The Camera Eye',
//     artist: 'Rush',
//     album: "Moving Pictures"
//   },
//   {
//     id: 2,    
//     name: 'Why',
//     artist: 'Joe Satriani',
//     album: "The Extremist"
//   },
//   {
//     id: 3,    
//     name: 'Shoot to Thrill',
//     artist: 'AC/DC',
//     album: "Back in Black"
//   }
// ];

// const testSearchResults = [
//   {
//     id: 4,    
//     name: 'Dance the Night Away',
//     artist: 'Van Halen',
//     album: "Van Halen II"
//   },
//   {
//     id: 5,    
//     name: 'Little Guitars',
//     artist: 'Van Halen',
//     album: "Diver Down"
//   },
//   {
//     id: 6,    
//     name: 'Jump',
//     artist: 'Van Halen',
//     album: "1984"
//   }
// ];

function App() {

  // const [searchResults, setSearchResults] = useState(testSearchResults);
  // const [playListTracks, setPlayListTracks] = useState(testPlayList);
  const [searchResults, setSearchResults] = useState([]);
  const [playListTracks, setPlayListTracks] = useState([]);
  const [playListName, setPlayListName] = useState("New Playlist");

  function Search(term) {
    Spotify.search(term).then(setSearchResults);
  }

  function AddTrack(track) {
    if (playListTracks.find(trackToFind => trackToFind.id === track.id)) {      
      return;
    }
    setPlayListTracks((prevTracks) => [...prevTracks, track]);
    console.log(`playListTracks length = ${playListTracks.length}`);
  }

  function RemoveTrack(track) {
    setPlayListTracks((prevTracks) => 
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }

  function SavePlaylist() {
    const trackURIs = playListTracks.map((track) => track.uri);
    Spotify.savePlaylist(playListName, trackURIs) 
    .then(() => {
      setPlayListName("New Playlist");
      setPlayListTracks([]);
    });
    
  }

  function UpdatePlayListName(name) {
    setPlayListName(name);
  }

  return (    
    <div className="App">
      <AppHeader />
      <SearchBar onSearch={Search}/>
      <div className='AppInfo'>
        <SearchResults 
          className='AppList'
          tracks={searchResults}
          onAdd={AddTrack}
        />        
        <Playlist 
          className='AppList'
          playListName={playListName}
          tracks={playListTracks}
          onRemove={RemoveTrack} 
          onNameChange={UpdatePlayListName}
          onSave={SavePlaylist}
        />
      </div>
    </div>   
  );
}

export default App;
