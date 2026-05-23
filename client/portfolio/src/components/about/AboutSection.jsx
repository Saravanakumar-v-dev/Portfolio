import React from "react";
import { motion } from "framer-motion";
import { FaCodeBranch, FaLaptopCode } from "react-icons/fa";
import { FiZap } from "react-icons/fi";

const highlightCards = [
  {
    icon: FaLaptopCode,
    title: "Product-minded frontend work",
    copy: "Clean architecture, clear user flows, and interfaces that recruiters can scan quickly.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconGlow: "rgba(56,189,248,0.3)",
  },
  {
    icon: FiZap,
    title: "Motion with restraint",
    copy: "Framer Motion interactions that feel premium without slowing the experience down.",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconGlow: "rgba(251,191,36,0.3)",
  },
  {
    icon: FaCodeBranch,
    title: "Full-stack execution",
    copy: "Comfortable shipping React clients, Node APIs, and polished deployment-ready builds.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconGlow: "rgba(52,211,153,0.3)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AboutSection() {
  return (
    <section id="about" className="section-shell section-block">
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
          About
        </motion.span>
        <h2 className="section-title mt-6">A frontend engineer who treats design quality like engineering work.</h2>
        <p className="section-copy">
          My portfolio work combines modern React implementation with visual systems that feel
          intentional, readable, and conversion-focused. I care about structure, accessibility,
          and making every interaction feel considered.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="card-panel gradient-border-hover"
        >
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">
            What I bring
          </p>
          <div className="mt-6 space-y-5 text-base leading-8 text-theme-secondary">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              I enjoy building interfaces that are visually refined but still practical for real
              users: faster scanning, better hierarchy, and clearer calls to action.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              My recent work centers on React, Tailwind CSS, Framer Motion, Node.js, Express, and
              MongoDB, with a strong interest in portfolio sites, dashboards, and interactive
              product surfaces.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              When I design, I optimize for trust. That means clean typography, stable spacing,
              accessible contrast, and enough motion to create delight without creating friction.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="grid gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {highlightCards.map((card) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                variants={cardVariants}
                className="card-panel transition-all duration-400 gradient-border-hover group"
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} text-cyan-300`}
                    whileHover={{
                      scale: 1.15,
                      rotate: 8,
                      boxShadow: `0 0 24px ${card.iconGlow}`,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Icon className="text-lg" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-theme-primary group-hover:gradient-text transition-all duration-300">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-theme-muted">{card.copy}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
