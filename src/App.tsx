import { LanguageProvider } from "./i18n/LanguageContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import JsonLd from "./components/JsonLd";
import SeoHead from "./components/SeoHead";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <LanguageProvider>
      <SeoHead />
      <JsonLd />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </LanguageProvider>
  );
}
