// ==========================================
// 🏛️ 1932 LEZZET MÜHRÜ - VERİTABANI BAĞLANTI MODÜLÜ
// ==========================================

const path = require('path');
// 1. .env Dosyasındaki Gizli Değişkenleri Yükleme
require('dotenv').config({ path: path.join(__dirname, '.env') });

const sqlite3 = require('sqlite3').verbose();

// .env dosyasından veritabanı yolunu alıyoruz (Yoksa varsayılan lezzet_muhru.db kullanılır)
const dbPath = path.resolve(__dirname, process.env.DB_PATH || './lezzet_muhru.db');

// Veritabanı Bağlantısını Başlatma
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Veritabanına bağlanırken hata oluştu:', err.message);
  } else {
    console.log(`✅ SQLite Veritabanı Bağlantısı Başarılı: ${dbPath}`);
  }
});

module.exports = db;
