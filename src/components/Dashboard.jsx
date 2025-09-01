import './Dashboard.css';

// Simple component for each metric card
const StatCard = ({ title, value, subtext, icon }) => (
    <div className="stat-card">
        <div className="card-content">
            <p className="card-title">{title}</p>
            <p className="card-value">{value}</p>
            <p className="card-subtext">{subtext}</p>
        </div>
        <div className="card-icon">{icon}</div>
    </div>
);


const Dashboard = ({ stats }) => {
    return (
        <div className="dashboard-container">
            <StatCard 
                title="Total Earthquakes" 
                value={stats.total} 
                subtext="Last 24 hours"
                icon="🌊"
            />
            <StatCard 
                title="Strongest Quake" 
                value={stats.strongest} 
                subtext="Magnitude"
                icon="🌋"
            />
            <StatCard 
                title="Average Magnitude" 
                value={stats.average} 
                subtext="Global average"
                icon="📊"
            />
            <StatCard 
                title="Latest Event" 
                value={stats.latest} 
                subtext="Magnitude"
                icon="🕒"
            />
        </div>
    );
};

export default Dashboard;
