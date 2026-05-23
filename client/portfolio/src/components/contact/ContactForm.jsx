import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPaperPlane, FaPhone } from "react-icons/fa";
import { sendMessage } from "../../services/api";
import SuccessModal from "../ui/SucessModal";

const emptyForm = {
  name: "",
  email: "",
  message: "",
};

const contactInfo = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: "saravanakumarvsamy@gmail.com",
    href: "mailto:saravanakumarvsamy@gmail.com",
    hoverColor: "rgba(56,189,248,0.15)",
  },
  {
    icon: FaPhone,
    label: "Phone",
    value: "+91 90420 57168",
    href: "tel:+919042057168",
    hoverColor: "rgba(52,211,153,0.15)",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Location",
    value: "Bangalore, India",
    href: null,
    hoverColor: "rgba(251,146,60,0.15)",
  },
];

const socialLinks = [
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/saravanakumar-v-78912026a",
    label: "LinkedIn",
    hoverColor: "rgba(56,189,248,0.2)",
  },
  {
    icon: FaGithub,
    href: "https://github.com/Saravanakumar-v-dev",
    label: "GitHub",
    hoverColor: "rgba(148,163,184,0.2)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ContactForm() {
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim().length >= 2 &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      formData.message.trim().length >= 12
    );
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid) {
      setStatus("error");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await sendMessage(formData);
      setStatus("success");
      setShowSuccess(true);
      setFormData(emptyForm);
    } catch (error) {
      console.error("Failed to submit contact form", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-shell section-block">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="eyebrow"
          whileInView={{ scale: [0.9, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Contact
        </motion.span>
        <h2 className="section-title mt-6">Make the next step easy for recruiters, founders, and collaborators.</h2>
        <p className="section-copy">
          Whether you are hiring for frontend roles, exploring freelance collaboration, or want to
          discuss a product idea, I would love to hear from you.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-5 xl:mt-12 xl:grid-cols-[0.9fr_1.1fr] xl:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="card-panel px-4 py-5 sm:p-6 md:p-7 gradient-border-hover"
        >
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">Best channels</p>
          <motion.div
            className="mt-6 space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactInfo.map((item) => {
              const Icon = item.icon;

              const content = (
                <motion.div
                  className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-3 py-3.5 transition-all duration-300 sm:gap-4 sm:rounded-[24px] sm:px-4 sm:py-4"
                  variants={itemVariants}
                  whileHover={{
                    backgroundColor: item.hoverColor,
                    borderColor: "rgba(124,156,255,0.2)",
                    x: 4,
                    boxShadow: "0 8px 24px rgba(124,156,255,0.08)",
                  }}
                >
                  <motion.div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 sm:h-12 sm:w-12"
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon />
                  </motion.div>
                  <div className="min-w-0">
                    <p className="text-sm text-theme-muted">{item.label}</p>
                    <p className="mt-1 break-words text-sm font-medium text-theme-primary sm:text-base">{item.value}</p>
                  </div>
                </motion.div>
              );

              if (item.href) {
                return (
                  <a key={item.label} href={item.href} className="block">
                    {content}
                  </a>
                );
              }

              return <div key={item.label}>{content}</div>;
            })}
          </motion.div>

          <motion.div
            className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-4 sm:rounded-[28px] sm:p-5"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">Working style</p>
            <p className="mt-4 text-sm leading-7 text-theme-secondary">
              I enjoy projects where design quality, responsiveness, and user trust matter as much
              as the code behind them.
            </p>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-secondary w-full justify-center"
                  whileHover={{
                    scale: 1.04,
                    y: -2,
                    boxShadow: `0 12px 28px ${item.hoverColor}`,
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Icon />
                  {item.label}
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="card-panel space-y-5 px-4 py-5 sm:p-6 md:p-7 gradient-border-hover"
          noValidate
        >
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-2 xl:grid-cols-2">
            <motion.label
              className="block"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="mb-2 block text-sm font-medium text-theme-secondary">Full name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-shell"
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </motion.label>

            <motion.label
              className="block"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <span className="mb-2 block text-sm font-medium text-theme-secondary">Email address</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-shell"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </motion.label>
          </div>

          <motion.label
            className="block"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="mb-2 block text-sm font-medium text-theme-secondary">Project or opportunity</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="input-shell min-h-[10rem] resize-y sm:min-h-[11rem]"
              placeholder="Tell me about the role, project scope, timeline, or what you want to build."
              required
            />
          </motion.label>

          <div className="flex flex-col gap-4">
            <div className="max-w-xl text-sm leading-6 text-theme-muted">
              Typical response topics: frontend roles, portfolio redesigns, MERN builds, and collaboration.
            </div>
            <motion.button
              type="submit"
              disabled={loading || !isFormValid}
              className="cta-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[12rem]"
              whileHover={!loading && isFormValid ? { scale: 1.03, y: -2 } : {}}
              whileTap={!loading && isFormValid ? { scale: 0.97 } : {}}
            >
              {loading ? (
                <motion.span
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.span
                    className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  Sending...
                </motion.span>
              ) : (
                <>
                  <motion.span
                    animate={{ x: [0, 2, 0], y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaPaperPlane />
                  </motion.span>
                  Send Message
                </>
              )}
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="flex items-center gap-2 rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  ✓
                </motion.span>
                Message sent successfully. I will get back to you soon.
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="flex items-center gap-2 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
              >
                <span>⚠</span>
                Please add a valid name, email, and a message with a bit more detail before sending.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>

      <SuccessModal show={showSuccess} onClose={() => setShowSuccess(false)} />
    </section>
  );
}
