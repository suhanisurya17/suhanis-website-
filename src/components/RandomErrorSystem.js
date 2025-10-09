import React, { useState, useEffect, useCallback } from 'react';
import './ErrorAnimations.css';

const RandomErrorSystem = () => {
  const [currentError, setCurrentError] = useState(null);
  const [showError, setShowError] = useState(false);

  const triggerRandomError = useCallback(() => {
    const cuteErrors = [
      {
        title: "Oops! 🐛",
        message: "Your awesomeness levels are too high for this system to handle!",
        icon: "⚠️",
        details: "Error Code: TOO_AWESOME_404"
      },
      {
        title: "Coffee Break Required ☕",
        message: "This website needs more caffeine to function properly.",
        icon: "💻",
        details: "Error Code: CAFFEINE_LOW_001"
      },
      {
        title: "Cat on Keyboard 🐱",
        message: "A virtual cat has walked across the keyboard. Please try again.",
        icon: "🚫",
        details: "Error Code: MEOW_MEOW_123"
      },
      {
        title: "Time Travel Error ⏰",
        message: "You've gone back to 1998! Everything is working as intended.",
        icon: "⚠️",
        details: "Error Code: Y2K_NOSTALGIA"
      },
      {
        title: "Dial-up Connection 📞",
        message: "Please wait 5 minutes for this page to load... just kidding!",
        icon: "💻",
        details: "Error Code: 56K_MODEM_SLOW"
      },
      {
        title: "Floppy Disk Full 💾",
        message: "Cannot save your amazingness. Disk capacity: 1.44MB exceeded.",
        icon: "🚫",
        details: "Error Code: DISK_FULL_1998"
      },
      {
        title: "Blue Screen of Happiness 💙",
        message: "This website is so retro, it makes us nostalgically happy!",
        icon: "⚠️",
        details: "Error Code: HAPPY_NOSTALGIA"
      },
      {
        title: "Clippy Interference 📎",
        message: "It looks like you're browsing a portfolio! Would you like help?",
        icon: "💻",
        details: "Error Code: CLIPPY_DETECTED"
      },
      {
        title: "Millennium Bug 🪲",
        message: "Don't worry, we've already survived Y2K once!",
        icon: "🚫",
        details: "Error Code: Y2K_SURVIVOR"
      },
      {
        title: "Windows ME Moment 🤕",
        message: "This error is brought to you by Windows ME... just kidding, this actually works!",
        icon: "⚠️",
        details: "Error Code: NOT_WINDOWS_ME"
      }
    ];
    
    const randomError = cuteErrors[Math.floor(Math.random() * cuteErrors.length)];
    setCurrentError(randomError);
    setShowError(true);
  }, []);

  const closeError = () => {
    setShowError(false);
    setTimeout(() => setCurrentError(null), 300);
  };

  // Randomly show errors every 30-60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // 15% chance every 45 seconds
      if (Math.random() < 0.15) {
        triggerRandomError();
      }
    }, 45000);

    return () => clearInterval(interval);
  }, [triggerRandomError]);

  // Also allow manual triggering for testing
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Press Ctrl + Shift + E to trigger error
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        triggerRandomError();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [triggerRandomError]);

  if (!showError || !currentError) return null;

  return (
    <div style={overlayStyle}>
      <div style={errorWindowStyle}>
        {/* Title Bar */}
        <div style={titleBarStyle}>
          <div style={titleTextStyle}>
            <span style={iconStyle}>{currentError.icon}</span>
            {currentError.title}
          </div>
          <button onClick={closeError} style={closeButtonStyle}>
            ×
          </button>
        </div>

        {/* Error Content */}
        <div style={contentStyle}>
          <div style={errorIconContainerStyle}>
            <div style={bigErrorIconStyle}>🚨</div>
          </div>

          <div style={messageContainerStyle}>
            <div style={mainMessageStyle}>
              {currentError.message}
            </div>
            <div style={detailsStyle}>
              {currentError.details}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={buttonContainerStyle}>
          <button onClick={closeError} style={buttonStyle}>
            OK
          </button>
          <button onClick={triggerRandomError} style={buttonStyle}>
            More Errors!
          </button>
          <button onClick={closeError} style={buttonStyle}>
            Cancel
          </button>
        </div>

        {/* Footer tip */}
        <div style={footerStyle}>
          💡 Tip: Press Ctrl+Shift+E to summon more cute errors!
        </div>
      </div>
    </div>
  );
};

// Styles
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10000,
  fontFamily: 'MS Sans Serif, sans-serif'
};

const errorWindowStyle = {
  backgroundColor: '#C0C0C0',
  border: '2px outset #C0C0C0',
  boxShadow: '4px 4px 8px rgba(0,0,0,0.5)',
  minWidth: '400px',
  maxWidth: '500px',
  animation: 'errorPop 0.3s ease-out'
};

const titleBarStyle = {
  backgroundColor: '#000080',
  color: 'white',
  padding: '4px 8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '11px',
  fontWeight: 'bold'
};

const titleTextStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
};

const iconStyle = {
  fontSize: '14px'
};

const closeButtonStyle = {
  backgroundColor: '#C0C0C0',
  border: '1px outset #C0C0C0',
  color: 'black',
  width: '20px',
  height: '18px',
  cursor: 'pointer',
  fontSize: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const contentStyle = {
  padding: '16px',
  display: 'flex',
  gap: '16px',
  backgroundColor: '#C0C0C0'
};

const errorIconContainerStyle = {
  display: 'flex',
  alignItems: 'flex-start'
};

const bigErrorIconStyle = {
  fontSize: '32px',
  animation: 'shake 0.5s ease-in-out infinite alternate'
};

const messageContainerStyle = {
  flex: 1
};

const mainMessageStyle = {
  fontSize: '11px',
  marginBottom: '12px',
  lineHeight: '1.4'
};

const detailsStyle = {
  fontSize: '10px',
  color: '#666',
  fontFamily: 'Courier New, monospace',
  backgroundColor: '#F0F0F0',
  padding: '4px',
  border: '1px inset #C0C0C0'
};

const buttonContainerStyle = {
  padding: '8px 16px',
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
  backgroundColor: '#C0C0C0'
};

const buttonStyle = {
  padding: '4px 12px',
  border: '2px outset #C0C0C0',
  backgroundColor: '#C0C0C0',
  cursor: 'pointer',
  fontSize: '11px',
  fontFamily: 'MS Sans Serif, sans-serif'
};

const footerStyle = {
  backgroundColor: '#F0F0F0',
  padding: '4px 8px',
  fontSize: '9px',
  color: '#666',
  textAlign: 'center',
  borderTop: '1px solid #808080'
};

export default RandomErrorSystem;