import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import LiveMap from './components/LiveMap'
import WebSocketService from './services/WebSocketService'

function App() {
  const [count, setCount] = useState(0)
   const [telemetry, setTelemetry] = useState(null);

  useEffect(() => {
    const ws = new WebSocketService("ws://localhost:8082/ws/telemetry");

    ws.connect((data) => {
      console.log("WS Data:", data);
      setTelemetry(data); // update map
    });
  }, []);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Live Tracker</h1>
      <LiveMap socketData={telemetry} />
    </div>
  );
}

export default App
