import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Language, PortfolioConfig } from '../types';

interface HeroProps {
  lang: Language;
  config: PortfolioConfig;
  onOpenHireModal: () => void;
  onLearnMore: () => void;
}

export default function Hero({ lang, config, onOpenHireModal, onLearnMore }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#E7EBF0] via-[#EEF1F5] to-[#F8F9FA] pt-12 md:pt-20 pb-16 md:pb-24">
      {/* Background Guilloche / Wave Contour Lines SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 680 C 250 620, 600 780, 950 690 C 1200 620, 1400 700, 1600 650"
            stroke="#94A3B8"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <path
            d="M-100 650 C 280 580, 580 750, 980 660 C 1250 590, 1420 680, 1600 620"
            stroke="#94A3B8"
            strokeWidth="0.9"
          />
          <path
            d="M-100 620 C 310 550, 610 720, 1010 630 C 1280 560, 1450 650, 1600 590"
            stroke="#94A3B8"
            strokeWidth="0.8"
          />
          <path
            d="M-100 590 C 340 520, 640 690, 1040 600 C 1310 530, 1480 620, 1600 560"
            stroke="#94A3B8"
            strokeWidth="0.7"
          />
          <path
            d="M-100 560 C 370 490, 670 660, 1070 570 C 1340 500, 1510 590, 1600 530"
            stroke="#94A3B8"
            strokeWidth="0.6"
          />
          <path
            d="M-100 530 C 400 460, 700 630, 1100 540 C 1370 470, 1540 560, 1600 500"
            stroke="#94A3B8"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-6"
          >
            {/* Tagline kicker */}
            <div className="relative flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full border border-[#FF4742]/40 absolute -left-2 -top-1 -z-10 pointer-events-none" />
              <span className="text-xs md:text-sm font-semibold tracking-wider text-[#FF4742] uppercase font-mono">
                {config.tagline}
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#0D1B2A] tracking-tight leading-[1.08] mb-6 text-balance">
              I&apos;m Designer <br />
              <span className="text-[#0A192F] hover:text-[#1E3A8A] transition-colors">
                {config.name}
              </span>
            </h1>

            {/* Subtext description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              {config.bio[lang] || config.bio.id}
            </p>

            {/* Action Buttons matching screenshot */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto">
              {/* Primary Coral Button: Learn More */}
              <button
                onClick={onLearnMore}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#FF4742] hover:bg-[#E63833] text-white text-sm font-semibold rounded-md shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer text-center"
              >
                Learn More
              </button>

              {/* Secondary Outline Button: Hire Me */}
              <button
                onClick={onOpenHireModal}
                className="w-full sm:w-auto px-8 py-3.5 bg-white/70 hover:bg-white text-slate-800 hover:text-black border border-slate-300/80 hover:border-slate-400 text-sm font-semibold rounded-md backdrop-blur-sm transition-all active:scale-[0.98] cursor-pointer text-center"
              >
                Hire Me
              </button>
            </div>

            {/* Metadata trust indicator (No pills, quiet separator) */}
            <div className="mt-8 flex items-center gap-3 text-xs text-slate-500 font-medium">
              <span>{config.location}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-700 font-semibold">{config.availability[lang]}</span>
              <span aria-hidden="true">·</span>
              <span>8+ Yrs Experience</span>
            </div>
          </motion.div>

          {/* Right Column: Portrait Photo with Refined Framing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative max-w-md w-full">
              {/* Ambient backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-300/30 to-white/40 rounded-2xl transform rotate-1 scale-102 filter blur-sm -z-10" />

              {/* Main Portrait Container */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 bg-[#EFF1F5] shadow-lg shadow-slate-200/50">
                <img
                  src={config.heroPortrait}
                  alt={`Portrait of ${config.name}`}
                  className="w-full h-auto object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/aistudio/user_portrait_template.jpg';
                  }}
                />

                {/* Subtle caption bar on bottom */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF4742]" />
                    <span className="font-medium">{config.roleTitle[lang] || config.roleTitle.id}</span>
                  </div>
                  <span className="opacity-80">{config.name}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
