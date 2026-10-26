import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, Check, Mail, MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { portfolioConfig } from '../data/portfolioData';

interface HireModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  preselectedService?: string;
}

export default function HireModal({ isOpen, lang, onClose, preselectedService }: HireModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(preselectedService || 'mobile-app');
  const [budget, setBudget] = useState('3k-5k');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setProjectType(preselectedService);
    }
  }, [preselectedService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitted(true);
    const subject = encodeURIComponent(`Hire Request: ${name} (${projectType})`);
    const body = encodeURIComponent(
      `Nama: ${name}\nEmail: ${email}\nTipe Proyek: ${projectType}\nBudget Range: ${budget}\nPesan Tambahan:\n${message}`
    );
    window.location.href = `mailto:${portfolioConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 p-6 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4742]" />
              <h3 className="font-serif font-bold text-xl text-[#0F1E36]">
                {lang === 'id' ? "Mulai Proyek Bersama Haris" : "Partner with Haris F. Watson"}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif font-bold text-[#0F1E36]">
                {lang === 'id' ? "Pesan Diterima & Aplikasi Email Terbuka" : "Inquiry Prepared"}
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                {lang === 'id'
                  ? "Terima kasih! Draf email telah disiapkan. Haris akan merespons dalam 1x24 jam."
                  : "Thank you! An email draft has been generated. Haris will be in touch shortly."}
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                {lang === 'id' ? "Tutup Dialog" : "Close"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'id' ? "Nama Anda" : "Your Name"} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF4742] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'id' ? "Email Bisnis" : "Work Email"} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@company.com"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF4742] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'id' ? "Jenis Proyek" : "Project Focus"}
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF4742] transition-colors bg-white"
                >
                  <option value="Mobile App UI/UX">Mobile App UI/UX Design (iOS / Android)</option>
                  <option value="Web & SaaS Dashboard">Web Application & SaaS Telemetry</option>
                  <option value="Brand Identity & Design System">Brand Identity & Design System</option>
                  <option value="Full Product Design & Code Prototype">Full Product & Creative Prototyping</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'id' ? "Perkiraan Anggaran" : "Budget Expectation"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '2k-4k', label: '$2k – $4k' },
                    { id: '4k-8k', label: '$4k – $8k' },
                    { id: '8k+', label: '$8k+' },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudget(b.id)}
                      className={`py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                        budget === b.id
                          ? 'border-[#FF4742] bg-[#FF4742]/10 text-[#FF4742] font-semibold'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'id' ? "Catatan / Detail Tambahan" : "Brief Details"}
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    lang === 'id'
                      ? "Ceritakan sedikit tentang produk Anda..."
                      : "Briefly tell us about your product goals..."
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF4742] transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#FF4742] hover:bg-[#E63833] text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === 'id' ? "Kirimkan Permintaan Kolaborasi" : "Submit Collaboration Request"}</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
