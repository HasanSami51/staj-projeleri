// ==========================================
// 🏛️ 1932 LEZZET MÜHRÜ - EXPRESS & SQLITE BACKEND SUNUCUSU
// ==========================================

const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const db = require('./db'); // SQLite Veritabanı Modülü

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// 🗄️ SUNUCU AÇILIŞINDA MESAJLAR TABLOSUNU KONTROL ET / OLUŞTUR VE ADMİN SEED ET
// ==========================================
db.run(`
  CREATE TABLE IF NOT EXISTS mesajlar (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ad_soyad TEXT NOT NULL,
    eposta TEXT NOT NULL,
    konu TEXT NOT NULL,
    mesaj TEXT NOT NULL,
    durum TEXT DEFAULT 'Okunmadı',
    olusturulma_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('❌ mesajlar tablosu oluşturulamadı:', err.message);
  } else {
    console.log('✅ mesajlar tablosu hazır.');
  }
});

// Admin Tablosunu Kontrol Et ve Varsayılan Admin Hesabını Seed Et
db.run(`
  CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kullanici_adi TEXT UNIQUE NOT NULL,
    sifre_hash TEXT NOT NULL,
    eposta TEXT NOT NULL DEFAULT 'admin@lezzetmuhru.com',
    son_giris DATETIME
  )
`, (err) => {
  if (err) {
    console.error('❌ admin tablosu oluşturulamadı:', err.message);
  } else {
    console.log('✅ admin tablosu hazır.');
    // Eğer tablo boş ise varsayılan admin hesabını oluştur
    db.get("SELECT COUNT(*) as count FROM admin", [], (err, row) => {
      if (!err) {
        if (row.count === 0) {
          const defaultUser = 'admin';
          const defaultPass = 'admin1932';
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(defaultPass, salt);
          
          // Hem yeni hem de eski şema kolonlarını destekleyecek şekilde seed et
          db.run(
            "INSERT INTO admin (kullanici_adi, sifre_hash, eposta) VALUES (?, ?, ?)",
            [defaultUser, hashedPassword, 'admin@lezzetmuhru.com'],
            (insertErr) => {
              if (insertErr) {
                // Eski şema fallback'i (sadece kullanici_adi ve sifre kolonları varsa)
                db.run(
                  "INSERT INTO admin (kullanici_adi, sifre) VALUES (?, ?)",
                  [defaultUser, hashedPassword],
                  (fallbackErr) => {
                    if (fallbackErr) {
                      console.error('❌ Varsayılan admin seed edilemedi:', fallbackErr.message);
                    } else {
                      console.log('🔑 Varsayılan admin seed edildi (eski şema): Kullanıcı adı: admin | Şifre: admin1932');
                    }
                  }
                );
              } else {
                console.log('🔑 Varsayılan admin seed edildi (yeni şema): Kullanıcı adı: admin | Şifre: admin1932');
              }
            }
          );
        } else {
          // Eğer veritabanında plain-text şifre varsa (örneğin init_db.js kaynaklı 'admin1932'), bunu bcrypt ile hashle!
          db.all("SELECT * FROM admin", [], (selectErr, rows) => {
            if (!selectErr && rows) {
              rows.forEach(adminRow => {
                const hash = adminRow.sifre_hash || adminRow.sifre;
                const isBcrypt = typeof hash === 'string' && /^(\$2[ayb]\$.{56})$/.test(hash);
                if (hash && !isBcrypt) {
                  const salt = bcrypt.genSaltSync(10);
                  const newHashedPassword = bcrypt.hashSync(hash, salt);
                  const updateCol = adminRow.sifre_hash !== undefined ? 'sifre_hash' : 'sifre';
                  
                  db.run(
                    `UPDATE admin SET ${updateCol} = ? WHERE id = ?`,
                    [newHashedPassword, adminRow.id],
                    (updateErr) => {
                      if (!updateErr) {
                        console.log(`🔑 Admin ID ${adminRow.id} için plain-text şifre başarıyla bcrypt ile güncellendi.`);
                      }
                    }
                  );
                }
              });
            }
          });
        }
      }
    });
  }
});

// CORS Desteği (Farklı Portlardan veya Live Server Üzerinden Gelen Fetch İstekleri İçin)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// JSON Gönderim Desteği (Body Parser)
app.use(express.json());

// Express Session Yapılandırması
app.use(session({
  secret: '1932_lezzet_muhru_secret_key_98765',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2, // 2 saatlik oturum süresi
    secure: false // Lokal geliştirme için false
  }
}));

// Admin Rotalarının Oturum Kontrolü (Session Protection Middleware)
app.use((req, res, next) => {
  const url = req.path.toLowerCase();
  
  // Sadece /admin altındaki sayfa isteklerini koru, login.html veya statik css/js dosyalarını muaf tut
  if (url.startsWith('/admin') && !url.includes('login.html') && (url.endsWith('.html') || url === '/admin' || url === '/admin/')) {
    if (!req.session || !req.session.isAdmin) {
      console.log(`⚠️ Yetkisiz admin paneli erişim denemesi: ${req.path} -> Giriş sayfasına yönlendiriliyor.`);
      return res.redirect('/admin/login.html');
    }
  }
  next();
});

// 1. STATİK DOSYA SUNUMU (Mevcut Frontend Sitemizi Express Üzerinden Yayımlama)
app.use(express.static(path.join(__dirname, '../Website/pages')));
app.use(express.static(path.join(__dirname, '../Website')));

// Ana sayfa için açık rota (Index Rota)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Website/pages/index.html'));
});

// ==========================================
// 📡 DİNAMİK SQLITE VERİTABANI REST API ROTALARI
// ==========================================

// 1. KATEGORİLERİ GETİREN API (GET /api/kategoriler)
app.get('/api/kategoriler', (req, res) => {
  const sql = "SELECT id, ad, slug, sira FROM kategoriler ORDER BY sira ASC";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Kategoriler okunamadı.', error: err.message });
    }
    res.json({ success: true, count: rows.length, data: rows });
  });
});

// 2. TÜM MENÜ VE YEMEKLERİ GETİREN API (GET /api/menu)
app.get('/api/menu', (req, res) => {
  const sql = `
    SELECT 
      u.id, 
      u.ad, 
      k.slug AS kategori, 
      k.ad AS kategoriAdi,
      u.fiyat, 
      u.aciklama, 
      u.resim, 
      u.loading, 
      u.one_cikan AS oneCikan, 
      u.sefin_onerisi AS sefinOnerisi, 
      u.vejetaryen
    FROM urunler u
    JOIN kategoriler k ON u.kategori_id = k.id
    ORDER BY k.sira ASC, u.id ASC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Menü veritabanından çekilemedi.', error: err.message });
    }
    // Boolean değerleri dönüştürme (1 -> true, 0 -> false)
    const formattedData = rows.map(r => ({
      ...r,
      oneCikan: Boolean(r.oneCikan),
      sefinOnerisi: Boolean(r.sefinOnerisi),
      vejetaryen: Boolean(r.vejetaryen)
    }));

    res.json({
      success: true,
      count: formattedData.length,
      data: formattedData
    });
  });
});

// 3. REZERVASYON OLUŞTURMA VE VERİTABANINA KAYDETME (POST /api/rezervasyon)
app.post('/api/rezervasyon', (req, res) => {
  const { name, phone, date, time, guests, notes } = req.body;

  // --- SUNUCU TARAFI DOĞRULAMA (İstemci doğrulaması güvenlik değildir) ---
  const errors = [];

  // 1. Ad Soyad
  if (!name || typeof name !== 'string' || name.trim().length < 3) {
    errors.push('Ad soyad en az 3 karakter olmalıdır.');
  }

  // 2. Telefon (05XXXXXXXXX)
  const phoneRegex = /^05[0-9]{9}$/;
  if (!phone || !phoneRegex.test(phone.trim())) {
    errors.push('Telefon numarası 05 ile başlayan 11 haneli format olmalıdır.');
  }

  // 3. Tarih
  if (!date || typeof date !== 'string') {
    errors.push('Geçerli bir tarih giriniz.');
  }

  // 4. Saat
  if (!time || typeof time !== 'string') {
    errors.push('Geçerli bir saat giriniz.');
  }

  // 5. Kişi Sayısı
  const guestCount = parseInt(guests, 10);
  if (isNaN(guestCount) || guestCount < 1 || guestCount > 10) {
    errors.push('Kişi sayısı 1 ile 10 arasında olmalıdır.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors.join(' | '), errors });
  }

  // Tarih Formatını Standartlaştırma (DD.MM.YYYY -> YYYY-MM-DD)
  let formattedDate = date.trim();
  if (formattedDate.includes('.')) {
    const parts = formattedDate.split('.');
    if (parts.length === 3) {
      formattedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
  }

  // 6. Geçmişe rezervasyon engellensin
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(formattedDate);
  if (isNaN(selectedDate.getTime()) || selectedDate < today) {
    return res.status(400).json({ success: false, message: 'Geçmiş bir tarihe rezervasyon yapılamaz.' });
  }

  // 7. Pazar günü kontrolü (0 = Pazar)
  const dayOfWeek = selectedDate.getDay();
  if (dayOfWeek === 0) {
    return res.status(400).json({ success: false, message: 'Pazar günleri restoranımız kapalıdır.' });
  }

  // 8. Çalışma saatleri kontrolü
  const [hours, minutes] = time.trim().split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  const minMinutes = 10 * 60; // 10:00
  const maxMinutes = (dayOfWeek === 5 || dayOfWeek === 6) ? 23 * 60 : 22 * 60; // Cum-Cmt: 23:00, diğer: 22:00

  if (isNaN(hours) || isNaN(minutes) || totalMinutes < minMinutes || totalMinutes > maxMinutes) {
    const maxStr = (dayOfWeek === 5 || dayOfWeek === 6) ? '23:00' : '22:00';
    return res.status(400).json({ success: false, message: `Çalışma saatlerimiz bu gün için 10:00 - ${maxStr} arasındadır.` });
  }

  // --- VERİTABANINA KAYDET ---
  const sql = `
    INSERT INTO rezervasyonlar (ad_soyad, telefon, tarih, saat, kisi_sayisi, notlar)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [name.trim(), phone.trim(), formattedDate, time.trim(), guestCount, notes ? notes.trim() : ''], function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: 'Rezervasyon kaydı sırasında bir sunucu hatası oluştu.', error: err.message });
    }

    const id = this.lastID;
    const masaNo = String((id % 18) + 1).padStart(2, '0');
    const konumlar = ['(Geleneksel Odun Ateşi Katı)', '(Tarihi Avlu Tarafı)', '(Taş Fırın Yanı)', '(Üst Kat Balkon)', '(VIP Salon)'];
    const konum = konumlar[id % konumlar.length];

    res.status(201).json({
      success: true,
      message: 'Rezervasyonunuz başarıyla alındı! En kısa sürede tarafınıza ulaşacağız.',
      data: {
        id,
        name: name.trim(),
        phone: phone.trim(),
        date,
        time: time.trim(),
        guests: guestCount,
        notes: notes ? notes.trim() : '',
        masaNo,
        konum
      }
    });
  });
});

// 3b. REZERVASYON SORGULAMA (GET /api/rezervasyon-sorgula)
app.get('/api/rezervasyon-sorgula', (req, res) => {
  try {
    const { telefon } = req.query;

    if (!telefon || !String(telefon).trim()) {
      return res.status(400).json({
        success: false,
        message: 'Lütfen sorgulama için geçerli bir telefon numarası giriniz.'
      });
    }

    const temizTel = String(telefon).trim();

    // SQL Injection koruması: Değerler ? ile parametreli sorgulanır.
    const sql = `
      SELECT id, ad_soyad, telefon, tarih, saat, kisi_sayisi, notlar, durum
      FROM rezervasyonlar
      WHERE telefon = ?
      ORDER BY id DESC
      LIMIT 1
    `;

    db.get(sql, [temizTel], (err, row) => {
      if (err) {
        console.error('❌ /api/rezervasyon-sorgula veritabanı hatası:', err.message);
        return res.status(500).json({
          success: false,
          message: 'Sorgulama sırasında bir veritabanı hatası oluştu. Lütfen tekrar deneyiniz.'
        });
      }

      if (!row) {
        return res.status(404).json({
          success: false,
          message: 'Bu telefon numarasına ait aktif bir rezervasyon bulunamadı. Lütfen bilgilerinizi kontrol ediniz.'
        });
      }

      // Deterministik masa no ve konum eşleşmesi (böylece rezervasyon her çağrıldığında aynı masa gelir)
      const id = row.id;
      const masaNo = String((id % 18) + 1).padStart(2, '0');
      const konumlar = ['(Geleneksel Odun Ateşi Katı)', '(Tarihi Avlu Tarafı)', '(Taş Fırın Yanı)', '(Üst Kat Balkon)', '(VIP Salon)'];
      const konum = konumlar[id % konumlar.length];

      return res.status(200).json({
        success: true,
        message: 'Rezervasyonunuz bulundu.',
        data: {
          id: row.id,
          name: row.ad_soyad,
          phone: row.telefon,
          date: row.tarih,
          time: row.saat,
          guests: row.kisi_sayisi,
          notes: row.notlar || '',
          masaNo,
          konum,
          durum: row.durum
        }
      });
    });

  } catch (beklenmedikHata) {
    console.error('❌ /api/rezervasyon-sorgula beklenmedik hata:', beklenmedikHata.message);
    return res.status(500).json({
      success: false,
      message: 'Beklenmedik bir hata oluştu. Lütfen tekrar deneyiniz.'
    });
  }
});

// 4. İLETİŞİM MESAJI KAYDETME (POST /api/iletisim)
// ─────────────────────────────────────────────────
// Hata Yönetimi:
//   400 → Eksik alan, geçersiz e-posta, kısa ad/mesaj
//   500 → Veritabanı bağlantı / yazma hatası
//   201 → Başarılı kayıt
// SQL Injection Koruması: Tüm veriler ? parametreli sorguyla aktarılır.
// ─────────────────────────────────────────────────
app.post('/api/iletisim', (req, res) => {
  try {
    const { ad_soyad, eposta, konu, mesaj } = req.body;

    // ── 1. ZORUNLU ALAN KONTROLÜ (400) ──────────────────────────────────
    const eksikler = [];
    if (!ad_soyad || !String(ad_soyad).trim()) eksikler.push('Ad Soyad');
    if (!eposta   || !String(eposta).trim())   eksikler.push('E-posta');
    if (!mesaj    || !String(mesaj).trim())    eksikler.push('Mesaj');

    if (eksikler.length > 0) {
      return res.status(400).json({
        success: false,
        hata: 'eksik_alan',
        mesaj: `Şu alanlar boş bırakılamaz: ${eksikler.join(', ')}.`
      });
    }

    // ── 2. GEÇERSİZ VERİ KONTROLLERI (400) ─────────────────────────────
    const temizAd    = String(ad_soyad).trim();
    const temizEposta = String(eposta).trim();
    const temizKonu  = konu ? String(konu).trim() : 'Genel Soru';
    const temizMesaj = String(mesaj).trim();

    // 2a. Ad uzunluğu en az 3 karakter
    if (temizAd.length < 3) {
      return res.status(400).json({
        success: false,
        hata: 'gecersiz_ad',
        mesaj: 'Ad Soyad en az 3 karakter olmalıdır.'
      });
    }

    // 2b. E-posta format doğrulaması (RFC benzeri regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(temizEposta)) {
      return res.status(400).json({
        success: false,
        hata: 'gecersiz_eposta',
        mesaj: 'Lütfen geçerli bir e-posta adresi giriniz. (örn: ad@domain.com)'
      });
    }

    // 2c. Mesaj uzunluğu en az 10 karakter
    if (temizMesaj.length < 10) {
      return res.status(400).json({
        success: false,
        hata: 'kisa_mesaj',
        mesaj: 'Mesaj en az 10 karakter olmalıdır.'
      });
    }

    // 2d. Konu uzunluğu (opsiyonel ama doluysa min 3 karakter)
    if (konu && temizKonu.length < 3) {
      return res.status(400).json({
        success: false,
        hata: 'gecersiz_konu',
        mesaj: 'Konu en az 3 karakter olmalıdır.'
      });
    }

    // ── 3. VERİTABANINA KAYDET ──────────────────────────────────────────
    // SQL Injection koruması: değerler doğrudan SQL'e gömülmez,
    // ? yer tutuculara ayrı dizi olarak geçirilir (parametreli sorgu).
    const sql = `
      INSERT INTO mesajlar (ad_soyad, eposta, konu, mesaj)
      VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [temizAd, temizEposta, temizKonu, temizMesaj], function(err) {
      // ── 4. VERİTABANI / SUNUCU HATASI (500) ──────────────────────────
      if (err) {
        console.error('❌ /api/iletisim veritabanı hatası:', err.message);
        return res.status(500).json({
          success: false,
          hata: 'veritabani_hatasi',
          mesaj: 'Mesajınız şu an kaydedilemedi. Lütfen daha sonra tekrar deneyiniz.'
        });
      }

      // ── 5. BAŞARILI KAYIT (201) ───────────────────────────────────────
      console.log(`✅ Yeni iletişim mesajı kaydedildi — ID: ${this.lastID}, Gönderen: ${temizEposta}`);
      return res.status(201).json({
        success: true,
        mesaj: 'Mesajınız başarıyla alındı! En kısa sürede sizinle iletişime geçeceğiz.',
        id: this.lastID
      });
    });

  } catch (beklenmedikHata) {
    // ── 6. BEKLENMEDİK SUNUCU HATASI (500) ──────────────────────────────
    console.error('❌ /api/iletisim beklenmedik hata:', beklenmedikHata.message);
    return res.status(500).json({
      success: false,
      hata: 'sunucu_hatasi',
      mesaj: 'Beklenmedik bir sunucu hatası oluştu. Lütfen daha sonra tekrar deneyiniz.'
    });
  }
});

// 5. TÜM REZERVASYONLARI VERİTABANINDAN ÇEKME (GET /api/rezervasyonlar) - Korunmalı
app.get('/api/rezervasyonlar', (req, res) => {
  if (!req.session || !req.session.isAdmin) {
    return res.status(401).json({ success: false, error: 'unauthorized', message: 'Yetkisiz erişim.' });
  }
  db.all("SELECT * FROM rezervasyonlar ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, count: rows.length, data: rows });
  });
});

// ADMİN YETKİLENDİRME VE YÖNETİM ENDPOINTS
// 1. Admin Login (POST /api/admin/login)
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Kullanıcı adı ve şifre gereklidir.' });
  }

  db.get("SELECT * FROM admin WHERE kullanici_adi = ?", [username.trim()], (err, row) => {
    if (err) {
      console.error('❌ Login veritabanı hatası:', err.message);
      return res.status(500).json({ success: false, message: 'Sunucu hatası oluştu.' });
    }
    if (!row) {
      return res.status(401).json({ success: false, message: 'Kullanıcı adı veya şifre hatalı.' });
    }

    // Hem sifre hem de sifre_hash kolonlarını kontrol et
    const hash = row.sifre_hash || row.sifre;
    if (!hash) {
      console.error('❌ Veritabanında admin şifresi bulunamadı (şema uyumsuzluğu).');
      return res.status(401).json({ success: false, message: 'Kullanıcı adı veya şifre hatalı.' });
    }

    try {
      // Hem bcrypt hem de plain-text şifre karşılaştırmasını destekle
      const isBcrypt = typeof hash === 'string' && /^(\$2[ayb]\$.{56})$/.test(hash);
      let match = false;
      if (isBcrypt) {
        match = bcrypt.compareSync(password, hash);
      } else {
        match = (password === hash);
      }
      
      if (!match) {
        return res.status(401).json({ success: false, message: 'Kullanıcı adı veya şifre hatalı.' });
      }
    } catch (bcryptErr) {
      console.error('❌ Şifre doğrulama hatası:', bcryptErr.message);
      return res.status(500).json({ success: false, message: 'Şifre doğrulama hatası.' });
    }

    // Oturumu başlat
    req.session.isAdmin = true;
    req.session.username = row.kullanici_adi;
    console.log(`🔐 Admin girişi başarılı: ${row.kullanici_adi}`);
    res.json({ success: true, message: 'Giriş başarılı.', username: row.kullanici_adi });
  });
});

// 2. Admin Logout (POST /api/admin/logout)
app.post('/api/admin/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('❌ Logout hatası:', err.message);
      return res.status(500).json({ success: false, message: 'Oturum kapatılamadı.' });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true, message: 'Başarıyla çıkış yapıldı.' });
  });
});

// 3. Admin Check Auth (GET /api/admin/check-auth)
app.get('/api/admin/check-auth', (req, res) => {
  if (req.session && req.session.isAdmin) {
    res.json({ authenticated: true, username: req.session.username });
  } else {
    res.json({ authenticated: false });
  }
});

// 4. Rezervasyon Sil (DELETE /api/rezervasyonlar/:id) - Korunmalı
app.delete('/api/rezervasyonlar/:id', (req, res) => {
  if (!req.session || !req.session.isAdmin) {
    return res.status(401).json({ success: false, error: 'unauthorized', message: 'Yetkisiz erişim.' });
  }
  const { id } = req.params;
  db.run("DELETE FROM rezervasyonlar WHERE id = ?", [id], function(err) {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, message: 'Rezervasyon silindi.' });
  });
});

// 5. Rezervasyon Durumu Güncelle (POST /api/rezervasyonlar/durum/:id) - Korunmalı
app.post('/api/rezervasyonlar/durum/:id', (req, res) => {
  if (!req.session || !req.session.isAdmin) {
    return res.status(401).json({ success: false, error: 'unauthorized', message: 'Yetkisiz erişim.' });
  }
  const { id } = req.params;
  const { durum } = req.body;
  if (!durum) {
    return res.status(400).json({ success: false, message: 'Durum bilgisi gereklidir.' });
  }
  db.run("UPDATE rezervasyonlar SET durum = ? WHERE id = ?", [durum, id], function(err) {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, message: 'Rezervasyon durumu güncellendi.' });
  });
});

// 6. Tüm İletişim Mesajlarını Getir (GET /api/mesajlar) - Korunmalı
app.get('/api/mesajlar', (req, res) => {
  if (!req.session || !req.session.isAdmin) {
    return res.status(401).json({ success: false, error: 'unauthorized', message: 'Yetkisiz erişim.' });
  }
  db.all("SELECT * FROM mesajlar ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, count: rows.length, data: rows });
  });
});

// 7. İletişim Mesajı Durumu Güncelle (POST /api/mesajlar/durum/:id) - Korunmalı
app.post('/api/mesajlar/durum/:id', (req, res) => {
  if (!req.session || !req.session.isAdmin) {
    return res.status(401).json({ success: false, error: 'unauthorized', message: 'Yetkisiz erişim.' });
  }
  const { id } = req.params;
  const { durum } = req.body;
  db.run("UPDATE mesajlar SET durum = ? WHERE id = ?", [durum, id], function(err) {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, message: 'Mesaj durumu güncellendi.' });
  });
});

// 8. İletişim Mesajı Sil (DELETE /api/mesajlar/:id) - Korunmalı
app.delete('/api/mesajlar/:id', (req, res) => {
  if (!req.session || !req.session.isAdmin) {
    return res.status(401).json({ success: false, error: 'unauthorized', message: 'Yetkisiz erişim.' });
  }
  const { id } = req.params;
  db.run("DELETE FROM mesajlar WHERE id = ?", [id], function(err) {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, message: 'Mesaj silindi.' });
  });
});


// 6. SUNUCU SAĞLIK DURUMU
app.get('/api/status', (req, res) => {
  res.json({
    status: "online",
    server: "1932 Lezzet Mührü SQLite Express API",
    database: "lezzet_muhru.db",
    time: new Date().toLocaleString()
  });
});

// SUNUCUYU BAŞLATMA
app.listen(PORT, () => {
  console.log(`\n================================================`);
  console.log(`🚀 1932 LEZZET MÜHRÜ CANLI BACKEND SUNUCUSU & VERİTABANI!`);
  console.log(`📍 Web Sitesi:    http://localhost:${PORT}`);
  console.log(`📡 Menü API:      http://localhost:${PORT}/api/menu`);
  console.log(`📁 Kategoriler:   http://localhost:${PORT}/api/kategoriler`);
  console.log(`================================================\n`);
});
