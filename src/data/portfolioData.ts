/**
 * ============================================================================
 * PUSAT PENGATURAN KONTEN PORTOFOLIO (PORTFOLIO CONFIGURATION)
 * ============================================================================
 * Anda dapat dengan mudah mengedit seluruh teks, nama, tautan, statistik,
 * dan daftar proyek portofolio Anda langsung di file ini.
 *
 * Tips:
 * - Ganti "Haris F. Watson" dengan nama Anda.
 * - Ganti "heroPortrait" dengan path gambar foto Anda atau link URL foto.
 * - Ubah email dan nomor kontak sesuai akun Anda.
 * - Tambah atau kurangi proyek pada daftar `projectsData`.
 * ============================================================================
 */

import { FullPortfolioData, PortfolioConfig, StatItem, Project, Service, ProcessStep, Testimonial } from '../types';

/* ============================================================================
 * 1. INFORMASI PROFIL & BIO UTAMA (HERO SECTION & IDENTITAS)
 * ============================================================================ */
export const portfolioConfig: PortfolioConfig = {
  // Nama lengkap Anda yang tampil di header dan judul hero
  name: "RIANDARU",

  // Jabatan / spesialisasi keahlian
  roleTitle: {
    id: "Desainer Produk & UI/UX Digital",
    en: "Digital Product & UI/UX Designer",
  },

  // Tagline kecil berhuruf kapital di atas judul
  tagline: "GET EVERY SINGLE SOLUTIONS.",

  // Foto profil utama. Menggunakan foto baru dengan latar studio template
  heroPortrait: "/assets/aistudio/user_portrait_template.jpg",

  // Paragraf deskripsi bio Anda
  bio: {
    id: "Menciptakan antarmuka digital modern, sistem desain terstruktur, dan pengalaman pengguna yang intuitif dengan memadukan presisi estetika dan dampak bisnis yang nyata.",
    en: "Crafting modern digital interfaces, scalable design systems, and intuitive user experiences that seamlessly fuse aesthetic elegance with measurable business impact.",
  },

  // Kontak resmi
  email: "rianw2238@gmail.com",
  phone: "+62 812-8899-7721",
  location: "Jakarta & Global Remote",

  // Status ketersediaan menerima proyek baru
  availability: {
    id: "Tersedia untuk Proyek Baru Q2 / Q3",
    en: "Available for Q2 / Q3 New Projects",
  },

  // Tautan akun sosial media / profesional
  socials: [
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "Dribbble", url: "https://dribbble.com" },
    { name: "GitHub", url: "https://github.com" },
    { name: "Figma", url: "https://figma.com" },
  ],
};

/* ============================================================================
 * 2. STATISTIK ANGKA (KPI METRICS STRIP)
 * ============================================================================ */
export const statsData: StatItem[] = [
  {
    number: "8+",
    label: { id: "Tahun Pengalaman", en: "Years Experience" },
    detail: { id: "Di bidang UI/UX & Produk Digital", en: "In UI/UX & Digital Product Design" },
  },
  {
    number: "120+",
    label: { id: "Proyek Selesai", en: "Projects Completed" },
    detail: { id: "Aplikasi mobile, web, dan SaaS", en: "Mobile apps, web & SaaS platforms" },
  },
  {
    number: "98.5%",
    label: { id: "Kepuasan Klien", en: "Client Satisfaction" },
    detail: { id: "Rating bintang 5 dari 50+ startup", en: "5-star rating from 50+ tech teams" },
  },
  {
    number: "14",
    label: { id: "Penghargaan Desain", en: "Design Awards" },
    detail: { id: "Awwwards, CSSDA, dan Behance Featured", en: "Awwwards, CSSDA & Behance Featured" },
  },
];

/* ============================================================================
 * 3. DAFTAR PROYEK / STUDI KASUS PILIHAN (SELECTED WORKS)
 * ============================================================================ */
export const projectsData: Project[] = [
  {
    id: "aura-pay",
    title: "Aura Pay — Mobile Banking",
    subtitle: "Solusi keuangan digital modern dengan fokus kemudahan transaksi dan privasi",
    category: "ui-ux",
    categoryLabel: { id: "UI/UX & Mobile", en: "UI/UX & Mobile" },
    year: "2026",
    client: "Aura Technologies Inc.",
    role: { id: "Lead UI/UX Designer & Prototyper", en: "Lead UI/UX Designer & Prototyper" },
    timeline: "3 Bulan",
    tools: ["Figma", "Design Tokens", "React Native Prototype", "Framer"],
    image: "/src/assets/images/project_fintech_app_1792985087825.jpg",
    summary: {
      id: "Redesain menyeluruh aplikasi perbankan digital generasi baru dengan arsitektur navigasi bersih, visualisasi saldo adaptif, dan alur transfer 1-sentuhan.",
      en: "A comprehensive redesign of a next-generation mobile banking app featuring clean navigation architecture, adaptive balance visualization, and one-tap transfer flows.",
    },
    challenge: {
      id: "Pengguna sering merasa kewalahan dengan menu perbankan konvensional yang rumit dan banyak teks kecil, menyebabkan drop-off transaksi hingga 28%.",
      en: "Users felt overwhelmed by dense menus and fine print in conventional banking apps, driving a 28% drop-off in multi-currency transfers.",
    },
    solution: {
      id: "Membangun hierarki informasi bertingkat dengan kartu saldo modular, tipografi terukur, dan interaksi mikro haptik yang memberi rasa percaya diri saat bertransaksi.",
      en: "Architected a tiered hierarchy with modular balance cards, clear contrast typography, and subtle micro-haptics that inspire confidence during transactions.",
    },
    impact: [
      { id: "Peningkatan retensi 30 hari sebesar +42%", en: "+42% increase in 30-day retention" },
      { id: "Waktu transaksi turun dari 48s ke 14s", en: "Transfer completion time reduced from 48s to 14s" },
      { id: "Rating App Store naik menjadi 4.9/5.0", en: "App Store rating elevated to 4.9/5.0" },
    ],
    deliverables: ["User Research & Journey Map", "Design System (50+ Components)", "High-Fidelity UI Screens", "Interactive Micro-interactions"],
  },
  {
    id: "aesthete-architects",
    title: "Aesthete Studio — Brand & Monograph",
    subtitle: "Identitas visual editorial dan sistem publikasi untuk biro arsitektur kontemporer",
    category: "branding",
    categoryLabel: { id: "Identitas Brand", en: "Brand Identity" },
    year: "2025",
    client: "Aesthete Architectural Bureau",
    role: { id: "Brand Strategist & Art Director", en: "Brand Strategist & Art Director" },
    timeline: "2 Bulan",
    tools: ["Illustrator", "InDesign", "Figma", "Print Craft Spec"],
    image: "/src/assets/images/project_luxury_identity_1792985088029.jpg",
    summary: {
      id: "Pengembangan sistem identitas merek komprehensif, panduan tipografi serif bespoke, cetakan lookbook eksklusif, dan pedoman digital untuk firma arsitektur kelas atas.",
      en: "Development of a comprehensive brand identity system, custom editorial serif typography guidelines, luxury lookbook print collateral, and digital style guides.",
    },
    challenge: {
      id: "Klien membutuhkan identitas yang mencerminkan ketelitian teknik sekaligus keindahan puitis material alami tanpa terlihat kaku atau generik.",
      en: "The studio needed an identity communicating both engineering precision and poetic warmth without feeling cold or generic.",
    },
    solution: {
      id: "Kombinasi palet warna netral linen dengan aksen hijau pinus gelap, logo monogram bergaris halus, dan panduan layout monograf modular berbasis rasio emas.",
      en: "Blended natural linen neutrals with deep pine accents, a hairline monogram ligature, and a golden-ratio based modular monograph layout grid.",
    },
    impact: [
      { id: "Membantu memenangkan 3 tender arsitektur internasional", en: "Helped secure 3 major international architecture bids" },
      { id: "Ditampilkan di majalah desain arsitektur terkemuka", en: "Featured in international architectural monograph publications" },
      { id: "Konsistensi identitas 100% di 12 titik kontak brand", en: "100% brand guideline consistency across 12 physical and digital touchpoints" },
    ],
    deliverables: ["Brand Strategy & Positioning", "Logo & Monogram Suite", "Monograph Book Design", "Digital Identity Guidelines"],
  },
  {
    id: "metabolic-sync",
    title: "Metabolic Sync — Biometric Dashboard",
    subtitle: "Platform analitik kesehatan dan metabolisme berbasis data real-time",
    category: "web-app",
    categoryLabel: { id: "Aplikasi Web / SaaS", en: "Web Application / SaaS" },
    year: "2025",
    client: "Sync Health Labs",
    role: { id: "Product Designer & UI Engineer", en: "Product Designer & UI Engineer" },
    timeline: "4 Bulan",
    tools: ["Figma", "Tailwind CSS", "Data Visualization", "React"],
    image: "/src/assets/images/project_analytics_ui_1792985088090.jpg",
    summary: {
      id: "Platform dasbor telemetri kesehatan modern yang menyederhanakan data biometrik kompleks (glukosa, detak jantung, laju metabolisme) menjadi grafik yang dapat dipahami dalam sekejap.",
      en: "A modern health telemetry dashboard translating complex biometric streams (glucose, resting metabolic rate, HRV) into immediate, legible insights.",
    },
    challenge: {
      id: "Data sensor terus mengalir setiap menit, menyebabkan kelebihan beban informasi bagi pengguna dan tenaga medis.",
      en: "Continuous biometric data streams created cognitive overload for both clinical teams and patient users.",
    },
    solution: {
      id: "Desain dark-mode terkalibrasi dengan kontras rasio tinggi, komponen kartu metrik yang dapat disesuaikan, dan indikator tren kontekstual yang menghindari alarm palsu.",
      en: "Engineered a calibrated dark-mode interface with high contrast ratios, customizable metric widgets, and contextual trend indicators that prevent alarm fatigue.",
    },
    impact: [
      { id: "Pengurangan waktu diagnosa awal dokter sebesar 35%", en: "35% faster initial diagnostics for clinical monitoring teams" },
      { id: "Aktivitas harian pengguna meningkat sebesar 4.8x", en: "Daily active user engagement multiplied by 4.8x" },
      { id: "Zero usability errors selama uji klinis fase II", en: "Zero critical usability errors during Phase II validation testing" },
    ],
    deliverables: ["Telemetry Dashboard Architecture", "Custom Chart & Graph Components", "Design Token Library", "Clinician Persona Workflows"],
  },
  {
    id: "nordenform-commerce",
    title: "Nordenform — Scandinavian Furniture",
    subtitle: "Pengalaman belanja digital minimalis untuk furnitur dan perabot arsitektural",
    category: "web-app",
    categoryLabel: { id: "E-Commerce & Web", en: "E-Commerce & Web" },
    year: "2024",
    client: "Studio Holm Copenhagen",
    role: { id: "Lead Digital Experience Designer", en: "Lead Digital Experience Designer" },
    timeline: "2.5 Bulan",
    tools: ["Figma", "Interactive Prototyping", "Shopify Headless UI"],
    image: "/src/assets/images/project_minimal_commerce_1792985088506.jpg",
    summary: {
      id: "Pengalaman e-commerce editorial yang memadukan galeri foto furnitur resolusi tinggi, penjelajah material kain/kayu interaktif, dan alur checkout tanpa friksi.",
      en: "An editorial e-commerce experience marrying high-resolution furniture photography, interactive material tactile selectors, and frictionless checkout flow.",
    },
    challenge: {
      id: "Membeli furnitur premium secara online sering terkendala ketidakpastian skala dan tekstur material asli.",
      en: "High-ticket Scandinavian furniture buyers hesitated due to scale uncertainty and tactile texture disconnect.",
    },
    solution: {
      id: "Tata letak berbasis ruang negatif lebar, tipografi editorial elegan, dan visualisasi dimensi ruang interaktif yang memberikan ketenangan visual maksimal.",
      en: "Structured generous negative space grids, stately editorial typography, and interactive dimensions visualizers creating a serene, museum-quality shopping experience.",
    },
    impact: [
      { id: "Peningkatan Average Order Value (AOV) sebesar +28%", en: "+28% increase in Average Order Value (AOV)" },
      { id: "Waktu checkout dipersingkat 40%", en: "Checkout completion time accelerated by 40%" },
      { id: "Peningkatan konversi mobile sebesar +54%", en: "+54% conversion boost across mobile viewports" },
    ],
    deliverables: ["Complete E-Commerce UI Kit", "Interactive Material Explorer", "Checkout Optimization", "Responsive Mobile Layouts"],
  },
];

/* ============================================================================
 * 4. LAYANAN & JASA DESAIN (SERVICES SECTION)
 * ============================================================================ */
export const servicesData: Service[] = [
  {
    number: "01",
    title: { id: "Desain Produk & UI/UX Digital", en: "Digital Product & UI/UX Design" },
    description: {
      id: "Merancang aplikasi mobile (iOS & Android) dan web interaktif dari riset pengguna, wireframing, arsitektur informasi, hingga antarmuka akhir berkualitas produksi.",
      en: "Architecting mobile apps and web platforms from user research, wireframing, and information architecture through to production-grade high-fidelity interfaces.",
    },
    deliverables: [
      { id: "Riset Pengguna & Persona", en: "User Research & Personas" },
      { id: "Wireframe & User Flow Arsitektur", en: "Wireframing & User Flows" },
      { id: "Desain UI High-Fidelity", en: "High-Fidelity UI Screens" },
      { id: "Prototipe Interaktif", en: "Interactive Motion Prototypes" },
    ],
  },
  {
    number: "02",
    title: { id: "Sistem Desain & Arsitektur Komponen", en: "Design Systems & Component Architecture" },
    description: {
      id: "Membangun fondasi desain yang konsisten, terukur, dan efisien dengan token warna, tipografi, dan ratusan komponen siap pakai di Figma dan kode.",
      en: "Building unified, scalable design foundations with color tokens, typography scales, and modular components ready for seamless design-to-code parity.",
    },
    deliverables: [
      { id: "Design Tokens & Variable Sets", en: "Design Tokens & Variable Sets" },
      { id: "Figma Component Library", en: "Figma Component Library" },
      { id: "Dokumentasi & Guideline Penggunaan", en: "Usage Guidelines & Documentation" },
      { id: "Aksesibilitas Standar WCAG AA", en: "WCAG AA Accessibility Compliance" },
    ],
  },
  {
    number: "03",
    title: { id: "Strategi Identitas Brand & Arah Seni", en: "Brand Identity & Art Direction" },
    description: {
      id: "Membentuk narasi merek visual yang berkarakter kuat, elegan, dan membedakan produk Anda di pasar yang kompetitif.",
      en: "Crafting distinctive visual brand narratives with bespoke typography, curated color stories, and art direction that commands attention.",
    },
    deliverables: [
      { id: "Logo & Sistem Tipografi Monogram", en: "Logo Suite & Monograms" },
      { id: "Brand Book & Pedoman Visual", en: "Comprehensive Brand Guidelines" },
      { id: "Aset Digital & Media Sosial", en: "Digital & Social Media Kits" },
      { id: "Arah Fotografi & Konten", en: "Photography & Art Direction" },
    ],
  },
  {
    number: "04",
    title: { id: "Creative Development & Prototyping", en: "Creative Development & Prototyping" },
    description: {
      id: "Menjembatani jarak antara konsep desain dan kode fungsional menggunakan React, Tailwind CSS, dan animasi Framer Motion yang mulus.",
      en: "Bridging the gap between conceptual design and production code using React, Tailwind CSS, and silky 60fps Framer Motion interactions.",
    },
    deliverables: [
      { id: "Prototipe Interaktif React", en: "Interactive React Prototypes" },
      { id: "Implementasi Tailwind CSS Responsif", en: "Responsive Tailwind CSS Layouts" },
      { id: "Animasi Transisi Framer Motion", en: "Framer Motion Micro-interactions" },
      { id: "Handoff Kode Siap Tim Engineer", en: "Production-ready Developer Handoff" },
    ],
  },
];

/* ============================================================================
 * 5. METODOLOGI & ALUR KERJA (PROCESS SECTION)
 * ============================================================================ */
export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: { id: "Eksplorasi & Riset Mendalam", en: "Discovery & Strategic Alignment" },
    description: {
      id: "Memahami tujuan bisnis, menganalisis kompetitor, membedah kebutuhan audiens utama, dan menetapkan metrik keberhasilan proyek.",
      en: "Deep dive into business goals, competitive landscape, user pain points, and define quantitative project success metrics.",
    },
    duration: "Minggu 1",
  },
  {
    step: "02",
    title: { id: "Arsitektur & Konseptualisasi", en: "Architecture & Structural Framing" },
    description: {
      id: "Menyusun peta alur pengguna (user journeys), arsitektur informasi terstruktur, dan wireframe awal untuk menguji alur tanpa distraksi.",
      en: "Mapping user journeys, structuring information architecture, and rapid low-fidelity wireframing to validate user flows early.",
    },
    duration: "Minggu 2",
  },
  {
    step: "03",
    title: { id: "Desain Visual & Interaksi Halus", en: "High-Fidelity UI & Motion Craft" },
    description: {
      id: "Mengembangkan antarmuka visual pixel-perfect dengan tipografi elegan, palet warna berkarakter, dan animasi mikro responsif.",
      en: "Crafting pixel-perfect visual interfaces with refined typography, purposeful color hierarchy, and responsive micro-interactions.",
    },
    duration: "Minggu 3-4",
  },
  {
    step: "04",
    title: { id: "Validasi, Handoff & Peluncuran", en: "Validation, Handoff & Launch" },
    description: {
      id: "Uji kegunaan, optimasi responsif lintas perangkat, dokumentasi lengkap untuk developer, serta pendampingan saat go-live.",
      en: "Usability testing, cross-device polish, developer-ready design token handoff, and hands-on guidance through product launch.",
    },
    duration: "Minggu 5",
  },
];

/* ============================================================================
 * 6. TESTIMONI KLIEN (TESTIMONIALS SECTION)
 * ============================================================================ */
export const testimonialsData: Testimonial[] = [
  {
    quote: {
      id: "RIANDARU memiliki insting visual langka yang memadukan keanggunan minimalis dengan pemahaman teknis produk yang sangat kuat. Aura Pay melonjak 42% dalam retensi berkat sentuhannya.",
      en: "Riandaru possesses that rare synthesis of minimalist aesthetic restraint and deep technical product understanding. Our 30-day retention climbed 42% after his redesign.",
    },
    name: "Ardiansyah Pratama",
    role: "VP of Product",
    company: "Aura Technologies",
    metric: "+42% User Retention",
  },
  {
    quote: {
      id: "Bekerja bersama RIANDARU sangat menyenangkan dan efisien. Sistem desain yang ia susun sangat rapi hingga tim engineer kami bisa mengimplementasikan UI tanpa hambatan sedikit pun.",
      en: "Collaborating with Riandaru was remarkably efficient. The design system he architected was so pristine that our engineering team shipped weeks ahead of schedule.",
    },
    name: "Elena Rostova",
    role: "Co-Founder & CEO",
    company: "Sync Health Labs",
    metric: "Shipped 3 Weeks Ahead",
  },
  {
    quote: {
      id: "Identitas merek dan monograf cetak yang RIANDARU rancang mengangkat citra biro kami ke tingkat global. Tiga tender besar berhasil kami menangkan berkat presentasi visualnya.",
      en: "The brand identity and monograph Riandaru delivered elevated our firm to the international stage. We closed three major architectural bids directly following the rebrand.",
    },
    name: "Marcus Lindqvist",
    role: "Principal Architect",
    company: "Aesthete Architectural Bureau",
    metric: "3 Major Bids Won",
  },
];

/**
 * Data lengkap gabungan untuk memudahkan akses dan live editing
 */
export const initialPortfolioData: FullPortfolioData = {
  config: portfolioConfig,
  stats: statsData,
  projects: projectsData,
  services: servicesData,
  process: processSteps,
  testimonials: testimonialsData,
};
