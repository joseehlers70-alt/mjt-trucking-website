import { MapPin, MessageCircle, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container split">
        <div className="section-copy reveal">
          <p className="eyebrow">Contact</p><h2>Speak to MJT Trucking.</h2>
          <div className="contact-list">
            <p><strong>MJT Trucking</strong><span>Sisco</span></p>
            <p><strong>Phone / WhatsApp</strong><span>071 331 9387</span></p>
            <p><strong>Address</strong><span>146 Denne Road, Boksburg, Gauteng, 1459</span></p>
          </div>
          <div className="hero-actions"><a className="button button-primary" href="tel:0713319387"><Phone size={18} />Call</a><a className="button button-secondary" href="https://wa.me/27713319387?text=Hi%20MJT%20Trucking%2C%20I%20would%20like%20to%20enquire%20about%20your%20trucks%2Fservices." target="_blank" rel="noreferrer"><MessageCircle size={18} />WhatsApp</a></div>
        </div>
        <div className="map-card reveal" aria-label="MJT Trucking location placeholder"><MapPin size={34} /><strong>146 Denne Road</strong><span>Boksburg, Gauteng, 1459</span><div className="map-grid" /></div>
      </div>
    </section>
  );
}
