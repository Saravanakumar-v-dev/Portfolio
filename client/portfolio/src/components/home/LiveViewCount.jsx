import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaEye } from "react-icons/fa";
import { incrementViewCount, getViewCount } from "../../services/api";

const SESSION_KEY = "portfolio_view_counted";

/**
 * Animated count-up that mirrors the Hero's CountUp pattern.
 */
function AnimatedCount({ target, duration = 1.8 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || target === 0) return;

    let current = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplay(target);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
    </span>
  );
}

export default function LiveViewCount() {
  const [count, setCount] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchCount = async () => {
      try {
        const alreadyCounted = sessionStorage.getItem(SESSION_KEY);

        if (alreadyCounted) {
          // Already counted this session — just read the count
          const { data } = await getViewCount();
          if (!cancelled) setCount(data.count);
        } else {
          // First visit this session — increment
          const { data } = await incrementViewCount();
          if (!cancelled) {
            setCount(data.count);
            sessionStorage.setItem(SESSION_KEY, "1");
          }
        }
      } catch (err) {
        console.warn("View count unavailable:", err.message);
        if (!cancelled) setError(true);
      }
    };

    fetchCount();

    return () => {
      cancelled = true;
    };
  }, []);

  // Hide gracefully if the backend is unreachable
  if (error || count === null) return null;

  return (
    <motion.div
      className="card-panel rounded-[24px] p-5 gradient-border-hover relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      {/* Subtle animated glow behind the count */}
      <motion.div
        className="absolute -right-4 -top-4 h-16 w-16 rounded-full blur-2xl"
        style={{ background: "rgba(52, 211, 153, 0.15)" }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2">
          <p className="text-2xl font-semibold text-theme-primary">
            <AnimatedCount target={count} />
          </p>

          {/* Live pulse dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5">
          <FaEye className="text-xs text-theme-muted" />
          <p className="text-sm text-theme-muted">Portfolio Views</p>
        </div>
      </div>
    </motion.div>
  );
}
