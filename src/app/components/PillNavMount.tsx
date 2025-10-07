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

  if (isHome) {
    return (
      <div className={styles.overlayMount} aria-hidden={false}>
        {/* On home we render the nav in "static" mode inside a fixed overlay */}
        <PillNav variant="static" />
      </div>
    );
  }


  
  // Router pages: reserve space & stick on scroll
  return (
    <div className={styles.inlineMount}>
      <PillNav variant="sticky" />
    </div>
  );
}
