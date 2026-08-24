# 📖 1932 Lezzet Mührü - Teknik Dokümantasyon

> **Veritabanı Şeması, REST API Endpoints & Mimari Dokümantasyon**

---

## 🛠️ Kullanılan Teknolojiler ve Araçlar

![NodeJS](https://shields.io)
![Express.js](https://shields.io)
![SQLite](https://shields.io)
![JavaScript](https://shields.io)
![Git](https://shields.io)
![HTML5](https://shields.io)
![CSS3](https://shields.io)

---

## 🚀 Kurulum ve Çalıştırma

1. Projeyi bilgisayarınıza indirin (Git yüklü olmalıdır):
   ```bash
   git clone <github-linkiniz>
   cd 1932-lezzet-muhru
   ```
2. Gerekli paketleri kurun:
   ```bash
   npm install
   ```
3. Sunucuyu başlatın:
   ```bash
   npm start
   ```
4. Tarayıcınızdan `http://localhost:3000` adresine gidin.

---

## 🗄️ 1. Veritabanı Şeması (SQLite Mimarisi)

Veritabanı `server/lezzet_muhru.db` dosyasında yer almakta olup 5 ana tablodan oluşmaktadır:

### 1.1 `kategoriler` Tablosu
Restoran menüsündeki ürün kategorilerini saklar.
```sql
CREATE TABLE IF NOT EXISTS kategoriler (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ad TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sira INTEGER DEFAULT 0
);
```

### 1.2 `urunler` Tablosu
Restoran menüsündeki yemek ve içecek detaylarını saklar.
```sql
CREATE TABLE IF NOT EXISTS urunler (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kategori_id INTEGER NOT NULL,
  ad TEXT NOT NULL,
  aciklama TEXT,
  fiyat REAL NOT NULL,
  resim TEXT,
  loading TEXT DEFAULT 'lazy',
  one_cikan INTEGER DEFAULT 0,
  sefin_onerisi INTEGER DEFAULT 0,
  vejetaryen INTEGER DEFAULT 0,
  aktif INTEGER DEFAULT 1,
  FOREIGN KEY (kategori_id) REFERENCES kategoriler(id) ON DELETE CASCADE
);
```

### 1.3 `rezervasyonlar` Tablosu
Müşterilerin oluşturduğu masa rezervasyon verilerini saklar.
```sql
CREATE TABLE IF NOT EXISTS rezervasyonlar (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ad_soyad TEXT NOT NULL,
  telefon TEXT NOT NULL,
  tarih TEXT NOT NULL,
  saat TEXT NOT NULL,
  kisi_sayisi INTEGER NOT NULL,
  masa_bolgesi TEXT DEFAULT 'İç Mekan',
  notlar TEXT,
  durum TEXT DEFAULT 'Beklemede',
  olusturulma_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 1.4 `mesajlar` Tablosu
İletişim sayfasından gönderilen müşteri mesajlarını saklar.
```sql
CREATE TABLE IF NOT EXISTS mesajlar (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ad_soyad TEXT NOT NULL,
  eposta TEXT NOT NULL,
  konu TEXT NOT NULL,
  mesaj TEXT NOT NULL,
  durum TEXT DEFAULT 'Okunmadı',
  olusturulma_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 1.5 `admin` Tablosu
Yönetim paneline giriş yapabilen yetkili kullanıcı hesaplarını saklar.
```sql
CREATE TABLE IF NOT EXISTS admin (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kullanici_adi TEXT UNIQUE NOT NULL,
  sifre_hash TEXT NOT NULL,
  eposta TEXT DEFAULT 'admin@lezzetmuhru.com',
  son_giris DATETIME
);
```

---

## 📡 2. REST API Endpoint Listesi

Sunucu varsayılan olarak `http://localhost:3000` portunda yayın yapmaktadır.

### 🌐 Halka Açık (Public) Endpoints

| Metot | Endpoint | Açıklama | Parametreler / Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/kategoriler` | Tüm aktif ürün kategorilerini sırasıyla getirir. | - |
| `GET` | `/api/menu` | Yayındaki tüm menü ürünlerini kategorileriyle getirir. | - |
| `POST` | `/api/rezervasyon` | Yeni müşteri masa rezervasyonu kaydeder. | `{ name, phone, date, time, guests, area, notes }` |
| `POST` | `/api/rezervasyon-sorgula` | Telefon numarasıyla rezervasyon durumunu sorgular. | `{ phone }` |
| `POST` | `/api/iletisim` | İletişim sayfasından yeni mesaj kaydeder. | `{ name, email, subject, message }` |
| `GET` | `/api/status` | Backend sunucu ve veritabanı canlılık durumunu döner. | - |

---

### 🛡️ Yönetici (Admin - Session Korumalı) Endpoints

| Metot | Endpoint | Açıklama | Parametreler / Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/admin/login` | Yönetici girişi yapar, session başlatır. | `{ username, password }` |
| `POST` | `/api/admin/logout` | Yönetici oturumunu sonlandırır. | - |
| `GET` | `/api/admin/check-auth` | Oturumun aktif olup olmadığını doğrular. | - |
| `GET` | `/api/rezervasyonlar` | Tüm rezervasyon kayıtlarını listeler. | - |
| `POST` | `/api/rezervasyonlar/durum/:id` | Rezervasyon durumunu günceller (`Onaylandı`, `İptal Edildi`). | `{ durum }` |
| `DELETE` | `/api/rezervasyonlar/:id` | Rezervasyon kaydını veritabanından siler. | - |
| `GET` | `/api/mesajlar` | Müşterilerden gelen tüm iletişim mesajlarını listeler. | - |
| `POST` | `/api/mesajlar/durum/:id` | İletişim mesajını okundu olarak işaretler. | `{ durum }` |
| `DELETE` | `/api/mesajlar/:id` | İletişim mesajını siler. | - |
| `POST` | `/admin/urun` | Menüye yeni yemek ekler. | `{ kategori_id, ad, aciklama, fiyat, resim, one_cikan, sefin_onerisi, vejetaryen }` |
| `PUT` | `/admin/urun/:id` | Mevcut yemeğin bilgilerini günceller. | `{ kategori_id, ad, aciklama, fiyat, resim, one_cikan, sefin_onerisi, vejetaryen, aktif }` |
| `DELETE` | `/admin/urun/:id` | Yemeği menüden tamamen siler. | - |

---

## 🎨 3. Mimari ve Kaynak Yönetimi

* **Sürüm Kontrolü (Git):** 
  Projenin kaynak kodları, düzenli commit'ler ve anlamlı dallanma (branching) stratejileri kullanılarak Git mimarisi altında izlenmektedir. `node_modules` ve yerel SQLite veritabanı `.gitignore` dosyası ile kapsam dışı bırakılmıştır.
* **Dinamik PDF Menü Motoru (`public/js/main.js` -> `window.generateDynamicMenuPDF`):**
  İstemci tarafında `html2canvas` ile DOM elemanlarını yüksek çözünürlüklü canvas'a dönüştürür ve `jsPDF` ile A4 standartlarında 2 sayfa kapalı altın çerçeveli PDF üreterek indirtir.
* **Atmosfer & Dil Yönetimi (`public/js/translations.js`):**
  Tüm metinler `data-translate` niteliği ile işaretlenmiş olup sayfa yenilenmeden Türkçe / İngilizce geçişi sağlar. Seçim verisi tarayıcı hafızasındaki `localStorage` üzerinde kaydedilir.

---

## 🎨 4. CSS Responsive Mimarisi ve Görsel Kadrajlama Kuralları (`style.css`)

### 4.1 Breakpoint Kırılım Standartları
* **320px - 360px Ultra Mobil:**
  - `.live-status-badge`: `flex: 0 0 auto; width: fit-content; max-width: max-content; margin-right: auto;`
  - `.main-footer .footer-container`: `display: flex; flex-direction: column; text-align: left;`
* **320px - 600px Mobil:**
  - `.services-banner`: `display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;`
  - `.table-responsive`: `overflow-x: auto; -webkit-overflow-scrolling: touch;`
  - `.hours-table`: `min-width: 480px; white-space: nowrap;`
* **768px Tablet (601px - 900px):**
  - `#menu-grid, .dishes-grid`: `display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px;`
  - `.hero-section`: `padding-top: 15px; margin-top: 0;`
  - `.contact-wrapper`: `display: flex; flex-direction: column; gap: 25px;`
* **1024px Ekran (901px - 1100px):**
  - `.filter-buttons`: `display: flex; flex-wrap: nowrap; gap: 10px; justify-content: flex-start;`
  - `.filter-btn`: `font-family: 'Inter'; font-weight: 600; letter-spacing: 0.3px; padding: 10px 18px;`
  - `.filter-btn .badge`: `display: inline-flex; align-items: center; justify-content: center; min-width: 22px; height: 22px; border-radius: 999px;`

### 4.2 Görsel Hizalama ve Beyaz Boşluk Sıfırlama
* **Şef / Ekip Kadrajı:** `.team-card img, .team-img-wrapper img { object-position: 50% 50%; object-fit: cover; }`
* **Resim Altı Çizgi Boşluğu Sıfırlama:** `.dish-card img { display: block; vertical-align: middle; } .dish-img-container { line-height: 0; font-size: 0; background: #1c130d; }`


