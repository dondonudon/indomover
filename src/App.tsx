import { Analytics } from "@vercel/analytics/react";
import About from "./components/About";
import CTA from "./components/CTA";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import JsonLd from "./components/JsonLd";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import SeoHead from "./components/SeoHead";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import WhatsAppButton from "./components/WhatsAppButton";
import WhyUs from "./components/WhyUs";
import { LanguageProvider } from "./i18n/LanguageContext";

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
			<Analytics />
		</LanguageProvider>
	);
}
