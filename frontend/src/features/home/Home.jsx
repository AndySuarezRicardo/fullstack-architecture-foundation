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
          Professional foundation ready to scale
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
              <p><strong>Timestamp:</strong> {new Date(health.timestamp).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <h3>🏗️ Layered Architecture</h3>
          <p>Backend structured with core, modules, and routes for scalability</p>
        </div>
        <div className="feature-card">
          <h3>⚡ Modern Stack</h3>
          <p>React + Vite frontend, Express backend with ES6 modules</p>
        </div>
        <div className="feature-card">
          <h3>🔧 Dev Ready</h3>
          <p>ESLint, Prettier, hot reload, and professional configs included</p>
        </div>
        <div className="feature-card">
          <h3>📦 Modular Design</h3>
          <p>Ready to add auth, users, and custom modules without refactoring</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
