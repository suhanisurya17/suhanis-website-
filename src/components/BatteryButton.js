import { useState, useEffect } from 'react';

export default function BatteryButton({ trayButtonStyle }) {
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [isCharging, setIsCharging] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getBatteryStatus() {
      try {
        if ('getBattery' in navigator) {
          const battery = await navigator.getBattery();

          const updateBatteryInfo = () => {
            setBatteryLevel(Math.round(battery.level * 100));
            setIsCharging(battery.charging);
          };

          updateBatteryInfo();

          battery.addEventListener('levelchange', updateBatteryInfo);
          battery.addEventListener('chargingchange', updateBatteryInfo);

          return () => {
            battery.removeEventListener('levelchange', updateBatteryInfo);
            battery.removeEventListener('chargingchange', updateBatteryInfo);
          };
        } else {
          setError('Battery API not supported');
        }
      } catch (err) {
        setError('Could not access battery info');
      }
    }

    getBatteryStatus();
  }, []);

  const getBatteryColor = (level) => {
    if (level > 60) return '#00ff00'; // Bright retro green
    if (level > 20) return '#ffff00'; // Bright retro yellow
    return '#ff0000'; // Bright retro red
  };

  if (error) {
    return (
      <button style={trayButtonStyle}>
        🔋
      </button>
    );
  }

  if (batteryLevel === null) {
    return (
      <button style={trayButtonStyle}>
        🔋
      </button>
    );
  }

  return (
    <button style={trayButtonStyle} title={`Battery: ${batteryLevel}%${isCharging ? ' (Charging)' : ''}`}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px'
      }}>
        <div style={{
          position: 'relative',
          width: '16px',
          height: '9px',
          border: '1px solid #000',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#c0c0c0',
          boxShadow: 'inset -1px -1px 0 #fff, inset 1px 1px 0 #808080'
        }}>
          <div style={{
            position: 'absolute',
            right: '-3px',
            top: '2px',
            width: '2px',
            height: '3px',
            background: '#000',
            border: '1px solid #000'
          }} />
          <div style={{
            width: `${batteryLevel}%`,
            height: '7px',
            background: getBatteryColor(batteryLevel),
            marginLeft: '1px'
          }} />
        </div>
        <span style={{ fontSize: '10px', color: '#000', fontFamily: 'MS Sans Serif, sans-serif', fontWeight: 'normal' }}>
          {batteryLevel}%
        </span>
        {isCharging && <span style={{ fontSize: '8px' }}>⚡</span>}
      </div>
    </button>
  );
}
