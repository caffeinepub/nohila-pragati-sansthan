import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";

export default function ContactSection() {
  const { ref, inView } = useInView();

  return (
    <section id="contact" className="py-20 lg:py-28 bg-pink-pale" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3 px-3 py-1 bg-white rounded-full">
            Contact Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Get In Touch
            <span className="text-gradient-pink"> With Us</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="lg:col-span-1 space-y-5"
          >
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-pink-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Address</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    618B Shyam Sundar Pally Main Road,
                    <br />
                    Shakuntala Park, Behala,
                    <br />
                    Kolkata – 700061
                    <br />
                    <span className="text-primary font-medium">
                      We work all over India
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-pink-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Helpline</p>
                  <a
                    href="tel:9123905368"
                    className="text-primary font-bold text-lg"
                  >
                    9123905368
                  </a>
                  <p className="text-xs text-muted-foreground">
                    24/7 Free & Confidential
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-pink-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Email</p>
                  <a
                    href="mailto:mahilapragati444@gmail.com"
                    className="text-primary text-sm"
                  >
                    mahilapragati444@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-pink-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Office Hours</p>
                  <p className="text-sm text-muted-foreground">
                    Mon – Sat: 9:00 AM – 6:00 PM
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Helpline: 24/7
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <p className="font-semibold text-sm mb-3">Follow Us</p>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 bg-pink-pale rounded-full flex items-center justify-center text-primary hover:bg-pink-gradient hover:text-white transition-all"
                  data-ocid="contact.link"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 bg-pink-pale rounded-full flex items-center justify-center text-primary hover:bg-pink-gradient hover:text-white transition-all"
                  data-ocid="contact.link"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-9 h-9 bg-pink-pale rounded-full flex items-center justify-center text-primary hover:bg-pink-gradient hover:text-white transition-all"
                  data-ocid="contact.link"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Awareness panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-soft h-full min-h-[400px] flex flex-col">
              <div className="bg-pink-gradient p-4 text-white">
                <h3 className="font-semibold">
                  Awareness: Recognize the Signs of Domestic Violence
                </h3>
                <p className="text-sm text-white/80 mt-1">
                  Knowledge is the first step toward protection.
                </p>
              </div>
              <div className="p-6 flex-1 grid sm:grid-cols-2 gap-4">
                {[
                  {
                    emoji: "🚩",
                    title: "Isolation",
                    desc: "Controlling who you see, where you go, or what you do",
                  },
                  {
                    emoji: "😰",
                    title: "Fear & Intimidation",
                    desc: "Making you feel afraid through looks, actions, or gestures",
                  },
                  {
                    emoji: "💸",
                    title: "Financial Control",
                    desc: "Preventing you from working or controlling all money",
                  },
                  {
                    emoji: "📵",
                    title: "Emotional Abuse",
                    desc: "Constant criticism, humiliation, or threats",
                  },
                  {
                    emoji: "🤕",
                    title: "Physical Harm",
                    desc: "Hitting, slapping, pushing, or any physical violence",
                  },
                  {
                    emoji: "🆘",
                    title: "Get Help",
                    desc: "Call 9123905368 or reach out to us immediately",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 bg-pink-pale rounded-xl p-3"
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
