import React from "react";

import Track from "../../Track/Track";

const testData = [
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

export default function TrackListTest() {
  return (    
    <div className="TrackList">
      {testData.map((track) => {
        return (
          <Track 
            track={track}
            key={track.id}
          />
        );
      })}
    </div>
  );
}

// export default function TrackListTest() {
//   return (    
//     <div className="TrackList">
//       <TrackTest />
//       <TrackTest />
//       <TrackTest />
//     </div>
//   )
// }