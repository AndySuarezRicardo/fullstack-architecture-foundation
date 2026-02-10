import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>🚀 Fullstack App</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          {/* Add more navigation links as features grow */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
