import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer section-dark">
      <div className="container footer-grid">
        <div>
          <img src="/images/mjt-trucking-logo-transparent-hd.png" alt="MJT Trucking" />
          <p>Quality used trucks and trailers, direct enquiries, and viewing arrangements from Boksburg, Gauteng.</p>
        </div>
        <div>
          <strong>Inventory</strong>
          <Link to="/trucks">Available Trucks</Link>
          <a href="/#about">About MJT</a>
          <a href="/#contact">Contact</a>
        </div>
        <div>
          <strong>Contact</strong>
          <a href="tel:0713319387">071 331 9387</a>
          <span>146 Denne Road, Boksburg, Gauteng, 1459</span>
        </div>
      </div>
      <div className="container footer-bottom">Copyright {new Date().getFullYear()} MJT Trucking. All rights reserved.</div>
    </footer>
  );
}
