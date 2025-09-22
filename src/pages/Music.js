import React, { useState, useRef, useEffect } from "react";

function Music() {
  const playlist = [
    { title: "Bohemian Rhapsody", artist: "Queen", file: "/audio/bohemian.mp3", duration: "5:55" },
    { title: "Hotel California", artist: "Eagles", file: "/audio/hotel.mp3", duration: "6:30" },
    { title: "Stairway to Heaven", artist: "Led Zeppelin", file: "/audio/stairway.mp3", duration: "8:02" },
    { title: "Sweet Child O' Mine", artist: "Guns N' Roses", file: "/audio/sweetchild.mp3", duration: "5:03" },
    { title: "Don't Stop Believin'", artist: "Journey", file: "/audio/dontstop.mp3", duration: "4:10" }
  ];

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef(null);

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
          <div style={trackTitleStyle}>{playlist[currentTrack].title}</div>
          <div style={artistStyle}>{playlist[currentTrack].artist}</div>
          <div style={timeStyle}>00:00 / {playlist[currentTrack].duration}</div>
        </div>

        {/* Audio element */}
        <audio ref={audioRef} src={playlist[currentTrack].file} />

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
              <span style={durationStyle}>{track.duration}</span>
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

export default Music;
