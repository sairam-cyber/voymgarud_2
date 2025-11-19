class MAVLinkSimulator {
  constructor() {
    // Initial drone position (NIT Rourkela coordinates)
    this.latitude = 22.2544;
    this.longitude = 84.9026;
    this.altitude = 0;
    this.speed = 0;
    this.battery = 100;
    this.heading = 0;
    this.mode = 'STABILIZE';
    this.time = 0;
    
    // Simulation parameters
    this.maxAltitude = 120;
    this.maxSpeed = 25;
    this.missionPhase = 'takeoff';
  }

  generateTelemetry() {
    this.time += 0.5; // Increment by 0.5 seconds

    // Mission phases: takeoff → cruise → landing
    if (this.missionPhase === 'takeoff' && this.altitude < 50) {
      this.altitude += 2.5;
      this.speed = Math.min(this.speed + 1, 10);
      this.mode = 'GUIDED';
    } else if (this.missionPhase === 'takeoff') {
      this.missionPhase = 'cruise';
      this.mode = 'AUTO';
    }

    if (this.missionPhase === 'cruise') {
      // Circular flight pattern
      this.altitude = 50 + Math.sin(this.time / 10) * 20;
      this.speed = 15 + Math.random() * 5;
      this.heading = (this.heading + 2) % 360;
      
      // GPS movement (circular pattern)
      const radius = 0.001; // ~111 meters
      this.latitude = 22.2544 + radius * Math.cos(this.time / 20);
      this.longitude = 84.9026 + radius * Math.sin(this.time / 20);

      // Battery drain
      this.battery = Math.max(20, this.battery - 0.05);

      // Switch to landing when battery is low
      if (this.battery < 30) {
        this.missionPhase = 'landing';
        this.mode = 'LAND';
      }
    }

    if (this.missionPhase === 'landing') {
      this.altitude = Math.max(0, this.altitude - 1.5);
      this.speed = Math.max(0, this.speed - 0.5);
      
      if (this.altitude <= 0) {
        this.missionPhase = 'landed';
        this.mode = 'STABILIZE';
        this.speed = 0;
      }
    }

    return {
      altitude: parseFloat(this.altitude.toFixed(2)),
      speed: parseFloat(this.speed.toFixed(2)),
      latitude: parseFloat(this.latitude.toFixed(6)),
      longitude: parseFloat(this.longitude.toFixed(6)),
      battery: parseFloat(this.battery.toFixed(1)),
      heading: parseFloat(this.heading.toFixed(1)),
      mode: this.mode,
      timestamp: new Date().toISOString(),
    };
  }

  generateNetworkMetrics() {
    return {
      connection_type: '4G/LTE',
      latency: Math.floor(30 + Math.random() * 50), // 30-80ms
      packet_loss: parseFloat((Math.random() * 2).toFixed(2)), // 0-2%
      bandwidth: parseFloat((5 + Math.random() * 15).toFixed(2)), // 5-20 Mbps
      vpn_enabled: true,
      vpn_type: 'ZeroTier',
      webrtc_active: Math.random() > 0.5,
      timestamp: new Date().toISOString(),
    };
  }

  reset() {
    this.latitude = 22.2544;
    this.longitude = 84.9026;
    this.altitude = 0;
    this.speed = 0;
    this.battery = 100;
    this.heading = 0;
    this.time = 0;
    this.missionPhase = 'takeoff';
  }
}

module.exports = MAVLinkSimulator;
