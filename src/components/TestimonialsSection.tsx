import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { Testimonial, Language } from '../types';

interface TestimonialsProps {
  lang: Language;
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ lang, testimonials }: TestimonialsProps) {
  return (
    <section id="testimoni" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold tracking-wider text-[#FF4742] uppercase font-mono mb-2">
            {lang === 'id' ? "Testimoni & Reputasi" : "Reputation & Endorsements"}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F1E36] tracking-tight mb-4">
            {lang === 'id' ? "Pengakuan dari Para Pemimpin Produk" : "Trusted by Tech Leaders & Founders"}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {lang === 'id'
              ? "Hasil nyata yang dirasakan oleh founder, VP, dan direktur produk yang telah mempercayakan desain digital mereka."
              : "Direct outcomes from product leaders who partnered to reinvent their flagship products and digital presence."}
          </p>
        </div>

        {/* Testimonials in a row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-slate-50/70 p-8 rounded-2xl border border-slate-200/80 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-[#FF4742]/40 mb-6" />
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-8">
                  &ldquo;{item.quote[lang] || item.quote.id}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/70">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-serif font-bold text-base text-[#0F1E36]">
                    {item.name}
                  </div>
                  <span className="text-xs font-semibold text-[#FF4742] bg-[#FF4742]/10 px-2.5 py-0.5 rounded">
                    {item.metric}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {item.role} · {item.company}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
