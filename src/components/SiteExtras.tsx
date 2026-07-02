"use client";

import { usePathname } from "next/navigation";
import CustomCursor from "./CustomCursor";
import NoiseOverlay from "./NoiseOverlay";
import ScrollProgress from "./ScrollProgress";
import Preloader from "./Preloader";
import MouseSpotlight from "./MouseSpotlight";

export default function SiteExtras() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <MouseSpotlight />
      <NoiseOverlay />
      <CustomCursor />
    </>
  );
}
