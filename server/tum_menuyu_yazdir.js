// ==========================================
// 🏛️ 1932 LEZZET MÜHRÜ - TÜM MENÜYÜ TERMINALE YAZDIRMA KODU
// ==========================================

const db = require('./db');

console.log('\n========================================================================================');
console.log('📜 1932 LEZZET MÜHRÜ - 42 LEZZETLİK TAM MENÜ LİSTESİ');
console.log('========================================================================================\n');

const sql = `
  SELECT 
    u.id AS ID,
    u.ad AS [Yemek Adı],
    k.ad AS [Kategori],
    u.fiyat || ' TL' AS [Fiyat],
    CASE WHEN u.sefin_onerisi = 1 THEN '⭐ Şefin Önerisi' ELSE '-' END AS [Şef Önerisi],
    CASE WHEN u.vejetaryen = 1 THEN '🌱 Vejetaryen' ELSE '-' END AS [Vejetaryen]
  FROM urunler u
  JOIN kategoriler k ON u.kategori_id = k.id
  ORDER BY k.sira ASC, u.fiyat DESC
`;

db.all(sql, [], (err, rows) => {
  if (err) {
    console.error('❌ Menü okunamadı:', err.message);
    return;
  }

  // Tüm 42 yemeği renkli ve hizalı tablo olarak basma
  console.table(rows);
  
  console.log(`\n✅ Toplam ${rows.length} Adet Lezzet Başarıyla Listelendi!`);
  console.log('========================================================================================\n');
});
