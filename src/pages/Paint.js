import React, { useRef, useState, useEffect, useCallback } from 'react';

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
  const [openMenu, setOpenMenu] = useState(null); // 'file' | 'edit' | 'image' | 'help' | null

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
      saveToHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = () => setOpenMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => {
      const newHistory = prev.slice(0, historyStep + 1);
      newHistory.push(imageData);
      if (newHistory.length > 50) newHistory.shift();
      setHistoryStep(newHistory.length - 1);
      return newHistory;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyStep]);

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

  // ── Image operations ──────────────────────────────────────────────
  const flipHorizontal = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const tmp = document.createElement('canvas');
    tmp.width = canvas.width; tmp.height = canvas.height;
    const tCtx = tmp.getContext('2d');
    tCtx.drawImage(canvas, 0, 0);
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(tmp, -canvas.width, 0);
    ctx.restore();
    saveToHistory();
  };

  const flipVertical = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const tmp = document.createElement('canvas');
    tmp.width = canvas.width; tmp.height = canvas.height;
    const tCtx = tmp.getContext('2d');
    tCtx.drawImage(canvas, 0, 0);
    ctx.save();
    ctx.scale(1, -1);
    ctx.drawImage(tmp, 0, -canvas.height);
    ctx.restore();
    saveToHistory();
  };

  const rotateCW = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const tmp = document.createElement('canvas');
    tmp.width = canvas.width; tmp.height = canvas.height;
    tmp.getContext('2d').drawImage(canvas, 0, 0);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(Math.PI / 2);
    ctx.drawImage(tmp, -canvas.width / 2, -canvas.height / 2);
    ctx.restore();
    saveToHistory();
  };

  const invertColors = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = imageData.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i] = 255 - d[i];
      d[i + 1] = 255 - d[i + 1];
      d[i + 2] = 255 - d[i + 2];
    }
    ctx.putImageData(imageData, 0, 0);
    saveToHistory();
  };

  const grayscale = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = imageData.data;
    for (let i = 0; i < d.length; i += 4) {
      const avg = (d[i] + d[i + 1] + d[i + 2]) / 3;
      d[i] = d[i + 1] = d[i + 2] = avg;
    }
    ctx.putImageData(imageData, 0, 0);
    saveToHistory();
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
    link.download = 'painting.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  // ── Drawing ───────────────────────────────────────────────────────
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setStartPos({ x, y });
    const ctx = canvas.getContext('2d');
    if (['line', 'rectangle', 'circle'].includes(currentTool)) {
      setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }
    if (currentTool === 'fill') {
      floodFill(x, y, ctx);
      saveToHistory();
      setIsDrawing(false);
    } else if (['pencil', 'brush', 'eraser'].includes(currentTool)) {
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
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.lineTo(x, y); ctx.stroke();
    } else if (currentTool === 'eraser') {
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = brushSize * 3;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.lineTo(x, y); ctx.stroke();
    } else if (['line', 'rectangle', 'circle'].includes(currentTool)) {
      if (snapshot) ctx.putImageData(snapshot, 0, 0);
      ctx.strokeStyle = currentColor;
      ctx.fillStyle = currentColor;
      ctx.lineWidth = brushSize;
      if (currentTool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(x, y); ctx.stroke();
      } else if (currentTool === 'rectangle') {
        ctx.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
      } else if (currentTool === 'circle') {
        const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
        ctx.beginPath();
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    if (isDrawing) saveToHistory();
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
      const c = getPixelColor(x, y, pixels, canvas.width);
      if (!colorsMatch(c, targetColor)) continue;
      visited.add(key);
      setPixelColor(x, y, fillColor, pixels, canvas.width);
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    ctx.putImageData(imageData, 0, 0);
  };

  const getPixelColor = (x, y, pixels, width) => {
    const i = (y * width + x) * 4;
    return { r: pixels[i], g: pixels[i + 1], b: pixels[i + 2], a: pixels[i + 3] };
  };
  const setPixelColor = (x, y, color, pixels, width) => {
    const i = (y * width + x) * 4;
    pixels[i] = color.r; pixels[i + 1] = color.g; pixels[i + 2] = color.b; pixels[i + 3] = 255;
  };
  const colorsMatch = (a, b) => a.r === b.r && a.g === b.g && a.b === b.b;
  const hexToRgb = (hex) => {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : { r: 0, g: 0, b: 0 };
  };

  // ── Styles ────────────────────────────────────────────────────────
  const toolButtonStyle = (tool) => ({
    padding: '6px',
    border: currentTool === tool ? '2px inset #c0c0c0' : '2px outset #c0c0c0',
    backgroundColor: currentTool === tool ? '#a0a0a0' : '#c0c0c0',
    cursor: 'pointer',
    fontFamily: 'MS Sans Serif, sans-serif',
    fontSize: '10px',
    minWidth: '32px', minHeight: '32px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  });

  const menuItemStyle = (disabled = false) => ({
    padding: '4px 24px 4px 16px',
    cursor: disabled ? 'default' : 'pointer',
    whiteSpace: 'nowrap',
    color: disabled ? '#808080' : 'black',
    fontSize: '11px',
    fontFamily: 'MS Sans Serif, sans-serif',
  });

  const dropdownStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#c0c0c0',
    border: '2px outset #c0c0c0',
    boxShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    zIndex: 10000,
    minWidth: '160px',
  };

  const menuSep = <div style={{ height: '1px', backgroundColor: '#808080', margin: '3px 4px' }} />;

  const menuAction = (fn) => (e) => {
    e.stopPropagation();
    setOpenMenu(null);
    fn();
  };

  return (
    <div
      style={{
        width: '100%', height: '100%',
        backgroundColor: '#c0c0c0',
        fontFamily: 'MS Sans Serif, sans-serif',
        fontSize: '11px',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* ── Menu Bar ── */}
      <div
        style={{
          backgroundColor: '#c0c0c0',
          borderBottom: '1px solid #808080',
          padding: '2px 4px',
          display: 'flex', gap: '0px',
          position: 'relative',
          userSelect: 'none',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* FILE */}
        <div style={{ position: 'relative' }}>
          <span
            onClick={() => setOpenMenu(openMenu === 'file' ? null : 'file')}
            style={{
              padding: '2px 8px', cursor: 'pointer', display: 'block',
              backgroundColor: openMenu === 'file' ? '#000080' : 'transparent',
              color: openMenu === 'file' ? 'white' : 'black',
            }}
          >File</span>
          {openMenu === 'file' && (
            <div style={dropdownStyle}>
              <div style={menuItemStyle()} onClick={menuAction(clearCanvas)}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#000080'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'black'; }}>
                🆕 New
              </div>
              {menuSep}
              <div style={menuItemStyle()} onClick={menuAction(saveImage)}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#000080'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'black'; }}>
                💾 Save as PNG
              </div>
            </div>
          )}
        </div>

        {/* EDIT */}
        <div style={{ position: 'relative' }}>
          <span
            onClick={() => setOpenMenu(openMenu === 'edit' ? null : 'edit')}
            style={{
              padding: '2px 8px', cursor: 'pointer', display: 'block',
              backgroundColor: openMenu === 'edit' ? '#000080' : 'transparent',
              color: openMenu === 'edit' ? 'white' : 'black',
            }}
          >Edit</span>
          {openMenu === 'edit' && (
            <div style={dropdownStyle}>
              <div
                style={menuItemStyle(historyStep <= 0)}
                onClick={historyStep > 0 ? menuAction(undo) : undefined}
                onMouseEnter={e => { if (historyStep > 0) { e.currentTarget.style.backgroundColor = '#000080'; e.currentTarget.style.color = 'white'; } }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = historyStep <= 0 ? '#808080' : 'black'; }}>
                ↶ Undo{'\t'}Ctrl+Z
              </div>
              <div
                style={menuItemStyle(historyStep >= history.length - 1)}
                onClick={historyStep < history.length - 1 ? menuAction(redo) : undefined}
                onMouseEnter={e => { if (historyStep < history.length - 1) { e.currentTarget.style.backgroundColor = '#000080'; e.currentTarget.style.color = 'white'; } }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = historyStep >= history.length - 1 ? '#808080' : 'black'; }}>
                ↷ Redo{'\t'}Ctrl+Y
              </div>
              {menuSep}
              <div style={menuItemStyle()} onClick={menuAction(clearCanvas)}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#000080'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'black'; }}>
                🗑️ Clear All
              </div>
            </div>
          )}
        </div>

        {/* IMAGE */}
        <div style={{ position: 'relative' }}>
          <span
            onClick={() => setOpenMenu(openMenu === 'image' ? null : 'image')}
            style={{
              padding: '2px 8px', cursor: 'pointer', display: 'block',
              backgroundColor: openMenu === 'image' ? '#000080' : 'transparent',
              color: openMenu === 'image' ? 'white' : 'black',
            }}
          >Image</span>
          {openMenu === 'image' && (
            <div style={dropdownStyle}>
              <div style={menuItemStyle()} onClick={menuAction(flipHorizontal)}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#000080'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'black'; }}>
                ↔️ Flip Horizontal
              </div>
              <div style={menuItemStyle()} onClick={menuAction(flipVertical)}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#000080'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'black'; }}>
                ↕️ Flip Vertical
              </div>
              <div style={menuItemStyle()} onClick={menuAction(rotateCW)}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#000080'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'black'; }}>
                🔄 Rotate 90° CW
              </div>
              {menuSep}
              <div style={menuItemStyle()} onClick={menuAction(invertColors)}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#000080'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'black'; }}>
                🎨 Invert Colors
              </div>
              <div style={menuItemStyle()} onClick={menuAction(grayscale)}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#000080'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'black'; }}>
                🩶 Grayscale
              </div>
            </div>
          )}
        </div>

        {/* HELP */}
        <div style={{ position: 'relative' }}>
          <span
            onClick={() => setOpenMenu(openMenu === 'help' ? null : 'help')}
            style={{
              padding: '2px 8px', cursor: 'pointer', display: 'block',
              backgroundColor: openMenu === 'help' ? '#000080' : 'transparent',
              color: openMenu === 'help' ? 'white' : 'black',
            }}
          >Help</span>
          {openMenu === 'help' && (
            <div style={dropdownStyle}>
              <div style={menuItemStyle()} onClick={menuAction(() => alert('Paint v1.0\n\nTools: Pencil, Brush, Eraser, Fill, Line, Rectangle, Circle\nShortcuts: Ctrl+Z Undo, Ctrl+Y Redo\n\nPart of Suhani\'s Windows 98 Portfolio'))}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#000080'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'black'; }}>
                ℹ️ About Paint
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div style={{
        backgroundColor: '#c0c0c0',
        borderBottom: '2px inset #c0c0c0',
        padding: '4px',
        display: 'flex', gap: '4px', flexWrap: 'wrap',
      }}>
        <button onClick={clearCanvas} style={{ padding: '2px 8px', border: '2px outset #c0c0c0', backgroundColor: '#c0c0c0', cursor: 'pointer', fontFamily: 'MS Sans Serif, sans-serif', fontSize: '10px' }}>Clear</button>
        <button onClick={saveImage} style={{ padding: '2px 8px', border: '2px outset #c0c0c0', backgroundColor: '#c0c0c0', cursor: 'pointer', fontFamily: 'MS Sans Serif, sans-serif', fontSize: '10px' }}>Save</button>
        <div style={{ width: '1px', height: '24px', backgroundColor: '#808080', margin: '0 4px' }} />
        <button onClick={undo} disabled={historyStep <= 0} style={{ padding: '2px 8px', border: '2px outset #c0c0c0', backgroundColor: historyStep <= 0 ? '#a0a0a0' : '#c0c0c0', cursor: historyStep <= 0 ? 'not-allowed' : 'pointer', fontFamily: 'MS Sans Serif, sans-serif', fontSize: '10px', opacity: historyStep <= 0 ? 0.5 : 1 }}>↶ Undo</button>
        <button onClick={redo} disabled={historyStep >= history.length - 1} style={{ padding: '2px 8px', border: '2px outset #c0c0c0', backgroundColor: historyStep >= history.length - 1 ? '#a0a0a0' : '#c0c0c0', cursor: historyStep >= history.length - 1 ? 'not-allowed' : 'pointer', fontFamily: 'MS Sans Serif, sans-serif', fontSize: '10px', opacity: historyStep >= history.length - 1 ? 0.5 : 1 }}>↷ Redo</button>
        <div style={{ width: '1px', height: '24px', backgroundColor: '#808080', margin: '0 4px' }} />
        <button onClick={() => setCurrentTool('pencil')} style={toolButtonStyle('pencil')} title="Pencil">✏️</button>
        <button onClick={() => setCurrentTool('brush')} style={toolButtonStyle('brush')} title="Brush">🖌️</button>
        <button onClick={() => setCurrentTool('eraser')} style={toolButtonStyle('eraser')} title="Eraser">🧹</button>
        <button onClick={() => setCurrentTool('fill')} style={toolButtonStyle('fill')} title="Fill">🪣</button>
        <div style={{ width: '1px', height: '24px', backgroundColor: '#808080', margin: '0 4px' }} />
        <button onClick={() => setCurrentTool('line')} style={toolButtonStyle('line')} title="Line">／</button>
        <button onClick={() => setCurrentTool('rectangle')} style={toolButtonStyle('rectangle')} title="Rectangle">▭</button>
        <button onClick={() => setCurrentTool('circle')} style={toolButtonStyle('circle')} title="Circle">○</button>
        <div style={{ width: '1px', height: '24px', backgroundColor: '#808080', margin: '0 4px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '10px' }}>Size:</span>
          <input type="range" min="1" max="20" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))} style={{ width: '80px' }} />
          <span style={{ fontSize: '10px', minWidth: '20px' }}>{brushSize}</span>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Color Palette */}
        <div style={{ backgroundColor: '#c0c0c0', borderRight: '2px inset #c0c0c0', padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px', width: '80px', flexShrink: 0 }}>
          <div style={{ fontSize: '10px', fontWeight: 'bold', textAlign: 'center' }}>Colors</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px' }}>
            {colors.map((color) => (
              <div key={color} onClick={() => setCurrentColor(color)} style={{ width: '28px', height: '28px', backgroundColor: color, border: currentColor === color ? '3px solid #000080' : '2px outset #c0c0c0', cursor: 'pointer', boxSizing: 'border-box' }} />
            ))}
          </div>
          <div style={{ marginTop: '8px' }}>
            <div style={{ fontSize: '10px', marginBottom: '4px', textAlign: 'center' }}>Custom</div>
            <input type="color" value={currentColor} onChange={(e) => setCurrentColor(e.target.value)} style={{ width: '100%', height: '32px', border: '2px inset #c0c0c0', cursor: 'pointer' }} />
          </div>
          <div style={{ marginTop: '8px', padding: '4px', border: '2px inset #c0c0c0', backgroundColor: 'white', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', marginBottom: '4px' }}>Current:</div>
            <div style={{ width: '100%', height: '32px', backgroundColor: currentColor, border: '1px solid #000' }} />
          </div>
        </div>

        {/* Canvas */}
        <div style={{ flex: 1, padding: '8px', backgroundColor: '#808080', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
          <canvas
            ref={canvasRef}
            width={700} height={500}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{ backgroundColor: '#FFFFFF', cursor: 'crosshair', border: '2px solid #000', boxShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          />
        </div>
      </div>

      {/* ── Status Bar ── */}
      <div style={{ backgroundColor: '#c0c0c0', borderTop: '1px solid #808080', padding: '2px 8px', fontSize: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '20px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <span style={{ border: '1px inset #c0c0c0', padding: '1px 8px' }}>Tool: {currentTool.charAt(0).toUpperCase() + currentTool.slice(1)}</span>
          <span style={{ border: '1px inset #c0c0c0', padding: '1px 8px' }}>Size: {brushSize}px</span>
          <span style={{ border: '1px inset #c0c0c0', padding: '1px 8px' }}>Color: {currentColor}</span>
        </div>
        <span style={{ border: '1px inset #c0c0c0', padding: '1px 8px' }}>700 x 500 pixels</span>
      </div>
    </div>
  );
}

export default Paint;
