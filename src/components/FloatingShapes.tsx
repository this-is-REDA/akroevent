"use client";

import { motion } from "framer-motion";

const shapes = [
  { size: 80, top: "15%", left: "8%", delay: 0, duration: 8 },
  { size: 120, top: "60%", left: "85%", delay: 1, duration: 10 },
  { size: 60, top: "75%", left: "15%", delay: 2, duration: 7 },
  { size: 100, top: "25%", left: "75%", delay: 0.5, duration: 9 },
];

export default function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[6] overflow-hidden" aria-hidden="true">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute border border-brand-red/20"
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            left: s.left,
            boxShadow: "0 0 30px rgba(232, 25, 44, 0.1), inset 0 0 20px rgba(232, 25, 44, 0.05)",
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 90, 180, 270, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <motion.div
        className="absolute right-[10%] top-[40%] h-32 w-32 rounded-full border border-brand-gold/20"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{ boxShadow: "0 0 60px rgba(201, 168, 76, 0.15)" }}
      />
    </div>
  );
}
