// ==========================================
// 🏛️ 1932 LEZZET MÜHRÜ - EXPRESS & SQLITE BACKEND SUNUCUSU
// ==========================================

const express = require('express');
const path = require('path');
const db = require('./db'); // SQLite Veritabanı Modülü

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Desteği (Farklı Portlardan veya Live Server Üzerinden Gelen Fetch İstekleri İçin)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// JSON Gönderim Desteği (Body Parser)
app.use(express.json());

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

    const masaNo = String(Math.floor(1 + Math.random() * 18)).padStart(2, '0');
    const konumlar = ['(Geleneksel Odun Ateşi Katı)', '(Tarihi Avlu Tarafı)', '(Taş Fırın Yanı)', '(Üst Kat Balkon)', '(VIP Salon)'];
    const rastgeleKonum = konumlar[Math.floor(Math.random() * konumlar.length)];

    res.status(201).json({
      success: true,
      message: 'Rezervasyonunuz başarıyla alındı! En kısa sürede tarafınıza ulaşacağız.',
      data: {
        id: this.lastID,
        name: name.trim(),
        phone: phone.trim(),
        date,
        time: time.trim(),
        guests: guestCount,
        notes: notes ? notes.trim() : '',
        masaNo,
        konum: rastgeleKonum
      }
    });
  });
});

// 4. İLETİŞİM MESAJI KAYDETME (POST /api/iletisim)
app.post('/api/iletisim', (req, res) => {
  const { ad_soyad, eposta, konu, mesaj } = req.body;

  if (!ad_soyad || !eposta || !mesaj) {
    return res.status(400).json({ success: false, message: 'Lütfen ad, e-posta ve mesaj alanlarını eksiksiz giriniz.' });
  }

  const sql = `INSERT INTO mesajlar (ad_soyad, eposta, konu, mesaj) VALUES (?, ?, ?, ?)`;
  db.run(sql, [ad_soyad, eposta, konu || 'Genel Soru', mesaj], function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: 'Mesaj kaydedilemedi.', error: err.message });
    }

    res.status(201).json({
      success: true,
      message: 'Mesajınız başarıyla veritabanına kaydedildi!',
      id: this.lastID
    });
  });
});

// 5. TÜM REZERVASYONLARI VERİTABANINDAN ÇEKME (GET /api/rezervasyonlar)
app.get('/api/rezervasyonlar', (req, res) => {
  db.all("SELECT * FROM rezervasyonlar ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, count: rows.length, data: rows });
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
