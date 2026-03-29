import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDown, LogOut, Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "../hooks/useQueries";
import LoginModal from "./LoginModal";

const mainLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Impact", href: "/#impact" },
  { label: "Get Help", href: "/#help" },
  { label: "Contact", href: "/#contact" },
];

const ourWorkLinks = [
  { label: "Our Work", href: "/our-work" },
  { label: "Food & Welfare", href: "/welfare" },
  { label: "Gangasagar Mela", href: "/gangasagar" },
  { label: "Weddings", href: "/weddings" },
  { label: "Cases Solved", href: "/cases-solved" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { identity, clear } = useInternetIdentity();
  const { data: profile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isHomePage =
    typeof window !== "undefined" && window.location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setWorkDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    toast.success("Logged out successfully");
  };

  const avatarUrl = profile?.name
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=e91e8c&color=fff&size=64&bold=true`
    : null;

  const getHref = (href: string) => {
    if (href.startsWith("/#") && !isHomePage) return href;
    if (href.startsWith("/#") && isHomePage) return href.slice(1);
    return href;
  };

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
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2 shrink-0"
              data-ocid="nav.link"
            >
              <img
                src="/assets/uploads/logo-019d38f8-44b7-73ae-9933-5c181b2868e1-3.jpeg"
                alt="Mahila Pragati Sansthan"
                className="w-10 h-10 object-contain rounded-full"
              />
              <div className="hidden sm:block">
                <p className="font-display font-bold text-sm leading-tight text-gradient-pink">
                  Mahila Pragati Sansthan
                </p>
                <p className="text-xs text-foreground/50">
                  Empowering Survivors
                </p>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {mainLinks.map((link) => (
                <a
                  key={link.href}
                  href={getHref(link.href)}
                  data-ocid="nav.link"
                  className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-pink-50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}

              {/* Our Work Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setWorkDropdownOpen(!workDropdownOpen)}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-pink-50 rounded-lg transition-colors"
                  data-ocid="nav.ourwork_dropdown"
                >
                  Our Work
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${workDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {workDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-border/60 py-1 z-50"
                    >
                      {ourWorkLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          data-ocid="nav.link"
                          onClick={() => setWorkDropdownOpen(false)}
                          className="block px-4 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-pink-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                        >
                          {link.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="/donate"
                data-ocid="nav.link"
                className="px-3 py-2 text-sm font-semibold text-primary hover:bg-pink-50 rounded-lg transition-colors"
              >
                Donate
              </a>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <a
                href="tel:9123905368"
                className="hidden md:flex items-center gap-1 text-sm font-semibold text-primary"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>9123905368</span>
              </a>

              <a
                href="/admin"
                className="hidden lg:block text-xs text-foreground/40 hover:text-primary font-medium transition-colors"
                data-ocid="nav.link"
              >
                Admin
              </a>

              {isAuthenticated ? (
                <div className="flex items-center gap-1.5">
                  <a
                    href="/profile"
                    className="flex items-center gap-1.5 rounded-full hover:bg-pink-50 px-2 py-1 transition-colors"
                    data-ocid="nav.link"
                  >
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={profile?.name}
                        className="w-8 h-8 rounded-full border-2 border-primary"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-pink-gradient flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {profile?.name?.[0]?.toUpperCase() ?? "U"}
                        </span>
                      </div>
                    )}
                    {profile?.name && (
                      <span className="hidden xl:block text-sm font-medium text-foreground max-w-[80px] truncate">
                        {profile.name}
                      </span>
                    )}
                  </a>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-pink-50 rounded-full px-3 text-xs font-semibold"
                    data-ocid="nav.logout_button"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline ml-1">Logout</span>
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setLoginOpen(true)}
                  size="sm"
                  className="bg-pink-gradient text-white hover:opacity-90 rounded-full px-4 text-sm font-semibold shadow-pink hidden sm:flex"
                  data-ocid="nav.open_modal_button"
                >
                  Login
                </Button>
              )}

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
              <div className="px-4 py-3 space-y-0.5">
                {mainLinks.map((link) => (
                  <a
                    key={link.href}
                    href={getHref(link.href)}
                    data-ocid="nav.link"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-pink-50 rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ))}

                {/* Mobile Our Work accordion */}
                <button
                  type="button"
                  onClick={() => setMobileWorkOpen(!mobileWorkOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-pink-50 rounded-lg transition-colors"
                >
                  Our Work
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${mobileWorkOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {mobileWorkOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4"
                    >
                      {ourWorkLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          data-ocid="nav.link"
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-sm text-foreground/70 hover:text-primary hover:bg-pink-50 rounded-lg transition-colors"
                        >
                          {link.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <a
                  href="/donate"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-primary hover:bg-pink-50 rounded-lg transition-colors"
                >
                  Donate
                </a>

                {isAuthenticated ? (
                  <>
                    <a
                      href="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary"
                    >
                      {avatarUrl && (
                        <img
                          src={avatarUrl}
                          alt=""
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      {profile?.name ?? "My Profile"}
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-sm font-medium text-primary flex items-center gap-2 hover:bg-pink-50 rounded-lg"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      setLoginOpen(true);
                    }}
                    className="w-full text-left px-3 py-2 text-sm font-semibold text-primary hover:bg-pink-50 rounded-lg"
                  >
                    Login / Register
                  </button>
                )}

                <div className="flex items-center gap-1 px-3 py-2 text-primary font-semibold text-sm">
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
