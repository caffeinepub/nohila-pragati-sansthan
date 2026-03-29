import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

type Category = "all" | "welfare" | "gangasagar" | "weddings";

interface WorkItem {
  id: number;
  category: "welfare" | "gangasagar" | "weddings";
  title: string;
  description: string;
  image?: string;
  video?: string;
  emoji: string;
}

const workItems: WorkItem[] = [
  // Food & Welfare
  {
    id: 1,
    category: "welfare",
    title: "Food Distribution Drive",
    description:
      "Hot meals distributed to hundreds of families during winter months in Kolkata.",
    video: "/assets/uploads/food-019d39f6-cbd0-7012-b651-3851d7a9f297-1.mp4",
    emoji: "🍱",
  },
  {
    id: 2,
    category: "welfare",
    title: "Blanket Distribution",
    description:
      "Warm blankets provided to the homeless and underprivileged during harsh winter.",
    video:
      "/assets/uploads/blankets-019d39f6-cdba-73d8-8103-bdb6bd5a7a1f-2.mp4",
    emoji: "🧣",
  },
  {
    id: 3,
    category: "welfare",
    title: "Relief for the Elderly",
    description:
      "Special care packages and meals for elderly citizens living alone.",
    image:
      "/assets/uploads/whatsapp_image_2026-03-29_at_3.14.51_pm-019d390d-6876-72f8-8939-b5cdba9aa8e3-1.jpeg",
    emoji: "👵",
  },
  {
    id: 4,
    category: "welfare",
    title: "Community Kitchen",
    description:
      "Weekly community kitchen serving nutritious food to those in need.",
    video:
      "/assets/uploads/communitykitchen-019d3a6e-dbb3-700e-8041-ba4ff0d12cc4-1.mp4",
    emoji: "🥘",
  },
  {
    id: 5,
    category: "welfare",
    title: "Winter Aid Camp",
    description:
      "Annual camp providing essentials including food, clothing, and hygiene kits.",
    video:
      "/assets/uploads/winteraid_1-019d3a70-9dfc-7211-a139-3c4851586cda-4.mp4",
    emoji: "❄️",
  },
  // Gangasagar Mela
  {
    id: 6,
    category: "gangasagar",
    title: "Gangasagar Mela 2025",
    description:
      "Serving lakhs of pilgrims at Babughat, Kolkata — providing food, shelter, and first aid every January.",
    image:
      "/assets/uploads/whatsapp_image_2026-03-29_at_3.12.48_pm-019d390d-6bb7-7598-8a87-3574f790bbd2-4.jpeg",
    emoji: "🪔",
  },
  {
    id: 7,
    category: "gangasagar",
    title: "Pilgrim Shelter Setup",
    description:
      "Safe and clean temporary shelters arranged for over 10,000 pilgrims.",
    video:
      "/assets/uploads/pilgrimshelter-019d3a4f-063c-764e-b26e-9239fa1e4f27-2.mp4",
    emoji: "⛺",
  },
  {
    id: 10,
    category: "gangasagar",
    title: "Prasad & Sacred Offerings",
    description:
      "Organizing the distribution of prasad and sacred items to all pilgrims.",
    video:
      "/assets/uploads/prasad_1-019d3a70-9cd2-7368-b89f-890938b5f9e6-3.mp4",
    emoji: "🌸",
  },
  // Weddings
  {
    id: 11,
    category: "weddings",
    title: "Wedding Support Services",
    description:
      "Comprehensive support at weddings across all castes, religions, and communities.",
    emoji: "💍",
  },
  {
    id: 15,
    category: "weddings",
    title: "Marriage Counseling",
    description:
      "Pre-wedding counseling sessions for couples to ensure healthy, informed relationships.",
    emoji: "💬",
  },
];

const categories = [
  { key: "all" as Category, label: "All Work" },
  { key: "welfare" as Category, label: "Food & Welfare" },
  { key: "gangasagar" as Category, label: "Gangasagar Mela" },
  { key: "weddings" as Category, label: "Weddings" },
];

const categoryColors: Record<string, string> = {
  welfare: "from-pink-100 to-rose-50",
  gangasagar: "from-amber-50 to-orange-50",
  weddings: "from-fuchsia-50 to-pink-50",
};

const categoryBadgeColors: Record<string, string> = {
  welfare: "bg-rose-100 text-rose-700",
  gangasagar: "bg-amber-100 text-amber-700",
  weddings: "bg-fuchsia-100 text-fuchsia-700",
};

const categoryLabels: Record<string, string> = {
  welfare: "Food & Welfare",
  gangasagar: "Gangasagar Mela",
  weddings: "Weddings",
};

export default function OurWorkPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered =
    activeCategory === "all"
      ? workItems
      : workItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 py-16 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-4xl mb-4">🌺</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Work
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Serving communities across India — from food distribution and
              pilgrim care to wedding support. Every act of service is rooted in
              compassion.
            </p>
          </motion.div>
        </section>

        {/* Filter Tabs */}
        <section className="sticky top-16 lg:top-20 z-30 bg-white/95 backdrop-blur border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                data-ocid={`ourwork.${cat.key}.tab`}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat.key
                    ? "bg-primary text-white shadow-sm"
                    : "bg-pink-50 text-foreground/70 hover:bg-pink-100 hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
            >
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="break-inside-avoid group"
                  data-ocid={`ourwork.item.${index + 1}`}
                >
                  <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group-hover:-translate-y-1 bg-white border border-border">
                    {item.video ? (
                      <div className="relative overflow-hidden">
                        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                        <video
                          src={item.video}
                          controls
                          className="w-full object-cover"
                          style={{ maxHeight: "280px" }}
                        >
                          <track kind="captions" />
                        </video>
                        <div className="absolute top-3 left-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryBadgeColors[item.category]}`}
                          >
                            {categoryLabels[item.category]}
                          </span>
                        </div>
                      </div>
                    ) : item.image ? (
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{ maxHeight: "280px" }}
                        />
                        <div className="absolute top-3 left-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryBadgeColors[item.category]}`}
                          >
                            {categoryLabels[item.category]}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`h-40 bg-gradient-to-br ${categoryColors[item.category]} flex flex-col items-center justify-center gap-2 relative`}
                      >
                        <span className="text-5xl">{item.emoji}</span>
                        <div className="absolute top-3 left-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryBadgeColors[item.category]}`}
                          >
                            {categoryLabels[item.category]}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-foreground text-base mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-foreground/60 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div
              className="text-center py-20 text-foreground/40"
              data-ocid="ourwork.empty_state"
            >
              No items found.
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-pink-50 to-rose-50 py-12 px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">
            Want to be part of this journey?
          </h2>
          <p className="text-foreground/60 mb-6 max-w-md mx-auto">
            Volunteer with us or donate to help us continue our work across
            India.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/#help"
              data-ocid="ourwork.primary_button"
              className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              Get Involved
            </a>
            <a
              href="/donate"
              data-ocid="ourwork.secondary_button"
              className="px-6 py-3 rounded-full border border-primary text-primary font-semibold hover:bg-pink-50 transition-colors"
            >
              Donate Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
