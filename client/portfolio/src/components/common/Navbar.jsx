import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import useTheme from "../../hooks/useTheme";
import { FORCE_RENDER_EVENT } from "./DeferredSection";

const navItems = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Journey", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 24;
      setScrolled((currentScrolled) => (currentScrolled === nextScrolled ? currentScrolled : nextScrolled));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.6],
      }
    );

    // Observe existing elements
    const observeAll = () => {
      navItems.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });
    };

    observeAll();

    // Re-observe when deferred sections render (using MutationObserver)
    const mutationObs = new MutationObserver(() => {
      observeAll();
    });
    mutationObs.observe(document.body, { childList: true, subtree: true });

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      mutationObs.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const scrollToSection = useCallback((id) => {
    setActiveSection(id);
    setOpen(false);

    const tryScroll = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      // Force-render all deferred sections, then retry
      window.dispatchEvent(new Event(FORCE_RENDER_EVENT));

      // Retry after a short delay to allow React to render
      setTimeout(() => {
        const retryElement = document.getElementById(id);
        if (retryElement) {
          retryElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    };

    tryScroll();
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <nav
        className={`section-shell rounded-full border px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled
            ? "glass-panel shadow-[0_24px_80px_rgba(2,6,23,0.32)] border-white/[0.06]"
            : "border-white/10 bg-white/5 backdrop-blur-md"
        }`}
        aria-label="Primary"
      >
        <div className="flex items-center justify-between gap-4">
          <motion.button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 text-left"
            aria-label="Scroll to home section"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-theme-primary"
              whileHover={{
                background: "linear-gradient(135deg, rgba(124,156,255,0.3), rgba(45,212,191,0.3))",
                boxShadow: "0 0 20px rgba(124,156,255,0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              SV
            </motion.span>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold text-theme-primary">Saravanakumar V</span>
              <span className="block text-xs text-theme-muted">Frontend Engineer</span>
            </span>
          </motion.button>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive ? "nav-pill-active" : "nav-pill hover:bg-white/8"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      style={{ borderRadius: 999 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-theme-primary transition hover:bg-white/10"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={isDark ? "sun" : "moon"}
                  initial={{ scale: 0, rotate: -90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0, rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {isDark ? <FaSun className="text-amber-300" /> : <FaMoon />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition lg:inline-flex"
              whileHover={{
                y: -2,
                boxShadow: "0 12px 32px rgba(124,156,255,0.35)",
                background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              Hire Me
            </motion.button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-theme-primary lg:hidden"
              aria-label="Open navigation menu"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-4 top-4 z-50 w-[min(88vw,22rem)] rounded-[32px] border border-white/10 bg-slate-950/95 p-6 backdrop-blur-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-theme-primary">Navigation</p>
                  <p className="text-sm text-theme-muted">Explore the portfolio</p>
                </div>
                <motion.button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-200"
                  aria-label="Close navigation menu"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </motion.button>
              </div>

              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.07,
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    }}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-base font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-white text-slate-950 shadow-lg shadow-white/10"
                        : "bg-white/5 text-theme-primary hover:bg-white/10 hover:translate-x-1"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{item.label}</span>
                    <span className="text-sm text-theme-muted">0{index + 1}</span>
                  </motion.button>
                ))}
              </div>

              <motion.button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="mt-6 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-3 font-semibold text-slate-950"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.03, boxShadow: "0 12px 32px rgba(56,189,248,0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                Start a Conversation
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
