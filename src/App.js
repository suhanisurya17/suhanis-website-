import React, { useState, useEffect } from "react";

// Placeholder components
const Home = () => <div style={{fontFamily: "MS Sans Serif, sans-serif", fontSize: "12px"}}><h2>🏠 Home</h2><p>Welcome to my personal website!</p></div>;
const About = () => <div style={{fontFamily: "MS Sans Serif, sans-serif", fontSize: "12px"}}><h2>👤 About Me</h2><p>Learn more about my background and interests.</p></div>;
const Projects = () => <div style={{fontFamily: "MS Sans Serif, sans-serif", fontSize: "12px"}}><h2>💼 Projects</h2><p>Check out my latest work and projects.</p></div>;
const Resume = () => <div style={{fontFamily: "MS Sans Serif, sans-serif", fontSize: "12px"}}><h2>📄 Resume</h2><p>View my professional experience and skills.</p></div>;
const Music = () => <div style={{fontFamily: "MS Sans Serif, sans-serif", fontSize: "12px"}}><h2>🎵 Music</h2><p>Listen to my favorite tracks and playlists.</p></div>;
const Photos = () => <div style={{fontFamily: "MS Sans Serif, sans-serif", fontSize: "12px"}}><h2>📸 Photos</h2><p>Browse through my photo gallery.</p></div>;
const Email = () => <div style={{fontFamily: "MS Sans Serif, sans-serif", fontSize: "12px"}}><h2>📧 Email</h2><p>Send me a message through the contact form.</p></div>;

function App() {
  const [windows, setWindows] = useState({
    home: { visible: false, minimized: false, maximized: false, top: 100, left: 100 },
    about: { visible: false, minimized: false, maximized: false, top: 120, left: 150 },
    projects: { visible: false, minimized: false, maximized: false, top: 140, left: 200 },
    resume: { visible: false, minimized: false, maximized: false, top: 160, left: 250 },
    music: { visible: false, minimized: false, maximized: false, top: 180, left: 300 },
    photos: { visible: false, minimized: false, maximized: false, top: 200, left: 350 },
    email: { visible: false, minimized: false, maximized: false, top: 220, left: 400 },
    welcome: { visible: true, minimized: false, maximized: false, top: 200, left: 400 },
  });

  const [time, setTime] = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [dragging, setDragging] = useState(null);

  // Popups
  const [showNewFeaturesPopup, setShowNewFeaturesPopup] = useState(true);
  const [showRecentUpdatesPopup, setShowRecentUpdatesPopup] = useState(false);
  const [recentUpdatesVisible, setRecentUpdatesVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-show new features popup after 2 seconds with animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewFeaturesPopup(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleWindow = (key, action) => {
    setWindows((prev) => ({
      ...prev,
      [key]: { ...prev[key], [action]: !prev[key][action] },
    }));
  };

  const closeWindow = (key) => {
    setWindows((prev) => ({
      ...prev,
      [key]: {
        visible: false,
        minimized: false,
        maximized: false,
        top: prev[key].top,
        left: prev[key].left,
      },
    }));
  };

  const setWindowPosition = (key, top, left) => {
    setWindows((prev) => ({
      ...prev,
      [key]: { ...prev[key], top, left },
    }));
  };

  // Drag handlers
  const onMouseDown = (e, key) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startTop = windows[key].top;
    const startLeft = windows[key].left;
    setDragging({ key, startX, startY, startTop, startLeft });
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    const deltaX = e.clientX - dragging.startX;
    const deltaY = e.clientY - dragging.startY;
    setWindowPosition(
      dragging.key,
      dragging.startTop + deltaY,
      dragging.startLeft + deltaX
    );
  };

  const onMouseUp = () => setDragging(null);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  });

  const renderWindow = (key, Component) => {
    const win = windows[key];
    if (!win.visible || win.minimized) return null;

    return (
      <div
        key={key}
        className="window"
        style={{
          width: win.maximized
            ? "100%"
            : key === "welcome"
              ? "300px"
              : "600px",
          height: win.maximized
            ? "100%"
            : key === "welcome"
              ? "150px"
              : "400px",
          position: "absolute",
          top: win.maximized ? 0 : win.top,
          left: win.maximized ? 0 : win.left,
          zIndex: key === "welcome" ? 9999 : 10,
          border: "2px solid #000",
          backgroundColor: "#c0c0c0",
          boxShadow: "2px 2px #fff inset, -2px -2px #808080 inset",
          userSelect: "none",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title bar */}
        <div
          className="title-bar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#000080",
            color: "white",
            padding: "2px 5px",
            fontWeight: "bold",
            cursor: "move",
            flexShrink: 0,
          }}
          onMouseDown={(e) => onMouseDown(e, key)}
        >
          <span>
            {key === "welcome"
              ? "Windows 98"
              : key.charAt(0).toUpperCase() + key.slice(1)}
          </span>

          <div style={{ display: "flex", gap: "2px" }}>
            {key !== "welcome" && (
              <>
                <button
                  onClick={() => toggleWindow(key, "minimized")}
                  style={windowControlButtonStyle}
                >
                  −
                </button>
                <button
                  onClick={() => toggleWindow(key, "maximized")}
                  style={windowControlButtonStyle}
                >
                  ☐
                </button>
              </>
            )}
            <button
              onClick={() => closeWindow(key)}
              style={{
                ...windowControlButtonStyle,
                backgroundColor: "#e81123",
                color: "white",
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Window body */}
        <div
          style={{
            padding: "10px",
            flex: 1,
            overflow: "auto",
            textAlign: "center",
          }}
        >
          {key === "welcome" ? (
            <div>
              <p style={{ fontSize: "14px" }}>👋 welcome to my website!</p>
              <button
                onClick={() => closeWindow("welcome")}
                style={{
                  marginTop: "10px",
                  fontFamily: "MS Sans Serif, sans-serif",
                  fontSize: "11px",
                  padding: "2px 12px",
                  border: "2px solid #fff",
                  borderRightColor: "#808080",
                  borderBottomColor: "#808080",
                  backgroundColor: "#C0C0C0",
                  cursor: "pointer",
                }}
              >
                OK
              </button>
            </div>
          ) : (
            <Component />
          )}
        </div>
      </div>
    );
  };

  // Bottom-right popup (New Features) with slide-in animation
  const BottomRightPopup = ({ title, content, onClose, visible }) => (
    <div
      style={{
        position: "fixed",
        bottom: "50px",
        right: visible ? "20px" : "-350px",
        width: "320px",
        backgroundColor: "#c0c0c0",
        border: "2px outset #c0c0c0",
        boxShadow: "4px 4px 12px rgba(0,0,0,0.6)",
        zIndex: 9999,
        transition: "right 0.4s ease-in-out",
        fontFamily: "MS Sans Serif, sans-serif",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: "linear-gradient(to right, #0a246a 0%, #a6caf0 100%)",
          color: "white",
          padding: "4px 8px",
          fontSize: "11px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{title}</span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
            width: "20px",
            height: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          ×
        </button>
      </div>
      
      {/* Content */}
      <div style={{ padding: "12px", fontSize: "11px" }}>
        {content}
        <div style={{ textAlign: "center", marginTop: "12px" }}>
          <button
            onClick={onClose}
            style={{
              padding: "4px 16px",
              border: "2px outset #c0c0c0",
              backgroundColor: "#c0c0c0",
              cursor: "pointer",
              fontFamily: "MS Sans Serif, sans-serif",
              fontSize: "11px",
              fontWeight: "bold",
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );

  // Bottom-left expandable popup (Recent Updates)
  const BottomLeftExpandablePopup = () => (
    <div
      style={{
        position: "fixed",
        bottom: "50px",
        left: "20px",
        zIndex: 9999,
        fontFamily: "MS Sans Serif, sans-serif",
      }}
    >
      {/* Expandable content */}
      <div
        style={{
          width: "280px",
          backgroundColor: "#c0c0c0",
          border: "2px outset #c0c0c0",
          boxShadow: "4px 4px 12px rgba(0,0,0,0.6)",
          marginBottom: "4px",
          maxHeight: recentUpdatesVisible ? "200px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: "linear-gradient(to right, #0a246a 0%, #a6caf0 100%)",
            color: "white",
            padding: "4px 8px",
            fontSize: "11px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>📰 Recent Updates</span>
          <button
            onClick={() => {
              setRecentUpdatesVisible(false);
              setShowRecentUpdatesPopup(false);
            }}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
              width: "20px",
              height: "18px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div style={{ padding: "12px", fontSize: "11px" }}>
          <ul style={{ paddingLeft: "16px", margin: 0, lineHeight: "1.4" }}>
            <li>Version 1.2 - Improved Inbox UI</li>
            <li>Version 1.1 - Added Sent Items and Drafts</li>
            <li>Version 1.0 - Initial Release</li>
            <li>Beta 0.9 - Added email compose feature</li>
            <li>Beta 0.8 - Windows 98 styling</li>
          </ul>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => {
          if (!showRecentUpdatesPopup) {
            setShowRecentUpdatesPopup(true);
          }
          setRecentUpdatesVisible(!recentUpdatesVisible);
        }}
        style={{
          padding: "6px 12px",
          border: "2px outset #c0c0c0",
          backgroundColor: "#c0c0c0",
          cursor: "pointer",
          fontFamily: "MS Sans Serif, sans-serif",
          fontSize: "11px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span style={{ 
          transform: recentUpdatesVisible ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
          display: "inline-block"
        }}>
          ▲
        </span>
        Recent Updates
      </button>
    </div>
  );

  return (
    <div
      className="desktop"
      style={{
        backgroundImage: 'url("icons/wallpaper2.png")',
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0, 134, 137)",
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* Bottom-right popup (New Features) */}
      <BottomRightPopup
        title="✨ New Features Coming Soon!"
        content={
          <div>
            <ul style={{ paddingLeft: "16px", margin: 0, textAlign: "left", lineHeight: "1.4" }}>
              <li>Rich text editor for composing messages</li>
              <li>Email search and filter functionality</li>
              <li>Dark mode theme option</li>
              <li>Drag and drop file attachments</li>
              <li>Email templates and signatures</li>
            </ul>
          </div>
        }
        onClose={() => setShowNewFeaturesPopup(false)}
        visible={showNewFeaturesPopup}
      />

      {/* Bottom-left expandable popup (Recent Updates) */}
      {showRecentUpdatesPopup && <BottomLeftExpandablePopup />}

      {/* Desktop Icons */}
      <div style={iconContainerStyle}>
        <DesktopIcon label="Home" icon="/icons/about_me.png" onClick={() => toggleWindow("home", "visible")} />
        <DesktopIcon label="About" icon="/icons/projects.png" onClick={() => toggleWindow("about", "visible")} />
        <DesktopIcon label="Projects" icon="/icons/file.png" onClick={() => toggleWindow("projects", "visible")} />
        <DesktopIcon label="Resume" icon="/icons/resume.png" onClick={() => toggleWindow("resume", "visible")} />
        <DesktopIcon label="Music" icon="/icons/music.png" onClick={() => toggleWindow("music", "visible")} />
        <DesktopIcon label="Photos" icon="/icons/image-viewer.png" onClick={() => toggleWindow("photos", "visible")} />
        <DesktopIcon label="Email" icon="/icons/email.png" onClick={() => toggleWindow("email", "visible")} />
      </div>

      {/* Windows */}
      {renderWindow("home", Home)}
      {renderWindow("about", About)}
      {renderWindow("projects", Projects)}
      {renderWindow("resume", Resume)}
      {renderWindow("music", Music)}
      {renderWindow("photos", Photos)}
      {renderWindow("email", Email)}
      {renderWindow("welcome")}

      {/* Taskbar */}
      <div style={taskbarStyle}>
        <div>
          <button
            style={startButtonStyle}
            onClick={() => setStartMenuOpen(!startMenuOpen)}
          >
            <img src="/icons/windows98 start logo.jpg" alt="Start" width="16" style={{ marginRight: "5px" }} />
            Start
          </button>
          {startMenuOpen && (
            <div style={startMenuStyle}>
              {["home","about","projects","resume","music","photos","email"].map(key => (
                <div
                  key={key}
                  style={startMenuItem}
                  onClick={() => {
                    toggleWindow(key,"visible");
                    setStartMenuOpen(false);
                  }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "5px", marginLeft: "10px" }}>
          {Object.entries(windows).map(([key, w]) =>
            w.visible && w.minimized && <TaskbarButton key={key} label={key.charAt(0).toUpperCase()+key.slice(1)} onClick={() => toggleWindow(key,"minimized")} />
          )}
        </div>

        <div style={systemTrayStyle}>
          <button style={trayButtonStyle}>🔊</button>
          <button style={trayButtonStyle}>🌐</button>
          {/* Show recent updates button in system tray */}
          <button 
            style={{
              ...trayButtonStyle,
              backgroundColor: showRecentUpdatesPopup ? "#a0a0a0" : "#c0c0c0",
            }}
            onClick={() => {
              setShowRecentUpdatesPopup(true);
              setRecentUpdatesVisible(true);
            }}
          >
            📰
          </button>
          <div style={clockStyle}>
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Desktop Icon
function DesktopIcon({ label, icon, onClick }) {
  return (
    <div onClick={onClick} style={iconStyle}>
      <img src={icon} alt={label} width="32" />
      <span>{label}</span>
    </div>
  );
}

// Taskbar Button
function TaskbarButton({ label, onClick }) {
  return (
    <button onClick={onClick} style={{ ...winButtonStyle, marginRight: "3px" }}>
      {label}
    </button>
  );
}

// Styles
const iconContainerStyle = {
  position: "absolute",
  top: "60px",
  left: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  color: "white",
  fontFamily: "sans-serif",
  fontSize: "13px",
  textAlign: "center",
};

const iconStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
};

const taskbarStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "40px",
  backgroundColor: "#c0c0c0",
  color: "black",
  display: "flex",
  alignItems: "center",
  padding: "0 4px",
  fontFamily: "MS Sans Serif, sans-serif",
  fontSize: "11px",
  border: "2px inset #c0c0c0",
  borderBottom: "none",
  zIndex: 999,
};

const startButtonStyle = {
  backgroundColor: "#c0c0c0",
  border: "2px outset #c0c0c0",
  color: "black",
  padding: "4px 8px",
  cursor: "pointer",
  fontWeight: "bold",
  fontFamily: "MS Sans Serif, sans-serif",
  fontSize: "11px",
  display: "flex",
  alignItems: "center",
  height: "26px",
};

const startMenuStyle = {
  position: "absolute",
  bottom: "42px",
  left: "0px",
  width: "150px",
  backgroundColor: "#c0c0c0",
  border: "2px outset #c0c0c0",
  boxShadow: "4px 4px 8px rgba(0,0,0,0.5)",
  display: "flex",
  flexDirection: "column",
  zIndex: 1000,
};

const startMenuItem = {
  padding: "6px 12px",
  cursor: "pointer",
  borderBottom: "1px solid #808080",
  fontFamily: "MS Sans Serif, sans-serif",
  fontSize: "11px",
  color: "black",
};

const systemTrayStyle = {
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const trayButtonStyle = {
  backgroundColor: "#c0c0c0",
  border: "1px inset #c0c0c0",
  color: "black",
  padding: "2px 6px",
  cursor: "pointer",
  fontSize: "12px",
  fontFamily: "MS Sans Serif, sans-serif",
  height: "24px",
  minWidth: "24px",
};

const clockStyle = {
  backgroundColor: "#c0c0c0",
  border: "1px inset #c0c0c0",
  padding: "4px 8px",
  fontFamily: "MS Sans Serif, sans-serif",
  fontSize: "11px",
  color: "black",
  height: "24px",
  display: "flex",
  alignItems: "center",
};

const winButtonStyle = {
  height: "26px",
  minWidth: "80px",
  maxWidth: "150px",
  border: "2px outset #c0c0c0",
  backgroundColor: "#c0c0c0",
  fontWeight: "normal",
  cursor: "pointer",
  fontSize: "11px",
  fontFamily: "MS Sans Serif, sans-serif",
  color: "black",
  padding: "2px 8px",
  textAlign: "left",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

const windowControlButtonStyle = {
  width: "21px",
  height: "21px",
  minWidth: "21px",
  maxWidth: "21px",
  padding: "0",
  margin: "0 1px",
  border: "1px solid #0078d4",
  backgroundColor: "#e1e1e1",
  fontWeight: "normal",
  fontSize: "12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  boxSizing: "border-box",
  flexShrink: 0,
};

export default App;