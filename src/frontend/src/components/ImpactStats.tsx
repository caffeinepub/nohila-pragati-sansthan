import { CheckCircle, Clock, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";
import { useGetStats } from "../hooks/useQueries";

function Counter({
  target,
  suffix = "+",
}: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const staticStats = [
  {
    icon: TrendingUp,
    label: "Survivors Supported",
    value: 500,
    suffix: "+",
    color: "text-white",
  },
  {
    icon: CheckCircle,
    label: "Cases Resolved",
    value: 200,
    suffix: "+",
    color: "text-white",
  },
  {
    icon: Users,
    label: "Active Volunteers",
    value: 50,
    suffix: "+",
    color: "text-white",
  },
  {
    icon: Clock,
    label: "Years of Service",
    value: 5,
    suffix: "+",
    color: "text-white",
  },
];

export default function ImpactStats() {
  const { ref, inView } = useInView();
  const { data: stats } = useGetStats();

  const displayStats = [
    {
      ...staticStats[0],
      value: stats ? Number(stats.totalHelpRequests) || 500 : 500,
    },
    { ...staticStats[1], value: 200 },
    {
      ...staticStats[2],
      value: stats ? Number(stats.volunteerCount) || 50 : 50,
    },
    { ...staticStats[3], value: 5 },
  ];

  return (
    <section id="impact" className="py-20 lg:py-24 bg-pink-gradient" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-white/80 mb-3 px-3 py-1 bg-white/20 rounded-full">
            Our Impact
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Numbers That Tell
            <span className="text-white/80"> Our Story</span>
          </h2>
          <p className="mt-3 text-white/80 max-w-lg mx-auto text-base">
            Every number represents a life touched, a family healed, and a
            future reclaimed.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5, type: "spring" }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30"
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="font-display text-4xl font-bold text-white">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/80 text-sm mt-1 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
