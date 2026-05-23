import React from "react";
import { motion } from "framer-motion";
import { FaArrowUp, FaGithub, FaLinkedin } from "react-icons/fa";

const links = [
  { label: "GitHub", href: "https://github.com/Saravanakumar-v-dev", icon: FaGithub, color: "rgba(148,163,184,0.3)" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/saravanakumar-v-78912026a", icon: FaLinkedin, color: "rgba(56,189,248,0.3)" },
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Footer() {
  return (
    <motion.footer
      className="section-shell relative z-10 pb-10 pt-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div
        className="glass-panel rounded-[32px] px-6 py-8"
        variants={itemVariants}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.div variants={itemVariants}>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">Portfolio</p>
            <h2 className="mt-3 text-2xl font-semibold text-theme-primary">Saravanakumar V</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-theme-muted">
              Frontend-focused developer building polished, responsive, and interactive web
              experiences with React, Tailwind CSS, and Framer Motion.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            variants={itemVariants}
          >
            {links.map((item) => {
              const Icon = item.icon;

              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-secondary"
                  whileHover={{
                    scale: 1.06,
                    y: -3,
                    boxShadow: `0 12px 28px ${item.color}`,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    whileHover={{ rotate: 12, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon />
                  </motion.span>
                  {item.label}
                </motion.a>
              );
            })}

            <motion.button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-theme-primary overflow-hidden"
              aria-label="Scroll to top"
              whileHover={{
                scale: 1.1,
                borderColor: "rgba(124,156,255,0.4)",
                boxShadow: "0 8px 24px rgba(124,156,255,0.2)",
              }}
              whileTap={{ scale: 0.9, y: -4 }}
            >
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaArrowUp />
              </motion.span>
              {/* Trail effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-theme-muted sm:flex-row sm:items-center sm:justify-between"
          variants={itemVariants}
        >
          <p>Copyright {new Date().getFullYear()} Saravanakumar V. Built with React, Tailwind CSS, and Framer Motion.</p>
          <p>Optimized for performance, accessibility, and recruiter readability.</p>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
}
