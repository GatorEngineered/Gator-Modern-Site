"use client";

import { usePathname } from "next/navigation";
import PillNav from "./PillNav";
import styles from "@/app/styles/pillnav.module.css";

/**
 * Home ("/"): fixed overlay (no layout shift)
 * Other routes: sticky in-flow, using inlineMount wrapper
 */
export default function PillNavMount() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Homepage uses the new Navbar component — legacy pill nav not needed there
  if (isHome) return null;


  
  // Router pages: reserve space & stick on scroll
  return (
    <div className={styles.inlineMount}>
      <PillNav variant="sticky" />
    </div>
  );
}
