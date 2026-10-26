import { ArrowUp, Globe } from 'lucide-react';
import { PortfolioConfig, Language } from '../types';

interface FooterProps {
  lang: Language;
  config: PortfolioConfig;
}

export default function Footer({ lang, config }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0F1E36] text-white py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-xl font-bold font-serif tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4742]" />
              <span className="uppercase">{config.name}</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {config.bio[lang] || config.bio.id}
            </p>
            <div className="text-xs text-slate-400 pt-2 flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#FF4742]" />
              <span>{config.location}</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-3">
              <div className="text-slate-400 uppercase tracking-wider font-mono font-semibold">
                {lang === 'id' ? "Navigasi" : "Navigation"}
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#karya" className="text-slate-300 hover:text-white transition-colors">
                    {lang === 'id' ? "Karya Pilihan" : "Selected Works"}
                  </a>
                </li>
                <li>
                  <a href="#layanan" className="text-slate-300 hover:text-white transition-colors">
                    {lang === 'id' ? "Layanan" : "Services"}
                  </a>
                </li>
                <li>
                  <a href="#alur-kerja" className="text-slate-300 hover:text-white transition-colors">
                    {lang === 'id' ? "Alur Kerja" : "Process"}
                  </a>
                </li>
                <li>
                  <a href="#testimoni" className="text-slate-300 hover:text-white transition-colors">
                    {lang === 'id' ? "Testimoni" : "Testimonials"}
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-slate-400 uppercase tracking-wider font-mono font-semibold">
                {lang === 'id' ? "Terhubung" : "Network"}
              </div>
              <ul className="space-y-2">
                {config.socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action / Back to Top */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between">
            <div className="text-xs text-slate-400">
              <div className="font-semibold text-slate-300 mb-1">
                {lang === 'id' ? "Status Ketersediaan" : "Availability Status"}
              </div>
              <div className="text-emerald-400 font-medium">
                ● {config.availability[lang] || config.availability.id}
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 md:mt-0 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>{lang === 'id' ? "Kembali ke Atas" : "Back to Top"}</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#FF4742]" />
            </button>
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} {config.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Built with React, Tailwind CSS & Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
