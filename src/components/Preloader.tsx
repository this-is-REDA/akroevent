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
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            document.body.style.overflow = "";
          }, 400);
          return 100;
        }
        return p + Math.random() * 18 + 8;
      });
    }, 80);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-brand-dark"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,25,44,0.15)_0%,transparent_60%)]" />
          <div className="grid-premium absolute inset-0 opacity-20" aria-hidden="true" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative font-display text-6xl uppercase tracking-widest text-white sm:text-8xl"
          >
            Akro<span className="text-gradient-fire"> Event</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative mt-3 text-[10px] uppercase tracking-[0.4em] text-luxury-muted"
          >
            Événementiel · Maroc
          </motion.p>

          <div className="relative mt-12 h-px w-48 overflow-hidden bg-white/10 sm:w-64">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-red via-brand-gold to-brand-red"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          <p className="relative mt-4 font-display text-2xl tabular-nums text-brand-red">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
