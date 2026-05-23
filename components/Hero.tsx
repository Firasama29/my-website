import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-blue-600 font-medium mb-3">Hello, I&apos;m</p>
        <h1 className="text-5xl font-bold text-slate-800 mb-4 leading-tight">
          Firas Ahmed
        </h1>
        <h2 className="text-2xl text-slate-500 font-medium mb-6">
          Backend Software Engineer
        </h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-8">
          I build robust, scalable backend systems with a focus on clean code and
          solid engineering principles. I work primarily with Java and Spring Boot,
          and I enjoy writing about things I learn along the way.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Button asChild>
            <Link href="/blog">Read my blog</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/#contact">Get in touch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
