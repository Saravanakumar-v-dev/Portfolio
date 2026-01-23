import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaPaperPlane, FaMapMarkerAlt } from "react-icons/fa";
import SuccessModal from "../ui/SucessModal";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await axios.post("http://localhost:8000/api/contact", formData);
      setStatus("success");
      setShowSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "Saravanakumarvsamy@gmail.com",
      href: "mailto:Saravanakumarvsamy@gmail.com",
      color: "#6366f1"
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "+91 9042057168",
      href: "tel:+919042057168",
      color: "#10b981"
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Coimbatore, India",
      color: "#f59e0b"
    }
  ];

  const socialLinks = [
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/saravanakumar-v-78912026a",
      color: "#0077b5",
      label: "LinkedIn"
    },
    {
      icon: FaGithub,
      href: "https://github.com/Saravanakumar-v-dev",
      color: "#333",
      label: "GitHub"
    }
  ];

  return (
    <section id="contact" className="my-28 relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="section-heading">Get In Touch</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Side - Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Have a project in mind or want to collaborate? Feel free to reach out.
            I'm always open to discussing new projects, creative ideas, or opportunities
            to be part of your vision.
          </p>

          {/* Contact Cards */}
          <div className="space-y-4">
            {contactInfo.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.01 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all group cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <IconComponent
                      className="text-xl"
                      style={{ color: item.color }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="pt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Connect with me</p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                  >
                    <IconComponent
                      className="text-xl text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-sm opacity-30" />

          <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 space-y-6 shadow-xl">
            {/* Name Field */}
            <div className="relative">
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                placeholder=" "
                className="peer w-full px-4 pt-6 pb-2 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-900 dark:text-gray-100 transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-900"
              />
              <label
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${formData.name || focusedField === 'name'
                  ? 'top-2 text-xs text-indigo-600 dark:text-indigo-400'
                  : 'top-4 text-base text-gray-500'
                  }`}
              >
                Full Name
              </label>
            </div>

            {/* Email Field */}
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder=" "
                className="peer w-full px-4 pt-6 pb-2 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-900 dark:text-gray-100 transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-900"
              />
              <label
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${formData.email || focusedField === 'email'
                  ? 'top-2 text-xs text-indigo-600 dark:text-indigo-400'
                  : 'top-4 text-base text-gray-500'
                  }`}
              >
                Email Address
              </label>
            </div>

            {/* Message Field */}
            <div className="relative">
              <textarea
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                placeholder=" "
                className="peer w-full px-4 pt-6 pb-2 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-900 dark:text-gray-100 transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-900 resize-none"
              />
              <label
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${formData.message || focusedField === 'message'
                  ? 'top-2 text-xs text-indigo-600 dark:text-indigo-400'
                  : 'top-4 text-base text-gray-500'
                  }`}
              >
                Your Message
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-size-200 bg-pos-0 hover:bg-pos-100"
              style={{
                backgroundSize: '200% 100%',
                backgroundPosition: loading ? '100% 0' : '0 0',
                transition: 'background-position 0.5s ease, transform 0.2s ease'
              }}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send Message
                </>
              )}
            </motion.button>

            {/* Status Messages */}
            <AnimatePresence>
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-green-600 dark:text-green-400 text-sm text-center flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Message sent successfully!
                </motion.p>
              )}

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-600 dark:text-red-400 text-sm text-center"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>

      <SuccessModal show={showSuccess} onClose={() => setShowSuccess(false)} />
    </section>
  );
}

