import { Users, Utensils } from "lucide-react";
import { motion } from "motion/react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const stats = [
  { label: "Pilgrims Served", value: "Lakhs", icon: "🙏" },
  { label: "Years of Service", value: "10+", icon: "📅" },
  { label: "Volunteers Deployed", value: "200+", icon: "👥" },
  { label: "Hot Meals per Day", value: "5,000+", icon: "🍽️" },
];

export default function GangasagarPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <div className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-orange-50 via-pink-50 to-amber-50 py-20 px-4 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 50%, #ff9933 0%, transparent 50%), radial-gradient(circle at 70% 30%, #e91e8c 0%, transparent 50%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 font-semibold text-sm px-4 py-2 rounded-full mb-6">
              🌊 Sacred Seva at the Sangam
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Gangasagar <span className="text-primary">Mela Seva</span>
            </h1>
            <p className="text-xl text-orange-700 font-semibold mb-6">
              Babughat, Kolkata — Every January
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Every year in January, Mahila Pragati Sansthan sets up camp at
              Babughat, Kolkata during the sacred Gangasagar Mela. We serve
              lakhs of pilgrims and visitors with free food, water, and
              temporary shelter during this massive religious gathering.
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="bg-gradient-to-r from-orange-500 to-pink-600 text-white py-10">
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

        {/* Food Service */}
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
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground">
                    Langar & Food Service
                  </h2>
                </div>
                <p className="text-foreground/70 text-lg leading-relaxed mb-4">
                  During the Gangasagar Mela, thousands of pilgrims arrive at
                  Babughat from all over India. Many are elderly, poor, or
                  travelling long distances. Our volunteers run a continuous
                  langar (community kitchen) serving hot meals free of charge.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  We serve rice, dal, sabzi, and khichdi to everyone who comes —
                  regardless of caste, religion, or background. No one leaves
                  our camp hungry.
                </p>
                <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <p className="text-orange-700 font-semibold text-sm">
                    🔥 Our kitchen runs 24 hours during the Mela period
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* biome-ignore lint/a11y/useMediaCaption: no captions available for this community video */}
                <video
                  src="/assets/uploads/langerandfood_1-019d3a61-b118-7417-b864-bf24c5483d40-1.mp4"
                  controls
                  className="w-full rounded-2xl shadow-lg aspect-video object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Shelter Support */}
        <section className="py-16 px-4 bg-orange-50">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 md:order-1"
              >
                {/* biome-ignore lint/a11y/useMediaCaption: no captions available for this community video */}
                <video
                  src="/assets/uploads/pilgrimshelter-019d3a4f-063c-764e-b26e-9239fa1e4f27-2.mp4"
                  controls
                  className="w-full rounded-2xl shadow-lg aspect-video object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 md:order-2"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground">
                    Camp & Pilgrim Support
                  </h2>
                </div>
                <p className="text-foreground/70 text-lg leading-relaxed mb-4">
                  We set up a dedicated camp at Babughat to assist pilgrims —
                  especially elderly individuals, women travelling alone, and
                  families who need guidance or help. Our volunteers are
                  stationed around the clock to provide assistance.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  Services include first aid, lost-and-found support, clean
                  water distribution, and direction assistance for those
                  unfamiliar with the area.
                </p>
                <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-amber-700 font-semibold text-sm">
                    📅 Every January — Gangasagar Mela, Babughat, Kolkata
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About the Mela */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              About Gangasagar Mela
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Gangasagar Mela is one of the largest pilgrimages in India, held
              annually on Makar Sankranti (mid-January). Millions of devotees
              take a holy dip at the confluence of the Ganges and the Bay of
              Bengal at Sagar Island. The gathering at Babughat in Kolkata
              serves as a major transit point for lakhs of pilgrims.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Mahila Pragati Sansthan has been serving this event for over a
              decade, making it one of our most cherished annual traditions of
              selfless service.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 text-center bg-gradient-to-br from-orange-50 to-pink-50">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Join Us Next January
            </h2>
            <p className="text-foreground/70 mb-8">
              Volunteer with us at Gangasagar Mela and be part of this sacred
              tradition of service. Your hands can feed thousands.
            </p>
            <a
              href="/#help"
              className="inline-block bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg"
              data-ocid="gangasagar.primary_button"
            >
              Volunteer With Us 🙏
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
