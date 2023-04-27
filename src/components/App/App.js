import React from 'react';
import backgroundImage from '../../Images/teal_background2.jpg';
import './App.css';

import AppHeader from './AppHeader';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../PlayList/PlayList';

function App() {
  return (    
    <div className="App">
      <div className='Background'>
        <img src={backgroundImage} alt='' id='backgroundImage'></img>
      </div>
      <AppHeader />
      <SearchBar />
      <div className='AppInfo'>
        <SearchResults className='AppList'/>        
        <Playlist className='AppList'/>
      </div>
    </div>   
  );
}

export default App;
