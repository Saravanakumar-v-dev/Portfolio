import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import useTheme from "../../hooks/useTheme";

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
      setScrolled(window.scrollY > 24);
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

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
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

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <nav
        className={`section-shell rounded-full border px-4 py-3 transition duration-300 sm:px-6 ${
          scrolled ? "glass-panel shadow-[0_24px_80px_rgba(2,6,23,0.32)]" : "border-white/10 bg-white/5 backdrop-blur-md"
        }`}
        aria-label="Primary"
      >
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 text-left"
            aria-label="Scroll to home section"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-theme-primary">
              SV
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold text-theme-primary">Saravanakumar V</span>
              <span className="block text-xs text-theme-muted">Frontend Engineer</span>
            </span>
          </button>

          <div className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive ? "nav-pill-active" : "nav-pill hover:bg-white/8"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <motion.span
                    layoutId="active-nav-pill"
                    className={`absolute inset-0 rounded-full ${isActive ? "bg-white/10" : "bg-transparent"}`}
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-theme-primary transition hover:bg-white/10"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <FaSun className="text-amber-300" /> : <FaMoon />}
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100 lg:inline-flex"
            >
              Hire Me
            </button>

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
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="fixed right-4 top-4 z-50 w-[min(88vw,22rem)] rounded-[32px] border border-white/10 bg-slate-950/95 p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-theme-primary">Navigation</p>
                  <p className="text-sm text-theme-muted">Explore the portfolio</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-200"
                  aria-label="Close navigation menu"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-base font-medium transition ${
                      activeSection === item.id
                        ? "bg-white text-slate-950"
                        : "bg-white/5 text-theme-primary hover:bg-white/10"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-sm text-theme-muted">0{index + 1}</span>
                  </motion.button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="mt-6 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-3 font-semibold text-slate-950"
              >
                Start a Conversation
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
