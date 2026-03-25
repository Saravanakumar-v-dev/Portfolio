import React from "react";
import { motion } from "framer-motion";
import AboutSection from "../components/about/AboutSection";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import ContactForm from "../components/contact/ContactForm";
import Hero from "../components/home/Hero";
import ProjectList from "../components/projects/ProjectList";
import SkillsGrid from "../components/skills/SkillsGrid";
import { projects as projectData } from "../data/sampleProjects";
import useScrollToTop from "../hooks/useScrollToTop";
import ServicesSection from "../services/ServicesSection";

const stackMarquee = [
  "React",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "MongoDB",
  "Responsive UI",
  "Portfolio Design",
  "API Integration",
];

export default function Home() {
  useScrollToTop();

  return (
    <>
      <Navbar />

      <main className="page-shell pb-8">
        <section id="hero">
          <Hero />
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.45 }}
          className="section-shell mt-16 overflow-hidden rounded-full border border-white/10 bg-white/5 py-4"
          aria-label="Technology marquee"
        >
          <div className="flex min-w-max gap-3 px-4 text-sm text-theme-secondary animate-marquee">
            {[...stackMarquee, ...stackMarquee].map((item, index) => (
              <span key={`${item}-${index}`} className="chip whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
        </motion.section>

        <AboutSection />

        <section id="skills" className="section-shell section-block">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">Skills</span>
            <h2 className="section-title mt-6">A balanced stack across modern frontend craft, backend delivery, and developer tooling.</h2>
            <p className="section-copy">
              The emphasis is strongest on building polished React experiences, but I can support
              the full path from interface to API.
            </p>
          </motion.div>

          <div className="mt-12">
            <SkillsGrid
              groups={[
                {
                  title: "Frontend",
                  skills: [{ name: "HTML" }, { name: "CSS" }, { name: "JavaScript" }, { name: "React" }, { name: "Tailwind" }],
                },
                {
                  title: "Backend",
                  skills: [{ name: "Node.js" }, { name: "Express" }, { name: "MongoDB" }],
                },
                {
                  title: "Tools & Languages",
                  skills: [{ name: "Git" }, { name: "Vite" }, { name: "Postman" }, { name: "VSCode" }, { name: "Python" }, { name: "Java" }],
                },
              ]}
            />
          </div>
        </section>

        <section id="projects" className="section-shell section-block">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">Projects</span>
            <h2 className="section-title mt-6">Interactive case studies that show implementation skill and visual polish.</h2>
            <p className="section-copy">
              Each project card is designed to surface the tech stack, intent, and next action
              quickly for hiring teams.
            </p>
          </motion.div>

          <div className="mt-12">
            <ProjectList projects={projectData} />
          </div>
        </section>

        <ServicesSection />

        <ContactForm />
      </main>

      <Footer />
    </>
  );
}
