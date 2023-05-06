import React, { useState, useEffect } from 'react';
import './App.css';

import AppHeader from './AppHeader';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../PlayList/PlayList';
import PlaylistList from '../PlaylistList/PlaylistList';
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
// const testPlaylistList = [
//   {
//     id: 7,
//     name: 'List # 7'
//   },
//   {
//     id: 8,
//     name: 'List # 8'
//   },
//   {
//     id: 9,
//     name: 'List # 9'
//   }
// ];

function App() {
  const newPlayListName = 'New Playlist'

  const [searchResults, setSearchResults] = useState([]);
  const [playListTracks, setPlayListTracks] = useState([]);
  const [playListName, setPlayListName] = useState(newPlayListName);
  const [playlistList, setPlaylistList] = useState([]);  
  const [playListId, setPlayListId] = useState('');
  
  const [userName, setUserName] = useState('Your Name Here');

  function Search(term) {
    Spotify.search(term).then((results) => {
      setSearchResults(results);
    });
  }

  function AddTrack(track) {
    if (playListTracks.find(trackToFind => trackToFind.id === track.id)) {      
      return;
    }
    setPlayListTracks((prevTracks) => [...prevTracks, track]);    
  }

  function RemoveTrack(track) {
    setPlayListTracks((prevTracks) => 
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }

  function SavePlaylist() {
    const trackURIs = playListTracks.map((track) => track.uri);
    // if a new playlist, save it and then update PlaylistLists
    if (!playListId || playListId.length === 0) {
      Spotify.saveNewPlaylist(playListName, trackURIs) 
      .then((results) => {
        GetUserPlayLists();       
      });        
    } else {
      // else editing a playlist
      // 1) change the plalist name
      // 2) delete tracks on spotify
      // 3) add all current to spotify
      // 4) update PlaylistLists
      Spotify.changePlayListDetails(playListId, playListName)
      .then(() => Spotify.deletePlaylistItems(playListId, trackURIs))
      .then(() => Spotify.updatePlaylistItems(playListId, trackURIs))
      .then(() => GetUserPlayLists());
    }
  }

  function UpdatePlayListName(name) {
    setPlayListName(name);
  }

  function GetUserPlayLists() {
    Spotify.getUserPlaylists().then((userPlayLists) => {
      setPlaylistList(userPlayLists);
      setUserName(Spotify.getCurrentUserDisplayName());      
    });
  }

  function GetPlayListTracks(id, name)  {
    Spotify.getPlayListTracks(id).then((playListTracks) => {
      setPlayListTracks(playListTracks);
      if (!playListTracks) {
        setPlayListName('');
      } else {
        setPlayListId(id);
        setPlayListName(name);
      }      
    });
  }

  function NewPlayList() {
    setPlayListId('');
    setPlayListName(newPlayListName);
    setPlayListTracks([]);
  }

  // simulate componentDidMount
  useEffect(() => {
    GetUserPlayLists();
  }, []);

  return (    
    <div className="App">
      <AppHeader />
      <SearchBar onSearch={Search}/>      
      <div className='AppInfo'>
        <SearchResults           
          tracks={searchResults}
          onAdd={AddTrack}
          plId={playListId}
        />        
        <Playlist           
          playListName={playListName}
          tracks={playListTracks}
          onRemove={RemoveTrack} 
          onNameChange={UpdatePlayListName}
          onSave={SavePlaylist}
        />
        <PlaylistList 
          className='AppList'
          playlistList={playlistList}          
          userName={userName}
          onGetTracks={GetPlayListTracks}
          onNewPlaylist={NewPlayList}          
        />
      </div>
    </div>   
  );
}

export default App;
