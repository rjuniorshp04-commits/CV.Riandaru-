import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import WorksSection from './components/WorksSection';
import ProjectModal from './components/ProjectModal';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import HireModal from './components/HireModal';
import EditDrawer from './components/EditDrawer';
import { initialPortfolioData } from './data/portfolioData';
import { Project, Language, FullPortfolioData } from './types';
import { Sliders } from 'lucide-react';

const STORAGE_KEY = 'portfolio_custom_data_v3';

export default function App() {
  const [lang, setLang] = useState<Language>('id');
  const [data, setData] = useState<FullPortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not load saved portfolio data:", e);
    }
    return initialPortfolioData;
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string | undefined>(undefined);
  const [contactProjectPrefill, setContactProjectPrefill] = useState<string | undefined>(undefined);

  // Auto-save to localStorage whenever data changes
  const handleSaveData = (newData: FullPortfolioData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  };

  const handleResetData = () => {
    if (window.confirm(lang === 'id' ? "Kembalikan semua data ke pengaturan awal bawaan?" : "Reset all data to default?")) {
      setData(initialPortfolioData);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error("Failed to clear localStorage:", e);
      }
    }
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const handleOpenHireModal = (serviceName?: string) => {
    setPrefilledService(serviceName);
    setIsHireModalOpen(true);
  };

  const handleCloseHireModal = () => {
    setIsHireModalOpen(false);
    setPrefilledService(undefined);
  };

  const handleLearnMore = () => {
    const el = document.querySelector('#karya');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireFromProject = (projectTitle: string) => {
    setContactProjectPrefill(projectTitle);
    const el = document.querySelector('#kontak');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] font-sans antialiased selection:bg-[#FF4742] selection:text-white flex flex-col relative">
      {/* 3-Zone Top Navigation with dynamic wordmark and Edit trigger */}
      <Navbar
        name={data.config.name}
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenHireModal={() => handleOpenHireModal()}
        onOpenEditor={() => setIsEditorOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          lang={lang}
          config={data.config}
          onOpenHireModal={() => handleOpenHireModal()}
          onLearnMore={handleLearnMore}
        />

        {/* 4-Column KPI Stats Strip */}
        <StatsStrip
          lang={lang}
          stats={data.stats}
        />

        {/* Selected Works Bento Grid */}
        <WorksSection
          lang={lang}
          projects={data.projects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Capabilities & Services */}
        <ServicesSection
          lang={lang}
          services={data.services}
          onInquireService={(service) => handleOpenHireModal(service)}
        />

        {/* 4-Phase Work Methodology */}
        <ProcessSection
          lang={lang}
          process={data.process}
        />

        {/* Testimonials & Verified Proof */}
        <TestimonialsSection
          lang={lang}
          testimonials={data.testimonials}
        />

        {/* Interactive Scope Estimator & Contact Inquiry Form */}
        <ContactSection
          lang={lang}
          config={data.config}
          prefilledProject={contactProjectPrefill}
        />
      </main>

      {/* Clean Minimalist Footer */}
      <Footer
        lang={lang}
        config={data.config}
      />

      {/* Floating Fast Edit Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsEditorOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold shadow-lg hover:shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer border border-slate-700/80 group"
          title={lang === 'id' ? "Buka Editor Visual Konten" : "Open Visual Content Editor"}
        >
          <Sliders className="w-3.5 h-3.5 text-[#FF4742] group-hover:rotate-45 transition-transform" />
          <span>{lang === 'id' ? "Edit Portofolio" : "Edit Portfolio"}</span>
        </button>
      </div>

      {/* Project Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        lang={lang}
        onClose={() => setSelectedProject(null)}
        onInquire={(title) => handleInquireFromProject(title)}
      />

      {/* Hire Me Quick Dialog */}
      <HireModal
        isOpen={isHireModalOpen}
        lang={lang}
        onClose={handleCloseHireModal}
        preselectedService={prefilledService}
      />

      {/* Live Content Customizer Drawer */}
      <EditDrawer
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        lang={lang}
        data={data}
        onSaveData={handleSaveData}
        onResetData={handleResetData}
      />
    </div>
  );
}
