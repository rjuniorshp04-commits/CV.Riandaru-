import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Check, ArrowUpRight } from 'lucide-react';
import { Service, Language } from '../types';

interface ServicesSectionProps {
  lang: Language;
  services: Service[];
  onInquireService: (serviceName: string) => void;
}

export default function ServicesSection({ lang, services, onInquireService }: ServicesSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="layanan" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold tracking-wider text-[#FF4742] uppercase font-mono mb-2">
            {lang === 'id' ? "Keahlian & Layanan" : "Expertise & Services"}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F1E36] tracking-tight mb-4">
            {lang === 'id' ? "Solusi Desain End-to-End" : "End-to-End Design Capabilities"}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {lang === 'id'
              ? "Dari inisiasi strategi awal hingga sistem desain skala besar yang siap diimplementasikan oleh tim rekayasa perangkat lunak."
              : "From initial concept architecture to robust enterprise design systems engineered for high-scale digital platforms."}
          </p>
        </div>

        {/* Editorial Numbered Service List */}
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {services.map((service, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={service.number || index}
                className="py-8 transition-colors hover:bg-slate-50/50"
              >
                <div
                  onClick={() => toggleExpand(index)}
                  className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono text-sm sm:text-base font-bold text-[#FF4742] tabular-nums">
                      {service.number}.
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1E36] hover:text-[#FF4742] transition-colors">
                      {service.title[lang] || service.title.id}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 pl-12 md:pl-0">
                    <span className="hidden sm:inline-block text-xs font-medium text-slate-500">
                      {isExpanded
                        ? (lang === 'id' ? "Sembunyikan Rincian" : "Collapse Details")
                        : (lang === 'id' ? "Lihat Rincian" : "Explore Deliverables")}
                    </span>
                    <div className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-slate-100' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Expanded Content with Deliverables Grid */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-6 pl-0 md:pl-12 grid grid-cols-1 lg:grid-cols-12 gap-8"
                  >
                    <div className="lg:col-span-7">
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                        {service.description[lang] || service.description.id}
                      </p>
                      <button
                        onClick={() => onInquireService(service.title[lang] || service.title.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF4742] hover:text-[#E63833] transition-colors group cursor-pointer"
                      >
                        <span>{lang === 'id' ? "Konsultasikan Kebutuhan Ini" : "Inquire About This Service"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>

                    <div className="lg:col-span-5 bg-slate-50 p-5 rounded-xl border border-slate-200/80">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                        {lang === 'id' ? "Output & Deliverables" : "Output & Deliverables"}
                      </div>
                      <ul className="space-y-2.5">
                        {service.deliverables.map((deliv, idx) => (
                          <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                            <Check className="w-4 h-4 text-[#FF4742] shrink-0" />
                            <span>{deliv[lang] || deliv.id}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
