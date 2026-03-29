import {
  GraduationCap,
  Megaphone,
  Phone,
  Scale,
  Stethoscope,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";

const services = [
  {
    icon: Scale,
    title: "Legal Aid & Counseling",
    desc: "Free legal consultation, help filing complaints, and court representation for domestic violence cases.",
    color: "bg-pink-medium",
  },
  {
    icon: Stethoscope,
    title: "Medical Support",
    desc: "Healthcare access, mental health counseling, trauma therapy, and referrals to partner hospitals.",
    color: "bg-pink-rose",
  },
  {
    icon: Phone,
    title: "24/7 Helpline — 9123905368",
    desc: "Round-the-clock crisis support line staffed by trained counselors. Confidential and free.",
    color: "bg-pink-deep",
  },
  {
    icon: GraduationCap,
    title: "Rehabilitation Programs",
    desc: "Skill-building workshops, vocational training, and income-generation support for long-term independence.",
    color: "bg-pink-medium",
  },
  {
    icon: Megaphone,
    title: "Awareness Campaigns",
    desc: "Community outreach, school programs, and digital campaigns to educate and prevent domestic violence.",
    color: "bg-pink-rose",
  },
  {
    icon: Users,
    title: "Community Support",
    desc: "Support groups, peer counseling, and networks connecting survivors with trained volunteers across India.",
    color: "bg-pink-deep",
  },
];

export default function ServicesSection() {
  const { ref, inView } = useInView();

  return (
    <section id="services" className="py-20 lg:py-28 bg-pink-pale" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3 px-3 py-1 bg-white rounded-full">
            Our Services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Comprehensive Support for
            <span className="text-gradient-pink"> Every Need</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-base">
            We provide holistic support services to ensure no survivor is left
            without help, hope, or a path forward.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-pink transition-all duration-300 hover:-translate-y-1 border border-border group"
              data-ocid="services.card"
            >
              <div
                className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <s.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-base mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
