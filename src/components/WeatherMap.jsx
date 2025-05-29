// src/components/WeatherMap.jsx
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon paths in ESM (Vite, React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url)
    .href,
});

// New component to handle map clicks
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null; // This component doesn't render anything visible
}

const WeatherMap = ({ lat, lon, city, onMapClick }) => {
  const initialCenter = lat && lon ? [lat, lon] : [20.5937, 78.9629];

  return (
    <div className="w-full" style={{ height: "400px" }}>
      {" "}
      {/* Reverted to fixed height for map */}
      <MapContainer
        key={`${lat}-${lon}`}
        center={initialCenter}
        zoom={lat && lon ? 8 : 4}
        scrollWheelZoom={true} // Enabled scroll wheel zoom
        zoomControl={true} // Explicitly show zoom buttons (default is true)
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {lat && lon && (
          <Marker position={[lat, lon]}>
            <Popup>{city}</Popup>
          </Marker>
        )}
        <MapClickHandler onMapClick={onMapClick} />
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
