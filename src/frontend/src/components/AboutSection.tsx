import { Heart, Scale, Users, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";

const pillars = [
  {
    icon: Heart,
    title: "Survivor-Centered Care",
    desc: "We put survivors at the heart of everything we do — providing compassionate, trauma-informed support.",
  },
  {
    icon: Scale,
    title: "Legal Empowerment",
    desc: "Free legal aid, court accompaniment, and rights education to help survivors seek justice.",
  },
  {
    icon: Wrench,
    title: "Skill Development",
    desc: "Vocational training, income-generation programs, and workshops to help survivors become self-reliant.",
  },
  {
    icon: Users,
    title: "Community Healing",
    desc: "Group therapy, peer counseling, and community support networks for long-term recovery.",
  },
];

export default function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-20 lg:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3 px-3 py-1 bg-pink-pale rounded-full">
              About Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              We Stand for
              <span className="text-gradient-pink block">Every Survivor</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-4">
              <strong className="text-foreground">
                Mahila Pragati Sansthan
              </strong>{" "}
              is a registered NGO committed to fighting domestic violence across
              India. Founded with a deep conviction that every person deserves
              to live a life free from violence and fear, we provide
              comprehensive support to survivors and their children.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              Our work spans emergency response, legal advocacy, psychological
              counseling, rehabilitation, and awareness campaigns — creating a
              web of protection and healing for those who need it most.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-pink-pale rounded-xl p-4 text-center">
                <p className="font-display font-bold text-2xl text-primary">
                  Our Mission
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">
                  To end domestic violence through intervention, education, and
                  empowerment
                </p>
              </div>
              <div className="bg-pink-pale rounded-xl p-4 text-center">
                <p className="font-display font-bold text-2xl text-primary">
                  Our Vision
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">
                  A society where every home is safe, and every person lives
                  with dignity
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right pillars */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                className="bg-white border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-pink transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-pink-gradient flex items-center justify-center mb-3">
                  <p.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-sm mb-1.5">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
