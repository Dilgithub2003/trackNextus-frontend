import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

const deviceIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

//  Recenter Component
function Recenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position]);
  return null;
}

function LiveMap({ socketData }) {
  const [position, setPosition] = useState([6.9271, 79.8612]); // default: Colombo

  useEffect(() => {
    if (socketData?.latitude && socketData?.longitude) {
      const newPos = [socketData.latitude, socketData.longitude];
      console.log("Updating position:", newPos);
      setPosition(newPos);
    }
  }, [socketData]);

  return (
    <MapContainer center={position} zoom={15} className="leaflet-container">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 👉 Apply recentering */}
      <Recenter position={position} />

      <Marker position={position} icon={deviceIcon}>
        <Popup>
          <b>Device:</b> {socketData?.deviceId}<br />
          <b>Speed:</b> {socketData?.speed} km/h<br />
          <b>Time:</b> {socketData?.timestamp}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default LiveMap;
