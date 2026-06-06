"use client";

import { useState, useEffect } from "react";
import styles from "./Hero.module.css";

type SnippetDef = { lang: string; filename: string; html: string };

const SNIPPETS: SnippetDef[] = [
  { lang: "java",   filename: "FirasAhmed.java",  html: buildJavaHtml()   },
  { lang: "python", filename: "firas_ahmed.py",   html: buildPythonHtml() },
  { lang: "sql",    filename: "firas_ahmed.sql",  html: buildSqlHtml()    },
];

export default function CodeWindow() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const intervalId = setInterval(() => {
      setVisible(false);
      timeoutId = setTimeout(() => {
        setIndex(prev => (prev + 1) % SNIPPETS.length);
        setVisible(true);
      }, 300);
    }, 4000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  const { lang, filename, html } = SNIPPETS[index];
  const fade: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transition: "opacity 300ms ease",
  };

  return (
    <div className={styles.codeWindow}>
      <div className={styles.windowBar}>
        <span className={styles.windowLang} style={fade}>{lang}</span>
        <span className={styles.windowFilename} style={fade}>{filename}</span>
      </div>
      <pre
        className={styles.codeBody}
        style={fade}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

function buildJavaHtml(): string {
  const kw  = (t: string) => `<span class="${styles.kw}">${t}</span>`;
  const tp  = (t: string) => `<span class="${styles.tp}">${t}</span>`;
  const str = (t: string) => `<span class="${styles.str}">${t}</span>`;
  const cm  = (t: string) => `<span class="${styles.cm}">${t}</span>`;
  const cls = (t: string) => `<span class="${styles.cls}">${t}</span>`;
  const fn  = (t: string) => `<span class="${styles.fn}">${t}</span>`;
  const num = (t: string) => `<span class="${styles.num}">${t}</span>`;

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
    `<span class="${styles.cursor}"></span>`,
  ].join("\n");
}

function buildPythonHtml(): string {
  const kw  = (t: string) => `<span class="${styles.kw}">${t}</span>`;
  const str = (t: string) => `<span class="${styles.str}">${t}</span>`;
  const cm  = (t: string) => `<span class="${styles.cm}">${t}</span>`;
  const cls = (t: string) => `<span class="${styles.cls}">${t}</span>`;
  const fn  = (t: string) => `<span class="${styles.fn}">${t}</span>`;
  const num = (t: string) => `<span class="${styles.num}">${t}</span>`;

  return [
    `${kw("class")} ${cls("FirasAhmed")}:`,
    ``,
    `    name  = ${str('"Firas Ahmed"')}`,
    `    role  = ${str('"Backend Engineer"')}`,
    `    stack = [`,
    `        ${str('"Java"')}, ${str('"Spring Boot"')},`,
    `        ${str('"REST APIs"')}, ${str('"Cloud"')}`,
    `    ]`,
    `    writes_about_it = ${num("True")}`,
    ``,
    `    ${kw("def")} ${fn("build_systems")}(${kw("self")}):`,
    `        ${cm("# clean · robust · scalable")}`,
    `        ${kw("pass")}`,
    `<span class="${styles.cursor}"></span>`,
  ].join("\n");
}

function buildSqlHtml(): string {
  const kw  = (t: string) => `<span class="${styles.kw}">${t}</span>`;
  const tp  = (t: string) => `<span class="${styles.tp}">${t}</span>`;
  const str = (t: string) => `<span class="${styles.str}">${t}</span>`;
  const cm  = (t: string) => `<span class="${styles.cm}">${t}</span>`;
  const fn  = (t: string) => `<span class="${styles.fn}">${t}</span>`;

  return [
    `${cm("-- Firas Ahmed")}`,
    `${kw("CREATE TABLE")} ${fn("engineer")} (`,
    `  name   ${tp("VARCHAR")} ${kw("DEFAULT")} ${str("'Firas Ahmed'")},`,
    `  role   ${tp("VARCHAR")} ${kw("DEFAULT")} ${str("'Backend Engineer'")},`,
    `  stack  ${tp("TEXT[]")}  ${kw("DEFAULT")} ${kw("ARRAY")}[`,
    `    ${str("'Java'")}, ${str("'Spring Boot'")},`,
    `    ${str("'REST APIs'")}, ${str("'Cloud'")}`,
    `  ],`,
    `  writes ${tp("BOOLEAN")} ${kw("DEFAULT")} ${str("TRUE")}`,
    `);`,
    ``,
    `${kw("SELECT")} ${fn("build_systems")}();`,
    `${cm("-- clean · robust · scalable")}`,
    `<span class="${styles.cursor}"></span>`,
  ].join("\n");
}
