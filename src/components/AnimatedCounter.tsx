"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  goldPrefix?: boolean;
  display3d?: boolean;
  innovative3d?: boolean;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  decimals = 0,
  goldPrefix = false,
  display3d = false,
  innovative3d = false,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * value);
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  const display =
    decimals > 0
      ? count.toFixed(decimals)
      : Math.floor(count).toLocaleString("fr-FR");

  const valueClass = innovative3d
    ? "stat-number-innovative"
    : display3d
      ? "heading-display-3d"
      : "text-brand-ink";

  const prefixClass = innovative3d
    ? "stat-prefix-innovative"
    : goldPrefix
      ? "text-brand-gold"
      : "text-brand-ink/80";

  const suffixClass = innovative3d
    ? "stat-number-innovative"
    : display3d
      ? "heading-display-3d"
      : "text-brand-ink/70";

  return (
    <span ref={ref} className="inline-flex items-baseline justify-center gap-1 [transform-style:preserve-3d]">
      {prefix && (
        <span className={`text-[0.55em] font-normal leading-none ${prefixClass}`}>
          {prefix}
        </span>
      )}
      <span className={valueClass}>{display}</span>
      {suffix && (
        <span className={`text-[0.45em] font-normal leading-none ${suffixClass}`}>
          {suffix}
        </span>
      )}
    </span>
  );
}
