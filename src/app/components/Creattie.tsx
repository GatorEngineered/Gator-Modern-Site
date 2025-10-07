// src/app/components/Creattie.tsx
"use client";
import { useEffect } from "react";
import React from "react";

let scriptLoaded = false;

type Props = React.HTMLAttributes<HTMLElement> & {
  src: string;
  delay?: number | string;
  speed?: number | string;
  frame_rate?: number | string;
  trigger?: string;
};

export default function Creattie(props: Props) {
  useEffect(() => {
    if (scriptLoaded) return;
    const s = document.createElement("script");
    s.src = "https://creattie.com/js/embed.js?id=3f6954fde297cd31b441";
    s.defer = true;
    s.async = true;
    document.body.appendChild(s);
    scriptLoaded = true;
  }, []);

  // render the custom element without TS complaining
  return React.createElement("creattie-embed", props as any);
}
