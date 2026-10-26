import { motion } from 'motion/react';
import { ProcessStep, Language } from '../types';

interface ProcessSectionProps {
  lang: Language;
  process: ProcessStep[];
}

export default function ProcessSection({ lang, process }: ProcessSectionProps) {
  return (
    <section id="alur-kerja" className="py-24 bg-[#F8F9FA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold tracking-wider text-[#FF4742] uppercase font-mono mb-2">
            {lang === 'id' ? "Metodologi Kerja" : "Working Methodology"}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F1E36] tracking-tight mb-4">
            {lang === 'id' ? "Alur Kolaborasi yang Terstruktur" : "A Disciplined, Transparent Process"}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {lang === 'id'
              ? "Setiap proyek dijalankan melalui tahapan terukur untuk menjamin kepastian kualitas, ketepatan waktu, dan keselarasan visi tanpa kejutan biaya."
              : "Every project moves through validated milestones ensuring visual fidelity, deadline certainty, and complete cross-functional alignment."}
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((step, idx) => (
            <motion.div
              key={step.step || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-2xl font-bold text-[#FF4742] tabular-nums">
                    {step.step}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                    {step.duration}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#0F1E36] mb-3">
                  {step.title[lang] || step.title.id}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description[lang] || step.description.id}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Phase {step.step}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4742]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
