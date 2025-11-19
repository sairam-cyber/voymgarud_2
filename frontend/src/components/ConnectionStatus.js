import React from 'react';
import './ConnectionStatus.css';

function ConnectionStatus({ isConnected, mode, dataPoints }) {
  return (
    <div className="connection-status-compact">
      <div className={`status-badge ${isConnected ? 'connected' : 'disconnected'}`}>
        <span className="status-dot"></span>
        <span className="status-text">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      <div className="mode-badge">
        {mode}
      </div>
    </div>
  );
}

export default ConnectionStatus;
