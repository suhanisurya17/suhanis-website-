import React, { useState } from 'react';

function Notepad() {
    const [text, setText] = useState('');
    const [fileName, setFileName] = useState('Untitled');

    const handleNew = () => {
        setText('');
        setFileName('Untitled');
    };

    const handleSave = () => {
        // In a real app, this would save the file
        alert('File saved!');
    };

    const handleOpen = () => {
        // In a real app, this would open a file dialog
        alert('Open file dialog would appear here');
    };

    return (
        <div
            style={{
                width: '600px',
                height: '500px',
                margin: '0 auto',
                backgroundColor: '#c0c0c0',
                border: '2px outset #c0c0c0',
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
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <span style={{ padding: '2px 8px', cursor: 'pointer' }}>File</span>
                </div>
                <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Edit</span>
                <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Search</span>
                <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Help</span>
            </div>

            {/* Quick Action Buttons (optional toolbar) */}
            <div
                style={{
                    backgroundColor: '#c0c0c0',
                    borderTop: '1px solid #808080',
                    borderBottom: '1px solid #808080',
                    padding: '4px',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                }}
            >
                <button
                    onClick={handleNew}
                    style={{
                        padding: '2px 8px',
                        border: '1px outset #c0c0c0',
                        backgroundColor: '#c0c0c0',
                        fontSize: '11px',
                        cursor: 'pointer',
                        fontFamily: 'MS Sans Serif, sans-serif',
                    }}
                    onMouseDown={(e) => e.target.style.border = '1px inset #c0c0c0'}
                    onMouseUp={(e) => e.target.style.border = '1px outset #c0c0c0'}
                    onMouseLeave={(e) => e.target.style.border = '1px outset #c0c0c0'}
                >
                    New
                </button>
                <button
                    onClick={handleOpen}
                    style={{
                        padding: '2px 8px',
                        border: '1px outset #c0c0c0',
                        backgroundColor: '#c0c0c0',
                        fontSize: '11px',
                        cursor: 'pointer',
                        fontFamily: 'MS Sans Serif, sans-serif',
                    }}
                    onMouseDown={(e) => e.target.style.border = '1px inset #c0c0c0'}
                    onMouseUp={(e) => e.target.style.border = '1px outset #c0c0c0'}
                    onMouseLeave={(e) => e.target.style.border = '1px outset #c0c0c0'}
                >
                    Open
                </button>
                <button
                    onClick={handleSave}
                    style={{
                        padding: '2px 8px',
                        border: '1px outset #c0c0c0',
                        backgroundColor: '#c0c0c0',
                        fontSize: '11px',
                        cursor: 'pointer',
                        fontFamily: 'MS Sans Serif, sans-serif',
                    }}
                    onMouseDown={(e) => e.target.style.border = '1px inset #c0c0c0'}
                    onMouseUp={(e) => e.target.style.border = '1px outset #c0c0c0'}
                    onMouseLeave={(e) => e.target.style.border = '1px outset #c0c0c0'}
                >
                    Save
                </button>
                <div style={{ width: '1px', height: '16px', backgroundColor: '#808080', margin: '0 4px' }} />
                <button
                    onClick={() => setText('')}
                    style={{
                        padding: '2px 8px',
                        border: '1px outset #c0c0c0',
                        backgroundColor: '#c0c0c0',
                        fontSize: '11px',
                        cursor: 'pointer',
                        fontFamily: 'MS Sans Serif, sans-serif',
                    }}
                    onMouseDown={(e) => e.target.style.border = '1px inset #c0c0c0'}
                    onMouseUp={(e) => e.target.style.border = '1px outset #c0c0c0'}
                    onMouseLeave={(e) => e.target.style.border = '1px outset #c0c0c0'}
                >
                    Clear
                </button>
            </div>

            {/* Text Area */}
            <div
                style={{
                    flex: 1,
                    padding: '4px',
                    backgroundColor: '#c0c0c0',
                }}
            >
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: '2px inset #c0c0c0',
                        backgroundColor: 'white',
                        fontFamily: 'Courier New, monospace',
                        fontSize: '12px',
                        padding: '4px',
                        resize: 'none',
                        outline: 'none',
                        boxSizing: 'border-box',
                    }}
                    placeholder="Type your text here..."
                />
            </div>

            {/* Status Bar */}
            <div
                style={{
                    backgroundColor: '#c0c0c0',
                    borderTop: '1px solid #808080',
                    padding: '2px 4px',
                    fontSize: '11px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '20px',
                }}
            >
                <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{
                        border: '1px inset #c0c0c0',
                        padding: '1px 4px',
                        minWidth: '100px'
                    }}>
                        {fileName} - Notepad
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{
                        border: '1px inset #c0c0c0',
                        padding: '1px 4px',
                        minWidth: '60px',
                        textAlign: 'center'
                    }}>
                        Ln 1, Col 1
                    </span>
                    <span style={{
                        border: '1px inset #c0c0c0',
                        padding: '1px 4px',
                        minWidth: '80px',
                        textAlign: 'center'
                    }}>
                        {text.length} characters
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Notepad;