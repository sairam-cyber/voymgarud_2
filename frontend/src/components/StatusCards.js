import React from 'react';
import './StatusCards.css';

function StatusCards({ telemetry }) {
  return (
    <div className="status-cards">
      <div className="card">
        <div className="card-icon">📏</div>
        <div className="card-content">
          <h3>Altitude</h3>
          <p className="card-value">
            {telemetry.altitude.toFixed(2)}
            <span className="card-unit">m</span>
          </p>
        </div>
      </div>
      
      <div className="card">
        <div className="card-icon">⚡</div>
        <div className="card-content">
          <h3>Speed</h3>
          <p className="card-value">
            {telemetry.speed.toFixed(2)}
            <span className="card-unit">m/s</span>
          </p>
        </div>
      </div>
      
      <div className="card">
        <div className="card-icon">🔋</div>
        <div className="card-content">
          <h3>Battery</h3>
          <p className="card-value">
            {telemetry.battery.toFixed(1)}
            <span className="card-unit">%</span>
          </p>
        </div>
      </div>
      
      <div className="card">
        <div className="card-icon">🧭</div>
        <div className="card-content">
          <h3>Heading</h3>
          <p className="card-value">
            {telemetry.heading.toFixed(1)}
            <span className="card-unit">°</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatusCards;
