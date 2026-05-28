import About from "../components/About";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import Fleet from "../components/Fleet";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import SeoHead from "../components/SeoHead";
import ServiceArea from "../components/ServiceArea";
import ServicePageLinks from "../components/ServicePageLinks";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import WhyUs from "../components/WhyUs";

export default function HomePage() {
	return (
		<>
			<SeoHead />
			<main>
				<Hero />
				<About />
				<Services />
				<ServicePageLinks />
				<Fleet />
				<WhyUs />
				<HowItWorks />
				<Testimonials />
				<FAQ />
				<CTA />
				<ServiceArea />
			</main>
		</>
	);
}
