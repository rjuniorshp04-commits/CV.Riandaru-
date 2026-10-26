import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, Copy, Check, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { Language, PortfolioConfig } from '../types';

interface ContactSectionProps {
  lang: Language;
  config: PortfolioConfig;
  prefilledProject?: string;
}

export default function ContactSection({ lang, config, prefilledProject }: ContactSectionProps) {
  // Estimator State
  const [selectedService, setSelectedService] = useState<string>('ui-ux');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('standard');
  const [includeCode, setIncludeCode] = useState<boolean>(true);

  // Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formMessage, setFormMessage] = useState(
    prefilledProject ? `Halo ${config.name}, saya tertarik untuk mendiskusikan proyek serupa dengan "${prefilledProject}".` : ''
  );
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Calculate dynamic estimate
  const serviceBaseRates: Record<string, { label: { id: string; en: string }; min: number; max: number; weeks: string }> = {
    'ui-ux': {
      label: { id: "Desain Mobile App UI/UX", en: "Mobile App UI/UX Design" },
      min: 3500,
      max: 6000,
      weeks: "3-5",
    },
    'web-app': {
      label: { id: "Web App & SaaS Dashboard", en: "Web App & SaaS Dashboard" },
      min: 4200,
      max: 7500,
      weeks: "4-6",
    },
    'branding': {
      label: { id: "Identitas Brand & Guidelines", en: "Brand Identity & Guidelines" },
      min: 2500,
      max: 4800,
      weeks: "2-4",
    },
    'full-suite': {
      label: { id: "Full Product (UI/UX + Brand + Prototyping)", en: "Full Product (UI/UX + Brand + Prototype)" },
      min: 7500,
      max: 13000,
      weeks: "6-8",
    },
  };

  const currentService = serviceBaseRates[selectedService] || serviceBaseRates['ui-ux'];
  const timelineMultiplier = selectedTimeline === 'express' ? 1.25 : selectedTimeline === 'flexible' ? 0.9 : 1.0;
  const codeAddon = includeCode ? 1200 : 0;

  const estimatedMin = Math.round((currentService.min * timelineMultiplier + codeAddon) / 100) * 100;
  const estimatedMax = Math.round((currentService.max * timelineMultiplier + codeAddon) / 100) * 100;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail.trim() || !formName.trim()) return;

    setFormSubmitted(true);
    const subject = encodeURIComponent(`Project Inquiry: ${currentService.label.en} - ${formName}`);
    const body = encodeURIComponent(
      `Nama: ${formName}\nEmail: ${formEmail}\nPerusahaan: ${formCompany}\nLayanan: ${currentService.label.id}\nEstimasi Timeline: ${selectedTimeline}\nPesan:\n${formMessage}`
    );
    window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="kontak" className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold tracking-wider text-[#FF4742] uppercase font-mono mb-2">
            {lang === 'id' ? "Inisiasi Kolaborasi" : "Initiate Collaboration"}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F1E36] tracking-tight mb-4">
            {lang === 'id' ? "Mari Diskusikan Proyek Anda" : "Let's Build Something Exceptional"}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {lang === 'id'
              ? "Gunakan kalkulator estimasi di bawah ini untuk melihat perkiraan skala proyek, atau kirimkan pesan langsung untuk jadwal konsultasi santai."
              : "Use the scope estimator below to get a transparent investment baseline, or send a direct inquiry to schedule a discovery call."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Scope Estimator */}
          <div className="lg:col-span-5 bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF4742]" />
                  <h3 className="font-serif font-bold text-lg text-[#0F1E36]">
                    {lang === 'id' ? "Kalkulator Estimasi Proyek" : "Scope & Investment Estimator"}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-500">Interactive</span>
              </div>

              {/* Service Selection */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  1. {lang === 'id' ? "Kebutuhan Layanan Utama" : "Primary Scope"}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(serviceBaseRates).map(([key, item]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedService(key)}
                      className={`px-3.5 py-2.5 rounded-lg text-left text-xs font-medium border transition-all cursor-pointer flex items-center justify-between ${
                        selectedService === key
                          ? 'border-[#FF4742] bg-[#FF4742]/5 text-[#0F1E36] font-semibold'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span>{item.label[lang] || item.label.id}</span>
                      {selectedService === key && (
                        <Check className="w-3.5 h-3.5 text-[#FF4742]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline Selection */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  2. {lang === 'id' ? "Target Kecepatan / Timeline" : "Target Timeline"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'standard', label: { id: "Standar", en: "Standard" } },
                    { id: 'express', label: { id: "Express", en: "Express" } },
                    { id: 'flexible', label: { id: "Fleksibel", en: "Flexible" } },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTimeline(t.id)}
                      className={`py-2 px-2 text-center rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        selectedTimeline === t.id
                          ? 'border-[#FF4742] bg-[#FF4742]/5 text-[#0F1E36] font-semibold'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {t.label[lang]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-on Toggle */}
              <div className="pt-2 mb-6">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={includeCode}
                    onChange={(e) => setIncludeCode(e.target.checked)}
                    className="w-4 h-4 text-[#FF4742] rounded border-slate-300 focus:ring-[#FF4742] cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-slate-800">
                      {lang === 'id' ? "Termasuk Prototipe Kode React / Tailwind" : "Include Interactive React/Tailwind Prototype"}
                    </span>
                    <span className="block text-slate-500 text-[11px]">
                      {lang === 'id' ? "Mempercepat handoff ke tim engineer" : "Reduces developer implementation friction"}
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Estimated Output Result */}
            <div className="p-5 rounded-xl bg-slate-900 text-white mt-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>{lang === 'id' ? "Estimasi Investasi" : "Investment Range"}</span>
                <span>{currentService.weeks} {lang === 'id' ? "Minggu" : "Weeks"}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
                ${estimatedMin.toLocaleString()} – ${estimatedMax.toLocaleString()}{" "}
                <span className="text-xs font-sans text-slate-400 font-normal">USD</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                {lang === 'id'
                  ? "*Perkiraan awal transparan. Dapat disesuaikan dengan lingkup spesifik proyek."
                  : "*Indicative baseline for planning. Refined upon formal requirement review."}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Form & Contact Info */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-2xl border border-slate-200/90 shadow-sm">
            <h3 className="font-serif font-bold text-2xl text-[#0F1E36] mb-2">
              {lang === 'id' ? "Kirimkan Brief Proyek" : "Send Project Details"}
            </h3>
            <p className="text-slate-600 text-sm mb-8">
              {lang === 'id'
                ? `Biasanya ${config.name} merespons dalam waktu 24 jam di hari kerja.`
                : `${config.name} typically replies within 24 business hours.`}
            </p>

            <AnimatePresence>
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-4"
                >
                  <div className="flex items-center gap-2 font-semibold text-base">
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span>{lang === 'id' ? "Pesan Berhasil Disiapkan!" : "Inquiry Prepared Successfully!"}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                    {lang === 'id'
                      ? "Aplikasi email Anda telah dibuka dengan draf pesan otomatis. Jika tidak terbuka otomatis, Anda dapat langsung menyalin alamat email di bawah."
                      : "Your email client was opened with a prefilled inquiry draft. You can also copy the direct email below."}
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs font-semibold underline text-emerald-700 hover:text-emerald-900 cursor-pointer"
                  >
                    {lang === 'id' ? "Kirim pesan lain" : "Send another message"}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitForm} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        {lang === 'id' ? "Nama Lengkap" : "Your Name"} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Contoh: Sarah Chen"
                        className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF4742] focus:ring-1 focus:ring-[#FF4742] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        {lang === 'id' ? "Alamat Email" : "Email Address"} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="sarah@company.com"
                        className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF4742] focus:ring-1 focus:ring-[#FF4742] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {lang === 'id' ? "Perusahaan / Brand" : "Company or Brand"}
                    </label>
                    <input
                      type="text"
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      placeholder="TechCorp Labs"
                      className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF4742] focus:ring-1 focus:ring-[#FF4742] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {lang === 'id' ? "Deskripsi Singkat Kebutuhan" : "Project Summary & Goals"} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder={
                        lang === 'id'
                          ? "Jelaskan produk Anda, tantangan yang dihadapi, dan ekspektasi hasil yang diinginkan..."
                          : "Describe your product concept, target audience, and primary objectives..."
                      }
                      className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF4742] focus:ring-1 focus:ring-[#FF4742] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#FF4742] hover:bg-[#E63833] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === 'id' ? "Kirimkan Pesan & Jadwalkan Diskusi" : "Submit Inquiry & Schedule Call"}</span>
                  </button>
                </form>
              )}
            </AnimatePresence>

            {/* Direct Contact Strip */}
            <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#FF4742]" />
                  <span className="text-xs font-medium text-slate-800 truncate max-w-[180px]">
                    {config.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-200 transition-colors cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a
                href={`https://wa.me/${config.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Halo ${config.name}, saya ingin mendiskusikan peluang desain produk.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 border border-slate-200/70 hover:bg-slate-100 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-medium text-slate-800">
                    WhatsApp Chat Langsung
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
