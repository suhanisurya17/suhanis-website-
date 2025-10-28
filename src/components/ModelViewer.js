import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, Environment } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  const meshRef = useRef();

  // Auto-rotate the model slowly
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={meshRef} object={scene} scale={1.5} />;
}

function LoadingBox() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#808080" />
    </mesh>
  );
}

export default function ModelViewer({ modelPath }) {
  const [error, setError] = useState(false);

  if (!modelPath) {
    return (
      <div style={noModelStyle}>
        <div style={{ fontSize: "32px", marginBottom: "8px" }}>📦</div>
        <div style={{ fontSize: "11px" }}>No 3D model available</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={errorStyle}>
        <div style={{ fontSize: "32px", marginBottom: "8px" }}>⚠️</div>
        <div style={{ fontSize: "11px" }}>Failed to load 3D model</div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Canvas style={{ background: '#f0f0f0' }}>
        <PerspectiveCamera makeDefault position={[0, 2, 5]} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        {/* Environment for reflections */}
        <Environment preset="studio" />

        {/* 3D Model */}
        <Suspense fallback={<LoadingBox />}>
          <Model url={modelPath} />
        </Suspense>

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>

      {/* Controls hint */}
      <div style={controlsHintStyle}>
        🖱️ Click and drag to rotate • Scroll to zoom • Right-click to pan
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  width: '100%',
  height: '400px',
  position: 'relative',
  border: '2px inset #C0C0C0',
  backgroundColor: '#f0f0f0',
  marginBottom: '12px'
};

const noModelStyle = {
  width: '100%',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px inset #C0C0C0',
  backgroundColor: '#f0f0f0',
  color: '#666',
  marginBottom: '12px'
};

const errorStyle = {
  width: '100%',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px inset #C0C0C0',
  backgroundColor: '#ffe0e0',
  color: '#cc0000',
  marginBottom: '12px'
};

const controlsHintStyle = {
  position: 'absolute',
  bottom: '8px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'rgba(192, 192, 192, 0.9)',
  padding: '4px 12px',
  border: '1px outset #C0C0C0',
  fontSize: '9px',
  fontFamily: 'MS Sans Serif, sans-serif',
  color: '#000',
  whiteSpace: 'nowrap',
  pointerEvents: 'none'
};
