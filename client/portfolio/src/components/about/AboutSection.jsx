import React from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeRight, stagger, scaleUp } from "../ui/animations";
import { FaReact, FaNode, FaServer } from "react-icons/fa";
import { SiMongodb, SiJavascript, SiTailwindcss } from "react-icons/si";

const techStack = [
  { icon: FaReact, name: "React", color: "#61DAFB", delay: 0 },
  { icon: FaNode, name: "Node.js", color: "#3C873A", delay: 0.1 },
  { icon: SiMongodb, name: "MongoDB", color: "#4DB33D", delay: 0.2 },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E", delay: 0.3 },
  { icon: FaServer, name: "Express.js", color: "#888", delay: 0.4 },
  { icon: SiTailwindcss, name: "Tailwind", color: "#38BDF8", delay: 0.5 },
];

export default function AboutSection() {
  return (
    <section id="about" className="my-28 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-500/5 via-purple-500/5 to-transparent dark:from-indigo-900/10 dark:via-purple-900/10" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 border border-indigo-500/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-60 h-60 border border-purple-500/10 rounded-full"
        />
      </div>

      {/* Floating Icons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.2, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute top-10 left-10 hidden lg:block text-indigo-400 text-6xl"
      >
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaReact />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.2, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute bottom-16 right-16 hidden lg:block text-purple-400 text-5xl"
      >
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <SiJavascript />
        </motion.div>
      </motion.div>

      {/* Section Heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="section-heading">About Me</h2>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Text */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.p
            variants={fadeUp}
            className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"
          >
            I'm a{" "}
            <span className="font-semibold gradient-text">
              Full Stack MERN Developer
            </span>{" "}
            passionate about building seamless digital experiences with clean
            design and smooth animations.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"
          >
            My primary focus is crafting modern UIs in React, writing efficient
            backend logic in Node.js, and designing scalable MongoDB databases —
            bringing ideas to life through code.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"
          >
            I love working on projects that involve animations, responsive
            layouts, interactivity, and meaningful user flows. Every project I
            build is an opportunity to learn something new.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"
          >
            Outside coding, I explore UI/UX design, watch tech content, and
            contribute to GitHub projects to stay updated with modern trends.
          </motion.p>
        </motion.div>

        {/* Right Glass Card - Tech Stack */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-sm opacity-50" />

          <div className="relative p-8 lg:p-10 rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/20 dark:border-gray-700/50 shadow-xl">
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              Tech I Work With
            </h3>

            <div className="grid grid-cols-3 gap-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: tech.delay, duration: 0.4 }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    boxShadow: `0 10px 30px -10px ${tech.color}40`
                  }}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 2 + index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <tech.icon
                      className="text-4xl lg:text-5xl"
                      style={{ color: tech.color }}
                    />
                  </motion.div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Decorative element */}
            <div className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl opacity-20 blur-xl" />
            <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-20 blur-xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
