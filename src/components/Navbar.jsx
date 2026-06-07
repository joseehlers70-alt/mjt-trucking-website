import { Menu, MessageCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { whatsappNumber } from '../lib/supabase.js';

const navItems = [
  ['Home', '/'],
  ['Available Trucks', '/trucks'],
  ['About', '/#about'],
  ['Contact', '/#contact'],
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

  return (
    <header className={`navbar ${scrolled ? 'navbar--solid' : ''}`}>
      <Link className="brand" to="/" aria-label="MJT Trucking home" onClick={() => setOpen(false)}>
        <img src="/images/mjt-trucking-logo-transparent-hd.png" alt="MJT Trucking" />
      </Link>

      <nav className={`navlinks ${open ? 'navlinks--open' : ''}`} aria-label="Main navigation">
        {navItems.map(([label, href]) =>
          href.includes('#') ? (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ) : (
            <NavLink key={href} to={href} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ),
        )}
      </nav>

      <a
        className="nav-call"
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi MJT, I would like to enquire about your available trucks and trailers.')}`}
        target="_blank"
        rel="noreferrer"
      >
        <MessageCircle size={18} />
        <span>WhatsApp MJT</span>
      </a>

      <button
        className="menu-button"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
    </header>
  );
}
