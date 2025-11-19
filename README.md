

# **README.md**

```markdown
# 🚁 VyomGarud - Ground Control Station Dashboard

A **real-time Ground Control Station (GCS)** system built with **Node.js**, **Express**, **Socket.IO**, **MongoDB**, and **React** to monitor drone telemetry using **MAVLink protocol** simulation.

![Dashboard Preview](https://img.shields.io/badge/Status-Active-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)

---

## 📌 **Project Overview**

This project simulates a **drone Ground Control Station** that:
- Receives **real-time MAVLink telemetry** (altitude, speed, GPS, battery, heading)
- Displays telemetry data on a **web dashboard** with live charts and maps
- Simulates **remote connectivity** using 4G/LTE, ZeroTier VPN, and WebRTC concepts
- Stores telemetry history in **MongoDB** for analysis
- Updates the dashboard every **500ms** (2 Hz rate) via **WebSocket**

---

## 🚀 **Features**

✅ **Real-time Telemetry Display**
- Live updates of altitude, speed, battery, GPS coordinates, and heading
- Visual status cards with icons

✅ **Network Simulation**
- Simulates 4G/LTE connection with latency, packet loss, and bandwidth metrics
- ZeroTier VPN and WebRTC status indicators

✅ **Interactive Charts**
- Real-time line charts for altitude, speed, and battery level
- Powered by Recharts library

✅ **Drone Location Map**
- Live GPS tracking on OpenStreetMap using Leaflet
- Updates drone marker position in real-time

✅ **Data Persistence**
- MongoDB stores all telemetry data for historical analysis
- REST API endpoints for fetching historical data

✅ **Responsive Design**
- Modern dark-themed UI with glassmorphism effects
- Mobile-friendly layout

---

## 🛠️ **Technology Stack**

### **Backend**
- **Node.js** (v18+)
- **Express.js** - Web server framework
- **Socket.IO** - Real-time WebSocket communication
- **MongoDB** - NoSQL database for telemetry storage
- **Mongoose** - MongoDB ODM

### **Frontend**
- **React.js** (18.2)
- **Socket.IO Client** - WebSocket client
- **Recharts** - Data visualization library
- **Leaflet** - Interactive maps
- **Axios** - HTTP client for REST API calls

### **Protocols & Concepts**
- **MAVLink Protocol** - Drone telemetry standard
- **WebSocket** - Real-time bidirectional communication
- **4G/LTE Simulation** - Remote network connectivity
- **ZeroTier VPN** - NAT traversal simulation
- **WebRTC** - Low-latency streaming concept

---

## 📁 **Project Structure**

```
vyomgarud-gcs/
│
├── backend/                     # Node.js Backend
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── models/
│   │   ├── Telemetry.js        # Telemetry schema
│   │   └── NetworkMetrics.js   # Network metrics schema
│   ├── routes/
│   │   └── telemetryRoutes.js  # REST API routes
│   ├── utils/
│   │   └── mavlinkSimulator.js # MAVLink data generator
│   ├── .env                    # Environment variables
│   ├── server.js               # Main server file
│   └── package.json            # Backend dependencies
│
├── frontend/                    # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TelemetryDashboard.js    # Main dashboard
│   │   │   ├── TelemetryDashboard.css
│   │   │   ├── StatusCards.js           # Status cards
│   │   │   ├── StatusCards.css
│   │   │   ├── TelemetryCharts.js       # Charts component
│   │   │   ├── TelemetryCharts.css
│   │   │   ├── DroneMap.js              # Map component
│   │   │   ├── DroneMap.css
│   │   │   ├── NetworkPanel.js          # Network panel
│   │   │   ├── NetworkPanel.css
│   │   │   ├── ConnectionStatus.js      # Connection status
│   │   │   └── ConnectionStatus.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── .env                     # Frontend environment variables
│   └── package.json             # Frontend dependencies
│
└── README.md                    # Project documentation
```

---

## ⚙️ **Installation & Setup**

### **Prerequisites**
- Node.js (v18 or higher) - [Download](https://nodejs.org/)
- MongoDB (Local or Atlas) - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Git

---

### **1. Clone the Repository**

```
git clone https://github.com/yourusername/vyomgarud-gcs.git
cd vyomgarud-gcs
```

---

### **2. Backend Setup**

```
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/gcs_database
PORT=5000
CORS_ORIGIN=*
EOF

# Start MongoDB (if using local)
# mongod

# Run the backend server
npm run dev
```

**Backend will run on:** `http://localhost:5000`

**Expected Console Output:**
```
✅ MongoDB Connected Successfully
🚀 GCS Backend Server Started
🌐 Server running on: http://localhost:5000
📡 WebSocket running on: ws://localhost:5000
📡 Telemetry: Alt=35.5m, Speed=12.3m/s, Battery=95.2%
```

---

### **3. Frontend Setup**

```
cd frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
REACT_APP_BACKEND_URL=http://localhost:5000
EOF

# Start the React app
npm start
```

**Frontend will run on:** `http://localhost:3000`

---

## 🌐 **API Endpoints**

### **REST API**

| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| GET    | `/`                     | Health check & API info              |
| GET    | `/api/telemetry/latest` | Fetch last 50 telemetry records      |
| GET    | `/api/telemetry/history`| Fetch paginated telemetry history    |
| GET    | `/api/network/metrics`  | Fetch network metrics                |
| GET    | `/api/status`           | Drone status summary                 |
| DELETE | `/api/telemetry/clear`  | Clear all telemetry data             |

### **WebSocket Events**

| Event               | Direction        | Description                          |
|---------------------|------------------|--------------------------------------|
| `connect`           | Client → Server  | Client connects to server            |
| `disconnect`        | Client → Server  | Client disconnects                   |
| `connection_status` | Server → Client  | Connection status update             |
| `telemetry_update`  | Server → Client  | Real-time telemetry data (500ms)     |
| `reset_simulation`  | Client → Server  | Reset simulation to initial state    |

---

## 📊 **Data Flow Architecture**

```
┌─────────────────┐
│  MAVLink        │
│  Simulator      │  (Generates drone telemetry)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Node.js        │
│  Backend        │  (Processes & stores data)
│  + MongoDB      │
└────────┬────────┘
         │
         │ WebSocket (Socket.IO)
         │ + REST API
         ▼
┌─────────────────┐
│  React          │
│  Frontend       │  (Dashboard UI)
│  Dashboard      │
└─────────────────┘
```

**Network Layer Simulation:**
```
Drone → 4G/LTE → ZeroTier VPN → Backend → WebSocket → Browser
```

---

## 🧪 **Testing**

### **Test Backend API**

```
# Health check
curl http://localhost:5000/

# Get latest telemetry
curl http://localhost:5000/api/telemetry/latest

# Get drone status
curl http://localhost:5000/api/status
```

### **Test WebSocket Connection**

Open browser console on `http://localhost:3000` and check for:
```
✅ Connected to Node.js backend: <socket-id>
📡 Telemetry received: {altitude: 35, speed: 12, ...}
```

---

## 🚢 **Deployment**

### **Backend Deployment (Render/Railway/Heroku)**

1. Create a new web service on Render
2. Connect your GitHub repository
3. Set environment variables:
   - `MONGODB_URI` = Your MongoDB Atlas connection string
   - `PORT` = 5000
   - `CORS_ORIGIN` = Your frontend URL
4. Deploy!

### **Frontend Deployment (Vercel/Netlify)**

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Add environment variable:
   - `REACT_APP_BACKEND_URL` = Your backend URL
5. Deploy!

---

## 🎥 **Demo Video**

[📹 Watch Demo Video](https://your-demo-video-link.com)

**Demo Includes:**
- Live telemetry streaming
- Real-time chart updates
- GPS location tracking
- Network metrics simulation
- MongoDB data storage

---

## 📸 **Screenshots**

### **Main Dashboard**
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

### **Telemetry Charts**
![Charts](https://via.placeholder.com/800x400?text=Charts+Screenshot)

### **Drone Location Map**
![Map](https://via.placeholder.com/800x400?text=Map+Screenshot)

---

## 🤝 **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 **License**

This project is licensed under the **MIT License**.

---

## 👨‍💻 **Author**

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 **Acknowledgments**

- [MAVLink Protocol](https://mavlink.io/) - Drone communication protocol
- [Socket.IO](https://socket.io/) - Real-time WebSocket library
- [Recharts](https://recharts.org/) - React charting library
- [Leaflet](https://leafletjs.com/) - Interactive maps
- [MongoDB](https://www.mongodb.com/) - NoSQL database

---

## 📚 **Resources**

- [MAVLink Documentation](https://mavlink.io/en/)
- [Socket.IO Docs](https://socket.io/docs/v4/)
- [React Documentation](https://react.dev/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [ZeroTier Network](https://www.zerotier.com/)

---


