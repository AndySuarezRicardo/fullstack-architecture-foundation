import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Fullstack Architecture. Built for scale.</p>
      </div>
    </footer>
  );
};

export default Footer;
