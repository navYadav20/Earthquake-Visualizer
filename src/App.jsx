import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Map from './components/Map';
import Legend from './components/Legend';
import Dashboard from './components/Dashboard';
import InfoPanel from './components/InfoPanel';
import './App.css';

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setEarthquakes(data.features);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
      setEarthquakes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate statistics using useMemo to avoid recalculation on every render
  const stats = useMemo(() => {
    if (earthquakes.length === 0) {
      return { total: 0, strongest: 0, average: 0, latest: 0 };
    }

    let strongest = 0;
    let totalMagnitude = 0;
    
    earthquakes.forEach(eq => {
      const mag = eq.properties.mag;
      if (mag > strongest) {
        strongest = mag;
      }
      totalMagnitude += mag;
    });

    const average = (totalMagnitude / earthquakes.length).toFixed(1);
    const latest = earthquakes[0].properties.mag; // The feed is sorted by latest

    return {
      total: earthquakes.length,
      strongest: strongest.toFixed(1),
      average,
      latest: latest.toFixed(1),
    };
  }, [earthquakes]);


  return (
    <div className="app-container">
      <Header lastUpdated={lastUpdated} onRefresh={fetchData} />
      <main className="main-content">
        <InfoPanel />
        {loading && <p className="status-message">Loading dashboard...</p>}
        {error && <p className="status-message error-message">Error: {error}</p>}
        {!loading && !error && (
          <>
            <Dashboard stats={stats} />
            <div className="map-section-container">
                 <h2 className="map-title">Global Earthquake Activity Map <span>{stats.total} events</span></h2>
                <div className="map-area">
                    <Map earthquakes={earthquakes} />
                    <Legend />
                </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;

