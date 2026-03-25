import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/common/Navbar";
import DeferredSection from "../components/common/DeferredSection";
import Hero from "../components/home/Hero";
import { projects as projectData } from "../data/sampleProjects";
import useScrollToTop from "../hooks/useScrollToTop";

const AboutSection = lazy(() => import("../components/about/AboutSection"));
const Footer = lazy(() => import("../components/common/Footer"));
const ContactForm = lazy(() => import("../components/contact/ContactForm"));
const ProjectList = lazy(() => import("../components/projects/ProjectList"));
const SkillsGrid = lazy(() => import("../components/skills/SkillsGrid"));
const ServicesSection = lazy(() => import("../services/ServicesSection"));

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

function SectionPlaceholder({ height = 220 }) {
  return <div className="w-full rounded-[28px] bg-white/5" style={{ minHeight: height }} />;
}

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

        <DeferredSection minHeight={420}>
          <Suspense fallback={<SectionPlaceholder height={420} />}>
            <AboutSection />
          </Suspense>
        </DeferredSection>

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

          <DeferredSection minHeight={440} className="mt-12">
            <Suspense fallback={<SectionPlaceholder height={440} />}>
              <SkillsGrid
                groups={[
                  {
                    title: "Frontend",
                    skills: [
                      { name: "HTML", level: 92 },
                      { name: "CSS", level: 90 },
                      { name: "JavaScript", level: 88 },
                      { name: "React", level: 89 },
                      { name: "Tailwind", level: 91 },
                    ],
                  },
                  {
                    title: "Backend",
                    skills: [
                      { name: "Node.js", level: 79 },
                      { name: "Express", level: 76 },
                      { name: "MongoDB", level: 80 },
                    ],
                  },
                  {
                    title: "Tools & Languages",
                    skills: [
                      { name: "Git", level: 84 },
                      { name: "Vite", level: 82 },
                      { name: "Postman", level: 78 },
                      { name: "VSCode", level: 90 },
                      { name: "Python", level: 74 },
                      { name: "Java", level: 72 },
                    ],
                  },
                ]}
              />
            </Suspense>
          </DeferredSection>
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

          <DeferredSection minHeight={560} className="mt-12">
            <Suspense fallback={<SectionPlaceholder height={560} />}>
              <ProjectList projects={projectData} />
            </Suspense>
          </DeferredSection>
        </section>

        <DeferredSection minHeight={360}>
          <Suspense fallback={<SectionPlaceholder height={360} />}>
            <ServicesSection />
          </Suspense>
        </DeferredSection>

        <DeferredSection minHeight={420}>
          <Suspense fallback={<SectionPlaceholder height={420} />}>
            <ContactForm />
          </Suspense>
        </DeferredSection>
      </main>

      <DeferredSection minHeight={220}>
        <Suspense fallback={<SectionPlaceholder height={220} />}>
          <Footer />
        </Suspense>
      </DeferredSection>
    </>
  );
}
