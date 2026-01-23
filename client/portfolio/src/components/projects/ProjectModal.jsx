import React from "react";
import { motion } from "framer-motion";
import Carousel from "../ui/Carousel";

export default function ProjectModal({ project, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative z-10 w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{project.title}</h2>
              <p className="mt-3 text-gray-700 dark:text-gray-200">{project.description}</p>

              <div className="mt-4 flex gap-3">
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" className="px-4 py-2 border rounded">
                    View Code
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="px-4 py-2 bg-indigo-600 text-white rounded">
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            <div className="w-80">
              <Carousel images={project.images || []} />
            </div>
          </div>

          <div className="mt-6 text-right">
            <button className="px-4 py-2 rounded border" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
