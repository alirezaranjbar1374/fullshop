'use client';

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MyMap = () => {
  const [position, setPosition] = useState(null);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        () => {
          alert("Unable to retrieve your location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <button onClick={handleGetLocation} style={{ margin: '10px', padding: '10px' }}>
        Get Current Location
      </button>
      <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {position && (
          <Marker position={position}>
            <Popup>
              Your current location: <br /> Latitude: {position[0]} <br /> Longitude: {position[1]}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MyMap;