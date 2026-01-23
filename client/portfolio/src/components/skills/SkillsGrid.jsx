import React from "react";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaPython,
  FaJava
} from "react-icons/fa";

import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiVite,
  SiPostman,
} from "react-icons/si";

import { VscCode } from "react-icons/vsc";

const iconMap = {
  HTML: { icon: FaHtml5, color: "#E44D26" },
  CSS: { icon: FaCss3Alt, color: "#1572B6" },
  JavaScript: { icon: FaJs, color: "#F7DF1E" },
  React: { icon: FaReact, color: "#61DAFB" },
  "Node.js": { icon: FaNodeJs, color: "#3C873A" },
  Express: { icon: SiExpress, color: "#888888" },
  MongoDB: { icon: SiMongodb, color: "#4DB33D" },
  Git: { icon: FaGitAlt, color: "#F34F29" },
  Tailwind: { icon: SiTailwindcss, color: "#38BDF8" },
  Vite: { icon: SiVite, color: "#646CFF" },
  Postman: { icon: SiPostman, color: "#FF6C37" },
  Python: { icon: FaPython, color: "#3776AB" },
  Java: { icon: FaJava, color: "#D73A31" },
  VSCode: { icon: VscCode, color: "#007ACC" },
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  },
};

export default function SkillsGrid({ groups }) {
  return (
    <div className="w-full space-y-16">
      {groups.map((group, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          {/* Category Title */}
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {group.title}
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/50 to-transparent" />
          </div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          >
            {group.skills.map((skill, index) => {
              const skillData = iconMap[skill.name];
              const IconComponent = skillData?.icon;
              const iconColor = skillData?.color || "#6366f1";

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                  }}
                  className="group relative"
                >
                  {/* Glow effect on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                    style={{ backgroundColor: `${iconColor}30` }}
                  />

                  {/* Card */}
                  <div className="relative p-5 md:p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center gap-4 cursor-pointer overflow-hidden">
                    {/* Gradient border on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ padding: '1px' }}>
                      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-2xl" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl"
                        style={{ color: iconColor }}
                      >
                        {IconComponent && <IconComponent />}
                      </motion.div>

                      {/* Text */}
                      <span className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200">
                        {skill.name}
                      </span>

                      {/* Animated underline */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "60%" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="h-1 rounded-full"
                        style={{ backgroundColor: iconColor }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
