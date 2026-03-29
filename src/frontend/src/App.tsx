import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import AboutSection from "./components/AboutSection";
import AdminDashboard from "./components/AdminDashboard";
import ContactSection from "./components/ContactSection";
import DonatePage from "./components/DonatePage";
import Footer from "./components/Footer";
import GangasagarPage from "./components/GangasagarPage";
import HelpRequestForm from "./components/HelpRequestForm";
import HeroCarousel from "./components/HeroCarousel";
import ImpactStats from "./components/ImpactStats";
import Navbar from "./components/Navbar";
import OurWorkPage from "./components/OurWorkPage";
import ServicesSection from "./components/ServicesSection";
import UserProfilePage from "./components/UserProfilePage";
import WeddingsPage from "./components/WeddingsPage";
import WelfarePage from "./components/WelfarePage";

export default function App() {
  const [currentPage] = useState(() => {
    const path = window.location.pathname;
    if (path.startsWith("/admin")) return "admin";
    if (path.startsWith("/donate")) return "donate";
    if (path.startsWith("/profile")) return "profile";
    if (path.startsWith("/welfare")) return "welfare";
    if (path.startsWith("/gangasagar")) return "gangasagar";
    if (path.startsWith("/weddings")) return "weddings";
    if (path.startsWith("/our-work")) return "our-work";
    return "home";
  });

  if (currentPage === "admin") {
    return (
      <>
        <Toaster richColors position="top-right" />
        <AdminDashboard />
      </>
    );
  }

  if (currentPage === "donate") {
    return (
      <div className="min-h-screen bg-background font-body">
        <Toaster richColors position="top-right" />
        <Navbar />
        <div className="pt-16 lg:pt-20">
          <DonatePage />
        </div>
        <Footer />
      </div>
    );
  }

  if (currentPage === "profile") {
    return (
      <div className="min-h-screen bg-background font-body">
        <Toaster richColors position="top-right" />
        <Navbar />
        <div className="pt-16 lg:pt-20">
          <UserProfilePage />
        </div>
        <Footer />
      </div>
    );
  }

  if (currentPage === "welfare") {
    return (
      <>
        <Toaster richColors position="top-right" />
        <WelfarePage />
      </>
    );
  }

  if (currentPage === "gangasagar") {
    return (
      <>
        <Toaster richColors position="top-right" />
        <GangasagarPage />
      </>
    );
  }

  if (currentPage === "weddings") {
    return (
      <>
        <Toaster richColors position="top-right" />
        <WeddingsPage />
      </>
    );
  }

  if (currentPage === "our-work") {
    return (
      <>
        <Toaster richColors position="top-right" />
        <OurWorkPage />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster richColors position="top-right" />
      <Navbar />
      <main>
        <HeroCarousel />
        <AboutSection />
        <ServicesSection />
        <ImpactStats />
        <HelpRequestForm />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
