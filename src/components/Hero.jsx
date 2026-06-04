import { MessageCircle, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero section-dark" id="home">
      <div className="hero-media" aria-hidden="true" />
      <div className="hero-overlay" />
      <div className="container hero-content reveal">
        <p className="eyebrow">Boksburg Commercial Vehicle Specialists</p>
        <h1>Commercial Trucks &amp; Transport Solutions</h1>
        <p className="hero-lead">
          MJT Trucking supplies commercial trucks and vans from Boksburg, Gauteng, with selected transport services
          available for business clients.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#fleet">
            View Available Vehicles
          </a>
          <a
            className="button button-secondary"
            href="https://wa.me/27713319387?text=Hi%20MJT%20Trucking%2C%20I%20would%20like%20to%20enquire%20about%20your%20trucks%2Fservices."
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            WhatsApp Sisco
          </a>
          <a className="button button-ghost" href="#quote">
            Get a Quote
          </a>
        </div>
        <div className="hero-proof">
          <ShieldCheck size={20} />
          <span>Commercial truck and van sales with selected transport availability.</span>
        </div>
      </div>
    </section>
  );
}
