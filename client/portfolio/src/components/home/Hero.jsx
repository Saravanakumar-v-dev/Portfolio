import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeLeft, fadeRight, stagger } from "../ui/animations";
import profilePic from "../../assets/Sarava.jpg";

// Typewriter text options
const roles = [
  "MERN Stack Developer",
  "Frontend Engineer",
  "Full Stack Developer"
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 py-16 lg:py-24 overflow-hidden"
    >
      {/* ANIMATED BACKGROUND MESH */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20" />

        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 -left-20 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* LEFT SIDE CONTENT */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="lg:w-1/2 space-y-6 text-center lg:text-left z-10"
      >
        {/* Greeting Badge */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Available for opportunities
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
        >
          Hi, I'm
          <br />
          <span className="gradient-text-animated">Saravanakumar</span>
        </motion.h1>

        {/* Typewriter Subtitle */}
        <motion.div variants={fadeUp} className="h-8">
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-medium">
            {displayText}
            <span className="animate-blink text-indigo-600 dark:text-indigo-400 ml-1">|</span>
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-xl leading-relaxed mx-auto lg:mx-0"
        >
          Crafting modern, animated, and responsive web experiences with cutting-edge technologies and pixel-perfect attention to detail.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start"
        >
          <motion.a
            href="#projects"
            className="btn-primary group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-2">
              View Projects
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.a>

          <motion.a
            href="#contact"
            className="btn-outline"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Me
          </motion.a>

          <motion.a
            href="/resume.pdf"
            download
            className="px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-glow-purple hover:-translate-y-1 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)"
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* RIGHT SIDE - FUTURISTIC PROFILE */}
      <motion.div
        variants={fadeRight}
        initial="hidden"
        animate="show"
        className="relative flex items-center justify-center lg:w-1/2"
      >
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: `hsl(${220 + Math.random() * 60}, 80%, 60%)`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 3,
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Glowing Pulse Ring */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-3xl"
        />

        {/* Rotating Neon Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-full"
          style={{
            border: "2px solid transparent",
            background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(168,85,247,0.3)) padding-box, linear-gradient(135deg, #6366f1, #a855f7) border-box"
          }}
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full border border-purple-500/40"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-40 h-40 sm:w-48 sm:h-48 lg:w-60 lg:h-60 rounded-full border border-pink-500/30 border-dashed"
        />

        {/* Floating Accent Dots */}
        <motion.div
          animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 left-16 w-4 h-4 bg-indigo-500 rounded-full shadow-glow-md"
        />
        <motion.div
          animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 right-16 w-3 h-3 bg-purple-500 rounded-full shadow-glow-purple"
        />
        <motion.div
          animate={{ y: [-5, 15, -5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-8 w-3 h-3 bg-pink-500 rounded-full shadow-glow-pink"
        />

        {/* Profile Image with Gradient Border */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="relative p-1 rounded-full z-10"
          style={{
            background: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)"
          }}
        >
          <div className="p-1 bg-white dark:bg-gray-900 rounded-full">
            <img
              src={profilePic}
              alt="Saravanakumar"
              className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 object-cover rounded-full shadow-2xl"
            />
          </div>

          {/* Status Badge */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -bottom-2 -right-2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white text-xs font-semibold shadow-lg"
          >
            ✓ Open to Work
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
