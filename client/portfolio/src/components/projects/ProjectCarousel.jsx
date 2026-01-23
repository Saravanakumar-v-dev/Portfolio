import React from "react";
import { motion } from "framer-motion";

export default function ProjectsCarousel({ projects }) {
  return (
    <div className="overflow-x-auto whitespace-nowrap py-6 scrollbar-hide">
      <div className="flex gap-8">
        {projects.slice(0, 3).map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.05 }}
            className="min-w-[320px] rounded-2xl p-[2px] bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20">
              <img
                src={project.image}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h3 className="text-white font-bold mb-2">{project.title}</h3>
              <p className="text-gray-300 text-sm">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
