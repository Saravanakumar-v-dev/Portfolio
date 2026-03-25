import React from "react";
import { motion } from "framer-motion";
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
        <span className="eyebrow">Journey</span>
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
          transition={{ duration: 0.55 }}
          className="card-panel"
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
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => jumpToSection(item.target)}
                className="chip w-full justify-between rounded-2xl px-4 py-3 text-left transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                <span>{item.label}</span>
                <FaArrowRight className="text-[10px]" />
              </button>
            ))}
          </div>
        </motion.aside>

        <div className="relative space-y-6 pl-6 before:absolute before:left-2 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gradient-to-b before:from-blue-400/70 before:via-cyan-300/60 before:to-transparent">
          {timeline.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="card-panel relative"
            >
              <span className="absolute -left-[1.95rem] top-8 h-4 w-4 rounded-full border-4 border-slate-950 bg-cyan-300 shadow-[0_0_0_6px_rgba(34,211,238,0.12)]" />
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">{item.period}</p>
              <h3 className="mt-3 text-2xl font-semibold text-theme-primary">{item.title}</h3>
              <p className="mt-2 text-sm font-medium text-theme-secondary">{item.subtitle}</p>
              <p className="mt-4 text-sm leading-7 text-theme-muted">{item.details}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
