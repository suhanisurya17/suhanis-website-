import React, { useState } from 'react';

function CameraReviews() {
  const cameras = [
    {
  id: 1,
  name: "Canon Powershot A510",
  type: "Point-And-Shoot",
  yearOwned: "2023-Present",
  rating: "⭐⭐⭐⭐",
  review: "An absolute classic! This was my first dedicated camera (I stole it from my parents lol) and it taught me the basics of photography. The auto mode is great for beginners, but you can still experiment with manual settings and scene modes. The 4x optical zoom is surprisingly versatile, and the build quality is solid for its age. It's lightweight and easy to carry around. My friends and I loved using it to take pictures! Runs on AA batteries which is super convenient. The only downside is that the 3.2MP resolution feels limiting by today's industry standards, but it gives a warm and nostalgic feel to the photos, yet maintaining a good amount of clarity",
  pros: ["Easy to use", "Runs on AA batteries", "Compact and portable", "Good learning tool", "Nice basic features and adjustments"],
  cons: ["Low resolution by modern standards", "Battery drains really fast", "Small LCD screen", "Limited in low light"],
  verdict: "Perfect first camera for anyone getting into photography on a budget or wanting to learn the basics without the distractions of a smartphone."
   },
    {
  id: 2,
  name: "Canon Powershot A410",
  type: "Point-And-Shoot",
  yearOwned: "2025-Present",
  rating: "⭐⭐⭐⭐",
  review: "I got this on FB marketplace for $30. It was a replacement since I lost the OG. It's a solid companion to my A510. This 3.2MP camera shares many of the same strengths as its sibling but with a fixed 3x optical zoom. It's incredibly compact and lightweight, making it perfect for everyday carry. The simple interface means I can hand it to anyone and they'll figure it out instantly. Image quality is consistent and the auto mode rarely misses. Battery life on AA batteries is decent, though I always keep spares on hand. Unfortunately, my specific instance of the camera has a broken CCD sensor, which causes gray horizontal lines across my photos in the light.",
  pros: ["Ultra compact", "Simple interface", "Runs on AA batteries", "Reliable auto mode"],
  cons: ["Fixed lens less versatile", "Small LCD screen", "Limited manual controls"],
  verdict: "A great no-fuss digital camera for casual shooting and a perfect backup camera."
},
    {
  id: 3,
  name: "Canon Powershot SX200 IS",
  type: "Point-And-Shoot",
  yearOwned: "2025-Present",
  rating: "⭐⭐⭐⭐⭐",
  review: "I also got this camera on FB marketplace. It's a huge step up from the earlier PowerShot models. The 12x optical zoom (28-336mm equivalent) is incredibly versatile, letting me shoot everything from wide landscapes to distant subjects. The 12.1MP sensor produces great image quality, and the optical image stabilization really helps when shooting at full zoom. The 3-inch LCD is a nice improvement over older models. However, the camera can struggle in low light, and the zoom mechanism started getting a bit slow after heavy use.",
  pros: ["Impressive 12x zoom range", "Optical image stabilization", "Larger LCD screen", "Good battery life"],
  cons: ["Poor low-light performance", "Zoom can be slow"],
  verdict: "Great all-around travel camera with impressive zoom, though it shows its age in challenging lighting conditions."
}
  ];

  const [currentCamera, setCurrentCamera] = useState(0);

  const handleNext = () => {
    setCurrentCamera(prev => (prev < cameras.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentCamera(prev => (prev > 0 ? prev - 1 : cameras.length - 1));
  };

  const camera = cameras[currentCamera];

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
          Camera {currentCamera + 1} of {cameras.length}
        </span>
      </div>

      {/* Review Content */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '12px',
          backgroundColor: 'white',
          margin: '4px',
          border: '2px inset #c0c0c0',
        }}
      >
        {/* Camera Header */}
        <div
          style={{
            borderBottom: '2px solid #000080',
            paddingBottom: '8px',
            marginBottom: '12px',
          }}
        >
          <h2 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold', color: '#000080' }}>
            {camera.name}
          </h2>
          <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: '#666' }}>
            <span><strong>Type:</strong> {camera.type}</span>
            <span><strong>Owned:</strong> {camera.yearOwned}</span>
          </div>
          <div style={{ marginTop: '4px', fontSize: '14px' }}>
            {camera.rating}
          </div>
        </div>

        {/* Review Text */}
        <div style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          <p style={{ margin: 0 }}>
            {camera.review}
          </p>
        </div>

        {/* Pros and Cons in boxes */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            flex: 1,
            border: '2px solid #006600',
            padding: '8px',
            backgroundColor: '#f0fff0'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '6px', color: '#006600' }}>
              Good:
            </div>
            <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
              {camera.pros.join(' • ')}
            </div>
          </div>
          <div style={{
            flex: 1,
            border: '2px solid #cc0000',
            padding: '8px',
            backgroundColor: '#fff0f0'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '6px', color: '#cc0000' }}>
              Bad:
            </div>
            <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
              {camera.cons.join(' • ')}
            </div>
          </div>
        </div>

        {/* Verdict */}
        <div
          style={{
            border: '2px solid #000080',
            padding: '8px',
            marginTop: '12px',
            backgroundColor: '#e6f2ff'
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
            Bottom Line:
          </div>
          <div style={{ fontStyle: 'italic' }}>
            {camera.verdict}
          </div>
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
            minWidth: '100px'
          }}>
            {camera.name}
          </span>
        </div>
        <span style={{
          border: '1px inset #c0c0c0',
          padding: '1px 4px',
          minWidth: '60px',
          textAlign: 'center'
        }}>
          {currentCamera + 1}/{cameras.length}
        </span>
      </div>
    </div>
  );
}

export default CameraReviews;
