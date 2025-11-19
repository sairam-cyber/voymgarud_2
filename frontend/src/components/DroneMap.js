import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function DroneMap({ position }) {
  return (
    <div className="map-container">
      <h2>🗺️ Drone Location</h2>
      <MapContainer 
        center={position} 
        zoom={15} 
        style={{ height: '400px', width: '100%', borderRadius: '10px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={position}>
          <Popup>
            Drone Position<br />
            Lat: {position[0].toFixed(6)}<br />
            Lon: {position[1].toFixed(6)}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default DroneMap;
