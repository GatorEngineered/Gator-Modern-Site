import Link from "next/link";
import Reveal from "@/app/components/Reveal";
import styles from "@/app/styles/pages/blog.module.css";

export default function BlogPage() {
  return (
    <main className={styles.wrap}>
      <div className={styles.backHomeWrap}>
    <Link href="/" className={styles.backHome}>
      ← Back home
    </Link>
  </div>
      <Reveal selector={`.${styles.card} .reveal`} y={26} duration={1.05} ease="power3.out" stagger={0.08} once>
        <section className={styles.card} aria-label="Blog">
          <h1 className={`reveal ${styles.h1}`}>
            <span className={styles.fxTitle}>Blog</span>
          </h1>

          <p className={`reveal ${styles.lede}`}>
            <span className={styles.fxAccent}>Coming soon</span> — insights on Web3, AI for small business, and future-ready design.
          </p>

          <nav className={`reveal ${styles.ctaBar}`} aria-label="Quick links">
            <Link href="/" className={`${styles.btn} ${styles.primary}`}>Home</Link>
            <Link href="/ai" className={`${styles.btn} ${styles.primaryAlt}`}>AI</Link>
            <Link href="/marketing" className={`${styles.btn} ${styles.secondary}`}>Marketing</Link>
            <Link href="/crypto" className={`${styles.btn} ${styles.secondary}`}>Crypto</Link>
            <Link href="/web" className={`${styles.btn} ${styles.secondary}`}>Web</Link>
          </nav>
        </section>
      </Reveal>
    </main>
  );
}
