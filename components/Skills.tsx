import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
            <Card key={category}>
              <CardHeader>
                <CardTitle>{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
