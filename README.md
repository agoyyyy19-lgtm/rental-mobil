# Ren-Car GEN Z — Website Rental Mobil (Multi-User)

Website rental mobil full-stack dengan Node.js, Express, EJS, dan SQLite.
Mendukung dua peran pengguna (**customer** & **admin**), lengkap dengan
dashboard masing-masing, favorit, notifikasi, reimburse, kotak masuk,
kalender booking, pengaturan akun, mode gelap, dan peta pelacakan lokasi
mobil yang sedang disewa.

## 🎨 Desain

- Beranda: dua banner promo biru berdampingan, search widget lokasi jemput/kembali
- Navbar: kolom pencarian (fungsional), ikon **Favorit**, **Notifikasi** (dropdown real-time),
  **Pengaturan**, dan **Dashboard** — semua aktif dan terhubung ke halaman sungguhan
- Halaman kategori: sidebar filter tipe mobil, kapasitas kursi, transmisi, slider harga
- Halaman detail: galeri, spesifikasi, ulasan pelanggan, mobil serupa, tombol favorit fungsional
- **Dashboard Admin**: statistik, donut chart kategori, transaksi terbaru, dan **peta interaktif**
  (Leaflet + OpenStreetMap) untuk melacak lokasi mobil yang sedang disewa di seluruh Indonesia
- **Dashboard Customer**: ringkasan booking aktif, mobil favorit, pengeluaran, dan aktivitas terbaru
- Sidebar Admin **Menu Utama** (Dashboard, Sewa Mobil, Wawasan, Reimburse, Kotak Masuk, Kalender)
  dan **Preferensi** (Pengaturan, Bantuan, Mode Gelap, Keluar) — seluruh menu sudah punya halaman & fungsi nyata
- Sidebar Customer dengan struktur serupa (Dashboard, Booking Saya, Riwayat Sewa, Favorit,
  Reimburse, Notifikasi, Pengaturan, Mode Gelap, Keluar)

**Tentang gambar mobil:** karena foto asli merk mobil (Toyota, Daihatsu, dll.) adalah
materi berlisensi milik pabrikan, situs ini menggunakan **ilustrasi SVG orisinal**
yang dibuat khusus per unit — setiap mobil punya siluet sesuai tipe bodi (sport, SUV,
sedan, hatchback, MPV), **warna aksen unik**, dan **plat nomor bergaya Indonesia**
(mis. `B 1234 XYZ`) sehingga setiap unit terlihat berbeda dan konsisten dengan identitas
lokal — tanpa risiko hak cipta foto stok. Nama & merk mobil (Avanza, Xenia, Ertiga,
Xpander, dll.) tetap memakai merk asli karena itu murni teks/data, bukan aset visual.
Jika Anda memiliki foto mobil sendiri, cukup taruh di `public/images/cars/` dan ganti
markup `car-svg` pada view terkait dengan tag `<img>`.

## ✨ Fitur Lengkap

### Navbar (semua halaman)
- 🔍 Pencarian mobil (nama, merk, kategori) — `GET /cari`
- ❤️ Favorit — toggle simpan/hapus mobil favorit langsung dari kartu mobil manapun
- 🔔 Notifikasi — dropdown daftar notifikasi terbaru + badge jumlah belum dibaca,
  klik → tandai dibaca & diarahkan ke halaman terkait
- ⚙️ Pengaturan — profil, kata sandi, preferensi (role-aware: admin/customer)
- 🧭 Tombol ke Dashboard sesuai peran

### Dashboard Admin (`/admin`)
| Menu | Rute | Fungsi |
|---|---|---|
| Dashboard | `/admin` | Statistik, donut kategori, transaksi terbaru, **peta lokasi rental aktif** |
| Sewa Mobil | `/admin/mobil` | Daftar seluruh unit & status |
| Wawasan | `/admin/wawasan` | Tren pendapatan 6 bulan, unit terlaris, status booking |
| Reimburse | `/admin/reimburse` | Tinjau & setujui/tolak pengajuan reimburse pelanggan |
| Kotak Masuk | `/admin/kotak-masuk` | Pesan masuk dari pelanggan, tandai dibaca |
| Kalender | `/admin/kalender` | Kalender bulanan jadwal jemput/kembali mobil |
| Pengaturan | `/admin/pengaturan` | Profil, ganti kata sandi, preferensi & mode gelap |
| Bantuan & Pusat | `/admin/bantuan` | FAQ pengelolaan sistem |
| Notifikasi | `/notifikasi` | Daftar lengkap notifikasi admin |

**Peta Lokasi Penyewa (Rental):** setiap mobil berstatus "Disewa" memiliki koordinat
lokasi (kota-kota besar Indonesia). Peta menggunakan Leaflet + OpenStreetMap (gratis,
tanpa API key) menampilkan marker tiap mobil beserta popup nama penyewa, plat nomor,
lokasi jemput/kembali, dan total sewa — klik item di daftar untuk fokus ke marker terkait.

### Dashboard Customer (`/dashboard`)
| Menu | Rute | Fungsi |
|---|---|---|
| Dashboard | `/dashboard` | Ringkasan booking aktif, favorit, pengeluaran |
| Booking Saya | `/dashboard/booking` | Booking yang menunggu pembayaran / sedang berjalan |
| Riwayat Sewa | `/dashboard/riwayat` | Booking selesai / dibatalkan |
| Favorit | `/dashboard/favorit` | Daftar mobil favorit |
| Reimburse | `/dashboard/reimburse` | Ajukan & lihat status reimburse |
| Notifikasi | `/notifikasi` | Daftar lengkap notifikasi customer |
| Pengaturan | `/dashboard/pengaturan` | Profil, kata sandi, preferensi & mode gelap |

### Mode Gelap
Toggle "Mode Gelap" pada sidebar admin maupun customer benar-benar berfungsi
(disimpan di `localStorage`, otomatis diterapkan setiap kali halaman dimuat, dan
dapat dijadikan default lewat halaman Pengaturan).

## 🗂️ Struktur Folder

```
rental-mobil/
├── server.js
├── database/
│   ├── db.js                  # Koneksi SQLite + auto-migrasi kolom baru
│   ├── schema.sql             # Struktur tabel lengkap
│   └── seed.js                # Data awal + akun demo + booking & lokasi demo
├── middleware/
│   └── auth.js                # attachUser (+ ringkasan notifikasi), requireAuth, requireRole
├── controllers/
│   ├── authController.js
│   ├── carController.js       # + integrasi status favorit
│   ├── bookingController.js
│   ├── adminController.js     # + wawasan, reimburse, inbox, kalender, bantuan, peta lokasi
│   ├── customerController.js  # dashboard, booking, riwayat, reimburse
│   ├── favoriteController.js  # toggle & daftar favorit
│   ├── notificationController.js
│   └── settingsController.js  # dipakai admin & customer
├── routes/
│   ├── pageRoutes.js, authRoutes.js, bookingRoutes.js
│   ├── adminRoutes.js
│   ├── customerRoutes.js
│   ├── favoriteRoutes.js
│   └── notificationRoutes.js
├── views/
│   ├── partials/ (header, footer, admin-side, customer-side, heart-btn, car-svg)
│   ├── admin/ (dashboard, cars, wawasan, reimburse, kotak-masuk, kalender, bantuan, pengaturan, notifikasi)
│   └── customer/ (dashboard, booking, riwayat, favorit, reimburse, pengaturan, notifikasi)
└── public/ (css/style.css, js/main.js)
```

## 🗄️ Struktur Data (SQLite)

| Tabel            | Keterangan                                                        |
|------------------|---------------------------------------------------------------------|
| `users`          | Akun (role customer/admin) + preferensi tema & notifikasi          |
| `categories`     | Kategori mobil                                                      |
| `cars`           | Unit mobil + `accent_color`, `plate_number`, `current_lat/lng` untuk peta |
| `bookings`       | Transaksi pemesanan                                                  |
| `payments`       | Riwayat pembayaran                                                   |
| `reviews`        | Ulasan pelanggan per mobil                                           |
| `favorites`      | Mobil favorit per pelanggan                                          |
| `notifications`  | Notifikasi per pengguna (admin & customer)                          |
| `messages`       | Kotak masuk pesan pelanggan → admin                                 |
| `reimbursements` | Pengajuan reimburse pelanggan                                        |

Skema lengkap ada di `database/schema.sql`. Database (`rental.db`) otomatis dibuat
dan diisi data contoh saat pertama kali server dijalankan.

## 🚀 Cara Menjalankan

```bash
cd rental-mobil
npm install
cp .env.example .env
npm start
```

Lalu buka **http://localhost:3000**.

### Akun Demo
- **Admin** → `admin@rencargenz.com` / `admin123`
- **Customer** → `customer@rencargenz.com` / `customer123`
  (sudah punya booking aktif, riwayat, favorit, notifikasi, dan reimburse contoh)
- Atau daftar akun baru lewat `/register`

Saat pertama kali dijalankan, seed otomatis membuat beberapa mobil berstatus
"Disewa" dengan lokasi tersebar di Jakarta, Bandung, Surabaya, Yogyakarta, dan
Denpasar — sehingga peta pelacakan di Dashboard Admin langsung terisi data.

## 🔒 Keamanan

- Password ter-hash dengan bcrypt.
- Sesi login dikelola `express-session`.
- `requireAuth` melindungi seluruh rute customer (booking, favorit, dashboard, dll).
- `requireRole('admin')` melindungi seluruh rute `/admin/*`.
- Setiap booking, favorit, dan notifikasi hanya bisa diakses oleh pemiliknya sendiri.

## 🧩 Pengembangan Selanjutnya (opsional)

- Upload foto mobil asli (saat ini memakai ilustrasi SVG + plat nomor bergaya Indonesia)
- Notifikasi email sungguhan (saat ini notifikasi hanya tersimpan di database/dashboard)
- Update lokasi mobil secara real-time via GPS device / API pihak ketiga
- Fitur balas pesan langsung dari Kotak Masuk admin
