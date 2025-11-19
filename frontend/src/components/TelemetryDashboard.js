import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import TelemetryCharts from './TelemetryCharts';
import DroneMap from './DroneMap';
import StatusCards from './StatusCards';
import NetworkPanel from './NetworkPanel';
import ConnectionStatus from './ConnectionStatus';
import './TelemetryDashboard.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const socket = io(BACKEND_URL, {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
});

function TelemetryDashboard() {
  const [telemetry, setTelemetry] = useState({
    altitude: 0,
    speed: 0,
    latitude: 22.2544,
    longitude: 84.9026,
    battery: 100,
    heading: 0,
    mode: 'STABILIZE',
    network: null,
  });

  const [telemetryHistory, setTelemetryHistory] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionMode, setConnectionMode] = useState('SIMULATION');
  const [stats, setStats] = useState({ totalDataPoints: 0 });

  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Connected to Node.js backend:', socket.id);
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from backend');
      setIsConnected(false);
    });

    socket.on('connection_status', (data) => {
      setConnectionMode('SIMULATION');
    });

    socket.on('telemetry_update', (data) => {
      setTelemetry(data);
      
      setTelemetryHistory((prev) => {
        const newHistory = [
          ...prev,
          {
            ...data,
            time: new Date().toLocaleTimeString(),
          },
        ];
        return newHistory.slice(-100);
      });
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connection_status');
      socket.off('telemetry_update');
    };
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/status`);
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleReset = () => {
    socket.emit('reset_simulation');
    setTelemetryHistory([]);
  };

  return (
    <div className="dashboard-container">
      {/* Top Header: Company Name + Connection Status */}
      <header className="top-header">
        <div className="brand-section">
          <span className="drone-icon">🚁</span>
          <h1 className="company-name">VyomGarud</h1>
        </div>
        <div className="header-status">
          <ConnectionStatus
            isConnected={isConnected}
            mode={connectionMode}
            dataPoints={stats.totalDataPoints}
          />
        </div>
      </header>

      {/* Subtitle */}
      <p className="subtitle">Real-time MAVLink Telemetry with Network Simulation</p>

      {/* Row 1: Status Cards (4 cards) */}
      <div className="status-cards-section">
        <StatusCards telemetry={telemetry} />
      </div>

      {/* Row 2: Network Panel (Full Width) */}
      <div className="network-section-full">
        {telemetry.network && <NetworkPanel networkData={telemetry.network} />}
      </div>

      {/* Row 3: Charts (Left 2x) + Map (Right 1x) */}
      <div className="charts-map-row">
        <div className="charts-column">
          <TelemetryCharts data={telemetryHistory} />
        </div>
        <div className="map-column">
          <DroneMap position={[telemetry.latitude, telemetry.longitude]} />
        </div>
      </div>

      {/* Control Panel (Optional - Bottom) */}
      <div className="control-panel">
        <button onClick={handleReset} className="reset-button">
          🔄 Reset Simulation
        </button>
        <div className="info">
          <p>Mode: <strong>{telemetry.mode}</strong></p>
          <p>Total Data Points: <strong>{stats.totalDataPoints}</strong></p>
        </div>
      </div>
    </div>
  );
}

export default TelemetryDashboard;
