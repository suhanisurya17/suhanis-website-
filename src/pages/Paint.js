import React, { useRef, useState, useEffect } from 'react';

function Paint() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('pencil');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [snapshot, setSnapshot] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#800000', '#008000', '#000080', '#808000',
    '#800080', '#008080', '#C0C0C0', '#808080', '#FF6B6B', '#4ECDC4',
    '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Save initial blank canvas to history
      saveToHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Remove any future history if we're not at the end
    const newHistory = history.slice(0, historyStep + 1);

    // Add current state
    newHistory.push(imageData);

    // Limit history to 50 states to prevent memory issues
    if (newHistory.length > 50) {
      newHistory.shift();
      setHistory(newHistory);
      setHistoryStep(newHistory.length - 1);
    } else {
      setHistory(newHistory);
      setHistoryStep(newHistory.length - 1);
    }
  };

  const undo = () => {
    if (historyStep > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const newStep = historyStep - 1;
      ctx.putImageData(history[newStep], 0, 0);
      setHistoryStep(newStep);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const newStep = historyStep + 1;
      ctx.putImageData(history[newStep], 0, 0);
      setHistoryStep(newStep);
    }
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setStartPos({ x, y });

    const ctx = canvas.getContext('2d');

    // Save canvas state for shapes
    if (['line', 'rectangle', 'circle'].includes(currentTool)) {
      setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }

    if (currentTool === 'fill') {
      floodFill(x, y, ctx);
      saveToHistory();
      setIsDrawing(false);
    } else if (currentTool === 'pencil' || currentTool === 'brush' || currentTool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext('2d');

    if (currentTool === 'pencil' || currentTool === 'brush') {
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = currentTool === 'brush' ? brushSize * 2 : brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (currentTool === 'eraser') {
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = brushSize * 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (['line', 'rectangle', 'circle'].includes(currentTool)) {
      // Restore snapshot before drawing preview
      if (snapshot) {
        ctx.putImageData(snapshot, 0, 0);
      }

      ctx.strokeStyle = currentColor;
      ctx.fillStyle = currentColor;
      ctx.lineWidth = brushSize;

      if (currentTool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else if (currentTool === 'rectangle') {
        const width = x - startPos.x;
        const height = y - startPos.y;
        ctx.strokeRect(startPos.x, startPos.y, width, height);
      } else if (currentTool === 'circle') {
        const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
        ctx.beginPath();
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      saveToHistory();
    }
    setIsDrawing(false);
    setSnapshot(null);
  };

  const floodFill = (startX, startY, ctx) => {
    const canvas = canvasRef.current;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    const targetColor = getPixelColor(Math.floor(startX), Math.floor(startY), pixels, canvas.width);
    const fillColor = hexToRgb(currentColor);

    if (colorsMatch(targetColor, fillColor)) return;

    const stack = [[Math.floor(startX), Math.floor(startY)]];
    const visited = new Set();

    while (stack.length > 0) {
      const [x, y] = stack.pop();
      const key = `${x},${y}`;

      if (visited.has(key)) continue;
      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;

      const currentColor = getPixelColor(x, y, pixels, canvas.width);
      if (!colorsMatch(currentColor, targetColor)) continue;

      visited.add(key);
      setPixelColor(x, y, fillColor, pixels, canvas.width);

      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const getPixelColor = (x, y, pixels, width) => {
    const index = (y * width + x) * 4;
    return {
      r: pixels[index],
      g: pixels[index + 1],
      b: pixels[index + 2],
      a: pixels[index + 3]
    };
  };

  const setPixelColor = (x, y, color, pixels, width) => {
    const index = (y * width + x) * 4;
    pixels[index] = color.r;
    pixels[index + 1] = color.g;
    pixels[index + 2] = color.b;
    pixels[index + 3] = 255;
  };

  const colorsMatch = (a, b) => {
    return a.r === b.r && a.g === b.g && a.b === b.b;
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'my-painting.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const toolButtonStyle = (tool) => ({
    padding: '6px',
    border: currentTool === tool ? '2px inset #c0c0c0' : '2px outset #c0c0c0',
    backgroundColor: currentTool === tool ? '#a0a0a0' : '#c0c0c0',
    cursor: 'pointer',
    fontFamily: 'MS Sans Serif, sans-serif',
    fontSize: '10px',
    minWidth: '32px',
    minHeight: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#c0c0c0',
        fontFamily: 'MS Sans Serif, sans-serif',
        fontSize: '11px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Menu Bar */}
      <div
        style={{
          backgroundColor: '#c0c0c0',
          borderBottom: '1px solid #808080',
          padding: '2px 4px',
          display: 'flex',
          gap: '8px',
        }}
      >
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>File</span>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Edit</span>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>View</span>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Image</span>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Colors</span>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Help</span>
      </div>

      {/* Toolbar */}
      <div
        style={{
          backgroundColor: '#c0c0c0',
          borderBottom: '2px inset #c0c0c0',
          padding: '4px',
          display: 'flex',
          gap: '4px',
          flexWrap: 'wrap',
        }}
      >
        {/* File Actions */}
        <button
          onClick={clearCanvas}
          style={{
            padding: '2px 8px',
            border: '2px outset #c0c0c0',
            backgroundColor: '#c0c0c0',
            cursor: 'pointer',
            fontFamily: 'MS Sans Serif, sans-serif',
            fontSize: '10px',
          }}
        >
          Clear
        </button>
        <button
          onClick={saveImage}
          style={{
            padding: '2px 8px',
            border: '2px outset #c0c0c0',
            backgroundColor: '#c0c0c0',
            cursor: 'pointer',
            fontFamily: 'MS Sans Serif, sans-serif',
            fontSize: '10px',
          }}
        >
          Save
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#808080', margin: '0 4px' }} />

        {/* Undo/Redo */}
        <button
          onClick={undo}
          disabled={historyStep <= 0}
          style={{
            padding: '2px 8px',
            border: '2px outset #c0c0c0',
            backgroundColor: historyStep <= 0 ? '#a0a0a0' : '#c0c0c0',
            cursor: historyStep <= 0 ? 'not-allowed' : 'pointer',
            fontFamily: 'MS Sans Serif, sans-serif',
            fontSize: '10px',
            opacity: historyStep <= 0 ? 0.5 : 1,
          }}
          title="Undo"
        >
          ↶ Undo
        </button>
        <button
          onClick={redo}
          disabled={historyStep >= history.length - 1}
          style={{
            padding: '2px 8px',
            border: '2px outset #c0c0c0',
            backgroundColor: historyStep >= history.length - 1 ? '#a0a0a0' : '#c0c0c0',
            cursor: historyStep >= history.length - 1 ? 'not-allowed' : 'pointer',
            fontFamily: 'MS Sans Serif, sans-serif',
            fontSize: '10px',
            opacity: historyStep >= history.length - 1 ? 0.5 : 1,
          }}
          title="Redo"
        >
          ↷ Redo
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#808080', margin: '0 4px' }} />

        {/* Drawing Tools */}
        <button onClick={() => setCurrentTool('pencil')} style={toolButtonStyle('pencil')} title="Pencil">
          ✏️
        </button>
        <button onClick={() => setCurrentTool('brush')} style={toolButtonStyle('brush')} title="Brush">
          🖌️
        </button>
        <button onClick={() => setCurrentTool('eraser')} style={toolButtonStyle('eraser')} title="Eraser">
          🧹
        </button>
        <button onClick={() => setCurrentTool('fill')} style={toolButtonStyle('fill')} title="Fill">
          🪣
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#808080', margin: '0 4px' }} />

        {/* Shape Tools */}
        <button onClick={() => setCurrentTool('line')} style={toolButtonStyle('line')} title="Line">
          ／
        </button>
        <button onClick={() => setCurrentTool('rectangle')} style={toolButtonStyle('rectangle')} title="Rectangle">
          ▭
        </button>
        <button onClick={() => setCurrentTool('circle')} style={toolButtonStyle('circle')} title="Circle">
          ○
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#808080', margin: '0 4px' }} />

        {/* Brush Size */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '10px' }}>Size:</span>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            style={{ width: '80px' }}
          />
          <span style={{ fontSize: '10px', minWidth: '20px' }}>{brushSize}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Color Palette */}
        <div
          style={{
            backgroundColor: '#c0c0c0',
            borderRight: '2px inset #c0c0c0',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '80px',
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: '10px', fontWeight: 'bold', textAlign: 'center' }}>Colors</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '4px',
            }}
          >
            {colors.map((color) => (
              <div
                key={color}
                onClick={() => setCurrentColor(color)}
                style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: color,
                  border: currentColor === color ? '3px solid #000080' : '2px outset #c0c0c0',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                }}
              />
            ))}
          </div>

          <div style={{ marginTop: '8px' }}>
            <div style={{ fontSize: '10px', marginBottom: '4px', textAlign: 'center' }}>Custom</div>
            <input
              type="color"
              value={currentColor}
              onChange={(e) => setCurrentColor(e.target.value)}
              style={{
                width: '100%',
                height: '32px',
                border: '2px inset #c0c0c0',
                cursor: 'pointer',
              }}
            />
          </div>

          <div
            style={{
              marginTop: '8px',
              padding: '4px',
              border: '2px inset #c0c0c0',
              backgroundColor: 'white',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '9px', marginBottom: '4px' }}>Current:</div>
            <div
              style={{
                width: '100%',
                height: '32px',
                backgroundColor: currentColor,
                border: '1px solid #000',
              }}
            />
          </div>
        </div>

        {/* Canvas Area */}
        <div
          style={{
            flex: 1,
            padding: '8px',
            backgroundColor: '#808080',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'auto',
          }}
        >
          <canvas
            ref={canvasRef}
            width={700}
            height={500}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{
              backgroundColor: '#FFFFFF',
              cursor: currentTool === 'fill' ? 'crosshair' :
                     currentTool === 'eraser' ? 'not-allowed' : 'crosshair',
              border: '2px solid #000',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div
        style={{
          backgroundColor: '#c0c0c0',
          borderTop: '1px solid #808080',
          padding: '2px 8px',
          fontSize: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '20px',
        }}
      >
        <div style={{ display: 'flex', gap: '12px' }}>
          <span style={{ border: '1px inset #c0c0c0', padding: '1px 8px' }}>
            Tool: {currentTool.charAt(0).toUpperCase() + currentTool.slice(1)}
          </span>
          <span style={{ border: '1px inset #c0c0c0', padding: '1px 8px' }}>
            Size: {brushSize}px
          </span>
          <span style={{ border: '1px inset #c0c0c0', padding: '1px 8px' }}>
            Color: {currentColor}
          </span>
        </div>
        <span style={{ border: '1px inset #c0c0c0', padding: '1px 8px' }}>
          700 x 500 pixels
        </span>
      </div>
    </div>
  );
}

export default Paint;
