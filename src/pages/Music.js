import React, { useState, useRef, useEffect } from "react";

function Music() {
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Fetch Spotify playlist
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/playlist');
        const data = await response.json();
        if (data.playlist && data.playlist.length > 0) {
          setPlaylist(data.playlist);
        } else {
          // Fallback to demo playlist if Spotify fails
          setPlaylist([
            { title: "Bohemian Rhapsody", artist: "Queen", duration: 355, spotifyUrl: "#" },
            { title: "Hotel California", artist: "Eagles", duration: 390, spotifyUrl: "#" },
            { title: "Stairway to Heaven", artist: "Led Zeppelin", duration: 482, spotifyUrl: "#" },
            { title: "Sweet Child O' Mine", artist: "Guns N' Roses", duration: 303, spotifyUrl: "#" },
            { title: "Don't Stop Believin'", artist: "Journey", duration: 250, spotifyUrl: "#" }
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch playlist:', error);
        // Fallback playlist
        setPlaylist([
          { title: "Demo Track 1", artist: "Demo Artist", duration: 180, spotifyUrl: "#" },
          { title: "Demo Track 2", artist: "Demo Artist", duration: 200, spotifyUrl: "#" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, []);

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      if (isPlaying) audioRef.current.play();
      else audioRef.current.pause();
    }
  }, [isPlaying, currentTrack, volume]);

  const handlePlayPause = () => setIsPlaying(prev => !prev);
  const handleNext = () => setCurrentTrack((prev) => (prev + 1) % playlist.length);
  const handlePrev = () => setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);

  const openSpotify = () => {
    if (playlist[currentTrack]?.spotifyUrl && playlist[currentTrack].spotifyUrl !== "#") {
      window.open(playlist[currentTrack].spotifyUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={displayAreaStyle}>
          <div style={trackInfoStyle}>
            <div style={trackTitleStyle}>🎵 Loading Spotify Playlist...</div>
            <div style={artistStyle}>Connecting to music library...</div>
            <div style={timeStyle}>Please wait...</div>
          </div>
        </div>
      </div>
    );
  }

  if (playlist.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={displayAreaStyle}>
          <div style={trackInfoStyle}>
            <div style={trackTitleStyle}>❌ No tracks available</div>
            <div style={artistStyle}>Unable to load playlist</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Menu Bar */}
      <div style={menuBarStyle}>
        <span style={menuItemStyle}>File</span>
        <span style={menuItemStyle}>Edit</span>
        <span style={menuItemStyle}>View</span>
        <span style={menuItemStyle}>Play</span>
        <span style={menuItemStyle}>Options</span>
        <span style={menuItemStyle}>Help</span>
      </div>

      {/* Main Display */}
      <div style={displayAreaStyle}>
        <div style={trackInfoStyle}>
          <div style={trackTitleStyle}>{playlist[currentTrack]?.title || "Unknown Track"}</div>
          <div style={artistStyle}>{playlist[currentTrack]?.artist || "Unknown Artist"}</div>
          <div style={timeStyle}>
            {formatDuration(currentTime)} / {formatDuration(playlist[currentTrack]?.duration || 0)}
          </div>
          {playlist[currentTrack]?.spotifyUrl && playlist[currentTrack].spotifyUrl !== "#" && (
            <button
              style={spotifyButtonStyle}
              onClick={openSpotify}
              title="Open in Spotify"
            >
              🎵 Play on Spotify
            </button>
          )}
        </div>

        {/* Visualizer */}
        <div style={visualizerStyle}>
          <div style={visualizerBarStyle}>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                style={{
                  ...barStyle,
                  height: isPlaying ? `${Math.random() * 40 + 10}px` : "2px",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={controlPanelStyle}>
        <div style={transportStyle}>
          <button style={controlButtonStyle} onClick={handlePrev}>⏮</button>
          <button style={playButtonStyle} onClick={handlePlayPause}>{isPlaying ? "⏸" : "▶"}</button>
          <button style={controlButtonStyle} onClick={handleNext}>⏭</button>
        </div>

        <div style={volumeStyle}>
          <span style={labelStyle}>Volume</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            style={sliderStyle}
          />
          <span style={volumeDisplayStyle}>{volume}</span>
        </div>
      </div>

      {/* Playlist */}
      <div style={playlistStyle}>
        <div style={playlistHeaderStyle}>Playlist</div>
        <div style={playlistContentStyle}>
          {playlist.map((track, i) => (
            <div
              key={i}
              style={{
                ...playlistItemStyle,
                backgroundColor: i === currentTrack ? "#316AC5" : "transparent",
                color: i === currentTrack ? "white" : "black",
              }}
              onClick={() => { setCurrentTrack(i); setIsPlaying(true); }}
            >
              <span style={trackNumberStyle}>{i + 1}.</span>
              <span style={trackInfoItemStyle}>{track.title} - {track.artist}</span>
              <span style={durationStyle}>{formatDuration(track.duration)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== Styles =====
const containerStyle = { fontFamily: "MS Sans Serif, sans-serif", fontSize: "11px", backgroundColor: "#C0C0C0", border: "1px solid #808080", padding: "2px", display: "flex", flexDirection: "column", width: "400px", margin: "auto" };
const menuBarStyle = { backgroundColor: "#C0C0C0", borderBottom: "1px solid #808080", padding: "4px 8px", display: "flex", gap: "16px" };
const menuItemStyle = { cursor: "pointer", padding: "2px 8px" };
const displayAreaStyle = { backgroundColor: "#000", color: "#0F0", padding: "8px", margin: "4px", border: "2px inset #C0C0C0", minHeight: "80px", fontFamily: "monospace", fontSize: "12px" };
const trackInfoStyle = { textAlign: "center", marginBottom: "8px" };
const trackTitleStyle = { fontSize: "14px", fontWeight: "bold", marginBottom: "4px" };
const artistStyle = { fontSize: "12px", marginBottom: "4px" };
const timeStyle = { fontSize: "10px" };
const visualizerStyle = { display: "flex", justifyContent: "center", alignItems: "flex-end", height: "40px", marginTop: "8px" };
const visualizerBarStyle = { display: "flex", gap: "2px", alignItems: "flex-end" };
const barStyle = { width: "3px", backgroundColor: "#0F0", transition: "height 0.1s ease" };
const controlPanelStyle = { backgroundColor: "#C0C0C0", padding: "8px", margin: "4px", border: "2px inset #C0C0C0", display: "flex", justifyContent: "space-between", alignItems: "center" };
const transportStyle = { display: "flex", gap: "4px" };
const controlButtonStyle = { width: "32px", height: "24px", backgroundColor: "#C0C0C0", border: "1px outset #C0C0C0", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center" };
const playButtonStyle = { ...controlButtonStyle };
const volumeStyle = { display: "flex", alignItems: "center", gap: "8px" };
const labelStyle = { fontSize: "11px" };
const sliderStyle = { width: "80px" };
const volumeDisplayStyle = { fontSize: "11px", minWidth: "20px", textAlign: "right" };
const playlistStyle = { margin: "4px", border: "2px inset #C0C0C0", display: "flex", flexDirection: "column" };
const playlistHeaderStyle = { backgroundColor: "#C0C0C0", padding: "4px 8px", borderBottom: "1px solid #808080", fontWeight: "bold" };
const playlistContentStyle = { backgroundColor: "white", flex: 1, overflow: "auto" };
const playlistItemStyle = { padding: "2px 8px", cursor: "pointer", display: "flex", borderBottom: "1px solid #E0E0E0" };
const trackNumberStyle = { width: "24px", fontSize: "10px" };
const trackInfoItemStyle = { flex: 1, fontSize: "11px" };
const durationStyle = { fontSize: "10px", color: "#666" };
const spotifyButtonStyle = {
  backgroundColor: "#1DB954",
  color: "white",
  border: "2px outset #1DB954",
  padding: "4px 8px",
  cursor: "pointer",
  fontSize: "10px",
  marginTop: "8px",
  fontFamily: "MS Sans Serif, sans-serif"
};

export default Music;
