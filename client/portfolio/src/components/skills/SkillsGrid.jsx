import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaCss3Alt,
  FaGitAlt,
  FaHtml5,
  FaJava,
  FaJs,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import { SiExpress, SiMongodb, SiPostman, SiTailwindcss, SiVite } from "react-icons/si";

const iconMap = {
  HTML: { icon: FaHtml5, color: "#f97316" },
  CSS: { icon: FaCss3Alt, color: "#38bdf8" },
  JavaScript: { icon: FaJs, color: "#facc15" },
  React: { icon: FaReact, color: "#67e8f9" },
  "Node.js": { icon: FaNodeJs, color: "#4ade80" },
  Express: { icon: SiExpress, color: "#cbd5e1" },
  MongoDB: { icon: SiMongodb, color: "#22c55e" },
  Git: { icon: FaGitAlt, color: "#fb7185" },
  Tailwind: { icon: SiTailwindcss, color: "#22d3ee" },
  Vite: { icon: SiVite, color: "#a78bfa" },
  Postman: { icon: SiPostman, color: "#fb923c" },
  Python: { icon: FaPython, color: "#60a5fa" },
  Java: { icon: FaJava, color: "#f87171" },
  VSCode: { icon: VscCode, color: "#60a5fa" },
};

function SkillBar({ level, color, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          boxShadow: `0 0 8px ${color}44`,
        }}
        initial={{ width: "0%" }}
        animate={isInView ? { width: `${level}%` } : { width: "0%" }}
        transition={{
          duration: 1.2,
          delay: delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const skillItemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function SkillsGrid({ groups }) {
  return (
    <motion.div
      className="grid gap-6 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {groups.map((group, groupIndex) => (
        <motion.article
          key={group.title}
          variants={cardVariants}
          className="card-panel px-4 py-5 sm:p-6 md:p-7 gradient-border-hover"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300/80">Skill group</p>
              <h3 className="mt-3 text-xl font-semibold text-theme-primary sm:text-2xl">{group.title}</h3>
            </div>
          </div>

          <motion.div
            className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
            variants={containerVariants}
          >
            {group.skills.map((skill, skillIndex) => {
              const skillMeta = iconMap[skill.name];
              const Icon = skillMeta?.icon;
              return (
                <motion.div
                  key={skill.name}
                  variants={skillItemVariants}
                  whileHover={{
                    y: -4,
                    scale: 1.03,
                    borderColor: `${skillMeta?.color ?? "#7c9cff"}44`,
                    boxShadow: `0 8px 24px ${skillMeta?.color ?? "#7c9cff"}15`,
                  }}
                  className="flex min-w-0 flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 sm:px-4 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${skillMeta?.color ?? "#7c9cff"}22` }}
                      whileHover={{
                        scale: 1.2,
                        rotate: 12,
                        boxShadow: `0 0 16px ${skillMeta?.color ?? "#7c9cff"}44`,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      {Icon ? <Icon style={{ color: skillMeta.color }} /> : null}
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-theme-primary">{skill.name}</p>
                        <span className="text-xs font-medium text-theme-muted">{skill.level}%</span>
                      </div>
                      <SkillBar
                        level={skill.level}
                        color={skillMeta?.color ?? "#7c9cff"}
                        delay={groupIndex * 0.15 + skillIndex * 0.08}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.article>
      ))}
    </motion.div>
  );
}
