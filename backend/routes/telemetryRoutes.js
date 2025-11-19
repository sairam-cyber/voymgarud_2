const express = require('express');
const router = express.Router();
const Telemetry = require('../models/Telemetry');
const NetworkMetrics = require('../models/NetworkMetrics');

// GET: Fetch latest telemetry (last 50 records)
router.get('/telemetry/latest', async (req, res) => {
  try {
    const telemetry = await Telemetry.find()
      .sort({ timestamp: -1 })
      .limit(50);
    res.json({ success: true, data: telemetry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET: Fetch telemetry history (with pagination)
router.get('/telemetry/history', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    const telemetry = await Telemetry.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Telemetry.countDocuments();

    res.json({
      success: true,
      data: telemetry,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET: Fetch network metrics
router.get('/network/metrics', async (req, res) => {
  try {
    const metrics = await NetworkMetrics.find()
      .sort({ timestamp: -1 })
      .limit(50);
    res.json({ success: true, data: metrics });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET: Drone status summary
router.get('/status', async (req, res) => {
  try {
    const latestTelemetry = await Telemetry.findOne().sort({ timestamp: -1 });
    const totalFlights = await Telemetry.countDocuments();

    res.json({
      success: true,
      data: {
        status: latestTelemetry ? 'Active' : 'Inactive',
        latestTelemetry,
        totalDataPoints: totalFlights,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE: Clear all telemetry data
router.delete('/telemetry/clear', async (req, res) => {
  try {
    await Telemetry.deleteMany({});
    await NetworkMetrics.deleteMany({});
    res.json({ success: true, message: 'All data cleared' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
