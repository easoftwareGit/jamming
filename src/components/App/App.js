//import logo from './logo.svg';
import logo from '../../Images/spotify32.png'
import backgroundImage from '../../Images/teal_background2.jpg';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../PlayList/PlayList';

function App() {
  return (    
    <div className="App">
      <div className='Background'>
        <img src={backgroundImage} alt='' id='backgroundImage'></img>
      </div>
      <header className='App-header'>
        <h1>Eric's Jamming</h1>
        <div className='poweredBy'>          
          powered by<span style={{fontWeight: 'bold'}}> Spotify </span>       
          <img src={logo} className='App-logo' alt='logo'></img>
        </div>                
      </header>      
      <SearchBar />
      <div className='AppInfo'>
        <SearchResults className='AppList'/>        
        <Playlist className='AppList'/>
      </div>

{/*       <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
 */}

    </div>   
  );
}

export default App;
