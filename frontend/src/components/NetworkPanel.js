import React from 'react';
import './NetworkPanel.css';

function NetworkPanel({ networkData }) {
  if (!networkData) return null;

  const getLatencyColor = (latency) => {
    if (latency < 50) return '#22c55e';
    if (latency < 100) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="network-panel">
      <h2>🌐 Network & Connectivity</h2>
      
      <div className="network-grid">
        <div className="network-card">
          <div className="network-icon">📶</div>
          <div className="network-info">
            <h3>Connection Type</h3>
            <p className="network-value">{networkData.connection_type}</p>
          </div>
        </div>

        <div className="network-card">
          <div className="network-icon">⚡</div>
          <div className="network-info">
            <h3>Latency</h3>
            <p 
              className="network-value" 
              style={{ color: getLatencyColor(networkData.latency) }}
            >
              {networkData.latency} ms
            </p>
          </div>
        </div>

        <div className="network-card">
          <div className="network-icon">📊</div>
          <div className="network-info">
            <h3>Bandwidth</h3>
            <p className="network-value">{networkData.bandwidth} Mbps</p>
          </div>
        </div>

        <div className="network-card">
          <div className="network-icon">📉</div>
          <div className="network-info">
            <h3>Packet Loss</h3>
            <p className="network-value">{networkData.packet_loss}%</p>
          </div>
        </div>
      </div>

      <div className="network-features">
        <div className={`feature-badge ${networkData.vpn_enabled ? 'active' : 'inactive'}`}>
          <span className="feature-icon">🔐</span>
          <span>ZeroTier VPN</span>
          <span className="feature-status">
            {networkData.vpn_enabled ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className={`feature-badge ${networkData.webrtc_active ? 'active' : 'inactive'}`}>
          <span className="feature-icon">🎥</span>
          <span>WebRTC Stream</span>
          <span className="feature-status">
            {networkData.webrtc_active ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      <div className="network-architecture">
        <p>📡 Architecture: Drone → 4G/LTE → ZeroTier VPN → Backend → WebSocket → Browser</p>
      </div>
    </div>
  );
}

export default NetworkPanel;
