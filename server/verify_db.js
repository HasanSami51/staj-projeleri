// ==========================================
// 🏛️ 1932 LEZZET MÜHRÜ - SORGULARLA VERİTABANI DOĞRULAMA (TERMINAL DISPLAY)
// ==========================================

const db = require('./db');

console.log('\n==========================================');
console.log('📊 1932 LEZZET MÜHRÜ VERİTABANI İÇERİĞİ');
console.log('==========================================\n');

// 1. KATEGORİLERİ SORGULAMA (SELECT * FROM kategoriler)
db.all("SELECT id, ad, slug, sira FROM kategoriler ORDER BY sira ASC", [], (err, rows) => {
  if (err) {
    console.error('❌ Kategoriler okunamadı:', err.message);
    return;
  }
  console.log('📁 1. KATEGORİLER TABLOSU:');
  console.table(rows);

  // 2. İLK 10 ÜRÜNÜ SORGULAMA (SELECT ... FROM urunler JOIN kategoriler)
  const sqlUrunler = `
    SELECT u.id, u.ad AS yemek_adi, u.fiyat || ' TL' AS fiyat, k.ad AS kategori, u.sefin_onerisi, u.vejetaryen
    FROM urunler u
    JOIN kategoriler k ON u.kategori_id = k.id
    LIMIT 10
  `;

  db.all(sqlUrunler, [], (err, urunRows) => {
    if (err) {
      console.error('❌ Ürünler okunamadı:', err.message);
      return;
    }
    console.log('\n🍖 2. ÜRÜNLER TABLOSU (İLK 10 ÖRNEK LEZZET):');
    console.table(urunRows);

    // 3. REZERVASYONLARI SORGULAMA
    db.all("SELECT id, ad_soyad, telefon, tarih, saat, kisi_sayisi, notlar, durum FROM rezervasyonlar", [], (err, resRows) => {
      if (err) return;
      console.log('\n📅 3. REZERVASYONLAR TABLOSU:');
      console.table(resRows);

      // 4. MESAJLARI SORGULAMA
      db.all("SELECT id, ad_soyad, eposta, konu, mesaj, durum FROM mesajlar", [], (err, msgRows) => {
        if (err) return;
        console.log('\n✉️ 4. İLETİŞİM MESAJLARI TABLOSU:');
        console.table(msgRows);

        // Toplam Sayıları Raporlama
        db.get("SELECT COUNT(*) AS toplam_urun FROM urunler", [], (err, row) => {
          console.log(`\n🎉 VERİTABANI ÖZETİ: Toplam ${row.toplam_urun} Adet Yemek Başarıyla Veritabanına Yüklendi ve Doğrulandı!`);
          console.log('==========================================\n');
        });
      });
    });
  });
});
