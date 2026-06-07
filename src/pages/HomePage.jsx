import { Camera, CheckCircle2, Eye, MessageCircle, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import InventoryState from '../components/InventoryState.jsx';
import SiteLayout from '../components/SiteLayout.jsx';
import TransportMotion from '../components/TransportMotion.jsx';
import VehicleCard from '../components/VehicleCard.jsx';
import { useTrucks } from '../hooks/useTrucks.js';
import { whatsappNumber } from '../lib/supabase.js';

const trustPoints = [
  [Truck, 'Quality used trucks and trailers', 'Commercial vehicles presented with clear, useful information.'],
  [MessageCircle, 'Direct WhatsApp enquiries', 'Speak directly with MJT about availability, pricing, and vehicle details.'],
  [CheckCircle2, 'Honest vehicle information', 'Specifications and condition details can be confirmed before viewing.'],
  [Eye, 'Viewing arrangements', 'Contact MJT to arrange a suitable time to inspect a listed vehicle.'],
  [Camera, 'Clear details and photos', 'Each published listing can include a full gallery and key commercial specifications.'],
];

export default function HomePage() {
  const { trucks, loading, error } = useTrucks({ limit: 6 });

  return (
    <SiteLayout>
      <Hero />

      <section className="section featured-inventory section-dark">
        <div className="container">
          <div className="section-heading section-heading-row">
            <div>
              <p className="eyebrow">Available Inventory</p>
              <h2>Trucks ready for your shortlist.</h2>
              <p>Browse published stock and contact MJT directly for full details and viewing arrangements.</p>
            </div>
            <Link className="text-link text-link-light" to="/trucks">View all trucks</Link>
          </div>
          {trucks.length > 0 ? (
            <div className="inventory-grid">{trucks.map((truck) => <VehicleCard key={truck.id} truck={truck} />)}</div>
          ) : (
            <InventoryState loading={loading} error={error} />
          )}
        </div>
      </section>

      <section className="section dealership-about" id="about">
        <div className="container split">
          <div className="section-copy">
            <p className="eyebrow">About MJT Trucking</p>
            <h2>Commercial vehicle sales with direct, practical service.</h2>
            <p>
              MJT Trucking focuses on quality used trucks and trailers for commercial buyers. Vehicle enquiries are
              handled directly, with viewing arrangements and available specifications discussed before purchase.
            </p>
            <p>Nationwide delivery arrangements can be discussed based on the vehicle and destination.</p>
          </div>
          <div className="dealership-image">
            <img src="/images/truck-detail-closeup.png" alt="Commercial truck detail" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section trust-section section-dark">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Why Contact MJT</p>
            <h2>A straightforward way to find your next truck.</h2>
          </div>
          <div className="trust-grid">
            {trustPoints.map(([Icon, title, text]) => (
              <article className="trust-item" key={title}>
                <Icon size={23} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TransportMotion />

      <section className="section contact-cta" id="contact">
        <div className="container contact-cta-inner">
          <div>
            <p className="eyebrow">Contact MJT Trucking</p>
            <h2>Ask about current stock or arrange a viewing.</h2>
            <p>146 Denne Road, Boksburg, Gauteng, 1459</p>
          </div>
          <div className="contact-cta-actions">
            <a className="button button-primary" href="tel:0713319387">Call 071 331 9387</a>
            <a
              className="button button-dark"
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi MJT, I would like to enquire about your current truck and trailer stock.')}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} /> WhatsApp MJT
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
