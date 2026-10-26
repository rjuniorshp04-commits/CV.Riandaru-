import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Calendar, User, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Project, Language } from '../types';

interface ProjectModalProps {
  project: Project | null;
  lang: Language;
  onClose: () => void;
  onInquire: (projectTitle: string) => void;
}

export default function ProjectModal({ project, lang, onClose, onInquire }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-20">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-[#FF4742] uppercase tracking-wider">{project.categoryLabel[lang]}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
              <span aria-hidden="true">·</span>
              <span>{project.client}</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scroll Content */}
          <div className="overflow-y-auto px-6 py-6 sm:px-8 space-y-8">
            {/* Title & Subtitle */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1E36] mb-2">
                {project.title}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {project.subtitle}
              </p>
            </div>

            {/* High-Resolution Hero Visual */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto max-h-[460px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Project Specs Metadata Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
              <div>
                <div className="text-slate-400 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  <span>{lang === 'id' ? "Peran" : "Role"}</span>
                </div>
                <div className="font-medium text-slate-800">{project.role[lang]}</div>
              </div>
              <div>
                <div className="text-slate-400 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{lang === 'id' ? "Klien" : "Client"}</span>
                </div>
                <div className="font-medium text-slate-800">{project.client}</div>
              </div>
              <div>
                <div className="text-slate-400 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{lang === 'id' ? "Durasi" : "Duration"}</span>
                </div>
                <div className="font-medium text-slate-800">{project.timeline}</div>
              </div>
              <div>
                <div className="text-slate-400 mb-1">
                  <span>{lang === 'id' ? "Alat & Teknologi" : "Tools"}</span>
                </div>
                <div className="font-medium text-slate-800">{project.tools.slice(0, 3).join(', ')}</div>
              </div>
            </div>

            {/* Case Study Details: Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#FF4742] rounded-full" />
                  {lang === 'id' ? "Tantangan Utama" : "The Challenge"}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {project.challenge[lang]}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-emerald-500 rounded-full" />
                  {lang === 'id' ? "Solusi & Pendekatan" : "The Solution"}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {project.solution[lang]}
                </p>
              </div>
            </div>

            {/* Quantitative Impact / Results */}
            <div className="p-5 rounded-xl bg-slate-900 text-white space-y-4">
              <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-400">
                {lang === 'id' ? "Dampak & Hasil Terukur" : "Measured Results & Impact"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.impact.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF4742] shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 leading-normal font-medium">
                      {item[lang]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-3">
                {lang === 'id' ? "Deliverables Proyek" : "Deliverables"}
              </h4>
              <div className="flex flex-wrap gap-2 text-xs text-slate-700">
                {project.deliverables.map((deliv, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-100 rounded border border-slate-200">
                    {deliv}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="sticky bottom-0 bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              {lang === 'id' ? "Tutup" : "Close"}
            </button>
            <button
              onClick={() => {
                onClose();
                onInquire(project.title);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF4742] hover:bg-[#E63833] text-white text-xs font-semibold rounded-md shadow-sm transition-all cursor-pointer"
            >
              <span>{lang === 'id' ? "Diskusi Proyek Serupa" : "Inquire About Similar Project"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
