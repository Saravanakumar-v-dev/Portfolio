import React from "react";
import { motion } from "framer-motion";

export default function ProjectCard({ project, onOpen = () => {} }) {
  return (
    <motion.article
      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg cursor-pointer"
      whileHover={{ y: -6, scale: 1.01 }}
      onClick={onOpen}
    >
      <div className="h-40 w-full overflow-hidden rounded-md mb-3 bg-gray-100 dark:bg-gray-700">
        {project.images && project.images[0] ? (
          <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
        )}
      </div>

      <h3 className="font-semibold">{project.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{project.short}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {project.tech?.map((t) => (
          <span key={t} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
