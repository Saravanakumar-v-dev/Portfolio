import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight, FaExternalLinkAlt, FaGithub, FaSearch, FaTimes } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

const categories = [
  { label: "All", key: "all" },
  { label: "Full-Stack", key: "fullstack" },
  { label: "Frontend", key: "frontend" },
  { label: "Machine Learning", key: "ml" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.3 },
  },
};

export default function ProjectList({ projects = [] }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalFromHistory, setModalFromHistory] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = filter === "all" || project.category === filter;
      const searchValue = search.trim().toLowerCase();

      if (!searchValue) {
        return matchesCategory;
      }

      const techMatches = project.tech.some((item) => item.toLowerCase().includes(searchValue));
      return matchesCategory && (project.title.toLowerCase().includes(searchValue) || techMatches);
    });
  }, [filter, projects, search]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state?.projectModalId) {
        const matchingProject = projects.find((project) => project.id === event.state.projectModalId);
        setSelectedProject(matchingProject ?? null);
        setModalFromHistory(Boolean(matchingProject));
      } else {
        setSelectedProject(null);
        setModalFromHistory(false);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [projects]);

  useEffect(() => {
    if (!selectedProject) {
      document.body.style.overflow = "";
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeProjectDetails();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  const openProjectDetails = (project) => {
    window.history.pushState({ projectModalId: project.id }, "", `#project-${project.id}`);
    setModalFromHistory(true);
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    if (modalFromHistory) {
      setModalFromHistory(false);
      window.history.back();
      return;
    }

    setSelectedProject(null);
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <label className="relative block">
          <FaSearch className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-theme-muted" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by project name or tech stack"
            className="input-shell pl-12"
            aria-label="Search projects"
          />
        </label>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const isActive = filter === category.key;

            return (
              <motion.button
                key={category.key}
                type="button"
                onClick={() => setFilter(category.key)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-slate-950"
                    : "border border-white/10 bg-white/5 text-theme-primary hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                layout
              >
                {isActive && (
                  <motion.span
                    layoutId="active-filter-pill"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{ borderRadius: 999 }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <motion.div className="grid gap-5 md:gap-6 lg:grid-cols-3" layout>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className="group h-full"
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable={true}
                glareMaxOpacity={0.08}
                glareColor="rgba(124,156,255,0.2)"
                glareBorderRadius="28px"
                transitionSpeed={1200}
                scale={1.02}
                className="h-full"
              >
                <div className="card-panel flex h-full flex-col overflow-hidden p-0 gradient-border-hover">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={`${project.title} preview`}
                      loading="lazy"
                      className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    {/* Animated color overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <motion.div
                      className="absolute left-3 top-3 chip bg-slate-950/55 sm:left-5 sm:top-5"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {project.categoryLabel ?? project.category}
                    </motion.div>
                  </div>

                  <div className="flex flex-1 flex-col p-4 sm:p-6">
                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-theme-primary sm:text-2xl">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-theme-muted sm:leading-7">{project.description}</p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="chip"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: techIndex * 0.05 + 0.2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      {project.demo && project.demo !== "#" ? (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="cta-primary flex-1 justify-center rounded-2xl px-4 py-3"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Live Preview
                          <FaExternalLinkAlt className="text-xs" />
                        </motion.a>
                      ) : (
                        <motion.button
                          type="button"
                          onClick={() => openProjectDetails(project)}
                          className="cta-primary flex-1 justify-center rounded-2xl px-4 py-3"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          View Details
                          <FaArrowRight className="text-xs" />
                        </motion.button>
                      )}

                      {project.github && project.github !== "#" ? (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-theme-primary transition hover:bg-white/10"
                          aria-label={`View ${project.title} source code`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaGithub />
                        </motion.a>
                      ) : (
                        <motion.button
                          type="button"
                          onClick={() => openProjectDetails(project)}
                          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-theme-primary transition hover:bg-white/10"
                          aria-label={`Open ${project.title} details`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaArrowRight />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div
          className="card-panel text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-lg font-medium text-theme-primary">No projects matched that filter.</p>
          <p className="mt-3 text-sm text-theme-muted">Try a broader tech search or switch back to all categories.</p>
          <button
            type="button"
            onClick={() => {
              setFilter("all");
              setSearch("");
            }}
            className="mt-5 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-theme-primary"
          >
            Reset filters
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 p-3 backdrop-blur-md sm:items-center sm:p-4"
            onClick={closeProjectDetails}
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.92, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              className="glass-panel relative w-full max-w-3xl overflow-hidden rounded-[28px] max-h-[88vh] sm:rounded-[32px]"
              onClick={(event) => event.stopPropagation()}
            >
              <motion.button
                type="button"
                onClick={closeProjectDetails}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/75 text-theme-primary sm:right-5 sm:top-5 sm:h-11 sm:w-11"
                aria-label="Close project details"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>

              <div className="relative overflow-hidden">
                <motion.img
                  src={selectedProject.image}
                  alt={`${selectedProject.title} preview`}
                  className="h-48 w-full object-cover sm:h-72"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              </div>

              <div className="max-h-[calc(88vh-12rem)] overflow-y-auto p-5 sm:max-h-[calc(88vh-18rem)] sm:p-8">
                <motion.p
                  className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Project spotlight
                </motion.p>
                <motion.h3
                  id="project-dialog-title"
                  className="mt-4 pr-10 text-2xl font-semibold leading-tight text-theme-primary sm:text-3xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  {selectedProject.title}
                </motion.h3>
                <motion.p
                  className="mt-4 text-sm leading-7 text-theme-secondary sm:text-base sm:leading-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedProject.description}
                </motion.p>

                <motion.div
                  className="mt-6 flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  {selectedProject.tech.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {selectedProject.demo && selectedProject.demo !== "#" && (
                    <motion.a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="cta-primary w-full sm:w-auto"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Open Live Demo
                      <FaExternalLinkAlt className="text-xs" />
                    </motion.a>
                  )}
                  {selectedProject.github && selectedProject.github !== "#" && (
                    <motion.a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="cta-secondary w-full sm:w-auto"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <FaGithub />
                      Source Code
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
