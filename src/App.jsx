import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Engineering from './components/Engineering.jsx';
import FleetShowcase from './components/FleetShowcase.jsx';
import Footer from './components/Footer.jsx';
import Gallery from './components/Gallery.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import QuoteForm from './components/QuoteForm.jsx';
import Services from './components/Services.jsx';
import Stats from './components/Stats.jsx';
import TransportMotion from './components/TransportMotion.jsx';
import TruckDetail from './components/TruckDetail.jsx';
import WarehouseSection from './components/WarehouseSection.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <FleetShowcase />
        <WarehouseSection />
        <TransportMotion />
        <Engineering />
        <Gallery />
        <TruckDetail />
        <QuoteForm />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
