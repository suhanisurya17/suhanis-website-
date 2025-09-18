// App.js
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Music from './pages/Music';

function App() {
  const [windows, setWindows] = useState({
    home: { visible: false, minimized: false, maximized: false },
    about: { visible: false, minimized: false, maximized: false },
    projects: { visible: false, minimized: false, maximized: false },
    resume: { visible: false, minimized: false, maximized: false },
    music: { visible: false, minimized: false, maximized: false },
  });

  const [time, setTime] = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);

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
      [key]: { visible: false, minimized: false, maximized: false },
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="desktop"
        style={{
          backgroundColor: 'teal',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          paddingBottom: '40px', // for taskbar space
        }}
      >
        {/* Desktop Icons */}
        <div style={iconContainerStyle}>
          <DesktopIcon
            label="Home"
            icon="/icons/about_me.png"
            onClick={() => toggleWindow('home', 'visible')}
          />
          <DesktopIcon
            label="About"
            icon="/icons/projects.png"
            onClick={() => toggleWindow('about', 'visible')}
          />
          <DesktopIcon
            label="Projects"
            icon="/icons/file.png"
            onClick={() => toggleWindow('projects', 'visible')}
          />
          <DesktopIcon
            label="Resume"
            icon="/icons/resume.png"
            onClick={() => toggleWindow('resume', 'visible')}
          />
          <DesktopIcon
            label="Music"
            icon="/icons/music.png"
            onClick={() => toggleWindow('music', 'visible')}
          />
        </div>

        {/* Windows */}
        {windows.home.visible && !windows.home.minimized && (
          <Window
            title="Home"
            onMinimize={() => toggleWindow('home', 'minimized')}
            onMaximize={() => toggleWindow('home', 'maximized')}
            onClose={() => closeWindow('home')}
            isMaximized={windows.home.maximized}
          >
            <Home />
          </Window>
        )}
        {windows.about.visible && !windows.about.minimized && (
          <Window
            title="About"
            onMinimize={() => toggleWindow('about', 'minimized')}
            onMaximize={() => toggleWindow('about', 'maximized')}
            onClose={() => closeWindow('about')}
            isMaximized={windows.about.maximized}
          >
            <About />
          </Window>
        )}
        {windows.projects.visible && !windows.projects.minimized && (
          <Window
            title="Projects"
            onMinimize={() => toggleWindow('projects', 'minimized')}
            onMaximize={() => toggleWindow('projects', 'maximized')}
            onClose={() => closeWindow('projects')}
            isMaximized={windows.projects.maximized}
          >
            <Projects />
          </Window>
        )}
        {windows.resume.visible && !windows.resume.minimized && (
          <Window
            title="Resume"
            onMinimize={() => toggleWindow('resume', 'minimized')}
            onMaximize={() => toggleWindow('resume', 'maximized')}
            onClose={() => closeWindow('resume')}
            isMaximized={windows.resume.maximized}
          >
            <Resume />
          </Window>
        )}
        {windows.music.visible && !windows.music.minimized && (
          <Window
            title="Music"
            onMinimize={() => toggleWindow('music', 'minimized')}
            onMaximize={() => toggleWindow('music', 'maximized')}
            onClose={() => closeWindow('music')}
            isMaximized={windows.music.maximized}
          >
            <Music />
          </Window>
        )}

        {/* Taskbar */}
        <div style={taskbarStyle}>
          {/* Start Button */}
          <div>
          <button
              style={startButtonStyle}
              onClick={() => setStartMenuOpen(!startMenuOpen)}
            >
              <img
                src="/icons/windows98 start logo.jpg"
                alt="Start"
                width="16"
                style={{ marginRight: '5px' }}
              />
              Start
            </button>

            {startMenuOpen && (
              <div style={startMenuStyle}>
                <div
                  style={startMenuItem}
                  onClick={() => {
                    toggleWindow('home', 'visible');
                    setStartMenuOpen(false);
                  }}
                >
                  Home
                </div>
                <div
                  style={startMenuItem}
                  onClick={() => {
                    toggleWindow('about', 'visible');
                    setStartMenuOpen(false);
                  }}
                >
                  About
                </div>
                <div
                  style={startMenuItem}
                  onClick={() => {
                    toggleWindow('projects', 'visible');
                    setStartMenuOpen(false);
                  }}
                >
                  Projects
                </div>
                <div
                  style={startMenuItem}
                  onClick={() => {
                    toggleWindow('resume', 'visible');
                    setStartMenuOpen(false);
                  }}
                >
                  Resume
                </div>
                <div
                  style={startMenuItem}
                  onClick={() => {
                    toggleWindow('music', 'visible');
                    setStartMenuOpen(false);
                  }}
                >
                  Music
                </div>
              </div>
            )}
          </div>

          {/* Left: minimized window buttons */}
          <div style={{ display: 'flex', gap: '10px', marginLeft: '10px' }}>
            {Object.keys(windows).map(
              (key) =>
                windows[key].visible &&
                windows[key].minimized && (
                  <TaskbarButton
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    onClick={() => toggleWindow(key, 'minimized')}
                  />
                )
            )}
          </div>

          {/* Right: system tray */}
          <div style={systemTrayStyle}>
            <button style={trayButtonStyle}>🔊</button>
            <button style={trayButtonStyle}>🌐</button>
            <div style={clockStyle}>
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

function DraggableWindow({ children }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'WINDOW',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        position: 'absolute',
      }}
    >
      {children}
    </div>
  );
}

function Window({ title, children, onMinimize, onMaximize, onClose, isMaximized }) {
  return (
    <DraggableWindow>
      <div
        className="window"
        style={{
          width: isMaximized ? '100%' : '300px',
          height: isMaximized ? '100%' : 'auto',
          position: 'absolute',
          top: isMaximized ? 0 : '120px',
          left: isMaximized ? 0 : '200px',
          zIndex: 10,
        }}
      >
        <div className="title-bar">
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" onClick={onMinimize}></button>
            <button aria-label="Maximize" onClick={onMaximize}></button>
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        </div>
        <div
          className="window-body"
          style={{
            height: isMaximized ? 'calc(100% - 30px)' : 'auto',
            overflow: 'auto',
          }}
        >
          {children}
        </div>
      </div>
    </DraggableWindow>
  );
}

function DesktopIcon({ label, icon, onClick }) {
  return (
    <div onClick={onClick} style={iconStyle}>
      <img src={icon} alt={label} width="32" />
      <span>{label}</span>
    </div>
  );
}

function TaskbarButton({ label, onClick }) {
  return (
    <button
      style={{
        backgroundColor: '#555',
        border: 'none',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

const iconContainerStyle = {
  position: 'absolute',
  top: '60px',
  left: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  color: 'white',
  fontFamily: 'sans-serif',
  fontSize: '13px',
  textAlign: 'center',
};

const iconStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
};

const taskbarStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '40px',
  backgroundColor: '#333',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px',
  fontFamily: 'sans-serif',
  fontSize: '14px',
  boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.4)',
  zIndex: 999,
};

const startButtonStyle = {
  backgroundColor: '#555',
  border: 'none',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '4px 0 0 4px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const startMenuStyle = {
  position: 'absolute',
  bottom: '40px',
  left: '0px',
  width: '150px',
  backgroundColor: '#c0c0c0',
  border: '2px solid #fff',
  boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1000,
};

const startMenuItem = {
  padding: '8px 10px',
  cursor: 'pointer',
  borderBottom: '1px solid #808080',
  fontFamily: 'sans-serif',
  fontSize: '13px',
  backgroundColor: '#c0c0c0',
};

const systemTrayStyle = {
  marginLeft: 'auto', // pushes tray to the right
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

const trayButtonStyle = {
  backgroundColor: '#555',
  border: 'none',
  color: 'white',
  padding: '5px 6px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
};

const clockStyle = {
  backgroundColor: '#555',
  padding: '5px 8px',
  borderRadius: '4px',
  fontFamily: 'monospace',
  fontSize: '12px',
};

export default App;
