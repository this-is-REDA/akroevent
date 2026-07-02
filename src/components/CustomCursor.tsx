"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 350, damping: 22 });
  const springY = useSpring(cursorY, { stiffness: 350, damping: 22 });
  const trailX = useSpring(cursorX, { stiffness: 80, damping: 30 });
  const trailY = useSpring(cursorY, { stiffness: 80, damping: 30 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("a, button, [role='button'], input, select, textarea, label")
      );
    };

    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{ x: trailX, y: trailY }}
        animate={{ opacity: visible ? 0.35 : 0 }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-red/30"
          style={{
            width: 80,
            height: 80,
            boxShadow: "0 0 40px rgba(232, 25, 44, 0.15)",
          }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: springX, y: springY }}
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-red/70"
          animate={{
            width: hovering ? 56 : 32,
            height: hovering ? 56 : 32,
          }}
          transition={{ duration: 0.2 }}
          style={{ boxShadow: "0 0 24px rgba(232, 25, 44, 0.4)" }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{ x: springX, y: springY }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0.4 : 1 }}
      >
        <div
          className="h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red"
          style={{ boxShadow: "0 0 16px rgba(232, 25, 44, 1)" }}
        />
      </motion.div>
    </>
  );
}
