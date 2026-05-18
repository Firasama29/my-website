const skills = [
  { category: "Languages", items: ["Java", "Python", "SQL", "TypeScript"] },
  {
    category: "Frameworks & Libraries",
    items: ["Spring Boot", "Spring MVC", "Hibernate / JPA", "React"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "Redis", "MongoDB"],
  },
  {
    category: "Tools & Platforms",
    items: ["Docker", "Git", "Maven", "Postman", "Linux"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "CI/CD", "GitHub Actions"],
  },
  {
    category: "Concepts",
    items: ["REST APIs", "Microservices", "OOP", "Design Patterns", "TDD"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-slate-50 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Skills</h2>
        <p className="text-slate-500 mb-10">Technologies I work with</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map(({ category, items }) => (
            <div
              key={category}
              className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="bg-slate-100 text-slate-700 text-sm px-3 py-1 rounded-full"
                  >
                    {item}
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
