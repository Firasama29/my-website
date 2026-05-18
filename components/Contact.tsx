export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Contact</h2>
        <p className="text-slate-500 mb-10">Feel free to reach out</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:ferasama@gmail.com"
            className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-6 py-4 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <span className="text-2xl">✉️</span>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                Email
              </p>
              <p className="text-slate-700 font-medium group-hover:text-blue-600 transition-colors">
                ferasama@gmail.com
              </p>
            </div>
          </a>
          <a
            href="https://github.com/Firasama29"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-6 py-4 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <span className="text-2xl">🐙</span>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                GitHub
              </p>
              <p className="text-slate-700 font-medium group-hover:text-blue-600 transition-colors">
                github.com/Firasama29
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
