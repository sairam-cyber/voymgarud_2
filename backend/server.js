const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const Telemetry = require('./models/Telemetry');
const NetworkMetrics = require('./models/NetworkMetrics');
const MAVLinkSimulator = require('./utils/mavlinkSimulator');
const telemetryRoutes = require('./routes/telemetryRoutes');

// Initialize Express App
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

// Connect to MongoDB
connectDB();

// REST API Routes
app.use('/api', telemetryRoutes);

// Health Check Endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚁 GCS Backend Server Running',
    version: '1.0.0',
    endpoints: {
      telemetry_latest: '/api/telemetry/latest',
      telemetry_history: '/api/telemetry/history',
      network_metrics: '/api/network/metrics',
      status: '/api/status',
    },
  });
});

// Initialize MAVLink Simulator
const simulator = new MAVLinkSimulator();

// Socket.IO Connection Handler
io.on('connection', (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  // Send connection status
  socket.emit('connection_status', { status: 'connected', id: socket.id });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });

  // Handle reset command
  socket.on('reset_simulation', () => {
    simulator.reset();
    console.log('🔄 Simulation reset');
  });
});

// Background Task: Stream Telemetry Data
const TELEMETRY_INTERVAL = 500; // 500ms = 2Hz update rate
const DB_SAVE_INTERVAL = 5000; // Save to DB every 5 seconds

let telemetryBuffer = [];
let networkBuffer = [];

setInterval(async () => {
  // Generate telemetry and network data
  const telemetryData = simulator.generateTelemetry();
  const networkData = simulator.generateNetworkMetrics();

  // Emit to all connected clients via WebSocket
  io.emit('telemetry_update', {
    ...telemetryData,
    network: networkData,
  });

  // Buffer data for batch saving
  telemetryBuffer.push(telemetryData);
  networkBuffer.push(networkData);

  console.log(`📡 Telemetry: Alt=${telemetryData.altitude}m, Speed=${telemetryData.speed}m/s, Battery=${telemetryData.battery}%`);
}, TELEMETRY_INTERVAL);

// Save buffered data to MongoDB periodically
setInterval(async () => {
  if (telemetryBuffer.length > 0) {
    try {
      await Telemetry.insertMany(telemetryBuffer);
      console.log(`💾 Saved ${telemetryBuffer.length} telemetry records to MongoDB`);
      telemetryBuffer = [];
    } catch (error) {
      console.error('❌ Error saving telemetry:', error.message);
    }
  }

  if (networkBuffer.length > 0) {
    try {
      await NetworkMetrics.insertMany(networkBuffer);
      console.log(`💾 Saved ${networkBuffer.length} network metrics to MongoDB`);
      networkBuffer = [];
    } catch (error) {
      console.error('❌ Error saving network metrics:', error.message);
    }
  }
}, DB_SAVE_INTERVAL);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log(`🚀 GCS Backend Server Started`);
  console.log(`🌐 Server running on: http://localhost:${PORT}`);
  console.log(`📡 WebSocket running on: ws://localhost:${PORT}`);
  console.log('='.repeat(60));
});
