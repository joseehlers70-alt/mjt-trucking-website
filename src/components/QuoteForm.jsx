import { MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (event) => { event.preventDefault(); setSubmitted(true); event.currentTarget.reset(); };

  return (
    <section className="section quote section-dark" id="quote">
      <div className="container split">
        <div className="section-copy reveal">
          <p className="eyebrow">Get a Quote</p>
          <h2>Tell MJT Trucking what your business needs.</h2>
          <p>Share the truck, van, sourcing request, brokerage enquiry, or selected transport need and Sisco will follow up with a practical response.</p>
          <a className="button button-secondary" href="https://wa.me/27713319387?text=Hi%20MJT%20Trucking%2C%20I%20would%20like%20to%20enquire%20about%20your%20trucks%2Fservices." target="_blank" rel="noreferrer"><MessageCircle size={18} />WhatsApp Enquiry</a>
        </div>
        <form className="quote-form reveal" onSubmit={onSubmit}>
          <div className="form-row"><label>Name<input name="name" type="text" required /></label><label>Company name<input name="company" type="text" /></label></div>
          <div className="form-row"><label>Phone number<input name="phone" type="tel" required /></label><label>Email<input name="email" type="email" /></label></div>
          <label>Vehicle / enquiry type<input name="enquiry" type="text" required /></label>
          <label>Message<textarea name="message" rows="5" /></label>
          <button className="button button-primary" type="submit"><Send size={18} />Submit Request</button>
          {submitted && <p className="success-message">Thank you. MJT Trucking will contact you shortly.</p>}
        </form>
      </div>
    </section>
  );
}
