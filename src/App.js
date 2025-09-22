// App.js
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Music from "./pages/Music";
import Photos from "./pages/Photos";
import Notepad from "./pages/Notepad";

function App() {
  const [windows, setWindows] = useState({
    home: { visible: false, minimized: false, maximized: false, top: 100, left: 100 },
    about: { visible: false, minimized: false, maximized: false, top: 120, left: 150 },
    projects: { visible: false, minimized: false, maximized: false, top: 140, left: 200 },
    resume: { visible: false, minimized: false, maximized: false, top: 160, left: 250 },
    music: { visible: false, minimized: false, maximized: false, top: 180, left: 300 },
    photos: { visible: false, minimized: false, maximized: false, top: 200, left: 350 },
    notepad: { visible: false, minimized: false, maximized: false, top: 220, left: 400 }, // Notepad window
    welcome: { visible: true, minimized: false, maximized: false, top: 200, left: 400 }, // welcome popup
  });

  const [time, setTime] = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
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
          zIndex: key === "welcome" ? 9999 : 10, // welcome always on top
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

  return (
    <div
      className="desktop"
      style={{
        backgroundColor: "teal",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        paddingBottom: "40px",
      }}
    >
      {/* Desktop Icons */}
      <div style={iconContainerStyle}>
        <DesktopIcon
          label="Home"
          icon="/icons/about_me.png"
          onClick={() => toggleWindow("home", "visible")}
        />
        <DesktopIcon
          label="About"
          icon="/icons/projects.png"
          onClick={() => toggleWindow("about", "visible")}
        />
        <DesktopIcon
          label="Projects"
          icon="/icons/file.png"
          onClick={() => toggleWindow("projects", "visible")}
        />
        <DesktopIcon
          label="Resume"
          icon="/icons/resume.png"
          onClick={() => toggleWindow("resume", "visible")}
        />
        <DesktopIcon
          label="Music"
          icon="/icons/music.png"
          onClick={() => toggleWindow("music", "visible")}
        />

        <DesktopIcon
          label="Photos"
          icon="/icons/image-viewer.png"
          onClick={() => toggleWindow("photos", "visible")}
        />

        <DesktopIcon
          label="Notepad"
          icon="/icons/notepad.png"
          onClick={() => toggleWindow("notepad", "visible")}
        />
      </div>

      {/* Windows */}
      {renderWindow("home", Home)}
      {renderWindow("about", About)}
      {renderWindow("projects", Projects)}
      {renderWindow("resume", Resume)}
      {renderWindow("music", Music)}
      {renderWindow("photos", Photos)}
      {renderWindow("notepad", Notepad)}
      {renderWindow("welcome")} {/* Welcome popup */}

      {/* Taskbar */}
      <div style={taskbarStyle}>
        <div>
          <button
            style={startButtonStyle}
            onClick={() => setStartMenuOpen(!startMenuOpen)}
          >
            <img
              src="/icons/windows98 start logo.jpg"
              alt="Start"
              width="16"
              style={{ marginRight: "5px" }}
            />
            Start
          </button>
          {startMenuOpen && (
            <div style={startMenuStyle}>
              {["home", "about", "projects", "resume", "music", "photos"].map((key) => (
                <div
                  key={key}
                  style={startMenuItem}
                  onClick={() => {
                    toggleWindow(key, "visible");
                    setStartMenuOpen(false);
                  }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Minimized windows */}
        <div style={{ display: "flex", gap: "5px", marginLeft: "10px" }}>
          {Object.entries(windows).map(
            ([key, w]) =>
              w.visible &&
              w.minimized && (
                <TaskbarButton
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  onClick={() => toggleWindow(key, "minimized")}
                />
              )
          )}
        </div>

        {/* System tray */}
        <div style={systemTrayStyle}>
          <button style={trayButtonStyle}>🔊</button>
          <button style={trayButtonStyle}>🌐</button>
          <div style={clockStyle}>
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
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
  backgroundColor: "#333",
  color: "white",
  display: "flex",
  alignItems: "center",
  padding: "0 10px",
  fontFamily: "sans-serif",
  fontSize: "14px",
  boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.4)",
  zIndex: 999,
};

const startButtonStyle = {
  backgroundColor: "#555",
  border: "none",
  color: "white",
  padding: "3px 6px",
  borderRadius: "4px 0 0 4px",
  cursor: "pointer",
  fontWeight: "bold",
};

const startMenuStyle = {
  position: "absolute",
  bottom: "40px",
  left: "0px",
  width: "150px",
  backgroundColor: "#c0c0c0",
  border: "2px solid #fff",
  boxShadow: "2px 2px 5px rgba(0,0,0,0.5)",
  display: "flex",
  flexDirection: "column",
  zIndex: 1000,
};

const startMenuItem = {
  padding: "5px 10px",
  cursor: "pointer",
  borderBottom: "1px solid #808080",
  fontFamily: "sans-serif",
  fontSize: "13px",
};

const systemTrayStyle = {
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const trayButtonStyle = {
  backgroundColor: "#555",
  border: "none",
  color: "white",
  padding: "3px 5px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",
};

const clockStyle = {
  backgroundColor: "#555",
  padding: "3px 5px",
  borderRadius: "4px",
  fontFamily: "monospace",
  fontSize: "12px",
};

const winButtonStyle = {
  width: "18px",
  height: "18px",
  border: "2px solid #fff",
  backgroundColor: "#c0c0c0",
  fontWeight: "bold",
  cursor: "pointer",
  lineHeight: "14px",
  fontSize: "12px",
  textAlign: "center",
  boxSizing: "border-box",
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
