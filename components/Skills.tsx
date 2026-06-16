import type { IconType } from "react-icons";
import {
  SiOpenjdk,
  SiPython,
  SiSpringboot,
  SiHibernate,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiDocker,
  SiGit,
  SiApachemaven,
  SiPostman,
} from "react-icons/si";
import { DiDatabase } from "react-icons/di";

type SkillItem = {
  label: string;
  icon?: IconType;
  color?: string;
};

type SkillCategory = {
  category: string;
  items: SkillItem[];
};

const stack: SkillCategory[] = [
  {
    category: "Languages",
    items: [
      { label: "Java", icon: SiOpenjdk, color: "#007396" },
      { label: "Python", icon: SiPython, color: "#3776AB" },
      { label: "SQL", icon: DiDatabase, color: "#6B7280" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { label: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
      { label: "Hibernate / JPA", icon: SiHibernate, color: "#59666C" },
    ],
  },
  {
    category: "Databases",
    items: [
      { label: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { label: "MySQL", icon: SiMysql, color: "#4479A1" },
      { label: "Redis", icon: SiRedis, color: "#FF4438" },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { label: "Docker", icon: SiDocker, color: "#2496ED" },
      { label: "Git", icon: SiGit, color: "#F05032" },
      { label: "Maven", icon: SiApachemaven, color: "#C71A36" },
      { label: "Postman", icon: SiPostman, color: "#FF6C37" },
    ],
  },
  {
    category: "Concepts",
    items: [
      { label: "REST APIs" },
      { label: "Microservices" },
      { label: "OOP" },
      { label: "Design Patterns" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="stack" className="bg-slate-50 dark:bg-slate-800 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          My Stack
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10">
          Technologies I work with
        </p>
        <div className="divide-y divide-slate-200 dark:divide-slate-700 border-y border-slate-200 dark:border-slate-700">
          {stack.map(({ category, items }) => (
            <div
              key={category}
              className="flex flex-col sm:flex-row gap-3 sm:gap-8 py-5"
            >
              <div className="sm:w-44 sm:shrink-0 sm:pt-0.5">
                <span className="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500">
                  {category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map(({ label, icon: Icon, color }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 shadow-sm"
                  >
                    {Icon && (
                      <Icon
                        aria-hidden="true"
                        className="w-4 h-4 shrink-0"
                        style={{ color }}
                      />
                    )}
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
