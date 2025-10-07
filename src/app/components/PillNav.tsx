"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import pillnav from "../styles/pillnav.module.css";

type Variant = "sticky" | "static";
type PillNavProps = { variant?: Variant }; // default handled below

const items = [
  { href: "/",       label: "Home",    icon: "/animations/nav-home.png.png" },
  { href: "/about",  label: "About",   icon: "/animations/nav-about.png.png" },
  { href: "/blog",   label: "Blog",    icon: "/animations/nav-blog.png.png" },
  { href: "/contact",label: "Contact", icon: "/animations/nav-email.png.png" },
];

export default function PillNav({ variant = "static" }: PillNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={`${pillnav.pillNavWrap} ${
        variant === "sticky" ? pillnav["is-sticky"] : pillnav["is-static"]
      }`}
      aria-label="Primary"
    >
      <div className={pillnav.pillNav}>
        {items.map((it) => {
          const active = pathname === it.href;
          return ( 
            <Link
              key={it.href}
              href={it.href}
              className={`${pillnav.pillItem} ${active ? pillnav.active : ""}`}
              aria-label={it.label}
            >
              {it.icon ? (
                <Image
                  src={it.icon}
                  alt=""
                  width={22}
                  height={22}
                  className={pillnav.pillIcon}
                />
              ) : (
                <span className={pillnav.pillDot} />
              )}
              <span className={pillnav.pillTooltip}>{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
