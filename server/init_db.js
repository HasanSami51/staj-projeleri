// ==========================================
// 🏛️ 1932 LEZZET MÜHRÜ - VERİTABANI ŞEMA OLUŞTURMA (INIT DB)
// ==========================================

const db = require('./db');

console.log('🚀 Tablo Şemaları Oluşturuluyor...');

db.serialize(() => {
  // Foreign Key Desteğini Aktifleştirme (SQLite için zorunludur)
  db.run("PRAGMA foreign_keys = ON;");

  // ------------------------------------------
  // 1. KATEGORİLER TABLOSU
  // ------------------------------------------
  db.run(`
    CREATE TABLE IF NOT EXISTS kategoriler (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ad TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL UNIQUE,
      sira INTEGER DEFAULT 0
    )
  `, (err) => {
    if (err) console.error('❌ kategoriler tablosu hatası:', err.message);
    else console.log('✅ 1. kategoriler tablosu hazır.');
  });

  // ------------------------------------------
  // 2. ÜRÜNLER TABLOSU (Foreign Key ile kategoriler.id'ye Bağlı)
  // ------------------------------------------
  db.run(`
    CREATE TABLE IF NOT EXISTS urunler (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kategori_id INTEGER NOT NULL,
      ad TEXT NOT NULL,
      aciklama TEXT,
      fiyat REAL NOT NULL,
      resim TEXT NOT NULL,
      loading TEXT DEFAULT 'lazy',
      one_cikan INTEGER DEFAULT 0,
      sefin_onerisi INTEGER DEFAULT 0,
      vejetaryen INTEGER DEFAULT 0,
      FOREIGN KEY (kategori_id) REFERENCES kategoriler(id) ON DELETE CASCADE
    )
  `, (err) => {
    if (err) console.error('❌ urunler tablosu hatası:', err.message);
    else console.log('✅ 2. urunler tablosu hazır.');
  });

  // ------------------------------------------
  // 3. REZERVASYONLAR TABLOSU
  // ------------------------------------------
  db.run(`
    CREATE TABLE IF NOT EXISTS rezervasyonlar (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ad_soyad TEXT NOT NULL,
      telefon TEXT NOT NULL,
      tarih TEXT NOT NULL,
      saat TEXT NOT NULL,
      kisi_sayisi INTEGER NOT NULL,
      notlar TEXT,
      durum TEXT DEFAULT 'Beklemede',
      olusturulma_tarihi DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('❌ rezervasyonlar tablosu hatası:', err.message);
    else console.log('✅ 3. rezervasyonlar tablosu hazır.');
  });

  // ------------------------------------------
  // 4. MESAJLAR TABLOSU
  // ------------------------------------------
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
    if (err) console.error('❌ mesajlar tablosu hatası:', err.message);
    else console.log('✅ 4. mesajlar tablosu hazır.');
  });

  // ------------------------------------------
  // 5. ADMİN YÖNETİCİ TABLOSU
  // ------------------------------------------
  db.run(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kullanici_adi TEXT NOT NULL UNIQUE,
      sifre_hash TEXT NOT NULL,
      eposta TEXT NOT NULL,
      son_giris DATETIME
    )
  `, (err) => {
    if (err) console.error('❌ admin tablosu hatası:', err.message);
    else console.log('✅ 5. admin tablosu hazır.');
  });
});
