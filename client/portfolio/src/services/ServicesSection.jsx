import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaLaptopCode, FaPaintBrush, FaTools, FaTimes } from "react-icons/fa";

const services = [
  {
    title: "Web Development",
    description:
      "Fully responsive, SEO-friendly modern websites built using MERN stack and industry best practices.",
    fullDescription:
      "I build complete web applications from scratch using the MERN stack (MongoDB, Express.js, React, Node.js). Every project follows industry best practices including responsive design, SEO optimization, performance tuning, and clean code architecture. From simple landing pages to complex web applications, I deliver solutions that are scalable, maintainable, and user-friendly.",
    icon: FaLaptopCode,
    color: "#6366f1",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    title: "Frontend Engineering",
    description:
      "Beautiful UI interfaces built with React, Tailwind, Framer Motion and component-based architecture.",
    fullDescription:
      "Creating stunning, interactive user interfaces is my specialty. I use React for building reusable components, Tailwind CSS for rapid styling, and Framer Motion for smooth animations. Every interface I build is pixel-perfect, accessible, and optimized for performance across all devices and browsers.",
    icon: FaPaintBrush,
    color: "#a855f7",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Backend & API",
    description:
      "REST APIs, authentication, database modeling, and secure backend logic using Node.js & Express.",
    fullDescription:
      "I develop robust backend systems with Node.js and Express.js, implementing RESTful APIs, JWT authentication, role-based access control, and secure data handling. My database expertise includes MongoDB schema design, indexing, and optimization. Security best practices are always a priority in every backend solution I create.",
    icon: FaCode,
    color: "#3b82f6",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Tools & Deployment",
    description:
      "Git, GitHub, CI/CD workflow, Vercel/Netlify deployment, Postman testing & version control.",
    fullDescription:
      "I'm proficient with modern development tools and workflows. This includes Git for version control, GitHub for collaboration, CI/CD pipelines for automated testing and deployment, and cloud platforms like Vercel and Netlify. I also use Postman for API testing and documentation, ensuring every project is well-organized and deployment-ready.",
    icon: FaTools,
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-500",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
};

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="my-28 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      </div>

      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="section-heading">What I Offer</h2>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        {services.map((service, idx) => {
          const IconComponent = service.icon;

          return (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                y: -10,
              }}
              className="group relative"
            >
              {/* Animated gradient border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm`} />

              {/* Card */}
              <div className="relative h-full p-6 lg:p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden">
                {/* Background glow */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ backgroundColor: service.color }}
                />

                {/* Icon container */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.6 }}
                  className="relative mb-6"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${service.color}15`,
                    }}
                  >
                    <IconComponent
                      className="text-3xl transition-transform duration-300"
                      style={{ color: service.color }}
                    />
                  </div>

                  {/* Animated ring */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className="absolute inset-0 rounded-xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ borderColor: service.color }}
                  />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-grow">
                  {service.description}
                </p>

                {/* Learn more button */}
                <motion.button
                  onClick={() => setSelectedService(service)}
                  whileHover={{ x: 5 }}
                  className="mt-6 flex items-center gap-2 text-sm font-medium transition-all duration-300"
                  style={{ color: service.color }}
                >
                  <span>Learn more</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-white dark:bg-gray-900 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient */}
              <div
                className={`p-6 bg-gradient-to-r ${selectedService.gradient}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <selectedService.icon className="text-2xl text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {selectedService.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedService.fullDescription}
                </p>

                <motion.button
                  onClick={() => setSelectedService(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${selectedService.color} 0%, ${selectedService.color}cc 100%)`
                  }}
                >
                  Got it!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
