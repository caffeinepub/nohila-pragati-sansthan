import { Button } from "@/components/ui/button";
import { Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Impact", href: "#impact" },
  { label: "QR Code", href: "#qrcode" },
  { label: "Get Help", href: "#help" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-soft"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-2"
              data-ocid="nav.link"
            >
              <img
                src="/assets/generated/nps-logo-transparent.dim_200x200.png"
                alt="Mahila Pragati Sansthan"
                className="w-10 h-10 object-contain"
              />
              <div className="hidden sm:block">
                <p className="font-display font-bold text-sm leading-tight text-gradient-pink">
                  Mahila Pragati Sansthan
                </p>
                <p className="text-xs text-muted-foreground">
                  Empowering Survivors
                </p>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid="nav.link"
                  className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-pink-pale"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <a
                href="tel:9123905368"
                className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary"
              >
                <Phone className="w-4 h-4" />
                <span>9123905368</span>
              </a>
              <Button
                onClick={() => setLoginOpen(true)}
                className="bg-pink-gradient text-white hover:opacity-90 rounded-full px-5 text-sm font-semibold shadow-pink"
                data-ocid="nav.open_modal_button"
              >
                Login / Register
              </Button>
              <button
                type="button"
                className="lg:hidden p-2 text-foreground"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-border"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    data-ocid="nav.link"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-pink-pale rounded-md transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex items-center gap-1 px-3 py-2 text-primary font-semibold">
                  <Phone className="w-4 h-4" />
                  <span>Helpline: 9123905368</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
