import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Layout
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

// Data
import { projects as projectData } from "../data/sampleProjects";

// Sections
import Hero from "../components/home/Hero";
import AboutSection from "../components/about/AboutSection";
import ServicesSection from "../services/ServicesSection";
import SkillsGrid from "../components/skills/SkillsGrid";
import ProjectList from "../components/projects/ProjectList";
import ContactForm from "../components/contact/ContactForm";

// Hooks
import useScrollToTop from "../hooks/useScrollToTop";

// Icons
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function Home() {
  useScrollToTop();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(projectData);
  }, []);

  const socialLinks = [
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/saravanakumar-v-78912026a",
      color: "#0077b5",
      label: "LinkedIn"
    },
    {
      icon: FaGithub,
      href: "https://github.com/saravana0070",
      color: "#333",
      label: "GitHub"
    },
    {
      icon: FaEnvelope,
      href: "mailto:saravanakumarvsamy@gmail.com",
      color: "#ea4335",
      label: "Email"
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/unknown_vsk7/",
      color: "#e1306c",
      label: "Instagram"
    }
  ];

  return (
    <>
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-10">
        {/* HERO SECTION */}
        <section id="hero" className="pt-24 md:pt-28">
          <Hero />
        </section>

        {/* ABOUT SECTION */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <AboutSection />
        </motion.div>

        {/* SERVICES SECTION */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <ServicesSection />
        </motion.div>

        {/* EDUCATION SECTION */}
        <motion.section
          id="education"
          className="my-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <h2 className="section-heading">Education</h2>

          <div className="relative mt-12">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />

            {/* Education Item */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative pl-12 md:pl-20"
            >
              {/* Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="absolute left-2 md:left-6 top-2 w-5 h-5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg shadow-indigo-500/50"
              >
                <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full" />
              </motion.div>

              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.01, x: 5 }}
                className="bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 max-w-2xl"
              >
                {/* Date Badge */}
                <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-semibold mb-4">
                  2022 – 2025
                </span>

                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  B.Tech Information Technology
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Government College of Technology, Coimbatore
                </p>

                {/* Skills learned */}
                <div className="flex flex-wrap gap-2">
                  {["DBMS", "Data Structures", "OS", "Networks", "MERN Stack"].map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* SKILLS SECTION */}
        <motion.section
          id="skills"
          className="my-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <h2 className="section-heading">Skills & Expertise</h2>

          <div className="mt-12">
            <SkillsGrid
              groups={[
                {
                  title: "Frontend",
                  skills: [
                    { name: "HTML" },
                    { name: "CSS" },
                    { name: "JavaScript" },
                    { name: "React" },
                    { name: "Tailwind" }
                  ],
                },
                {
                  title: "Backend",
                  skills: [
                    { name: "Node.js" },
                    { name: "Express" },
                    { name: "MongoDB" }
                  ],
                },
                {
                  title: "Tools & Languages",
                  skills: [
                    { name: "Git" },
                    { name: "Vite" },
                    { name: "Postman" },
                    { name: "VSCode" },
                    { name: "Python" },
                    { name: "Java" }
                  ],
                },
              ]}
            />
          </div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <motion.section
          id="projects"
          className="my-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <h2 className="section-heading">Featured Projects</h2>
          <div className="mt-12">
            <ProjectList projects={projects} />
          </div>
        </motion.section>

        {/* CONTACT SECTION */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <ContactForm />
        </motion.div>

        {/* CONNECT SECTION */}
        <motion.section
          id="socials"
          className="my-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="relative text-center py-16 px-8 rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20" />
            <div className="absolute inset-0 backdrop-blur-3xl" />

            {/* Content */}
            <div className="relative z-10">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Let's <span className="gradient-text">Connect</span>
              </motion.h2>

              <motion.p
                className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Follow me on social media to stay updated with my latest work and projects.
              </motion.p>

              <motion.div
                className="flex justify-center gap-4 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative w-14 h-14 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-lg hover:shadow-xl transition-all overflow-hidden"
                      aria-label={social.label}
                    >
                      {/* Hover background */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ backgroundColor: `${social.color}15` }}
                      />

                      <IconComponent
                        className="text-2xl transition-colors relative z-10"
                        style={{ color: social.color }}
                      />
                    </motion.a>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </>
  );
}
