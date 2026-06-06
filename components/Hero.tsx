import Link from "next/link";
import styles from "./Hero.module.css";
import CodeWindow from "./CodeWindow";

export default function Hero() {
  return (
    <section id="about" className={styles.hero}>
      <div className={styles.inner}>

        {/* ── Left: Typography ── */}
        <div className={styles.left}>
          <div className={styles.label}>
            <span className={styles.labelLine} />
            Backend Software Engineer
          </div>

          <h1 className={styles.name}>
            Firas<br />Ahmed
          </h1>

          <p className={styles.bio}>
            I build robust, scalable backend systems with a focus on clean code
            and solid engineering principles. Primarily Java and Spring Boot —
            and I enjoy writing about things I learn along the way.
          </p>

          <div className={styles.ctas}>
            <Link href="/blog" className={styles.ctaPrimary}>
              Read my blog
            </Link>
            <Link href="/#contact" className={styles.ctaSecondary}>
              Get in touch
            </Link>
          </div>
        </div>

        {/* ── Right: Cycling code window ── */}
        <div className={styles.right}>
          <CodeWindow />
        </div>

      </div>
    </section>
  );
}
