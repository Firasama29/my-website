export function slugifyTag(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

type TagCategory = "java" | "python" | "ai" | "tools" | "career";

const TAG_CATEGORIES: Record<string, TagCategory> = {
  // Java & backend
  Java: "java",
  Backend: "java",
  API: "java",
  HTTP: "java",
  Requests: "java",
  OOP: "java",
  "Design Patterns": "java",
  Polymorphism: "java",
  "Wrapper Classes": "java",
  "Type System": "java",
  Exceptions: "java",
  Reflections: "java",
  "Memory Management": "java",
  Modules: "java",

  // Python
  Python: "python",

  // AI
  AI: "ai",
  Claude: "ai",
  OpenAI: "ai",

  // Tools & scripting
  Tools: "tools",
  Scripts: "tools",
  SDKMAN: "tools",
  PDF: "tools",
  Debugging: "tools",

  // Career & growth
  Career: "career",
  "Self Improvement": "career",
  Productivity: "career",
  Learning: "career",
  "Problem Solving": "career",
  Resources: "career",
  "Developer Tips": "career",
  Tech: "career",
};

const LIGHT_COLORS: Record<TagCategory, string> = {
  java: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  python: "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  ai: "bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
  tools: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  career: "bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
};

const DEFAULT_LIGHT = "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300";

export function getTagColorClasses(tag: string): string {
  const category = TAG_CATEGORIES[tag];
  return category ? LIGHT_COLORS[category] : DEFAULT_LIGHT;
}
