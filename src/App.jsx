import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import TrustBar from "./components/TrustBar.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Gallery from "./components/Gallery.jsx";
import Reels from "./components/Reels.jsx";
import OrderCTA from "./components/OrderCTA.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import StickyWhatsapp from "./components/StickyWhatsapp.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <Gallery />
        <Reels />
        <OrderCTA />
        <Contact />
      </main>
      <Footer />
      <StickyWhatsapp />
    </>
  );
}
