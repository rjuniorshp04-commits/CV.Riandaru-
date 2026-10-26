# Portofolio Pribadi Modern Minimalis — RIANDARU

Web portofolio pribadi modern minimalis yang dibangun dengan **React**, **Tailwind CSS**, dan animasi halus **Framer Motion**. Dilengkapi dengan studi kasus bento grid, kalkulator estimasi proyek interaktif, pemilih dwibahasa (Indonesia / English), serta Visual Live Editor.

---

## 🚀 Panduan Publish ke GitHub Pages

Proyek ini sudah dikonfigurasi penuh dengan `base: './'` di Vite, dependensi `gh-pages`, dan file alur kerja otomatis `.github/workflows/deploy.yml`.

Anda dapat mem-publish website ini ke GitHub Pages menggunakan salah satu dari dua cara di bawah ini:

### 🌟 Cara 1: Otomatis via GitHub Actions (Paling Direkomendasikan)

1. **Buat Repositori Baru di GitHub**:
   - Buka [github.com/new](https://github.com/new).
   - Beri nama repositori, misalnya: `portofolio-riandaru`.
   - Pilih **Public** lalu klik **Create repository**.

2. **Hubungkan & Push Kode Anda**:
   Buka terminal di folder proyek ini dan jalankan:
   ```bash
   git init
   git add .
   git commit -m "feat: inisialisasi portofolio RIANDARU"
   git branch -M main
   git remote add origin https://github.com/<USERNAME-ANDA>/portofolio-riandaru.git
   git push -u origin main
   ```

3. **Aktifkan GitHub Pages di GitHub**:
   - Di halaman repositori GitHub Anda, klik menu **Settings** (di tab atas).
   - Di bilah menu kiri, pilih **Pages**.
   - Pada bagian **Build and deployment > Source**, ubah dari *"Deploy from a branch"* menjadi **"GitHub Actions"**.
   - Selesai! GitHub Actions akan otomatis menjalankan build dan menerbitkan website Anda. Alamat website Anda akan tersedia di:
     `https://<username-anda>.github.io/portofolio-riandaru/`

---

### ⚡ Cara 2: Manual via Perintah `npm run deploy`

Jika Anda ingin mendeploy langsung dari komputer tanpa GitHub Actions:

1. Pastikan repositori lokal sudah terhubung dengan remote GitHub:
   ```bash
   git remote add origin https://github.com/<USERNAME-ANDA>/portofolio-riandaru.git
   ```

2. Jalankan satu perintah deploy:
   ```bash
   npm run deploy
   ```
   *(Perintah ini akan otomatis menjalankan `npm run build` lalu mengunggah folder `dist` ke branch `gh-pages`)*.

3. Di GitHub -> **Settings** -> **Pages**:
   - Pilih Source: **Deploy from a branch**
   - Pilih Branch: **gh-pages** / folder `(root)`
   - Klik **Save**.

---

## 🛠️ Menjalankan di Komputer Lokal (Localhost)

```bash
# 1. Install dependencies
npm install

# 2. Jalankan server pengembangan
npm run dev

# 3. Build untuk produksi
npm run build

# 4. Preview hasil build produksi
npm run preview
```

---

## ✏️ Cara Mengedit Konten Portofolio

Ada 2 cara mudah untuk mengubah nama, foto, bio, atau daftar karya:

1. **Lewat Visual Editor di Browser**:
   - Klik tombol **"Edit Portofolio"** di pojok kanan bawah website.
   - Ubah teks, angka statistik, atau tambah proyek secara visual.
   - Perubahan langsung aktif dan tersimpan di browser Anda.

2. **Lewat File Kode Sumber**:
   - Buka file `src/data/portfolioData.ts`.
   - File ini berisi seluruh konfigurasi terpusat (Profil, Statistik KPI, Daftar Proyek, Layanan, Proses, dan Testimoni) dengan komentar panduan lengkap berbahasa Indonesia.

---

## 📄 Lisensi
Dilisensikan di bawah lisensi Apache-2.0.
