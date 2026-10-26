import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Save, RotateCcw, Copy, Check, Sliders, User, 
  BarChart3, Briefcase, FileCode, Plus, Trash2, Image 
} from 'lucide-react';
import { FullPortfolioData, Language, Project } from '../types';

interface EditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  data: FullPortfolioData;
  onSaveData: (newData: FullPortfolioData) => void;
  onResetData: () => void;
}

export default function EditDrawer({
  isOpen,
  onClose,
  lang,
  data,
  onSaveData,
  onResetData,
}: EditDrawerProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'stats' | 'projects' | 'export'>('profile');
  const [formData, setFormData] = useState<FullPortfolioData>(data);
  const [copiedCode, setCopiedCode] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Sync when data changes
  const handleConfigChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        [field]: value,
      },
    }));
  };

  const handleConfigBilingualChange = (field: 'roleTitle' | 'bio' | 'availability', subfield: 'id' | 'en', value: string) => {
    setFormData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        [field]: {
          ...prev.config[field],
          [subfield]: value,
        },
      },
    }));
  };

  const handleStatChange = (index: number, field: string, subfield: string | null, value: string) => {
    const newStats = [...formData.stats];
    if (subfield) {
      // @ts-ignore
      newStats[index][field][subfield] = value;
    } else {
      // @ts-ignore
      newStats[index][field] = value;
    }
    setFormData((prev) => ({ ...prev, stats: newStats }));
  };

  const handleProjectChange = (index: number, field: keyof Project, value: any) => {
    const newProjects = [...formData.projects];
    newProjects[index] = {
      ...newProjects[index],
      [field]: value,
    };
    setFormData((prev) => ({ ...prev, projects: newProjects }));
  };

  const handleAddProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: "Proyek Baru",
      subtitle: "Deskripsi singkat tentang proyek baru",
      category: "ui-ux",
      categoryLabel: { id: "UI/UX & Mobile", en: "UI/UX & Mobile" },
      year: new Date().getFullYear().toString(),
      client: "Nama Klien",
      role: { id: "Lead Designer", en: "Lead Designer" },
      timeline: "2 Bulan",
      tools: ["Figma", "Tailwind CSS"],
      image: "/src/assets/images/project_fintech_app_1792985087825.jpg",
      summary: { id: "Ringkasan proyek baru...", en: "New project summary..." },
      challenge: { id: "Tantangan proyek...", en: "Project challenges..." },
      solution: { id: "Solusi desain...", en: "Design solutions..." },
      impact: [{ id: "Peningkatan performa", en: "Performance improvement" }],
      deliverables: ["UI Design", "Figma Components"],
    };
    setFormData((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects],
    }));
  };

  const handleDeleteProject = (index: number) => {
    const newProjects = formData.projects.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, projects: newProjects }));
  };

  const handleSaveAndApply = () => {
    onSaveData(formData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleCopyConfig = () => {
    const jsonString = JSON.stringify(formData, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-xl bg-white shadow-2xl z-10 flex flex-col h-full border-l border-slate-200"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FF4742]/10 text-[#FF4742] flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#0F1E36]">
                  {lang === 'id' ? "Editor Konten Portofolio" : "Live Portfolio Editor"}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {lang === 'id' ? "Edit teks & data secara langsung di browser" : "Edit your portfolio text & data in real-time"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={onResetData}
                title={lang === 'id' ? "Reset ke data bawaan" : "Reset to defaults"}
                className="p-2 text-slate-500 hover:text-rose-600 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer text-xs flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center border-b border-slate-200 bg-white px-3 gap-1 overflow-x-auto text-xs font-medium">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'profile'
                  ? 'border-[#FF4742] text-[#FF4742] font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{lang === 'id' ? "Profil & Bio" : "Profile & Bio"}</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'stats'
                  ? 'border-[#FF4742] text-[#FF4742] font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{lang === 'id' ? "Statistik KPI" : "KPI Stats"}</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'projects'
                  ? 'border-[#FF4742] text-[#FF4742] font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{lang === 'id' ? "Proyek" : "Projects"}</span>
            </button>

            <button
              onClick={() => setActiveTab('export')}
              className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'export'
                  ? 'border-[#FF4742] text-[#FF4742] font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{lang === 'id' ? "Ekspor Kode" : "Export / JSON"}</span>
            </button>
          </div>

          {/* Form Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Tab: Profile */}
            {activeTab === 'profile' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'id' ? "Nama Lengkap" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    value={formData.config.name}
                    onChange={(e) => handleConfigChange('name', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF4742]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'id' ? "Tagline Kecil (Di atas judul)" : "Hero Kicker Tagline"}
                  </label>
                  <input
                    type="text"
                    value={formData.config.tagline}
                    onChange={(e) => handleConfigChange('tagline', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF4742]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'id' ? "URL / Path Foto Profil (Hero)" : "Hero Photo URL or Local Path"}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={formData.config.heroPortrait}
                      onChange={(e) => handleConfigChange('heroPortrait', e.target.value)}
                      placeholder="/assets/... atau https://..."
                      className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF4742]"
                    />
                    <div className="w-9 h-9 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={formData.config.heroPortrait}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/aistudio/user_portrait_template.jpg';
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.config.email}
                      onChange={(e) => handleConfigChange('email', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF4742]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">WhatsApp / Phone</label>
                    <input
                      type="text"
                      value={formData.config.phone}
                      onChange={(e) => handleConfigChange('phone', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF4742]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'id' ? "Lokasi / Domisili" : "Location"}
                  </label>
                  <input
                    type="text"
                    value={formData.config.location}
                    onChange={(e) => handleConfigChange('location', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF4742]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'id' ? "Deskripsi Bio (Bahasa Indonesia)" : "Bio Paragraph (Indonesian)"}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.config.bio.id}
                    onChange={(e) => handleConfigBilingualChange('bio', 'id', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF4742] resize-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'id' ? "Deskripsi Bio (English)" : "Bio Paragraph (English)"}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.config.bio.en}
                    onChange={(e) => handleConfigBilingualChange('bio', 'en', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF4742] resize-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'id' ? "Status Ketersediaan Proyek" : "Availability Status"}
                  </label>
                  <input
                    type="text"
                    value={formData.config.availability[lang]}
                    onChange={(e) => handleConfigBilingualChange('availability', lang, e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF4742]"
                  />
                </div>
              </div>
            )}

            {/* Tab: Stats */}
            {activeTab === 'stats' && (
              <div className="space-y-4 text-xs">
                <div className="text-slate-500 text-[11px] mb-2">
                  {lang === 'id'
                    ? "Ubah angka metrik dan label yang muncul di bilah 4-kolom bawah hero."
                    : "Edit the 4-column KPI metrics appearing directly beneath the hero split."}
                </div>
                {formData.stats.map((stat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700">Metrik #{idx + 1}</span>
                      <input
                        type="text"
                        value={stat.number}
                        onChange={(e) => handleStatChange(idx, 'number', null, e.target.value)}
                        placeholder="Contoh: 8+"
                        className="w-24 px-2.5 py-1 text-xs font-mono font-bold text-[#FF4742] bg-white rounded border border-slate-200 text-right"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Label (ID)</span>
                        <input
                          type="text"
                          value={stat.label.id}
                          onChange={(e) => handleStatChange(idx, 'label', 'id', e.target.value)}
                          className="w-full px-2 py-1 text-xs bg-white rounded border border-slate-200"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Label (EN)</span>
                        <input
                          type="text"
                          value={stat.label.en}
                          onChange={(e) => handleStatChange(idx, 'label', 'en', e.target.value)}
                          className="w-full px-2 py-1 text-xs bg-white rounded border border-slate-200"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Projects */}
            {activeTab === 'projects' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">
                    {lang === 'id' ? `Total Proyek: ${formData.projects.length}` : `Total Projects: ${formData.projects.length}`}
                  </span>
                  <button
                    type="button"
                    onClick={handleAddProject}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF4742] hover:bg-[#E63833] text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{lang === 'id' ? "Tambah Proyek" : "Add Project"}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.projects.map((proj, pIdx) => (
                    <div key={proj.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 font-serif text-sm">
                          {proj.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(pIdx)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"
                          title="Hapus proyek"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 block">Judul Proyek</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => handleProjectChange(pIdx, 'title', e.target.value)}
                            className="w-full px-2.5 py-1 text-xs rounded border border-slate-200"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block">Klien</label>
                          <input
                            type="text"
                            value={proj.client}
                            onChange={(e) => handleProjectChange(pIdx, 'client', e.target.value)}
                            className="w-full px-2.5 py-1 text-xs rounded border border-slate-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block">Deskripsi Singkat</label>
                        <input
                          type="text"
                          value={proj.subtitle}
                          onChange={(e) => handleProjectChange(pIdx, 'subtitle', e.target.value)}
                          className="w-full px-2.5 py-1 text-xs rounded border border-slate-200"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 block">Kategori</label>
                          <select
                            value={proj.category}
                            onChange={(e) => handleProjectChange(pIdx, 'category', e.target.value as any)}
                            className="w-full px-2 py-1 text-xs rounded border border-slate-200 bg-white"
                          >
                            <option value="ui-ux">UI/UX & Mobile</option>
                            <option value="branding">Identitas Brand</option>
                            <option value="web-app">Web App & SaaS</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block">Tahun</label>
                          <input
                            type="text"
                            value={proj.year}
                            onChange={(e) => handleProjectChange(pIdx, 'year', e.target.value)}
                            className="w-full px-2.5 py-1 text-xs rounded border border-slate-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block">URL / Path Gambar Proyek</label>
                        <input
                          type="text"
                          value={proj.image}
                          onChange={(e) => handleProjectChange(pIdx, 'image', e.target.value)}
                          className="w-full px-2.5 py-1 text-xs rounded border border-slate-200"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Export / Salin Kode */}
            {activeTab === 'export' && (
              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 leading-relaxed text-[11px]">
                  💡 <strong>Cara Menyimpan Permanen ke Kode:</strong>
                  <br />
                  Klik tombol <strong>&quot;Salin Konfigurasi (JSON)&quot;</strong> di bawah ini, atau Anda bisa langsung mengedit file <code>/src/data/portfolioData.ts</code> di workspace Anda.
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Pratinjau JSON:</span>
                  <button
                    onClick={handleCopyConfig}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? "Tersalin ke Clipboard!" : "Salin Konfigurasi"}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-[10px] max-h-72 overflow-y-auto leading-relaxed border border-slate-800">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Footer Bar with Save Button */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              {saveToast ? "✓ Perubahan diterapkan dan disimpan!" : "Perubahan tersimpan otomatis di browser"}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                {lang === 'id' ? "Selesai" : "Done"}
              </button>
              <button
                onClick={handleSaveAndApply}
                className="flex items-center gap-1.5 px-5 py-2 bg-[#FF4742] hover:bg-[#E63833] text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{lang === 'id' ? "Terapkan Perubahan" : "Apply Changes"}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
