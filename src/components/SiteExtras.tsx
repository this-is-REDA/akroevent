"use client";

import { usePathname } from "next/navigation";
import CustomCursor from "./CustomCursor";
import NoiseOverlay from "./NoiseOverlay";

export default function SiteExtras() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <>
      <NoiseOverlay />
      <CustomCursor />
    </>
  );
}
