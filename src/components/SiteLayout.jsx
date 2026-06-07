import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
