import React from "react";
import logo from '../../Images/spotify32.png'
import './App.css';

export default function AppHeader() {
  return (
    <header className='AppHeader'>
      <div className="AppTitle">
        Eric's Jamming
      </div>      
      <div className='poweredBy'>                  
        powered by<span style={{fontWeight: 'bold'}}> Spotify </span>       
        <img src={logo} className='AppLogo' alt='logo'></img>
      </div>                
    </header>      
  );
}