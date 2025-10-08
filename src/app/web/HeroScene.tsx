"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./HeroScene.module.css";

type Stage = "single" | "pair" | "color" | "vertical";

/** Sayings */
const PHRASES = [
  "Be Unmistakable",
  "Clarity Over Clutter",
  "Brand With A Backbone",
  "Fast By Default",
  "Belonging Builds Loyalty",
];

/** Word we optionally stack vertically at the end of line 2 */
const VERTICAL = ["Ownership", "Access", "Identity", "Trust", "Community"];

/** 0=single, 1=pair, 2=color, 3=vertical */
type Step = 0 | 1 | 2 | 3;

export default function HeroWords() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const wrapRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLSpanElement>(null);

  const [idx, setIdx] = useState(0);          // current phrase index
  const [step, setStep] = useState<Step>(0);  // stage for animation
  const [started, setStarted] = useState(false); // after first pass, never go back to "single"
  const [hue, setHue] = useState(285);        // only used if you re-enable hue pop
  const [vertPos, setVertPos] = useState({ left: 0, top: 0 });

  const curr = PHRASES[idx % PHRASES.length];
  const next = PHRASES[(idx + 1) % PHRASES.length];
  const vertWord = useMemo(() => VERTICAL[idx % VERTICAL.length], [idx]);

  // timings — slower so the second line *lingers*
  const T = reduced
    ? { single: 1200, pair: 1700, color: 1400, vertical: 1400, gap: 380 }
    : { single: 1500, pair: 2100, color: 1600, vertical: 1600, gap: 460 };

  useEffect(() => {
    let timer: number;

    if (step === 0) {
      // single -> pair (intro only)
      timer = window.setTimeout(() => {
        setStarted(true);
        setStep(1);
      }, T.single);
    } else if (step === 1) {
      // pair -> color
      timer = window.setTimeout(() => {
        setHue((h) => (h + 70) % 360);
        setStep(2);
      }, T.pair);
    } else if (step === 2) {
      // color -> vertical (measure once)
      timer = window.setTimeout(() => {
        if (wrapRef.current && nextRef.current) {
          const wrapBox = wrapRef.current.getBoundingClientRect();
          const nextBox = nextRef.current.getBoundingClientRect();
          setVertPos({
            left: nextBox.right - wrapBox.left + 8,
            top: nextBox.top - wrapBox.top - 2,
          });
        }
        setStep(3);
      }, T.color);
    } else {
      // vertical -> advance phrases
      timer = window.setTimeout(() => {
        // Shift: the previous NEXT becomes the new CURRENT and stays visible.
        setIdx((i) => (i + 1) % PHRASES.length);
        // After the intro, always return to "pair" so two lines remain visible.
        setStep(started ? 1 : 0);
      }, T.vertical + T.gap);
    }

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, started, reduced]);

  // stage string for CSS (no "single" after we’ve started)
  const stage: Stage =
    step === 0 && !started ? "single" : step === 1 ? "pair" : step === 2 ? "color" : "vertical";

  return (
    <div ref={wrapRef} className={styles.wrap} aria-label="Rotating brand sayings" style={{ ['--hue' as any]: hue }}  >
     <div className={styles.column} data-stage={stage}>
        {/* Line 1 (current) – always stays present when we shift idx */}
        <span className={`${styles.phrase} ${styles.curr}`}>{curr}</span>

        {/* Line 2 (next) – becomes the new current on advance */}
        {(step >= 1 || started) && (
            <span
    ref={nextRef}
    className={`${styles.phrase} ${styles.next}`}
  >
    {next}
  </span>
)}

        {/* Optional vertical stack on the right end of line 2 */}
        {step === 3 && (
          <span
            className={styles.vertical}
            style={{ left: vertPos.left, top: vertPos.top }}
            aria-hidden="true"
          >
            {vertWord.split("").map((ch, i) => (
              <i key={i}>{ch}</i>
            ))}
          </span>
        )}
      </div>
    </div>
  );
}
