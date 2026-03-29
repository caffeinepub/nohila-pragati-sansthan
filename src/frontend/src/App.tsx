import { Toaster } from "@/components/ui/sonner";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HelpRequestForm from "./components/HelpRequestForm";
import HeroCarousel from "./components/HeroCarousel";
import ImpactStats from "./components/ImpactStats";
import Navbar from "./components/Navbar";
import QRCodeSection from "./components/QRCodeSection";
import ServicesSection from "./components/ServicesSection";

export default function App() {
  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster richColors position="top-right" />
      <Navbar />
      <main>
        <HeroCarousel />
        <AboutSection />
        <ServicesSection />
        <ImpactStats />
        <QRCodeSection />
        <HelpRequestForm />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
