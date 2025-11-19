const mongoose = require('mongoose');

const TelemetrySchema = new mongoose.Schema({
  altitude: {
    type: Number,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  battery: {
    type: Number,
    required: true,
  },
  heading: {
    type: Number,
    required: true,
  },
  mode: {
    type: String,
    default: 'STABILIZE',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Telemetry', TelemetrySchema);
