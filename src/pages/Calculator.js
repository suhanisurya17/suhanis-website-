import React, { useState, useEffect } from 'react';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);

  const handleNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = performOperation(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const performOperation = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '*':
        return prev * current;
      case '/':
        return prev / current;
      case '%':
        return prev % current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = performOperation(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleClearEntry = () => {
    setDisplay('0');
    setWaitingForOperand(false);
  };

  const handleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const handleSqrt = () => {
    const value = parseFloat(display);
    setDisplay(String(Math.sqrt(value)));
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  // Memory functions
  const handleMemoryClear = () => setMemory(0);
  const handleMemoryRecall = () => setDisplay(String(memory));
  const handleMemoryStore = () => setMemory(parseFloat(display));
  const handleMemoryAdd = () => setMemory(memory + parseFloat(display));

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleNumber(e.key);
      } else if (e.key === '.') {
        handleDecimal();
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleOperation(e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Escape' || e.key === 'c') {
        handleClear();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  });

  const buttonStyle = {
    padding: '12px',
    border: '2px outset #c0c0c0',
    backgroundColor: '#c0c0c0',
    cursor: 'pointer',
    fontFamily: 'MS Sans Serif, sans-serif',
    fontSize: '13px',
    fontWeight: 'bold',
    minWidth: '40px',
    minHeight: '32px',
    userSelect: 'none',
  };

  const operationButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#d0d0d0',
  };

  return (
    <div
      style={{
        width: '280px',
        margin: '0 auto',
        backgroundColor: '#c0c0c0',
        border: '2px outset #c0c0c0',
        fontFamily: 'MS Sans Serif, sans-serif',
        fontSize: '11px',
        padding: '8px',
      }}
    >
      {/* Menu Bar */}
      <div
        style={{
          backgroundColor: '#c0c0c0',
          borderBottom: '1px solid #808080',
          padding: '2px 4px',
          marginBottom: '8px',
          display: 'flex',
          gap: '8px',
        }}
      >
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>View</span>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Edit</span>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Help</span>
      </div>

      {/* Display */}
      <div
        style={{
          backgroundColor: '#000080',
          color: '#00ff00',
          padding: '8px',
          textAlign: 'right',
          fontSize: '24px',
          fontFamily: 'Digital, monospace',
          border: '2px inset #808080',
          marginBottom: '12px',
          minHeight: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          wordBreak: 'break-all',
        }}
      >
        {display}
      </div>

      {/* Memory indicator */}
      <div
        style={{
          fontSize: '10px',
          marginBottom: '8px',
          minHeight: '12px',
          color: memory !== 0 ? '#000' : '#c0c0c0',
        }}
      >
        {memory !== 0 ? 'M' : ''}
      </div>

      {/* Memory Buttons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '4px',
          marginBottom: '8px',
        }}
      >
        <button onClick={handleMemoryClear} style={buttonStyle} title="Memory Clear">
          MC
        </button>
        <button onClick={handleMemoryRecall} style={buttonStyle} title="Memory Recall">
          MR
        </button>
        <button onClick={handleMemoryStore} style={buttonStyle} title="Memory Store">
          MS
        </button>
        <button onClick={handleMemoryAdd} style={buttonStyle} title="Memory Add">
          M+
        </button>
        <button onClick={handleBackspace} style={buttonStyle} title="Backspace">
          ←
        </button>
      </div>

      {/* Special Functions */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '4px',
          marginBottom: '8px',
        }}
      >
        <button onClick={handleClear} style={operationButtonStyle} title="Clear">
          C
        </button>
        <button onClick={handleClearEntry} style={operationButtonStyle} title="Clear Entry">
          CE
        </button>
        <button onClick={handleSign} style={operationButtonStyle} title="Change Sign">
          ±
        </button>
        <button onClick={handleSqrt} style={operationButtonStyle} title="Square Root">
          √
        </button>
        <button onClick={() => handleOperation('/')} style={operationButtonStyle} title="Divide">
          ÷
        </button>
      </div>

      {/* Number pad and operations */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '4px',
        }}
      >
        {/* Row 1 */}
        <button onClick={() => handleNumber(7)} style={buttonStyle}>7</button>
        <button onClick={() => handleNumber(8)} style={buttonStyle}>8</button>
        <button onClick={() => handleNumber(9)} style={buttonStyle}>9</button>
        <button onClick={() => handleOperation('*')} style={operationButtonStyle}>×</button>

        {/* Row 2 */}
        <button onClick={() => handleNumber(4)} style={buttonStyle}>4</button>
        <button onClick={() => handleNumber(5)} style={buttonStyle}>5</button>
        <button onClick={() => handleNumber(6)} style={buttonStyle}>6</button>
        <button onClick={() => handleOperation('-')} style={operationButtonStyle}>−</button>

        {/* Row 3 */}
        <button onClick={() => handleNumber(1)} style={buttonStyle}>1</button>
        <button onClick={() => handleNumber(2)} style={buttonStyle}>2</button>
        <button onClick={() => handleNumber(3)} style={buttonStyle}>3</button>
        <button onClick={() => handleOperation('+')} style={operationButtonStyle}>+</button>

        {/* Row 4 */}
        <button onClick={() => handleNumber(0)} style={{ ...buttonStyle, gridColumn: 'span 2' }}>0</button>
        <button onClick={handleDecimal} style={buttonStyle}>.</button>
        <button
          onClick={handleEquals}
          style={{
            ...operationButtonStyle,
            backgroundColor: '#008080',
            color: 'white',
          }}
        >
          =
        </button>
      </div>

      {/* Status bar */}
      <div
        style={{
          marginTop: '8px',
          padding: '4px',
          borderTop: '1px solid #808080',
          fontSize: '10px',
          color: '#666',
          textAlign: 'center',
        }}
      >
        Standard Calculator
      </div>
    </div>
  );
}

export default Calculator;
