// ==========================================
// 🏛️ 1932 LEZZET MÜHRÜ - SQL SORGULARI & PRATİKLERİ
// ==========================================

const db = require('./db');

console.log('\n================================================================');
console.log('🧪 SQL TEMELLERİ: SELECT WHERE, ORDER BY, UPDATE & DELETE PRATİĞİ');
console.log('================================================================\n');

db.serialize(() => {

  // -------------------------------------------------------------
  // 1. PRATİK: Fiyatı 300 TL'den Pahalı Olan Kebapları Getir (SELECT + WHERE + ORDER BY)
  // -------------------------------------------------------------
  const sql1 = `
    SELECT u.id, u.ad AS Yemek, u.fiyat || ' TL' AS Fiyat 
    FROM urunler u 
    JOIN kategoriler k ON u.kategori_id = k.id 
    WHERE k.slug = 'kebap' AND u.fiyat >= 350
    ORDER BY u.fiyat DESC
  `;
  db.all(sql1, [], (err, rows) => {
    console.log('🔥 1. Fiyatı 350 TL ve Üzeri Olan Kebaplar (SELECT WHERE):');
    console.table(rows);
  });

  // -------------------------------------------------------------
  // 2. PRATİK: Çıtır Lahmacunun Fiyatını 150 TL -> 160 TL Güncelle (UPDATE)
  // -------------------------------------------------------------
  db.run(`UPDATE urunler SET fiyat = 160.0 WHERE id = 2`, function(err) {
    if (err) return console.error(err.message);
    console.log(`\n✏️ 2. UPDATE Başarılı: Çıtır Lahmacun fiyatı 160 TL olarak güncellendi. (Etkilenen satır: ${this.changes})`);
  });

  // -------------------------------------------------------------
  // 3. PRATİK: Şefin Önerisi Olan Tüm Lezzetleri Getir
  // -------------------------------------------------------------
  const sql3 = `
    SELECT u.id, u.ad AS Yemek, k.ad AS Kategori, u.fiyat || ' TL' AS Fiyat
    FROM urunler u
    JOIN kategoriler k ON u.kategori_id = k.id
    WHERE u.sefin_onerisi = 1
  `;
  db.all(sql3, [], (err, rows) => {
    console.log('\n⭐ 3. Şefin Önerisi Olan Özel Lezzetler:');
    console.table(rows);

    console.log('================================================================\n');
  });

});
