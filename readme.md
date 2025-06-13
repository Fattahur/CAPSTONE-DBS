# CAPSTONE-DBS

Proyek ini merupakan sistem berbasis web yang mengintegrasikan scraping data, analisis sentimen, ringkasan cerita budaya, serta sistem manajemen backend dan antarmuka frontend.

## Struktur Proyek

```
CAPSTONE-DBS-main/
├── backend/                # Backend (Node.js, Express)
├── dist/                   # Output Webpack (Frontend Build)
├── public/                 # Gambar Publik
├── src/                    # Source Frontend (JavaScript, CSS)
├── sentimen/               # Model Sentimen
├── scrapping dataset/     # Scraping dan Dataset
├── dtstemotinal dan summarize/ # Ringkasan dan Sentimen Data
├── Training & Evaluasi Model/  # Notebook pelatihan ML
├── template_pipeline/     # Pipeline & Model Evaluasi
```

## Panduan Menjalankan Proyek

### 1. Jalankan Backend (Express.js)

**Masuk ke folder backend:**

```bash
cd backend
```

**Instal dependencies:**

```bash
npm install
```

**Jalankan server:**

```bash
node server.js
```

Pastikan file `.env` telah terisi dengan konfigurasi database MongoDB jika diperlukan.

### 2. Jalankan Frontend

**Masuk ke folder utama dan instal dependencies:**

```bash
npm install
```

**Build menggunakan Webpack:**

```bash
npm run build
```

**Buka file **``** di browser** untuk melihat antarmuka aplikasi.

### 3. Jalankan Notebook Model

Masuk ke folder `Training & Evaluasi Model/` atau `template_pipeline/`, lalu buka salah satu notebook berikut di Jupyter:

- `training&evaluasi.ipynb`
- `Pipeline_Training_Awal_Fixed.ipynb`
- `evaluate_model.ipynb`

Pastikan semua dependensi seperti `scikit-learn`, `pandas`, `tensorflow`, dll. telah terinstall.

### 4. Analisis Sentimen & Ringkasan

Script analisis sentimen dan ringkasan terletak di:

- `sentimen/sentimenposneg.ipynb`
- `dtstemotinal dan summarize/sum.py`

Gunakan model yang sudah dilatih (`sentimen/sentiment_model.h5`) dan dataset (`sentiment_budaya_dataset.csv`).

## Dependencies Utama

Frontend:

- JavaScript Vanilla + Webpack
- IndexedDB (local storage)

Backend:

- Node.js, Express
- Multer (upload file)

Machine Learning:

- TensorFlow / Keras
- Scikit-learn
- Pandas / Numpy

## Penulis

Fattahur Rohim – Mahasiswa Teknik Informatika

---

Untuk dokumentasi lanjutan atau pertanyaan, silakan hubungi penulis atau lihat setiap folder yang telah dikomentari.

