"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "260px" }} />,
});

export default function HeroSceneWrapper() {
  return <HeroScene />;
}
