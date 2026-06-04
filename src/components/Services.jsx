import { services } from '../data/services.js';

export default function Services() {
  return (
    <section className="section services section-dark" id="services">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">Services</p>
          <h2>Commercial truck and van sales support.</h2>
          <p>
            Premium support for commercial truck sales, commercial van sales, vehicle sourcing, brokerage enquiries, and
            selected transport services using available trucks.
          </p>
        </div>
        <div className="service-grid">
          {services.map(({ icon: Icon, title, text }) => (
            <article className="service-card reveal" key={title}>
              <div className="service-icon">
                <Icon size={24} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
