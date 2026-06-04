import { Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Services', '#services'],
  ['Fleet', '#fleet'],
  ['Transport in Motion', '#transport-motion'],
  ['Gallery', '#gallery'],
  ['Contact', '#contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'navbar--solid' : ''}`}>
      <a className="brand" href="#home" aria-label="MJT Trucking home" onClick={close}>
        <img src="/images/mjt-trucking-logo-transparent-hd.png" alt="MJT Trucking logo" />
      </a>

      <nav className={`navlinks ${open ? 'navlinks--open' : ''}`} aria-label="Main navigation">
        {navItems.map(([label, href]) => (
          <a key={href} href={href} onClick={close}>
            {label}
          </a>
        ))}
        <a className="nav-quote" href="#quote" onClick={close}>
          Get a Quote
        </a>
      </nav>

      <a className="nav-call" href="tel:0713319387" aria-label="Call MJT Trucking">
        <Phone size={18} />
        <span>071 331 9387</span>
      </a>

      <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
    </header>
  );
}
