import { galleryImages } from '../data/gallery.js';

export default function Gallery() {
  return (
    <section className="section gallery section-dark" id="gallery">
      <div className="container">
        <div className="section-heading reveal"><p className="eyebrow">Gallery</p><h2>Commercial vehicles, detail, and transport visuals.</h2></div>
        <div className="gallery-grid">
          {galleryImages.map((image) => <figure className="gallery-item reveal" key={image.src}><img src={image.src} alt={image.alt} loading="lazy" /><figcaption>{image.title}</figcaption></figure>)}
        </div>
      </div>
    </section>
  );
}
