"use client";

import { usePathname } from "next/navigation";
import SubpageNav from "@/components/SubpageNav";

export default function PillNavMount() {
  const pathname = usePathname();

  // Homepage uses the new Navbar component — no nav needed here
  if (pathname === "/") return null;

  // All other routes: accessible side-drawer nav
  return <SubpageNav />;
}
