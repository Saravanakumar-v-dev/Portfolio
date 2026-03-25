import React from "react";
import { motion } from "framer-motion";
import { FaArrowUp, FaGithub, FaLinkedin } from "react-icons/fa";

const links = [
  { label: "GitHub", href: "https://github.com/Saravanakumar-v-dev", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/saravanakumar-v-78912026a", icon: FaLinkedin },
];

export default function Footer() {
  return (
    <footer className="section-shell relative z-10 pb-10 pt-6">
      <div className="glass-panel rounded-[32px] px-6 py-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">Portfolio</p>
            <h2 className="mt-3 text-2xl font-semibold text-theme-primary">Saravanakumar V</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-theme-muted">
              Frontend-focused developer building polished, responsive, and interactive web
              experiences with React, Tailwind CSS, and Framer Motion.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {links.map((item) => {
              const Icon = item.icon;

              return (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="cta-secondary">
                  <Icon />
                  {item.label}
                </a>
              );
            })}

            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-theme-primary"
              aria-label="Scroll to top"
            >
              <FaArrowUp />
            </motion.button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-theme-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} Saravanakumar V. Built with React, Tailwind CSS, and Framer Motion.</p>
          <p>Optimized for performance, accessibility, and recruiter readability.</p>
        </div>
      </div>
    </footer>
  );
}
