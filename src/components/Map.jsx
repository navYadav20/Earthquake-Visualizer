import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
// We don't need the 'leaflet' (L) import anymore for this approach

// Function to determine marker color based on earthquake magnitude
const getColor = (magnitude) => {
  if (magnitude < 1) return '#ADFF2F'; // GreenYellow
  if (magnitude < 2.5) return '#FFFF00'; // Yellow
  if (magnitude < 4.5) return '#FFA500'; // Orange
  if (magnitude < 6.5) return '#FF4500'; // OrangeRed
  return '#B22222'; // FireBrick
};

// Function to determine marker size based on magnitude
const getSize = (magnitude) => {
    return Math.max(magnitude * 4, 5); // Adjusted for CircleMarker's radius
};

// Simple function to parse the country/region from the long place string
const formatLocation = (place) => {
    if (!place) return 'Unknown location';
    const parts = place.split(',');
    if (parts.length > 1) {
        return parts[parts.length - 1].trim();
    }
    return place;
}

const Map = ({ earthquakes }) => {
  const position = [20, 0]; // Initial map center

  return (
    <MapContainer center={position} zoom={2} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {earthquakes.map((earthquake) => {
        const mag = earthquake.properties.mag;
        const coords = earthquake.geometry.coordinates;
        // Leaflet expects [latitude, longitude]
        const position = [coords[1], coords[0]];

        // Define options for the circle marker
        const pathOptions = {
            fillColor: getColor(mag),
            color: 'black', // The border color
            weight: 0.5,
            opacity: 1,
            fillOpacity: 0.7
        };

        return (
          <CircleMarker
            key={earthquake.id}
            center={position}
            pathOptions={pathOptions}
            radius={getSize(mag)}
          >
            <Popup>
              <b>{formatLocation(earthquake.properties.place)}</b> <br/>
              <b>Magnitude:</b> {mag} <br />
              <b>Depth:</b> {coords[2]} km <br/>
              <b>Time:</b> {new Date(earthquake.properties.time).toLocaleString()}
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
};

export default Map;

