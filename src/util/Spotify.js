import { clientId, redirectUri } from './AppSettings';

// const baseURI = 'https://api.spotify.com/v1/';

// let accessToken;
// const Spotify = {

//   getAccessToken() {
//     if (accessToken) {
//       return accessToken;
//     }

//     const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
//     const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
//     if (urlAccessToken && urlExpiresIn) {
//       accessToken = urlAccessToken[1];
//       const expiresIn = Number(urlExpiresIn[1]);
//       window.setTimeout(() => accessToken = '', expiresIn * 1000);
//       // clear the parameters, allowing get a new access token when access token expires
//       window.history.pushState('Access Token', null, '/');    
//     } else {
//       let accessUrl = 'https://accounts.spotify.com/authorize';
//           accessUrl += '?client_id=' + clientId;
//           accessUrl += '&response_type=token';
//           accessUrl += '&scope=playlist-modify-public';
//           accessUrl += '&redirect_uri=' + redirectUri;
//       // const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
//       window.location = accessUrl;
//     }
//   },

//   search(searchTerm) {
//     const accessToken = Spotify.getAccessToken();
//     const searchUri = baseURI + 'search?type=track&q' + searchTerm;
//     return fetch(searchUri, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     })
//     .then(response => {
//       return response.json();
//     })
//     .then(jsonResponse => {
//       if (!jsonResponse.tracks) {
//         return [];
//       }
//       return jsonResponse.tracks.items.map(track => ({
//         id: track.id,
//         name: track.name,
//         artist: track.artist[0].name,
//         album: track.album.name,
//         uri: track.uri
//       }));
//     });
//   },

// };

// export default Spotify;

// const clientId = 'fe7f5430ba544df1ba6293091c067de6'; // Insert client ID here.
// const redirectUri = 'http://localhost:3000/'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
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
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
};

export default Spotify;
