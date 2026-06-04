export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer section-dark">
      <div className="container footer-grid">
        <div><img src="/images/mjt-trucking-logo-transparent-hd.png" alt="MJT Trucking logo" /><p>Commercial truck and van sales from Boksburg, Gauteng, with selected transport services available through available trucks.</p></div>
        <div><strong>Quick Links</strong><a href="#about">About</a><a href="#services">Services</a><a href="#fleet">Fleet</a><a href="#quote">Get a Quote</a></div>
        <div><strong>Contact</strong><span>071 331 9387</span><span>146 Denne Road, Boksburg, Gauteng, 1459</span></div>
      </div>
      <div className="container footer-bottom">Copyright {year} MJT Trucking. All rights reserved.</div>
    </footer>
  );
}
