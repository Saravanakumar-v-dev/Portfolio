import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight, FaExternalLinkAlt, FaGithub, FaSearch, FaTimes } from "react-icons/fa";

const categories = [
  { label: "All", key: "all" },
  { label: "Full-Stack", key: "fullstack" },
  { label: "Frontend", key: "frontend" },
  { label: "Machine Learning", key: "ml" },
];

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
              <button
                key={category.key}
                type="button"
                onClick={() => setFilter(category.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-slate-950"
                    : "border border-white/10 bg-white/5 text-theme-primary hover:bg-white/10"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            whileHover={{ y: -8, rotateX: 3 }}
            className="group card-panel flex h-full flex-col overflow-hidden p-0"
          >
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                loading="lazy"
                className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute left-5 top-5 chip bg-slate-950/55">{project.categoryLabel ?? project.category}</div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div>
                <h3 className="text-2xl font-semibold text-theme-primary">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-theme-muted">{project.description}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                {project.demo && project.demo !== "#" ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="cta-primary flex-1 justify-center rounded-2xl px-4 py-3"
                  >
                    Live Preview
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => openProjectDetails(project)}
                    className="cta-primary flex-1 justify-center rounded-2xl px-4 py-3"
                  >
                    View Details
                    <FaArrowRight className="text-xs" />
                  </button>
                )}

                {project.github && project.github !== "#" ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-theme-primary transition hover:bg-white/10"
                    aria-label={`View ${project.title} source code`}
                  >
                    <FaGithub />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => openProjectDetails(project)}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-theme-primary transition hover:bg-white/10"
                    aria-label={`Open ${project.title} details`}
                  >
                    <FaArrowRight />
                  </button>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="card-panel text-center">
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
        </div>
      )}

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 p-3 backdrop-blur-md sm:items-center sm:p-4"
            onClick={closeProjectDetails}
          >
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              className="glass-panel relative w-full max-w-3xl overflow-hidden rounded-[28px] max-h-[88vh] sm:rounded-[32px]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeProjectDetails}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/75 text-theme-primary sm:right-5 sm:top-5 sm:h-11 sm:w-11"
                aria-label="Close project details"
              >
                <FaTimes />
              </button>

              <img
                src={selectedProject.image}
                alt={`${selectedProject.title} preview`}
                className="h-48 w-full object-cover sm:h-72"
              />

              <div className="max-h-[calc(88vh-12rem)] overflow-y-auto p-5 sm:max-h-[calc(88vh-18rem)] sm:p-8">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">Project spotlight</p>
                <h3 id="project-dialog-title" className="mt-4 text-2xl font-semibold text-theme-primary sm:text-3xl">
                  {selectedProject.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-theme-secondary sm:text-base sm:leading-8">{selectedProject.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedProject.tech.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {selectedProject.demo && selectedProject.demo !== "#" && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="cta-primary w-full sm:w-auto"
                    >
                      Open Live Demo
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  )}
                  {selectedProject.github && selectedProject.github !== "#" && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="cta-secondary w-full sm:w-auto"
                    >
                      <FaGithub />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
