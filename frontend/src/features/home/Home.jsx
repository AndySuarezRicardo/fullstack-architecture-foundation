import { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import './Home.css';

const Home = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const data = await apiService.checkHealth();
        setHealth(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Fullstack Architecture</h1>
        <p className="subtitle">
          Professional foundation ready to scale - Layer 2 Active
        </p>
      </div>

      <div className="health-check">
        <h2>🏥 Backend Health Status</h2>
        {loading && <p className="loading">Checking backend...</p>}
        {error && (
          <div className="error-box">
            <p>❌ Backend Error: {error}</p>
            <p className="hint">Make sure the backend server is running on port 3001</p>
          </div>
        )}
        {health && (
          <div className="success-box">
            <p>✅ Backend is healthy!</p>
            <div className="health-details">
              <p><strong>Environment:</strong> {health.environment}</p>
              <p><strong>Uptime:</strong> {Math.floor(health.uptime)} seconds</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
