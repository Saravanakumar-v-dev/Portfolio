import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform translate-y-[-1px]">
        <svg
          className="relative block w-full h-16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-gray-100 dark:fill-gray-800"
          />
        </svg>
      </div>

      {/* Footer Content */}
      <div className="bg-gray-100 dark:bg-gray-800 pt-20 pb-8">
        <div className="container mx-auto px-6">
          {/* Main Footer Content */}
          <div className="flex flex-col items-center text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold">
                <span className="gradient-text">Saravanakumar</span>
                <span className="text-gray-700 dark:text-gray-300">.V</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Full Stack Developer crafting modern web experiences with passion and precision.
              </p>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-8" />

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left flex items-center gap-1"
            >
              © {new Date().getFullYear()} Saravanakumar. Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FaHeart className="text-red-500 mx-1" />
              </motion.span>
              using React, Tailwind & Framer Motion
            </motion.p>

            {/* Scroll to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all group"
              aria-label="Scroll to top"
            >
              <FaArrowUp className="text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
