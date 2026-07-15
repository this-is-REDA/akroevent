"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Preloader from "./Preloader";
import ScrollProgress from "./ScrollProgress";

const MouseSpotlight = dynamic(() => import("./MouseSpotlight"), { ssr: false });
const NoiseOverlay = dynamic(() => import("./NoiseOverlay"), { ssr: false });
const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });

export default function SiteExtras() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [showExtras, setShowExtras] = useState(false);

  useEffect(() => {
    if (isAdmin) return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReduced) return;

    const idle = window.setTimeout(() => setShowExtras(true), 1200);
    return () => window.clearTimeout(idle);
  }, [isAdmin]);

  if (isAdmin) return null;

  return (
    <>
      <Preloader />
      <ScrollProgress />
      {showExtras && (
        <>
          <MouseSpotlight />
          <NoiseOverlay />
          <CustomCursor />
        </>
      )}
    </>
  );
}
