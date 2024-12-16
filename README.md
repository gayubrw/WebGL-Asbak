# Asbak WebGL

Proyek ini merupakan implementasi asbak segi delapan 3D interaktif menggunakan WebGL. Proyek ini mendemonstrasikan pemrograman grafis 3D dengan WebGL, termasuk pembuatan geometri, pencahayaan, dan interaksi pengguna.

## Pembuat
- **Nama:** Gayu Baruwa
- **NRP:** 5025221247

## Fitur
- Asbak segi delapan 3D dengan geometri realistis
- Rotasi interaktif ke segala arah menggunakan drag mouse
- Fungsi zoom in/out menggunakan scroll mouse
- Double-click untuk mengembalikan tampilan ke posisi awal
- Efek pencahayaan dan bayangan yang halus
- Desain eksterior hitam dengan interior putih

## Screenshot
![image](https://github.com/user-attachments/assets/7a3b38c1-0306-42b7-b9c5-4c9f4a0d618f)
*Tampilan atas asbak menunjukkan bentuk segi delapan*

![image](https://github.com/user-attachments/assets/b442ead2-a579-4049-9671-2741ed02a62a)
*Tampilan perspektif menunjukkan kedalaman dan detail bagian dalam*

## Struktur Proyek
```
WebGL-Asbak/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js         # Inisialisasi dan pengaturan utama
│   ├── webgl.js        # Konteks WebGL dan rendering
│   ├── controls.js     # Kontrol interaksi pengguna
│   ├── shaders.js      # Program shader GLSL
│   ├── buffers.js      # Pembuatan geometri dan buffer
│   └── matrix.js       # Operasi matriks untuk transformasi 3D
```

## Teknologi yang Digunakan
- WebGL
- JavaScript
- HTML5
- CSS3

## Detail Implementasi

### Geometri
Asbak terdiri dari beberapa komponen geometris:
- Tepian luar segi delapan
- Cekungan bagian dalam dengan transisi halus
- Dinding vertikal
- Permukaan dasar yang rata

### Pencahayaan
Mengimplementasikan model pencahayaan dasar dengan:
- Pencahayaan ambient
- Refleksi diffuse
- Highlight specular

### Kontrol Pengguna
- **Rotasi:** Klik dan drag untuk memutar ke segala arah
- **Zoom:** Scroll mouse untuk zoom in/out
- **Reset:** Double-click untuk kembali ke tampilan default

## Cara Menjalankan
1. Clone repository:
```bash
git clone https://github.com/gayubrw/WebGL-Asbak.git
```

2. Buka proyek:
- Masuk ke direktori proyek
- Buka `index.html` di browser web modern

## Persyaratan
- Browser web dengan dukungan WebGL
- JavaScript diaktifkan

## Catatan Pengembangan
- Menggunakan JavaScript murni tanpa library eksternal
- Implementasi operasi matriks custom
- Pipeline rendering berbasis shader
