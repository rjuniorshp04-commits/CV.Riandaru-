import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Globe, Sliders } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  name: string;
  lang: Language;
  onToggleLang: () => void;
  onOpenHireModal: () => void;
  onOpenEditor: () => void;
}

export default function Navbar({ name, lang, onToggleLang, onOpenHireModal, onOpenEditor }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#karya", label: lang === 'id' ? "Karya Pilihan" : "Selected Works" },
    { href: "#layanan", label: lang === 'id' ? "Layanan" : "Services" },
    { href: "#alur-kerja", label: lang === 'id' ? "Alur Kerja" : "Process" },
    { href: "#testimoni", label: lang === 'id' ? "Testimoni" : "Testimonials" },
    { href: "#kontak", label: lang === 'id' ? "Kontak" : "Contact" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8F9FA]/90 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <a 
          href="#" 
          className="text-lg md:text-xl font-bold tracking-tight text-[#0F1E36] font-serif whitespace-nowrap shrink-0 group flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF4742] group-hover:scale-125 transition-transform" />
          <span className="uppercase">{name}</span>
        </a>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="hover:text-[#0F1E36] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF4742] hover:after:w-full after:transition-all whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + language toggle + Edit Mode button */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Edit Mode Button */}
          <button
            onClick={onOpenEditor}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-md bg-white hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
            title={lang === 'id' ? "Buka Editor Visual Konten" : "Open Visual Content Editor"}
          >
            <Sliders className="w-3.5 h-3.5 text-[#FF4742]" />
            <span className="hidden sm:inline">{lang === 'id' ? "Edit Data" : "Edit"}</span>
          </button>

          {/* Language Switch */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-md bg-white hover:bg-slate-50 transition-colors cursor-pointer"
            title={lang === 'id' ? "Ganti ke Bahasa Inggris" : "Switch to Indonesian"}
          >
            <Globe className="w-3.5 h-3.5 text-[#FF4742]" />
            <span className="uppercase font-mono font-semibold">{lang}</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenHireModal}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#FF4742] hover:bg-[#E63833] rounded-md transition-all shadow-sm hover:shadow active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Hire Me
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-slate-200 bg-white px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-base font-medium text-slate-800 hover:text-[#FF4742] transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEditor();
                  }}
                  className="w-full py-2 px-4 text-center text-xs font-semibold text-slate-700 border border-slate-300 rounded-md bg-slate-50 flex items-center justify-center gap-2"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#FF4742]" />
                  <span>{lang === 'id' ? "Edit Data Portofolio" : "Edit Portfolio Data"}</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenHireModal();
                  }}
                  className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-[#FF4742] rounded-md shadow-sm"
                >
                  {lang === 'id' ? "Mulai Proyek (Hire Me)" : "Start a Project (Hire Me)"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
