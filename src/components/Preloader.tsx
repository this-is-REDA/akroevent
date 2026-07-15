"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 35 + Math.random() * 25;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            document.body.style.overflow = "";
          }, 120);
          return 100;
        }
        return next;
      });
    }, 50);

    const failsafe = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setDone(true);
      document.body.style.overflow = "";
    }, 600);

    return () => {
      clearInterval(interval);
      clearTimeout(failsafe);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-brand-dark"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative font-display text-5xl uppercase tracking-widest text-white sm:text-7xl"
          >
            Akro<span className="text-brand-red"> Event</span>
          </motion.p>

          <div className="relative mt-8 h-px w-40 overflow-hidden bg-white/10 sm:w-52">
            <motion.div
              className="h-full bg-brand-red"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
