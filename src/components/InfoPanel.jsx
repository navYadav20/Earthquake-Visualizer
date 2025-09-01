import './InfoPanel.css';

const InfoPanel = () => {
    return (
        <div className="info-panel">
            <span className="info-icon">ℹ️</span>
            <div className="info-text">
                <p><strong>Real-time earthquake data from USGS</strong></p>
                <p>Displaying all earthquakes from the last 24 hours. Data updates automatically every 5 minutes. Click on earthquake markers for detailed information.</p>
                <div className="info-tags">
                    <span className="tag live">● Live Data</span>
                    <span className="tag source">USGS Official</span>
                </div>
            </div>
        </div>
    );
};

export default InfoPanel;
