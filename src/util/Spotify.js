import { clientId, redirectUri } from './AppSettings';
const baseURI = 'https://api.spotify.com/v1';

let accessToken;

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      const expiresIn = Number(urlExpiresIn[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      // clear the parameters, so get a new access token when access token expires
      window.history.pushState('Access Token', null, '/');    
    } else {
      let accessUrl = 'https://accounts.spotify.com/authorize';
          accessUrl += '?client_id=' + clientId;
          accessUrl += '&response_type=token';
          accessUrl += '&scope=playlist-modify-public';
          accessUrl += '&redirect_uri=' + redirectUri;
      window.location = accessUrl;
    }
  },
  
  search(searchTerm) {
    const accessToken = Spotify.getAccessToken();
    const searchUri = baseURI + '/search?type=track&q=' + searchTerm;
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    return fetch(searchUri, {headers: headers})
    .then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },
 
  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();    
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    let userId;

    const savePlUri = baseURI + '/me';
    return fetch(savePlUri, {headers: headers})
    .then(response => response.json())
    .then(jsonResponse => {
      userId = jsonResponse.id;
      const userPlUri = baseURI + `/users/${userId}/playlists`;
      return fetch(userPlUri, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      })
      .then(response => response.json()
      ).then(jsonResponse => {
        const playListId = jsonResponse.id;
        const addTracksUri = baseURI + `/playlists/${playListId}/tracks`;
        return fetch(addTracksUri, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
};

export default Spotify;
