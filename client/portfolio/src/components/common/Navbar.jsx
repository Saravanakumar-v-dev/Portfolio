import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const { scrollY } = useScroll();

  // Track scroll position for navbar styling
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Track active section
  useEffect(() => {
    const sections = ["hero", "about", "services", "skills", "projects", "contact"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
    setDarkMode(!darkMode);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setOpen(false);
  };

  const menuItems = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
          ? "py-3 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-lg border-b border-gray-200/50 dark:border-gray-700/50"
          : "py-5 backdrop-blur-md bg-white/40 dark:bg-gray-900/40 border-b border-transparent"
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* BRAND */}
        <motion.h1
          whileHover={{ scale: 1.02 }}
          className="text-xl md:text-2xl font-bold tracking-wide cursor-pointer"
        >
          <span className="gradient-text">Saravanakumar</span>
          <span className="text-gray-700 dark:text-gray-300">.V</span>
        </motion.h1>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeSection === item.id
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
            >
              {item.label}

              {/* Active indicator */}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}

          {/* DARK MODE TOGGLE */}
          <motion.button
            onClick={toggleDarkMode}
            whileTap={{ rotate: 360, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="ml-4 p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-2xl relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {darkMode ? (
                <motion.div
                  key="sun"
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaSun className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaMoon className="text-indigo-500 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="lg:hidden p-2 text-2xl text-gray-800 dark:text-gray-200"
          onClick={() => setOpen(true)}
        >
          <FaBars />
        </motion.button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-72 h-full bg-white dark:bg-gray-900 shadow-2xl p-8 flex flex-col z-50 lg:hidden"
            >
              {/* Close Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(false)}
                className="self-end p-2 text-3xl text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <FaTimes />
              </motion.button>

              {/* Menu Items */}
              <div className="flex flex-col gap-2 mt-8">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-4 py-3 rounded-xl text-lg font-semibold transition-all ${activeSection === item.id
                        ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                        : "text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              {/* Mobile Dark Mode Toggle */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={toggleDarkMode}
                whileTap={{ scale: 0.9 }}
                className="mt-8 flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-lg font-medium"
              >
                {darkMode ? (
                  <>
                    <FaSun className="text-yellow-400 text-xl" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <FaMoon className="text-indigo-500 text-xl" />
                    <span>Dark Mode</span>
                  </>
                )}
              </motion.button>

              {/* Footer */}
              <div className="mt-auto pt-8 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  © 2024 Saravanakumar
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
