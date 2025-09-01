import './Header.css';

const Header = ({ lastUpdated, onRefresh }) => {
  return (
    <header className="app-header">
      <div className="header-title">
        <span className="header-logo" role="img" aria-label="globe">🌍</span>
        <div className="header-text">
          <h1>Seismo Explorer</h1>
          <p>Global Earthquake Activity Monitor</p>
        </div>
      </div>
      <div className="header-controls">
        <div className="last-updated">
            {lastUpdated ? `Last Updated: ${lastUpdated.toLocaleString()}` : 'Loading...'}
        </div>
        <button className="refresh-button" onClick={onRefresh}>
          Refresh
        </button>
      </div>
    </header>
  );
};

export default Header;

