import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  const codeHtml = buildCodeHtml(styles);

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

        {/* ── Right: Code window ── */}
        <div className={styles.right}>
          <div className={styles.codeWindow}>
            <div className={styles.windowBar}>
              <span className={styles.windowLang}>java</span>
              <span className={styles.windowFilename}>FirasAhmed.java</span>
            </div>
            <pre
              className={styles.codeBody}
              dangerouslySetInnerHTML={{ __html: codeHtml }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

function buildCodeHtml(s: Record<string, string>): string {
  const kw  = (t: string) => `<span class="${s.kw}">${t}</span>`;
  const tp  = (t: string) => `<span class="${s.tp}">${t}</span>`;
  const str = (t: string) => `<span class="${s.str}">${t}</span>`;
  const cm  = (t: string) => `<span class="${s.cm}">${t}</span>`;
  const cls = (t: string) => `<span class="${s.cls}">${t}</span>`;
  const fn  = (t: string) => `<span class="${s.fn}">${t}</span>`;
  const num = (t: string) => `<span class="${s.num}">${t}</span>`;

  return [
    `${kw("public class")} ${cls("FirasAhmed")} {`,
    ``,
    `  ${tp("String")} name = ${str('"Firas Ahmed"')};`,
    `  ${tp("String")} role = ${str('"Backend Engineer"')};`,
    `  ${tp("String")}[] stack = {`,
    `    ${str('"Java"')}, ${str('"Spring Boot"')},`,
    `    ${str('"REST APIs"')}, ${str('"Cloud"')}`,
    `  };`,
    `  ${tp("boolean")} writesAboutIt = ${num("true")};`,
    ``,
    `  ${tp("void")} ${fn("buildSystems")}() {`,
    `    ${cm("// clean · robust · scalable")}`,
    `  }`,
    `}`,
    `<span class="${s.cursor}"></span>`,
  ].join("\n");
}
