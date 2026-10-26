import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Project, ProjectCategory, Language } from '../types';

interface WorksSectionProps {
  lang: Language;
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function WorksSection({ lang, projects, onSelectProject }: WorksSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const categories: { id: ProjectCategory; label: { id: string; en: string } }[] = [
    { id: 'all', label: { id: 'Semua Karya', en: 'All Projects' } },
    { id: 'ui-ux', label: { id: 'UI/UX & Mobile', en: 'UI/UX & Mobile' } },
    { id: 'branding', label: { id: 'Identitas Brand', en: 'Brand Identity' } },
    { id: 'web-app', label: { id: 'Web App & SaaS', en: 'Web App & SaaS' } },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="karya" className="py-24 bg-[#F8F9FA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-wider text-[#FF4742] uppercase font-mono mb-2 flex items-center gap-1.5">
              <span>{lang === 'id' ? "Karya Pilihan" : "Selected Works"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F1E36] tracking-tight">
              {lang === 'id' ? "Studi Kasus & Proyek Unggulan" : "Featured Case Studies & Work"}
            </h2>
          </div>

          {/* Interactive Filter Control Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start md:self-auto overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  onClick={() => onSelectProject(project)}
                  className="group relative bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                >
                  {/* Image Container with Zoom effect */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/src/assets/images/project_fintech_app_1792985087825.jpg';
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-colors duration-300" />

                    {/* Floating Action Badge on Hover */}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-[#FF4742]" />
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Zero-Pill Metadata Discipline */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
                        <span className="text-[#FF4742] font-semibold">{project.categoryLabel[lang] || project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.year}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.client}</span>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1E36] group-hover:text-[#FF4742] transition-colors mb-2">
                        {project.title}
                      </h3>

                      {/* Short Subtitle */}
                      <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Footer strip inside card */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>{project.tools ? project.tools.slice(0, 3).join(', ') : 'UI/UX Design'}</span>
                      <span className="font-semibold text-slate-900 group-hover:text-[#FF4742] transition-colors flex items-center gap-1">
                        {lang === 'id' ? "Lihat Studi Kasus" : "View Case Study"}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
