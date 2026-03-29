import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const slides = [
  {
    image: "/assets/generated/hero-slide1.dim_1400x600.jpg",
    title: "Breaking the Silence",
    subtitle: "on Domestic Violence",
    description:
      "Every survivor deserves to be heard, protected, and supported. We stand with you.",
    cta: "Get Help Now",
    ctaHref: "#help",
    secondary: "Learn About Us",
    secondaryHref: "#about",
  },
  {
    image: "/assets/generated/hero-slide2.dim_1400x600.jpg",
    title: "Support, Shelter",
    subtitle: "& Safety for Survivors",
    description:
      "Safe spaces, legal aid, medical support, and rehabilitation — all under one roof.",
    cta: "Our Services",
    ctaHref: "#services",
    secondary: "Donate",
    secondaryHref: "#contact",
  },
  {
    image: "/assets/generated/hero-slide3.dim_1400x600.jpg",
    title: "Join Us in Creating",
    subtitle: "a Violence-Free India",
    description:
      "Volunteer, donate, or spread awareness. Together we can end the cycle of violence.",
    cta: "Volunteer With Us",
    ctaHref: "#help",
    secondary: "Know the Signs",
    secondaryHref: "#about",
  },
  {
    image: "/assets/generated/hero-slide1.dim_1400x600.jpg",
    title: "Every Voice Matters —",
    subtitle: "Speak Up, Seek Help",
    description:
      "You are not alone. Our helpline 9123905368 is available 24/7 to support you.",
    cta: "Call 9123905368 Now",
    ctaHref: "tel:9123905368",
    secondary: "Scan QR Code",
    secondaryHref: "#qrcode",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent((index + slides.length) % slides.length);
    },
    [current],
  );

  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  useEffect(() => {
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section
      id="home"
      className="relative h-[90vh] min-h-[540px] overflow-hidden bg-pink-pale"
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          initial={{ x: `${direction * 120}vw`, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: `${direction * -120}vw`, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slides[current].image}')` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-deep/80 via-pink-medium/60 to-transparent" />

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-8 flex items-center">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-white/30">
                  <Heart className="w-3 h-3 fill-white" />
                  Mahila Pragati Sansthan
                </span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {slides[current].title}
                  <br />
                  <span className="text-pink-300">
                    {slides[current].subtitle}
                  </span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed max-w-lg">
                  {slides[current].description}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    className="bg-white text-primary font-bold rounded-full px-7 py-3 hover:bg-pink-pale shadow-pink-lg text-base"
                    data-ocid="hero.primary_button"
                  >
                    <a href={slides[current].ctaHref}>{slides[current].cta}</a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white text-white bg-transparent hover:bg-white/20 rounded-full px-7 py-3 text-base font-semibold"
                    data-ocid="hero.secondary_button"
                  >
                    <a href={slides[current].secondaryHref}>
                      {slides[current].secondary}
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        data-ocid="hero.pagination_prev"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/50 flex items-center justify-center transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        data-ocid="hero.pagination_next"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/50 flex items-center justify-center transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((slide, i) => (
          <button
            type="button"
            key={slide.title}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-white w-8" : "bg-white/50 w-2.5"
            }`}
          />
        ))}
      </div>

      {/* Helpline banner */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-primary/90 backdrop-blur-sm text-primary-foreground py-2.5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          <span className="text-sm font-semibold">🆘 24/7 Helpline:</span>
          <a
            href="tel:9123905368"
            className="text-lg font-bold hover:underline"
          >
            📞 9123905368
          </a>
          <span className="hidden sm:inline text-sm opacity-80">
            | Free | Confidential | Available in Hindi & English
          </span>
        </div>
      </div>
    </section>
  );
}
