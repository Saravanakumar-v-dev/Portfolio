import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function SuccessModal({ show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22 }}
            className="glass-panel w-full max-w-md rounded-[32px] p-8 text-center"
          >
            <FaCheckCircle className="mx-auto text-5xl text-emerald-300" />
            <h3 className="mt-5 text-2xl font-semibold text-theme-primary">Message Sent</h3>
            <p className="mt-3 text-sm leading-7 text-theme-secondary">
              Thanks for reaching out. Your message is on its way, and I will respond as soon as possible.
            </p>

            <button type="button" onClick={onClose} className="cta-primary mt-6">
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
