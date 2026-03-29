import { Heart, Soup, Wind } from "lucide-react";
import { motion } from "motion/react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const stats = [
  { label: "Meals Served", value: "50,000+", icon: "🍛" },
  { label: "Blankets Distributed", value: "10,000+", icon: "🧣" },
  { label: "Cities Covered", value: "15+", icon: "🏙️" },
  { label: "Volunteers", value: "500+", icon: "🤝" },
];

export default function WelfarePage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <div className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-pink-50 via-white to-pink-100 py-20 px-4 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, #e91e8c 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ff6b9d 0%, transparent 50%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm px-4 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4 fill-primary" /> Seva for the Needy
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Food & <span className="text-primary">Warmth</span> for All
            </h1>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Mahila Pragati Sansthan believes no one should go hungry or shiver
              in the cold. We provide free food to the poor and underprivileged,
              and distribute blankets during winter so every person can stay
              warm and dignified.
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="bg-primary text-primary-foreground py-10">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl mb-1">{s.icon}</div>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-sm opacity-80 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Food Distribution */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Soup className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground">
                    Food Distribution
                  </h2>
                </div>
                <p className="text-foreground/70 text-lg leading-relaxed mb-4">
                  Every day, hundreds of poor and underprivileged individuals
                  face hunger. Our volunteers prepare and distribute hot,
                  nutritious meals at various locations across the city —
                  ensuring no one sleeps hungry.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  We organize regular food drives, especially near railway
                  stations, slum areas, and homeless shelters. Our kitchen runs
                  on donations and volunteer effort.
                </p>
                <div className="mt-6 p-4 bg-pink-50 rounded-xl border border-pink-200">
                  <p className="text-primary font-semibold text-sm">
                    📍 Serving at multiple locations across Kolkata and
                    surrounding areas
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden"
              >
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                  src="/assets/uploads/food-019d39f6-cbd0-7012-b651-3851d7a9f297-1.mp4"
                  controls
                  className="w-full rounded-2xl shadow-md"
                  style={{ maxHeight: "360px", objectFit: "cover" }}
                >
                  <track kind="captions" />
                </video>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Blanket Distribution */}
        <section className="py-16 px-4 bg-pink-50">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 md:order-1 rounded-2xl overflow-hidden"
              >
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                  src="/assets/uploads/blankets-019d39f6-cdba-73d8-8103-bdb6bd5a7a1f-2.mp4"
                  controls
                  className="w-full rounded-2xl shadow-md"
                  style={{ maxHeight: "360px", objectFit: "cover" }}
                >
                  <track kind="captions" />
                </video>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 md:order-2"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Wind className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground">
                    Blanket Distribution
                  </h2>
                </div>
                <p className="text-foreground/70 text-lg leading-relaxed mb-4">
                  Cold winters are especially harsh for the homeless and the
                  poor. Mahila Pragati Sansthan runs winter relief drives to
                  distribute warm blankets so that no one shivers on the
                  streets.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  Our teams go out into the field — to railway stations,
                  underpasses, and slum areas — hand-delivering blankets and
                  warm clothes to those in need.
                </p>
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-blue-700 font-semibold text-sm">
                    ❄️ Active every winter season across West Bengal and other
                    states
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 text-center bg-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Help Us Serve More
            </h2>
            <p className="text-foreground/70 mb-8">
              Your donation can provide a meal to a hungry family or a blanket
              to someone shivering in the cold. Every contribution matters.
            </p>
            <a
              href="/donate"
              className="inline-block bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg"
              data-ocid="welfare.primary_button"
            >
              Donate Now 💗
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
