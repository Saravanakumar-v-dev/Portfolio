import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const timeline = [
  {
    period: "2020 - 2022",
    title: "Diploma in Automobile Engineering",
    subtitle: "Kongunadu Polytechnic College, Trichy",
    details:
      "Built the discipline and problem-solving habits that later shaped my move into software and product development.",
  },
  {
    period: "2022 - 2025",
    title: "B.Tech in Information Technology",
    subtitle: "Government College of Technology, Coimbatore",
    details:
      "Strengthened fundamentals in data structures, operating systems, networking, DBMS, and full-stack development.",
  },
  {
    period: "2025 - Present",
    title: "Independent frontend and MERN projects",
    subtitle: "Portfolio, dashboards, and product experiments",
    details:
      "Focused on responsive interfaces, smooth motion systems, API integration, and recruiter-ready product presentation.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Animated timeline line that draws on scroll
function AnimatedTimelineLine() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="absolute left-2 top-2 h-[calc(100%-1rem)] w-px">
      {/* Background faint line */}
      <div className="h-full w-full bg-gradient-to-b from-blue-400/20 via-cyan-300/15 to-transparent" />
      {/* Animated fill line */}
      <motion.div
        className="absolute inset-0 origin-top bg-gradient-to-b from-blue-400/70 via-cyan-300/60 to-teal-400/50"
        style={{ scaleY }}
      />
    </div>
  );
}

export default function ServicesSection() {
  const jumpToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="experience" className="section-shell section-block">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="eyebrow"
          whileInView={{ scale: [0.9, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Journey
        </motion.span>
        <h2 className="section-title mt-6">A timeline that shows growth from fundamentals to modern product execution.</h2>
        <p className="section-copy">
          This progression is what recruiters care about most: strong foundations, relevant stack
          experience, and visible momentum toward frontend product work.
        </p>
      </motion.div>

      <div className="mt-14 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
        <motion.aside
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="card-panel gradient-border-hover"
        >
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">
            Career direction
          </p>
          <h3 className="mt-4 text-2xl font-semibold text-theme-primary">Building toward high-impact frontend roles.</h3>
          <p className="mt-4 text-sm leading-7 text-theme-muted">
            My strongest fit is on teams that value thoughtful UI, scalable React structure, and a
            portfolio that proves craft, not just implementation.
          </p>
          <div className="mt-8 space-y-3">
            {[
              { label: "Design systems", target: "about" },
              { label: "Animated interfaces", target: "projects" },
              { label: "Responsive builds", target: "skills" },
              { label: "API-driven products", target: "contact" },
            ].map((item, index) => (
              <motion.button
                key={item.label}
                type="button"
                onClick={() => jumpToSection(item.target)}
                className="chip w-full justify-between rounded-2xl px-4 py-3 text-left transition"
                whileHover={{
                  x: 4,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "rgba(124,156,255,0.3)",
                  boxShadow: "0 4px 16px rgba(124,156,255,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <span>{item.label}</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  <FaArrowRight className="text-[10px]" />
                </motion.span>
              </motion.button>
            ))}
          </div>
        </motion.aside>

        <motion.div
          className="relative space-y-6 pl-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <AnimatedTimelineLine />

          {timeline.map((item, index) => (
            <motion.article
              key={item.title}
              variants={cardVariants}
              className="card-panel relative gradient-border-hover group"
              whileHover={{ y: -3, scale: 1.01 }}
            >
              {/* Pulsing timeline dot */}
              <motion.span
                className="absolute -left-[1.95rem] top-8 h-4 w-4 rounded-full border-4 border-slate-950 bg-cyan-300"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(34,211,238,0.4)",
                    "0 0 0 8px rgba(34,211,238,0)",
                    "0 0 0 0 rgba(34,211,238,0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              />
              <motion.p
                className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {item.period}
              </motion.p>
              <h3 className="mt-3 text-2xl font-semibold text-theme-primary">{item.title}</h3>
              <p className="mt-2 text-sm font-medium text-theme-secondary">{item.subtitle}</p>
              <p className="mt-4 text-sm leading-7 text-theme-muted">{item.details}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
