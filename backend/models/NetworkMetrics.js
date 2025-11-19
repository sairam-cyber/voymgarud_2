const mongoose = require('mongoose');

const NetworkMetricsSchema = new mongoose.Schema({
  connection_type: {
    type: String,
    default: '4G/LTE',
  },
  latency: {
    type: Number,
    required: true,
  },
  packet_loss: {
    type: Number,
    required: true,
  },
  bandwidth: {
    type: Number,
    required: true,
  },
  vpn_enabled: {
    type: Boolean,
    default: true,
  },
  vpn_type: {
    type: String,
    default: 'ZeroTier',
  },
  webrtc_active: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('NetworkMetrics', NetworkMetricsSchema);
