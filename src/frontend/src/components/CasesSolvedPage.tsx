import { motion } from "motion/react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface CaseVideo {
  id: number;
  title: string;
  description: string;
  video: string;
  tag: string;
}

const caseVideos: CaseVideo[] = [
  {
    id: 1,
    title: "Video 1",
    description: "A case successfully resolved by Mahila Pragati Sansthan.",
    video:
      "/assets/uploads/whatsapp_video_2026-03-29_at_5.55.48_pm-019d3a79-ed46-77bd-9ba3-e6174a815a3e-1.mp4",
    tag: "Case Solved",
  },
  {
    id: 2,
    title: "Video 2",
    description: "A case successfully resolved by Mahila Pragati Sansthan.",
    video:
      "/assets/uploads/whatsapp_video_2026-03-29_at_5.55.46_pm-019d3a79-efce-73a0-9ab5-026289fd4fd6-2.mp4",
    tag: "Case Solved",
  },
  {
    id: 3,
    title: "Video 3",
    description: "A case successfully resolved by Mahila Pragati Sansthan.",
    video:
      "/assets/uploads/whatsapp_video_2026-03-29_at_5.55.48_pm_1-019d3a79-f22e-74ef-bd54-2f2e3e362c98-3.mp4",
    tag: "Case Solved",
  },
  {
    id: 4,
    title: "Video 4",
    description: "A case successfully resolved by Mahila Pragati Sansthan.",
    video:
      "/assets/uploads/whatsapp_video_2026-03-29_at_5.55.42_pm-019d3a79-f3b5-7746-85ef-bcd0a5d9d504-4.mp4",
    tag: "Case Solved",
  },
  {
    id: 5,
    title: "Video 5",
    description: "A case successfully resolved by Mahila Pragati Sansthan.",
    video:
      "/assets/uploads/whatsapp_video_2026-03-29_at_5.55.49_pm_1_1-019d3a7b-a792-753d-ac0d-eb72f91ed32e-5.mp4",
    tag: "Case Solved",
  },
];

export default function CasesSolvedPage() {
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
            <span className="inline-block text-4xl mb-4">⚖️</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Cases Solved
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Real stories of women and families helped by Mahila Pragati
              Sansthan. Every case represents a life changed through courage,
              support, and justice.
            </p>
          </motion.div>
        </section>

        {/* Stats Banner */}
        <section className="bg-primary py-8">
          <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-6 text-center text-white">
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm opacity-80 mt-1">Cases Resolved</div>
            </div>
            <div>
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-sm opacity-80 mt-1">Lives Impacted</div>
            </div>
            <div>
              <div className="text-3xl font-bold">10+</div>
              <div className="text-sm opacity-80 mt-1">Years of Service</div>
            </div>
          </div>
        </section>

        {/* Video Gallery */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {caseVideos.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border"
              >
                <div className="relative">
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <video
                    src={item.video}
                    controls
                    className="w-full aspect-video object-cover"
                  >
                    <track kind="captions" />
                  </video>
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-pink-50 to-rose-50 py-12 px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">
            Need Help or Want to Share a Story?
          </h2>
          <p className="text-foreground/60 mb-6 max-w-md mx-auto">
            If you or someone you know has been helped by us, or if you need
            support, please reach out.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/#help"
              className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              Get Help
            </a>
            <a
              href="/#contact"
              className="px-6 py-3 rounded-full border border-primary text-primary font-semibold hover:bg-pink-50 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
