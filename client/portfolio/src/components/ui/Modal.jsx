import React from "react";
import { motion } from "framer-motion";

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay">
      <div className="absolute inset-0" onClick={onClose}></div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="modal-content w-full max-w-2xl relative"
      >
        {children}

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl font-bold"
        >
          ×
        </button>
      </motion.div>
    </div>
  );
}
