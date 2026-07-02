"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "div";
}

export default function SplitText({
  text,
  className = "",
  delay = 0,
  as: Tag = "span",
}: SplitTextProps) {
  const chars = text.split("");

  return (
    <Tag className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 100, rotateX: -90, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
          transition={{
            delay: delay + i * 0.04,
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block origin-bottom"
          style={{ perspective: 600 }}
          aria-hidden={char !== " "}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}
