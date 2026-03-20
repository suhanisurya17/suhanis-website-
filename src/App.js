import React, { useState, useEffect, useRef } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import DesignProjects from "./pages/DesignProjects";
import Resume from "./pages/Resume";
import Music from "./pages/Music";
import Photos from "./pages/Photos";
import Email from "./pages/Email";
import Experience from "./pages/Experience";
import SusuBot from "./pages/SusuBot";
import Paint from "./pages/Paint";
import CameraReviews from "./pages/CameraReviews";
// import RandomErrorSystem from "./components/RandomErrorSystem";
import BatteryButton from "./components/BatteryButton";

//Stocks function
function Stocks() {
  const [stockData, setStockData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  //Symbols of common stocks
  const symbols = React.useMemo(() => ['VFV.TO', 'SHOP.TO', 'AAPL', 'GOOGL', 'MSFT', 'TSLA', 'VTI', 'SPY'], []);

  //Fetching real-time api data
  const fetchStockData = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const stockResults = {};

      const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;

      console.log('API Key:', API_KEY); // Check if it's defined

      // For demo purposes, we'll fetch a few key stocks
      const prioritySymbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA'];

      for (const symbol of prioritySymbols) {
        try {
          const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
          );
          const data = await response.json();

          // console.log('Response status:', response.status);
          // console.log('Response data:', data); // See what Alpha Vantage is returning
          // console.log('Full response data:', JSON.stringify(data, null, 2));


          if (data['Global Quote']) {
            const quote = data['Global Quote'];
            stockResults[symbol] = {
              price: parseFloat(quote['05. price']).toFixed(2),
              change: parseFloat(quote['09. change']).toFixed(2),
              changePercent: parseFloat(quote['10. change percent'].replace('%', '')).toFixed(2),
              volume: parseInt(quote['06. volume']).toLocaleString(),
              high: parseFloat(quote['03. high']).toFixed(2),
              low: parseFloat(quote['04. low']).toFixed(2)
            };
          }
        } catch (err) {
          console.error(`Error fetching ${symbol}:`, err);
        }
      }

      // If API calls failed or no data, fall back to realistic demo data
      if (Object.keys(stockResults).length === 0) {
        symbols.forEach(symbol => {
          const basePrice = symbol.includes('VFV') ? 120 :
            symbol.includes('SHOP') ? 85 :
              symbol === 'AAPL' ? 175 :
                symbol === 'GOOGL' ? 140 :
                  symbol === 'MSFT' ? 350 :
                    symbol === 'TSLA' ? 250 :
                      symbol === 'VTI' ? 240 :
                        symbol === 'SPY' ? 450 : 100;

          const change = (Math.random() - 0.5) * 10;
          const changePercent = (change / basePrice) * 100;

          stockResults[symbol] = {
            price: (basePrice + change).toFixed(2),
            change: change.toFixed(2),
            changePercent: changePercent.toFixed(2),
            volume: Math.floor(Math.random() * 1000000) + 100000,
            high: (basePrice + Math.abs(change) + Math.random() * 5).toFixed(2),
            low: (basePrice - Math.abs(change) - Math.random() * 5).toFixed(2)
          };
        });
        setError('Using demo data - API key needed for live data');
      }

      setStockData(stockResults);
      setLastUpdate(new Date());
    } catch (err) {
      setError('Failed to fetch stock data');
      console.error('Stock fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [symbols]);

  useEffect(() => {
    fetchStockData();

    // Update every 5 minutes (to respect API rate limits)
    const interval = setInterval(() => {
      fetchStockData();
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [fetchStockData]);

  const refreshData = () => {
    fetchStockData();
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{ fontSize: '14px', marginBottom: '10px' }}>📈 Loading real-time stock data...</div>
        <div style={{ fontSize: '11px', color: '#666' }}>Connecting to market data...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '10px', fontFamily: 'MS Sans Serif, sans-serif', fontSize: '11px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, fontSize: '13px' }}>📊 Stock Market Dashboard</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ fontSize: '10px', color: '#666' }}>
            Last updated: {lastUpdate.toLocaleTimeString()}
          </span>
          <button
            onClick={refreshData}
            style={{
              padding: '2px 8px',
              border: '2px outset #c0c0c0',
              backgroundColor: '#c0c0c0',
              cursor: 'pointer',
              fontFamily: 'MS Sans Serif, sans-serif',
              fontSize: '10px'
            }}
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#ffffcc',
          border: '1px solid #ffcc00',
          padding: '5px',
          marginBottom: '10px',
          fontSize: '10px',
          textAlign: 'center'
        }}>
          ⚠️ {error}
        </div>
      )}

      <div style={{
        border: '2px inset #c0c0c0',
        backgroundColor: 'white',
        padding: '5px',
        maxHeight: '300px',
        overflowY: 'auto'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#c0c0c0' }}>
              <th style={{ padding: '4px', border: '1px solid #808080', textAlign: 'left' }}>Symbol</th>
              <th style={{ padding: '4px', border: '1px solid #808080', textAlign: 'right' }}>Price</th>
              <th style={{ padding: '4px', border: '1px solid #808080', textAlign: 'right' }}>Change</th>
              <th style={{ padding: '4px', border: '1px solid #808080', textAlign: 'right' }}>%</th>
              <th style={{ padding: '4px', border: '1px solid #808080', textAlign: 'right' }}>Volume</th>
            </tr>
          </thead>
          <tbody>
            {symbols.map(symbol => {
              const stock = stockData[symbol];
              if (!stock) return null;

              const isPositive = parseFloat(stock.change) >= 0;
              const changeColor = isPositive ? '#006600' : '#cc0000';

              return (
                <tr key={symbol} style={{ backgroundColor: symbol.includes('.TO') ? '#f0f8ff' : 'white' }}>
                  <td style={{ padding: '3px 4px', border: '1px solid #e0e0e0', fontWeight: 'bold' }}>
                    {symbol}
                    {symbol.includes('.TO') && <span style={{ fontSize: '8px', color: '#666' }}> (TSX)</span>}
                  </td>
                  <td style={{ padding: '3px 4px', border: '1px solid #e0e0e0', textAlign: 'right' }}>
                    ${stock.price}
                  </td>
                  <td style={{ padding: '3px 4px', border: '1px solid #e0e0e0', textAlign: 'right', color: changeColor }}>
                    {isPositive ? '+' : ''}{stock.change}
                  </td>
                  <td style={{ padding: '3px 4px', border: '1px solid #e0e0e0', textAlign: 'right', color: changeColor }}>
                    {isPositive ? '+' : ''}{stock.changePercent}%
                  </td>
                  <td style={{ padding: '3px 4px', border: '1px solid #e0e0e0', textAlign: 'right', fontSize: '9px' }}>
                    {typeof stock.volume === 'string' ? stock.volume : parseInt(stock.volume).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '10px', fontSize: '9px', color: '#666', textAlign: 'center' }}>
        <div>📡 Real-time data via Alpha Vantage API</div>
        <div>🇨🇦 .TO symbols are Toronto Stock Exchange</div>
        <div style={{ marginTop: '5px', fontStyle: 'italic' }}>
          * Get your free API key at alphavantage.co for live data
        </div>
      </div>
    </div>
  );
}

function App() {
  const [windows, setWindows] = useState({
    home: { visible: false, minimized: false, maximized: false, top: 100, left: 100, zIndex: 10 },
    about: { visible: false, minimized: false, maximized: false, top: 120, left: 150, zIndex: 10 },
    projects: { visible: false, minimized: false, maximized: false, top: 140, left: 200, zIndex: 10 },
    designprojects: { visible: false, minimized: false, maximized: false, top: 160, left: 250, zIndex: 10 },
    experience: { visible: false, minimized: false, maximized: false, top: 180, left: 300, zIndex: 10 },
    resume: { visible: false, minimized: false, maximized: false, top: 200, left: 350, zIndex: 10 },
    music: { visible: false, minimized: false, maximized: false, top: 220, left: 400, zIndex: 10 },
    photos: { visible: false, minimized: false, maximized: false, top: 240, left: 450, zIndex: 10 },
    email: { visible: false, minimized: false, maximized: false, top: 260, left: 500, zIndex: 10 },
    stocks: { visible: false, minimized: false, maximized: false, top: 280, left: 550, zIndex: 10 },
    susubot: { visible: false, minimized: false, maximized: false, top: 300, left: 600, zIndex: 10 },
    paint: { visible: false, minimized: false, maximized: false, top: 80, left: 120, zIndex: 10 },
    camerareviews: { visible: false, minimized: false, maximized: false, top: 140, left: 220, zIndex: 10 },
    welcome: { visible: true, minimized: false, maximized: false, top: 200, left: 400, zIndex: 10 },
  });

  const nextZIndexRef = useRef(100);

  const [time, setTime] = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [dragging, setDragging] = useState(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  // Popups - Updated with animated functionality
  const [showNewFeaturesPopup, setShowNewFeaturesPopup] = useState(false);
  const [showRecentUpdatesPopup, setShowRecentUpdatesPopup] = useState(false);
  const [recentUpdatesVisible, setRecentUpdatesVisible] = useState(false);
  const [showStocksPopup, setShowStocksPopup] = useState(false);
  const [stocksPopupVisible, setStocksPopupVisible] = useState(false);

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

  const focusWindow = (key) => {
    if (key === "welcome") return;
    nextZIndexRef.current += 1;
    setWindows((prev) => ({
      ...prev,
      [key]: { ...prev[key], zIndex: nextZIndexRef.current },
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

  // Handle right-click context menu
  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
    setStartMenuOpen(false);
  };

  // Handle context menu actions
  const handleRefresh = () => {
    window.location.reload();
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleNewFolder = () => {
    alert('Create New Folder clicked! (Feature coming soon)');
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleProperties = () => {
    alert('Desktop Properties:\n\nResolution: ' + window.innerWidth + 'x' + window.innerHeight + '\nTheme: Windows 98');
    setContextMenu({ ...contextMenu, visible: false });
  };

  // Close context menu on click
  const handleClick = () => {
    if (contextMenu.visible) {
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("click", handleClick);
    };
  });

  const renderWindow = (key, Component) => {
    const win = windows[key];
    if (!win.visible || win.minimized) return null;

    return (
      <div
        key={key}
        className="window"
        onMouseDown={() => focusWindow(key)}
        style={{
          width: win.maximized
            ? "100%"
            : key === "welcome"
              ? "300px"
              : key === "stocks"
                ? "700px"
                : key === "paint"
                  ? "900px"
                  : "600px",
          height: win.maximized
            ? "100%"
            : key === "welcome"
              ? "150px"
              : key === "stocks"
                ? "450px"
                : key === "paint"
                  ? "650px"
                  : "400px",
          position: "absolute",
          top: win.maximized ? 0 : win.top,
          left: win.maximized ? 0 : win.left,
          zIndex: key === "welcome" ? 9999 : win.zIndex,
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
              : key === "designprojects"
              ? "Design Projects"
              : key === "camerareviews"
              ? "Camera Reviews"
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
            padding: key === "stocks" || key === "experience" || key === "paint" ? "0" : "10px",
            flex: 1,
            overflow: "auto",
            textAlign: key === "stocks" || key === "experience" || key === "paint" ? "left" : "center",
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
            <li>Version 1.5 - Added Susubot!</li>
            <li>Version 1.4 - Added Experience Section</li>
            <li>Version 1.3 - Added Real-time Stocks Dashboard</li>
            <li>Version 1.2 - Improved Inbox UI</li>
            <li>Version 1.1 - Added Sent Items and Drafts</li>
            <li>Version 1.0 - Initial Release</li>
            <li>Beta 0.9 - Added email compose feature</li>
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

  // Stocks popup (similar to recent updates)
  const StocksPopup = () => (
    <div
      style={{
        position: "fixed",
        bottom: "50px",
        left: "320px",
        zIndex: 9999,
        fontFamily: "MS Sans Serif, sans-serif",
      }}
    >
      {/* Expandable content */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#c0c0c0",
          border: "2px outset #c0c0c0",
          boxShadow: "4px 4px 12px rgba(0,0,0,0.6)",
          marginBottom: "4px",
          maxHeight: stocksPopupVisible ? "150px" : "0px",
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
          <span>📈 Market Alert</span>
          <button
            onClick={() => {
              setStocksPopupVisible(false);
              setShowStocksPopup(false);
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
          <div style={{ lineHeight: "1.4" }}>
            <div>📊 Markets are active today</div>
            <div style={{ marginTop: "6px", fontSize: "10px", color: "#666" }}>
              • VFV.TO: Canadian equity ETF
            </div>
            <div style={{ fontSize: "10px", color: "#666" }}>
              • SHOP.TO: E-commerce platform
            </div>
            <div style={{ marginTop: "8px" }}>
              <button
                onClick={() => {
                  toggleWindow("stocks", "visible");
                  setStocksPopupVisible(false);
                }}
                style={{
                  padding: "2px 8px",
                  border: "2px outset #c0c0c0",
                  backgroundColor: "#c0c0c0",
                  cursor: "pointer",
                  fontFamily: "MS Sans Serif, sans-serif",
                  fontSize: "10px",
                }}
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => {
          if (!showStocksPopup) {
            setShowStocksPopup(true);
          }
          setStocksPopupVisible(!stocksPopupVisible);
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
          transform: stocksPopupVisible ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
          display: "inline-block"
        }}>
          ▲
        </span>
        Stocks
      </button>
    </div>
  );

  return (
    <div
      className="desktop"
      onContextMenu={handleContextMenu}
      style={{
        backgroundImage: 'url("icons/wallpaper2.png")',
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0, 134, 137)", //rgba(0, 142, 148),
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
      }}
    >
      {/* Bottom-right popup (New Features) */}
      <BottomRightPopup
        title="✨ New Features Coming Soon!"
        content={
          <div>
            <ul style={{ paddingLeft: "16px", margin: 0, textAlign: "left", lineHeight: "1.4" }}>
              <li>More interactivity with susubot</li>
              <li>Dark mode theme option</li>
              <li>Additional projects and portfolio items</li>
              <li>Improved mobile responsiveness</li>
            </ul>
          </div>
        }
        onClose={() => setShowNewFeaturesPopup(false)}
        visible={showNewFeaturesPopup}
      />

      {/* Bottom-left expandable popup (Recent Updates) */}
      {showRecentUpdatesPopup && <BottomLeftExpandablePopup />}

      {/* Stocks popup */}
      {showStocksPopup && <StocksPopup />}

      {/* Desktop Icons */}
      <div style={iconContainerStyle}>
        <DesktopIcon label="Home" icon="/icons/about_me.png" onClick={() => toggleWindow("home", "visible")} />
        <DesktopIcon label="About" icon="/icons/projects.png" onClick={() => toggleWindow("about", "visible")} />
        <DesktopIcon label="Projects" icon="/icons/file.png" onClick={() => toggleWindow("projects", "visible")} />
        <DesktopIcon label="Design Projects" icon="/icons/projects.png" onClick={() => toggleWindow("designprojects", "visible")} />
        <DesktopIcon label="Experience" icon="/icons/file.png" onClick={() => toggleWindow("experience", "visible")} />
        <DesktopIcon label="Resume" icon="/icons/resume.png" onClick={() => toggleWindow("resume", "visible")} />
        <DesktopIcon label="Music" icon="/icons/music.png" onClick={() => toggleWindow("music", "visible")} />
        <DesktopIcon label="Photos" icon="/icons/image-viewer.png" onClick={() => toggleWindow("photos", "visible")} />
        <DesktopIcon label="Email" icon="/icons/email.png" onClick={() => toggleWindow("email", "visible")} />
        <DesktopIcon label="Paint" icon="/icons/paint_old-0.png" onClick={() => toggleWindow("paint", "visible")} />
      </div>

      {/* Stocks & SusuBot Icons - Positioned separately for better visibility */}
      <div style={{
        position: "absolute",
        top: "60px",
        left: "90px",
        color: "white",
        fontFamily: "sans-serif",
        fontSize: "13px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}>
        <DesktopIcon label="Stocks" icon="/icons/stocks.png" onClick={() => toggleWindow("stocks", "visible")} />
        <DesktopIcon label="SusuBot" icon="/icons/notepad.png" onClick={() => toggleWindow("susubot", "visible")} />
        <DesktopIcon label="Camera Reviews" icon="/icons/video_mg-1.png" onClick={() => toggleWindow("camerareviews", "visible")} />

      </div>

      {/* Windows */}
      {renderWindow("home", Home)}
      {renderWindow("about", About)}
      {renderWindow("projects", Projects)}
      {renderWindow("designprojects", DesignProjects)}
      {renderWindow("experience", Experience)}
      {renderWindow("resume", Resume)}
      {renderWindow("music", Music)}
      {renderWindow("photos", Photos)}
      {renderWindow("camerareviews", CameraReviews)}
      {renderWindow("email", Email)}
      {renderWindow("stocks", Stocks)}
      {renderWindow("susubot", SusuBot)}
      {renderWindow("paint", Paint)}
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
              {["home", "about", "projects", "designprojects", "experience", "resume", "music", "photos", "camerareviews", "email", "stocks", "susubot", "paint"].map(key => (
                <div
                  key={key}
                  style={startMenuItem}
                  onClick={() => {
                    toggleWindow(key, "visible");
                    setStartMenuOpen(false);
                  }}
                >
                  { key === "designprojects" ? "Design Projects" : key === "camerareviews" ? "Camera Reviews" : key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "5px", marginLeft: "10px" }}>
          {Object.entries(windows).map(([key, w]) =>
            w.visible && w.minimized && <TaskbarButton key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} onClick={() => toggleWindow(key, "minimized")} />
          )}
        </div>

        <div style={systemTrayStyle}>
          <button style={trayButtonStyle}>🔊</button>
          <button style={trayButtonStyle}>🌐</button>
          <button style={trayButtonStyle}>🌐</button>
          {/* Recent updates button in system tray */}
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
          {/* Stocks button in system tray */}
          <button
            style={{
              ...trayButtonStyle,
              backgroundColor: showStocksPopup ? "#a0a0a0" : "#c0c0c0",
            }}
            onClick={() => {
              setShowStocksPopup(true);
              setStocksPopupVisible(true);
            }}
          >
            📈
          </button>
          <BatteryButton trayButtonStyle={trayButtonStyle} />
          <div style={clockStyle}>
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>

      {/* Random Error System
      <RandomErrorSystem /> */}

      {/* Context Menu */}
      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        visible={contextMenu.visible}
        onClose={() => setContextMenu({ ...contextMenu, visible: false })}
        onRefresh={handleRefresh}
        onNewFolder={handleNewFolder}
        onProperties={handleProperties}
      />
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

// Context Menu Component
function ContextMenu({ x, y, visible, onClose, onRefresh, onNewFolder, onProperties }) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: y,
        left: x,
        backgroundColor: '#c0c0c0',
        border: '2px outset #c0c0c0',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        zIndex: 10000,
        fontFamily: 'MS Sans Serif, sans-serif',
        fontSize: '11px',
        minWidth: '150px',
      }}
    >
      <div
        onClick={onRefresh}
        style={{
          padding: '4px 20px 4px 8px',
          cursor: 'pointer',
          borderBottom: '1px solid #808080',
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#000080'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        onMouseOver={(e) => e.currentTarget.style.color = 'white'}
        onMouseOut={(e) => e.currentTarget.style.color = 'black'}
      >
        🔄 Refresh
      </div>
      <div style={{ borderBottom: '1px solid #808080', height: '1px', margin: '2px 0' }} />
      <div
        onClick={onNewFolder}
        style={{
          padding: '4px 20px 4px 8px',
          cursor: 'pointer',
          borderBottom: '1px solid #808080',
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#000080'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        onMouseOver={(e) => e.currentTarget.style.color = 'white'}
        onMouseOut={(e) => e.currentTarget.style.color = 'black'}
      >
        📁 New Folder
      </div>
      <div style={{ borderBottom: '1px solid #808080', height: '1px', margin: '2px 0' }} />
      <div
        onClick={onProperties}
        style={{
          padding: '4px 20px 4px 8px',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#000080'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        onMouseOver={(e) => e.currentTarget.style.color = 'white'}
        onMouseOut={(e) => e.currentTarget.style.color = 'black'}
      >
        📋 Properties
      </div>
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