# 🏛️ Lezzet Mührü 1932 - Restoran Web Platformu & Yönetim Paneli

> **1932'den Beri Gaziantep Mirası Geleneksel Izgara ve Taş Fırın Lezzetleri**  
> Full-Stack, Responsive, Dinamik PDF Menü Üreticili ve SQLite Veritabanı Destekli Restoran Web Uygulaması.

---

## 🌟 Proje Hakkında

**1932 Lezzet Mührü**, Gaziantep mutfak mirasını modern dijital dünyayla buluşturan kapsamlı bir restoran platformudur. Proje; müşterilere zengin ve etkileşimli bir web deneyimi sunarken, restoran yöneticilerine yemek menüsü, müşteri rezervasyonları ve iletişim mesajlarını canlı olarak yönetebilecekleri gelişmiş bir **Admin Dashboard** sunar.

---

## 🚀 Öne Çıkan Özellikler

* **📱 %100 Responsive & 100vh Ekran Kilidi:** Anasayfa (`index.html`) hem dizüstü hem de 2K/4K ultra geniş monitörlerde dikey kaydırma çubuğu olmadan (`100vh`) tam ekrana kusursuz biçimde oturur.
* **📄 Canlı Dinamik PDF Menü Motoru:** Admin panelinde eklenen, silinen veya fiyatı güncellenen tüm yemekler istemci tarafındaki `html2canvas` & `jspdf` altyapısı sayesinde 2 sayfalık A4 PDF çıktısına **anında ve eksiksiz biçimde yansır**.
* **🛡️ Sıkı Güvenlik ve Session Yönetimi:** Express-Session ve `bcryptjs` hash altyapısı ile korunan admin paneli; yetkisiz erişimleri otomatik olarak giriş sayfasına yönlendirir.
* **👁️ Doğal Inline SVG Şifre Göster/Gizle:** Yönetici giriş sayfasında kütüphane bağımlılığı olmadan çalışan kirpikli kapalı göz / açık göz SVG geçişi.
* **🌐 Çoklu Dil & Atmosfer Modu:** Türkçe / İngilizce içerik sözlüğü ve dikey mangal ateşi / gece modu atmosfer geçişi.
* **📅 İnteraktif Masa Rezervasyonu & Bilet İndirme:** Özel masa bölgesi seçimi (Taş Fırın Yanı, VIP Salon vb.), rezervasyon sorgulama ve dijital rezervasyon bileti indirme.

---

## 🛠️ Kullanılan Teknolojiler

### **Önyüz (Frontend)**
- **HTML5 & CSS3:** Semantic HTML, CSS Variables, Glassmorphism, CSS Grid & Flexbox, Fluid Typography (`clamp()`).
- **JavaScript (ES6+ Vanilla):** Sıfır ağır kütüphane bağımlılığı ile yüksek performanslı asenkron DOM & Fetch mimarisi.
- **Vektörel İkonlar & Fontlar:** FontAwesome 6, Google Fonts (*Playfair Display* & *Inter*), Özel Inline SVG.
- **İstemci Tarafı PDF:** `html2canvas 1.4.1`, `jspdf 2.5.1`.

### **Arka Yüz (Backend)**
- **Node.js & Express.js:** RESTful API sunucusu, statik dosya yayını ve oturum middleware yönetimi.
- **SQLite3:** Taşınabilir, hızlı ve ilişkisel veritabanı altyapısı.
- **Güvenlik:** `bcryptjs` şifre hashleme, `express-session` oturum yönetimi.

---

## 💻 Kurulum ve Çalıştırma Adımları

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları sırasıyla uygulayınız:

### 1. Depoyu Klonlayın veya Proje Dizinine Geçin
```bash
git clone https://github.com/HasanSami51/staj-projeleri.git
cd staj-projeleri/server
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Veritabanını İlklendirin ve Örnek Verileri Seed Edin
```bash
node seed_db.js
```

### 4. Backend Sunucusunu Başlatın
```bash
node server.js
```

### 5. Tarayıcıdan Uygulamaya Erişin
- **Canlı Web Sitesi:** `http://localhost:3000`
- **Yönetici Giriş Paneli:** `http://localhost:3000/admin/login.html`
- **Yönetici Dashboard:** `http://localhost:3000/admin/dashboard.html`

---

## 🔑 Yönetici (Admin) Giriş Bilgileri

Yönetim paneline erişmek için aşağıdaki varsayılan kimlik bilgilerini kullanabilirsiniz:

| Rol | Kullanıcı Adı | Şifre | Giriş Adresi |
| :--- | :--- | :--- | :--- |
| **Sistem Yöneticisi** | `admin` | `admin1932` | [http://localhost:3000/admin/login.html](http://localhost:3000/admin/login.html) |

---

## 📂 Proje Dizin Yapısı

```
Staj/
├── Website/                      # Frontend (Önyüz) Dosyaları
│   ├── pages/                    # Web Sayfaları HTML Şablonları
│   │   ├── admin/
│   │   │   ├── login.html        # Yönetici Giriş Sayfası
│   │   │   └── dashboard.html    # Yönetici Yönetim Paneli
│   │   ├── index.html            # Anasayfa (100vh Kilitlemeli)
│   │   ├── menu.html             # Dinamik Yemek Menüsü & PDF İndirme
│   │   ├── galeri.html           # Fotoğraf & Mekan Galerisi
│   │   ├── hakkimizda.html       # Restoran Tarihçesi & Ustalarımız
│   │   ├── rezervasyon.html      # Masa Rezervasyonu & Bilet Sorgulama
│   │   ├── iletisim.html         # Harita, Adres ve Mesaj Formu
│   └── public/
│       ├── css/
│       │   └── style.css         # Ana Stil Sayfası (Responsive & Theme)
│       ├── js/
│       │   ├── main.js           # İstemci Mantığı, AJAX & PDF Üretici
│       │   └── translations.js   # Dil Sözlüğü (TR / EN)
│       └── images/               # Görseller, Favicon ve Videolar
├── server/                       # Backend (Arka Yüz) Dosyaları
│   ├── server.js                 # Express REST API Sunucusu
│   ├── db.js                     # SQLite Veritabanı Bağlantısı
│   ├── init_db.js                # Veritabanı Tablo Yapısı Oluşturucu
│   ├── seed_db.js                # Örnek Menü & Admin Hesabı Seed Scripti
│   └── lezzet_muhru.db           # Canlı SQLite Veritabanı Dosyası
└── README.md                     # Proje Dokümantasyonu
```

---

## 📜 Yapılan Tüm İyileştirme ve Geliştirmeler

1. **Anasayfa 100vh Ekran Kilidi & Akışkan Tipografi:**
   - Anasayfa hem laptop hem de 2K/4K geniş ekranlarda dikey kaydırma çubuğu çıkmayacak biçimde (`100vh flex`) kilitlendi. `clamp()` fonksiyonlarıyla tipografi ve boşluklar ekran boyutuna göre dinamik ölçeklendi.
2. **Dinamik PDF Menü Tasarımı & Taşıma Engelleme:**
   - PDF 2 ayrı A4 kapsayıcısı olarak mimarilendirildi. Sayfa geçişlerinde kart bölünmeleri kilitlendi, 1.5px altın çerçeve alttan %100 kapatıldı ve koyu antrasit/altın kurumsal temaya uyarlandı.
3. **Yönetici Girişi (Login) Görsel Cilaları:**
   - Şifre alanına kirpikli doğal SVG kapalı/açık göz ikonları eklendi. Butona kor ateşi köz ışıması (`box-shadow`) ve Autofill karanlık tema kilidi uygulandı.
4. **Güvenlik & Hata Yönetimi (Error Handling):**
   - Tüm AJAX/fetch istekleri `try-catch` bloklarıyla korumaya alındı ve yetkisiz admin paneli istekleri güvenli biçimde yönlendirildi.
5. **🎬 Gelişmiş Medya Optimizasyonu ve Video İşleme Hattı:**
   - Web arayüzünde kullanılan atmosfer videoları ve mangal ateşi efektleri için yerel otomatik işleme scriptleri geliştirildi.
   - Videoların web performansını düşürmemesi için otomatik çözünürlük dönüştürme (upscale to 4K), kare kırpma (crop) ve optimizasyon süreçleri backend scriptleri mimarisine dahil edildi.
