import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(theme === "light" ? "dark" : "light");

  return (
    <button
      onClick={toggleTheme}
      className="
        w-12 h-12 rounded-full flex items-center justify-center 
        bg-white/20 dark:bg-gray-700/40 backdrop-blur-md border border-white/30 
        transition-all shadow-md hover:shadow-xl hover:scale-110
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        {/* LIGHT MODE → Show Moon */}
        {theme === "light" ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.3 }}
            className="text-indigo-500 text-2xl"
          >
            <i className="fa-solid fa-moon"></i>
          </motion.div>
        ) : (
          /* DARK MODE → Show Sun */
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="text-yellow-400 text-2xl"
          >
            <i className="fa-solid fa-sun"></i>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
