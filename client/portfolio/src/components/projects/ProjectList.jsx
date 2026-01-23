import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaSearch } from "react-icons/fa";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
};

export default function ProjectList({ projects = [] }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { label: "All", key: "all" },
    { label: "Full-Stack", key: "fullstack" },
    { label: "Frontend", key: "frontend" },
    { label: "UI/Animation", key: "ui" },
    { label: "Machine Learning", key: "ml" },
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = filter === "all" || p.category === filter;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mb-8"
      >
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Search projects (e.g., React, MongoDB, Node)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-lg"
        />
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="flex gap-3 mb-10 flex-wrap"
      >
        {categories.map(({ label, key }) => (
          <motion.button
            key={key}
            onClick={() => setFilter(key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${filter === key
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500"
              }`}
          >
            {label}
          </motion.button>
        ))}
      </motion.div>

      {/* Project Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              layout
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Tilt
                glareEnable={true}
                glareColor="white"
                glareMaxOpacity={0.15}
                scale={1.02}
                className="rounded-2xl cursor-pointer h-full"
                onClick={() => setSelectedProject(project)}
              >
                <div className="group relative h-full rounded-2xl overflow-hidden">
                  {/* Gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ padding: '2px' }}>
                    <div className="w-full h-full bg-gray-900 rounded-2xl" />
                  </div>

                  {/* Card content */}
                  <div className="relative h-full rounded-2xl bg-white/10 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-4 flex flex-col">
                    {/* Image */}
                    <div className="relative rounded-xl overflow-hidden mb-4">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/20 transition-colors duration-300 z-20 flex items-center justify-center">
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          View Details
                        </motion.span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:gradient-text transition-all duration-300">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2 flex-grow">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tech.slice(0, 4).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 text-xs rounded-lg text-indigo-600 dark:text-indigo-400 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-lg text-gray-500 font-medium">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Results */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No projects match your search/filter.
          </p>
          <button
            onClick={() => { setFilter("all"); setSearch(""); }}
            className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            Clear filters
          </button>
        </motion.div>
      )}

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10"
              >
                <FaTimes className="text-xl" />
              </button>

              {/* Image */}
              <div className="relative">
                <img
                  src={selectedProject.image}
                  className="w-full h-64 object-cover rounded-t-3xl"
                  alt={selectedProject.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 -mt-16 relative">
                <h2 className="text-3xl font-bold mb-4 gradient-text">
                  {selectedProject.title}
                </h2>

                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-900 dark:bg-gray-800 text-white font-semibold hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FaGithub className="text-xl" />
                    View Code
                  </motion.a>
                  <motion.a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow"
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
