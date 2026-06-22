import { Analytics } from "@vercel/analytics/react";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import { LANDING_PAGES } from "./data/landingPages";
import { LanguageProvider } from "./i18n/LanguageContext";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";

export default function App() {
	return (
		<LanguageProvider>
			<JsonLd />
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				{Object.keys(LANDING_PAGES).map((slug) => (
					<Route
						key={slug}
						path={`/${slug}/`}
						element={<LandingPage slug={slug} />}
					/>
				))}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
			<Footer />
			<WhatsAppButton />
			<ScrollToTop />
			<Analytics />
		</LanguageProvider>
	);
}
