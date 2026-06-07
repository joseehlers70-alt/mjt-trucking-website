import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { whatsappNumber } from '../lib/supabase.js';

export default function Hero() {
  return (
    <section className="hero section-dark" id="home">
      <div className="hero-media" aria-hidden="true" />
      <div className="hero-overlay" />
      <div className="container hero-content reveal">
        <p className="eyebrow">Commercial Vehicle Sales | Boksburg</p>
        <h1>Quality Used Trucks &amp; Trailers for Sale</h1>
        <p className="hero-lead">
          Browse reliable trucks and trailers available through MJT Trucking. Contact us directly for pricing, vehicle
          details, and viewing arrangements.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/trucks">
            View Available Trucks
            <ArrowRight size={18} />
          </Link>
          <a
            className="button button-secondary"
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi MJT, I would like to enquire about your available trucks and trailers.')}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            WhatsApp MJT
          </a>
        </div>
        <div className="hero-proof">
          <ShieldCheck size={20} />
          <span>Clear vehicle information and direct contact with MJT Trucking.</span>
        </div>
      </div>
    </section>
  );
}
