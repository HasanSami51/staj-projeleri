// ==========================================
// 🗑️ REZERVASYON VE MESAJ VERİTABANI TEMİZLEME SCRIPTI
// ==========================================
const db = require('./db');

console.log('🗑️ Veritabanı test kayıtları temizleniyor...');

db.serialize(() => {
  // 1. Tüm rezervasyonları temizle ve ID sayacını sıfırla
  db.run("DELETE FROM rezervasyonlar", (err) => {
    if (err) console.error('Hata (Rezervasyonlar silinemedi):', err.message);
    else console.log('✅ Tüm rezervasyonlar başarıyla silindi.');
  });

  // 2. Tüm mesajları temizle
  db.run("DELETE FROM mesajlar", (err) => {
    if (err) console.error('Hata (Mesajlar silinemedi):', err.message);
    else console.log('✅ Tüm iletişim mesajları başarıyla silindi.');
  });

  // 3. ID sayacını 1'den başlatmak için sqlite_sequence sıfırlama
  db.run("DELETE FROM sqlite_sequence WHERE name IN ('rezervasyonlar', 'mesajlar')", (err) => {
    if (!err) console.log('✅ Kayıt ID sayaçları sıfırlandı (Yeni kayıtlar 1 ID ile başlayacak).');
  });
});
