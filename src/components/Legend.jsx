import './Legend.css';

const Legend = () => {
  const legendItems = [
    { range: '< 1.0', color: '#ADFF2F' },
    { range: '1.0 - 2.5', color: '#FFFF00' },
    { range: '2.5 - 4.5', color: '#FFA500' },
    { range: '4.5 - 6.5', color: '#FF4500' },
    { range: '> 6.5', color: '#B22222' },
  ];

  return (
    <div className="legend-container">
      <h4>Magnitude Legend</h4>
      <ul>
        {legendItems.map((item, index) => (
          <li key={index}>
            <span className="legend-color" style={{ backgroundColor: item.color }}></span>
            <span className="legend-label">{item.range}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legend;
