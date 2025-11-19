import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function TelemetryCharts({ data }) {
  return (
    <div className="charts-container">
      <div className="chart-section">
        <h2>📈 Altitude & Speed</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="time" 
              stroke="#888" 
              tick={{ fill: '#888', fontSize: 12 }}
            />
            <YAxis stroke="#888" tick={{ fill: '#888' }} />
            <Tooltip 
              contentStyle={{ 
                background: '#1a1a2e', 
                border: '1px solid #667eea',
                borderRadius: '8px'
              }} 
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="altitude" 
              stroke="#667eea" 
              strokeWidth={2}
              name="Altitude (m)" 
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="speed" 
              stroke="#22c55e" 
              strokeWidth={2}
              name="Speed (m/s)" 
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h2>🔋 Battery Level</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="time" 
              stroke="#888"
              tick={{ fill: '#888', fontSize: 12 }}
            />
            <YAxis stroke="#888" tick={{ fill: '#888' }} domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ 
                background: '#1a1a2e', 
                border: '1px solid #f59e0b',
                borderRadius: '8px'
              }} 
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="battery" 
              stroke="#f59e0b" 
              strokeWidth={2}
              name="Battery (%)" 
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TelemetryCharts;
