import { Heart, Music, Star } from "lucide-react";
import { motion } from "motion/react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const services = [
  {
    icon: "🏛️",
    title: "Venue Arrangements",
    desc: "We help secure affordable or donated venues for wedding ceremonies and receptions.",
  },
  {
    icon: "🍽️",
    title: "Food & Catering",
    desc: "Nutritious and traditional meals prepared and served by our volunteer team.",
  },
  {
    icon: "🌸",
    title: "Decoration Support",
    desc: "Beautiful, dignified decoration arrangements to make every wedding special.",
  },
  {
    icon: "📋",
    title: "Event Coordination",
    desc: "End-to-end coordination so families can focus on the celebration, not logistics.",
  },
  {
    icon: "👗",
    title: "Attire Assistance",
    desc: "Where needed, we assist in arranging bridal and groom attire for families in need.",
  },
  {
    icon: "📸",
    title: "Photography",
    desc: "Volunteer photographers to capture precious memories for underprivileged families.",
  },
];

const communities = [
  "Hindu",
  "Muslim",
  "Christian",
  "Sikh",
  "Jain",
  "Buddhist",
  "All Castes",
  "All Communities",
  "All Religions",
];

export default function WeddingsPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <div className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 py-20 px-4 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, #e91e8c 0%, transparent 50%), radial-gradient(circle at 80% 30%, #ff6b9d 0%, transparent 50%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm px-4 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4 fill-primary" /> Celebrating Love
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Wedding <span className="text-primary">Support Services</span>
            </h1>
            <p className="text-xl text-primary font-semibold mb-6">
              Celebrating Love Across All Communities
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Mahila Pragati Sansthan assists in organizing weddings for
              underprivileged families across all castes, religions, and
              communities. We believe every couple deserves a dignified and
              joyful celebration, regardless of their economic background.
            </p>
          </motion.div>
        </section>

        {/* All Communities Banner */}
        <section className="bg-primary py-6 overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="flex gap-4 whitespace-nowrap"
          >
            {[...communities, ...communities, ...communities].map((c, i) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: intentional duplicate list for infinite scroll
                key={`${c}-${i}`}
                className="inline-flex items-center gap-2 text-primary-foreground font-semibold px-4"
              >
                <Star className="w-3 h-3 fill-current" /> {c}
              </span>
            ))}
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                What We Provide
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                From venue to catering to decoration — we handle the details so
                families can focus on the joy of the occasion.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-pink-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                >
                  <div className="text-4xl mb-3">{s.icon}</div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {s.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Gallery Placeholders */}
        <section className="py-16 px-4 bg-pink-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                <Music className="inline w-8 h-8 text-primary mr-2" />
                Weddings We've Celebrated
              </h2>
              <p className="text-foreground/70">
                Photos from our wedding support events will be shared here soon.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex flex-col items-center justify-center gap-3 border-2 border-dashed border-pink-300"
                  data-ocid={`weddings.item.${n}`}
                >
                  <span className="text-5xl">
                    {n === 1 ? "💍" : n === 2 ? "🌸" : "💒"}
                  </span>
                  <p className="text-primary font-semibold">
                    Photos Coming Soon
                  </p>
                  <p className="text-foreground/40 text-xs text-center px-4">
                    Wedding {n} gallery
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-10 text-center border border-pink-200">
              <Heart className="w-12 h-12 text-primary fill-primary mx-auto mb-6" />
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Our Commitment
              </h2>
              <p className="text-foreground/70 text-lg leading-relaxed mb-6">
                We do not discriminate. Every wedding we support — whether
                Hindu, Muslim, Christian, Sikh, or from any other community —
                receives the same love, respect, and dedication.
                <strong className="text-primary">
                  {" "}
                  All castes, all religions, all communities
                </strong>{" "}
                are welcome at Mahila Pragati Sansthan.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {communities.map((c) => (
                  <span
                    key={c}
                    className="bg-primary/10 text-primary font-semibold text-sm px-4 py-2 rounded-full"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 text-center bg-gradient-to-br from-pink-50 to-rose-50">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Need Wedding Support?
            </h2>
            <p className="text-foreground/70 mb-8">
              If you or someone you know needs support for an upcoming wedding,
              please reach out to us. We are here to help make your special day
              beautiful.
            </p>
            <a
              href="/#contact"
              className="inline-block bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg"
              data-ocid="weddings.primary_button"
            >
              Contact Us 💌
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
