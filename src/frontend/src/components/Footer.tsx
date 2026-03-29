import { Heart, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-foreground text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/assets/uploads/logo-019d38f8-44b7-73ae-9933-5c181b2868e1-3.jpeg"
                alt="Logo"
                className="w-12 h-12 object-contain rounded-full opacity-90"
              />
              <div>
                <p className="font-display font-bold text-sm leading-tight">
                  Mahila Pragati Sansthan
                </p>
                <p className="text-xs text-white/80">
                  Empowering Survivors Since 2019
                </p>
              </div>
            </div>
            <p className="text-sm text-white/85 leading-relaxed max-w-xs">
              A registered NGO dedicated to ending domestic violence through
              support, advocacy, and community healing across India.
            </p>
            <p className="text-xs text-white/60 mt-2">
              618B Shyam Sundar Pally Main Road, Shakuntala Park,
              <br />
              Behala, Kolkata – 700061
            </p>
            <a
              href="tel:9123905368"
              className="inline-flex items-center gap-2 mt-4 bg-pink-deep text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Phone className="w-4 h-4" /> 9123905368 — 24/7 Helpline
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/#about" },
                { label: "Our Services", href: "/#services" },
                { label: "Impact", href: "/#impact" },
                { label: "Get Help", href: "/#help" },
                { label: "Donate", href: "/donate" },
                { label: "Contact", href: "/#contact" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/80 hover:text-pink-rose transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white">
              Emergency Contacts
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Mahila Pragati", number: "9123905368" },
                { label: "Women Helpline", number: "181" },
                { label: "Police", number: "100" },
                { label: "Ambulance", number: "108" },
              ].map((c) => (
                <li
                  key={c.number}
                  className="flex items-center justify-between"
                >
                  <span className="text-xs text-white/80">{c.label}</span>
                  <a
                    href={`tel:${c.number}`}
                    className="text-sm font-bold text-pink-rose hover:text-white transition-colors"
                  >
                    {c.number}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <a
                href="mailto:mahilapragati444@gmail.com"
                className="text-xs text-white/80 hover:text-pink-rose transition-colors break-all"
              >
                mahilapragati444@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/75">
          <p>© {year} Mahila Pragati Sansthan. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with{" "}
            <Heart className="w-3 h-3 text-pink-rose fill-pink-rose" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
