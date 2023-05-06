import { clientId, redirectUri } from './AppSettings';
const baseURI = 'https://api.spotify.com/v1';

let accessToken;
let userId;
let displayName;

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
  
  getCurrentUserId() {
    const accessToken = Spotify.getAccessToken();
    const userUri = baseURI + '/me';
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    if (userId) {
      return userId;
    } else {
      return fetch(userUri, {headers: headers})
      .then(response => {
        return response.json();
      }).then(jsonResponse => {
        userId = jsonResponse.id;
        displayName = jsonResponse.display_name;
        return userId;
      });
    }
  },

  getCurrentUserDisplayName() {
    if (userId) {
      return displayName;
    } else {
      this.getCurrentUserId()
      return displayName;
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

  saveNewPlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    return Promise.resolve(Spotify.getCurrentUserId())
    .then((response) => {
      userId = response;
      const userPlUri = baseURI + `/users/${userId}/playlists`;
      return fetch(userPlUri, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
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
  },

  deletePlaylistItems(playListId, trackUris) {
    if (!playListId || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    const addTracksUri = baseURI + `/playlists/${playListId}/tracks`;
    const body = JSON.stringify({uris: trackUris})
    return fetch(addTracksUri, {
      headers: headers,
      method: 'DELETE',
      body: body
    });
  },

  updatePlaylistItems(playListId, trackUris) {
    if (!playListId || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    const addTracksUri = baseURI + `/playlists/${playListId}/tracks`;
    const body = JSON.stringify({uris: trackUris});
    return fetch(addTracksUri, {
      headers: headers,
      method: 'POST',
      body: body
    });
  },

  getUserPlaylists() {
    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    return Promise.resolve(Spotify.getCurrentUserId())
    .then((response) => {
      userId = response;
      const userPlUri = baseURI + `/users/${userId}/playlists`;
      return fetch(userPlUri, {
        headers: headers,
        method: 'GET'      
      }).then(response => response.json())
      .then(jsonResponse => {
        const playlistJson = jsonResponse.items
        if (!playlistJson) {
          return [];
        }
        return playlistJson.map(playlist => ({
          name: playlist.name,
          id: playlist.id
        }))
      })
    });    
  },

  getPlayListTracks(id) {
    if (!id) {
      return;
    }
    const accessToken = Spotify.getAccessToken();    
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    const playListUri = baseURI + `/playlists/${id}/tracks`;
    return fetch(playListUri, {
      headers: headers,
      method: 'GET'      
    }).then(response => response.json())
    .then(jsonResponse => {      
      if (!jsonResponse.items) {
        return [];
      }
      return jsonResponse.items.map(trackInfo => ({
        id: trackInfo.track.id,
        name: trackInfo.track.name,
        artist: trackInfo.track.artists[0].name,
        album: trackInfo.track.album.name,
        uri: trackInfo.track.uri
      }));
    });
  },

  changePlayListDetails(id, name) {
    if (!id) {
      return;
    }
    const accessToken = Spotify.getAccessToken();    
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    const playListUri = baseURI + `/playlists/${id}`;
    const body = JSON.stringify({name: name})
    return fetch(playListUri, {
      headers: headers,
      method: 'PUT',
      body: body
    });
  }
};

export default Spotify;
