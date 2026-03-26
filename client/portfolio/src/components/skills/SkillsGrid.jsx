import React from "react";
import { motion } from "framer-motion";
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

export default function SkillsGrid({ groups }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {groups.map((group, index) => (
        <motion.article
          key={group.title}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          className="card-panel px-4 py-5 sm:p-6 md:p-7"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300/80">Skill group</p>
              <h3 className="mt-3 text-xl font-semibold text-theme-primary sm:text-2xl">{group.title}</h3>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {group.skills.map((skill) => {
              const skillMeta = iconMap[skill.name];
              const Icon = skillMeta?.icon;
              return (
                <motion.div
                  key={skill.name}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex min-w-0 items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 sm:px-4"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${skillMeta?.color ?? "#7c9cff"}22` }}
                  >
                    {Icon ? <Icon style={{ color: skillMeta.color }} /> : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-theme-primary">{skill.name}</p>
                    </div>
                    <p className="mt-2 text-xs text-theme-muted">Production ready</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
