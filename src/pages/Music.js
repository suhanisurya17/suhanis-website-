import React from 'react';

function Music() {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Hello, my name is Suhani Surya</h2>
      <p>Here’s what I’m listening to on Spotify:</p>

      <iframe
        style={{ borderRadius: "12px", marginTop: "1rem" }}
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator" 
        width="100%" 
        height="380" 
        frameBorder="0" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
        title="Spotify Embed"
      />
    </div>
  );
}

export default Music;
