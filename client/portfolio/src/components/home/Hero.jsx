import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import profilePic from "../../assets/Saravans.jpeg";
import resumeFile from "../../assets/New_resume.pdf";

const roles = ["Frontend Engineer", "MERN Stack Developer", "UI-Focused Problem Solver"];

const stats = [
  { value: "2025", label: "B.Tech graduate" },
  { value: "3", label: "Featured builds" },
  { value: "100%", label: "Responsive-first" },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = window.setTimeout(() => {
      if (isDeleting) {
        if (displayText.length > 0) {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((current) => (current + 1) % roles.length);
        }
      } else if (displayText.length < currentRole.length) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      } else {
        window.setTimeout(() => setIsDeleting(true), 1200);
      }
    }, isDeleting ? 45 : 85);

    return () => window.clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="section-shell relative z-10 grid items-center gap-12 pt-28 lg:grid-cols-[1.15fr_0.85fr] lg:pt-36">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Open to frontend and full-stack roles
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="space-y-5"
        >
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300/80">Portfolio</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] text-theme-primary sm:text-6xl lg:text-7xl">
            Designing polished digital products with
            <span className="gradient-text"> modern motion, clarity, and craft.</span>
          </h1>
          <div className="h-8 text-lg text-theme-secondary sm:text-xl">
            <span>{displayText}</span>
            <span className="ml-1 inline-block text-cyan-300">|</span>
          </div>
          <p className="max-w-2xl text-base leading-8 text-theme-secondary sm:text-lg">
            I build modern websites and full-stack products with clean UI, smooth motion, and
            responsive user experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex flex-wrap gap-4"
        >
          <button
            type="button"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="cta-primary"
          >
            Explore Projects
            <FaArrowRight />
          </button>

          <button
            type="button"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="cta-secondary"
          >
            Contact Me
          </button>

          <a href={resumeFile} download="Saravanakumar-Resume.pdf" className="cta-secondary">
            <FaDownload />
            Download Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="flex flex-wrap items-center gap-3"
        >
          <a
            href="https://github.com/Saravanakumar-v-dev"
            target="_blank"
            rel="noreferrer"
            className="chip transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            <FaGithub />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/saravanakumar-v-78912026a"
            target="_blank"
            rel="noreferrer"
            className="chip transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            <FaLinkedin />
            LinkedIn
          </a>
          <span className="chip">Based in Bangalore, India</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="card-panel rounded-[24px] p-5">
              <p className="text-2xl font-semibold text-theme-primary">{stat.value}</p>
              <p className="mt-2 text-sm text-theme-muted">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.12 }}
        className="relative mx-auto w-full max-w-[30rem]"
      >
        <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-emerald-400/10 blur-3xl" />

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="glass-panel relative overflow-hidden rounded-[32px] p-6"
        >
          <motion.div
            animate={{ opacity: [0.3, 0.75, 0.3], scale: [1, 1.06, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-12 top-8 h-28 w-28 rounded-full bg-cyan-300/20 blur-3xl"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.55, 0.2], scale: [1.05, 0.95, 1.05] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-10 bottom-8 h-24 w-24 rounded-full bg-blue-400/20 blur-3xl"
          />
          <div className="absolute inset-x-6 top-6 flex items-center justify-between">
            <div className="chip bg-white/10">Frontend first</div>
            <div className="chip bg-white/10">React + Tailwind</div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-4 pt-20">
            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-slate-900">
              <img
                src={profilePic}
                alt="Portrait of Saravanakumar"
                className="h-[25rem] w-full object-cover object-top"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="464"
                height="400"
              />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-theme-muted">Core strength</p>
                <p className="mt-2 text-lg font-semibold text-theme-primary">UI systems with smooth UX</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-theme-muted">Focus areas</p>
                <p className="mt-2 text-lg font-semibold text-theme-primary">React, APIs, animations</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
