import React from "react";
import { motion } from "framer-motion";
import { FaCodeBranch, FaLaptopCode } from "react-icons/fa";
import { FiZap } from "react-icons/fi";

const highlightCards = [
  {
    icon: FaLaptopCode,
    title: "Product-minded frontend work",
    copy: "Clean architecture, clear user flows, and interfaces that recruiters can scan quickly.",
  },
  {
    icon: FiZap,
    title: "Motion with restraint",
    copy: "Framer Motion interactions that feel premium without slowing the experience down.",
  },
  {
    icon: FaCodeBranch,
    title: "Full-stack execution",
    copy: "Comfortable shipping React clients, Node APIs, and polished deployment-ready builds.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-shell section-block">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.5 }}
      >
        <span className="eyebrow">About</span>
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
          transition={{ duration: 0.55 }}
          className="card-panel"
        >
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">
            What I bring
          </p>
          <div className="mt-6 space-y-5 text-base leading-8 text-theme-secondary">
            <p>
              I enjoy building interfaces that are visually refined but still practical for real
              users: faster scanning, better hierarchy, and clearer calls to action.
            </p>
            <p>
              My recent work centers on React, Tailwind CSS, Framer Motion, Node.js, Express, and
              MongoDB, with a strong interest in portfolio sites, dashboards, and interactive
              product surfaces.
            </p>
            <p>
              When I design, I optimize for trust. That means clean typography, stable spacing,
              accessible contrast, and enough motion to create delight without creating friction.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-6">
          {highlightCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="card-panel transition duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                    <Icon className="text-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-theme-primary">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-theme-muted">{card.copy}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
