import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container split">
        <div className="section-copy reveal">
          <p className="eyebrow">About MJT Trucking</p>
          <h2>Commercial vehicles handled with discipline and purpose.</h2>
          <p>
            MJT Trucking works with businesses that need dependable commercial trucks and vans. Based in Boksburg, the
            company keeps the process direct, professional, and focused on vehicles that can support real operations.
            Selected trucks are also available for transport work.
          </p>
          <a className="text-link" href="#services">
            Explore services <ArrowRight size={18} />
          </a>
        </div>
        <div className="about-panel reveal">
          <img src="/images/mjt-trucking-logo-hd.png" alt="MJT Trucking premium brand mark" />
          <div>
            <span>Contact Person</span>
            <strong>Sisco</strong>
          </div>
          <div>
            <span>Location</span>
            <strong>146 Denne Road, Boksburg</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
