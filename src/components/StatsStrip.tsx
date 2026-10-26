import { motion } from 'motion/react';
import { StatItem, Language } from '../types';

interface StatsStripProps {
  lang: Language;
  stats: StatItem[];
}

export default function StatsStrip({ lang, stats }: StatsStripProps) {
  return (
    <section className="w-full bg-white border-y border-slate-200/90 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`flex flex-col ${idx !== 0 ? 'pt-6 lg:pt-0 lg:pl-8' : ''}`}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1E36] font-serif tracking-tight tabular-nums mb-1">
                {stat.number}
              </div>
              <div className="text-sm font-semibold text-slate-800 tracking-tight">
                {stat.label[lang] || stat.label.id}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {stat.detail[lang] || stat.detail.id}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
