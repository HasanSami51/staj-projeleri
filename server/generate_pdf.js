// ==========================================
// 📄 LEZZET MÜHRÜ 1932 - OTOMATİK 2 SAYFALIK A4 MENÜ PDF OLUŞTURUCU
// ==========================================

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const db = require('./db');

const outputDir = path.join(__dirname, '../Website/public/pdf');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'Lezzet_Muhru_1932_Menu.pdf');

console.log('🚀 42 Lezzet İçin PDF Menü Oluşturuluyor...');

// PDF Dokümanı Oluştur (A4 Portrait, 8mm Kenar Boşluğu)
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 20, bottom: 20, left: 20, right: 20 },
  autoFirstPage: true
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Veritabanından Tüm Ürünleri Çek
const sql = `
  SELECT 
    u.id, 
    u.ad, 
    k.ad AS kategori_adi,
    k.slug AS kategori_slug, 
    u.fiyat, 
    u.aciklama
  FROM urunler u
  JOIN kategoriler k ON u.kategori_id = k.id
  ORDER BY k.sira ASC, u.id ASC
`;

db.all(sql, [], (err, rows) => {
  if (err) {
    console.error('❌ Veritabanı hatası:', err.message);
    return;
  }

  // 1. Üst Başlık (Header Banner)
  doc.rect(20, 20, 555, 42).fill('#fdfbf7');
  doc.rect(20, 20, 555, 42).stroke('#c0392b');
  
  doc.fillColor('#c0392b')
     .fontSize(18)
     .font('Helvetica-Bold')
     .text('LEZZET MUHRU 1932', 20, 26, { align: 'center', width: 555 });
     
  doc.fillColor('#555555')
     .fontSize(9)
     .font('Helvetica-Oblique')
     .text('Gaziantep Mutfak Mirasi • Asirlik Yemek Menusu (42 Lezzet)', 20, 46, { align: 'center', width: 555 });

  doc.moveDown(1.5);

  // Kategorileri Grupla
  const kategoriler = [
    { slug: 'corba', baslik: 'CORBALAR & BASLANGICLAR' },
    { slug: 'kebap', baslik: 'KEBAPLAR & IZGARALAR' },
    { slug: 'pide', baslik: 'PIDELER & LAHMACUNLAR' },
    { slug: 'zeytinyagli', baslik: 'ZEYTINYAGLILAR & SALATALAR' },
    { slug: 'tatli', baslik: 'BAKLAVALAR & TATLILAR' },
    { slug: 'icecek', baslik: 'GELENEKSEL ICECEKLER' }
  ];

  let currentY = 72;
  const colWidth = 175;
  const gap = 15;

  kategoriler.forEach((kat) => {
    const katYemekleri = rows.filter(r => r.kategori_slug === kat.slug);
    if (katYemekleri.length === 0) return;

    // Kategori Başlığı
    if (currentY > 750) {
      doc.addPage();
      currentY = 30;
    }

    doc.rect(20, currentY, 555, 16).fill('#c0392b');
    doc.fillColor('#ffffff')
       .fontSize(10)
       .font('Helvetica-Bold')
       .text(kat.baslik, 26, currentY + 3, { width: 543 });

    currentY += 22;

    // Yemek Kartları (3 Kolon)
    for (let i = 0; i < katYemekleri.length; i += 3) {
      if (currentY > 770) {
        doc.addPage();
        currentY = 30;
      }

      const trio = katYemekleri.slice(i, i + 3);
      trio.forEach((yemek, colIndex) => {
        const x = 20 + colIndex * (colWidth + gap);

        doc.rect(x, currentY, colWidth, 40).fillAndStroke('#ffffff', '#e0e0e0');

        // Türkçe Karakter Temizleme (PDFKit Standart Font Desteği)
        const adTemiz = yemek.ad.replace(/ğ/g,'g').replace(/Ğ/g,'G').replace(/ü/g,'u').replace(/Ü/g,'U').replace(/ş/g,'s').replace(/Ş/g,'S').replace(/ı/g,'i').replace(/İ/g,'I').replace(/ö/g,'o').replace(/Ö/g,'O').replace(/ç/g,'c').replace(/Ç/g,'C');
        const aciklamaTemiz = yemek.aciklama.replace(/ğ/g,'g').replace(/Ğ/g,'G').replace(/ü/g,'u').replace(/Ü/g,'U').replace(/ş/g,'s').replace(/Ş/g,'S').replace(/ı/g,'i').replace(/İ/g,'I').replace(/ö/g,'o').replace(/Ö/g,'O').replace(/ç/g,'c').replace(/Ç/g,'C');

        // Yemek Adı
        doc.fillColor('#111111')
           .fontSize(8.5)
           .font('Helvetica-Bold')
           .text(adTemiz, x + 5, currentY + 4, { width: colWidth - 10, height: 12, ellipsis: true });

        // Açıklama
        doc.fillColor('#666666')
           .fontSize(7)
           .font('Helvetica')
           .text(aciklamaTemiz, x + 5, currentY + 17, { width: colWidth - 10, height: 12, ellipsis: true });

        // Fiyat
        doc.fillColor('#c0392b')
           .fontSize(9)
           .font('Helvetica-Bold')
           .text(`${yemek.fiyat} TL`, x + 5, currentY + 28, { width: colWidth - 10 });
      });

      currentY += 44;
    }

    currentY += 6;
  });

  doc.end();

  writeStream.on('finish', () => {
    console.log('✅ PDF Başarıyla Oluşturuldu:', outputPath);
  });
});
