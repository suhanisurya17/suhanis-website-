import React, { useState } from 'react';

function Photos() {
  const totalPhotos = 30;
  const [currentPhoto, setCurrentPhoto] = useState(1);

  const handleNext = () => {
    setCurrentPhoto(prev => (prev < totalPhotos ? prev + 1 : 1));
  };

  const handlePrev = () => {
    setCurrentPhoto(prev => (prev > 1 ? prev - 1 : totalPhotos));
  };

  const photoSrc = `/icons/photos-page/pic${currentPhoto}.jpeg`;

  return (
    <div
      style={{
        width: '600px',
        margin: '0 auto',
        backgroundColor: '#c0c0c0',
        border: '2px outset #c0c0c0',
        fontFamily: 'MS Sans Serif, sans-serif',
        fontSize: '11px',
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
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Help</span>
      </div>

      {/* Toolbar */}
      <div
        style={{
          backgroundColor: '#c0c0c0',
          borderBottom: '1px solid #808080',
          padding: '4px',
          display: 'flex',
          gap: '2px',
          alignItems: 'center',
        }}
      >
        <button
          onClick={handlePrev}
          style={{
            width: '24px',
            height: '22px',
            border: '1px outset #c0c0c0',
            backgroundColor: '#c0c0c0',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseDown={(e) => e.target.style.border = '1px inset #c0c0c0'}
          onMouseUp={(e) => e.target.style.border = '1px outset #c0c0c0'}
          onMouseLeave={(e) => e.target.style.border = '1px outset #c0c0c0'}
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          style={{
            width: '24px',
            height: '22px',
            border: '1px outset #c0c0c0',
            backgroundColor: '#c0c0c0',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseDown={(e) => e.target.style.border = '1px inset #c0c0c0'}
          onMouseUp={(e) => e.target.style.border = '1px outset #c0c0c0'}
          onMouseLeave={(e) => e.target.style.border = '1px outset #c0c0c0'}
        >
          ▶
        </button>
        <div style={{ width: '1px', height: '18px', backgroundColor: '#808080', margin: '0 4px' }} />
        <span style={{ fontSize: '11px', color: '#000' }}>
          Image {currentPhoto} of {totalPhotos}
        </span>
      </div>

      {/* Photo Display Area */}
      <div
        style={{
          padding: '8px',
          backgroundColor: '#c0c0c0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <div
          style={{
            border: '2px inset #c0c0c0',
            padding: '4px',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: '500px',
            height: '350px',
          }}
        >
         <img
            src={photoSrc}
            alt=""
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />


        </div>
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
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{
            border: '1px inset #c0c0c0',
            padding: '1px 4px',
            minWidth: '60px'
          }}>
            Ready
          </span>
          <span style={{
            border: '1px inset #c0c0c0',
            padding: '1px 4px',
            minWidth: '40px'
          }}>
            {currentPhoto}/{totalPhotos}
          </span>
        </div>
        <span style={{
          border: '1px inset #c0c0c0',
          padding: '1px 4px',
          minWidth: '80px',
          textAlign: 'center'
        }}>
          100%
        </span>
      </div>
    </div>
  );
}

export default Photos;