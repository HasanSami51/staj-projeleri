// ==========================================
// 🏛️ 1932 LEZZET MÜHRÜ - EXPRESS BACKEND SUNUCUSU
// ==========================================

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// JSON Gönderim Desteği (Body Parser)
app.use(express.json());

// 1. STATİK DOSYA SUNUMU (Mevcut Frontend Sitemizi Express Üzerinden Yayımlama)
// Pages ve Website klasörlerini statik olarak sunuyoruz
app.use(express.static(path.join(__dirname, '../Website/pages')));
app.use(express.static(path.join(__dirname, '../Website')));

// Ana sayfa için açık rota (Index Rota)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Website/pages/index.html'));
});

// 2. MAIN.JS İLE BİREBİR UYUMLU TAM GERÇEK MENÜ VERİLERİ (42 LEZZET)
const yemekler = [
  { id: 35, ad: "Geleneksel Süzme Mercimek Çorbası", kategori: "corba", fiyat: 200, aciklama: "Taş değirmen mercimeği, taze tereyağı ve özel baharatlı kıtır ekmekler ile.", resim: "../public/images/mercimek-corbasi.webp", loading: "eager", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 36, ad: "Köz Patlıcanlı Süt Çorbası", kategori: "corba", fiyat: 220, aciklama: "Odun ateşinde közlenmiş patlıcanların süt ve taze otlarla pişirilmesiyle hazırlanan 1930'lar klasiği.", resim: "../public/images/patlican-corbasi.webp", loading: "eager", oneCikan: false, sefinOnerisi: true, vejetaryen: true },
  { id: 37, ad: "Mahluta Çorbası", kategori: "corba", fiyat: 210, aciklama: "Kırmızı mercimek, kişniş, kimyon ve zeytinyağında sotelenmiş soğan sosuyla Güneydoğu'nun kadim çorbası.", resim: "../public/images/mahluta.webp", loading: "eager", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 38, ad: "Süzme Ezogelin Çorbası", kategori: "corba", fiyat: 200, aciklama: "İnce bulgur, pirinç ve domates salçasııyla harmanlanmış, nane yağlı geleneksel lezzet.", resim: "../public/images/ezogelin.webp", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 39, ad: "Düğün Çorbası ", kategori: "corba", fiyat: 230, aciklama: "Yoğurt, yumurta sarısı ve un meyhanesiyle bağlanan, üzeri pul biberli kızgın tereyağlı süzme çorba.", resim: "../public/images/dugun-corbasi.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 1, ad: "Meşhur Adana Kebap", kategori: "kebap", fiyat: 350, aciklama: "İnce ince zırhlanmış kıyma ve meşe kömürü ızgarasında leziz baharatlarla önünüzde", resim: "../public/images/Adana-Kebab.jpg", loading: "eager", oneCikan: true, sefinOnerisi: true, vejetaryen: false },
  { id: 4, ad: "Geleneksel Urfa Kebap", kategori: "kebap", fiyat: 340, aciklama: "Zırh kıymasından acısız ızgara lezzet, közlenmiş domates ve biber eşliğinde", resim: "../public/images/urfa-kebap.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 5, ad: "Sarma Beyti Kebap", kategori: "kebap", fiyat: 380, aciklama: "Özel lavaşa sarılı ızgara zırh kıyması, süzme yoğurt ve tereyağlı domates sosuyla", resim: "../public/images/beyti.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 6, ad: "Ali Nazik Kebabı", kategori: "kebap", fiyat: 400, aciklama: "Közlenmiş patlıcanlı süzme yoğurt yatağında lokum gibi ızgara zırh kebabı", resim: "../public/images/alinazik.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 7, ad: "Antep Fıstıklı Kebap", kategori: "kebap", fiyat: 390, aciklama: "Özel kıyma harcına harmanlanmış bol taze Antep fıstıklı ızgara kebap", resim: "../public/images/fistikli-kebap.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 3, ad: "Kuşbaşılı Kaşarlı Pide", kategori: "pide", fiyat: 280, aciklama: "Ağızda sünen eti yumuşacık, güzel mi güzel kuşbaşılı kaşarlı pidemiz", resim: "../public/images/pide.jpg", loading: "lazy", oneCikan: true, sefinOnerisi: false, vejetaryen: false },
  { id: 8, ad: "Çıtır Kıymalı Pide", kategori: "pide", fiyat: 250, aciklama: "Özel kavrulmuş kıymalı harç, domates, biber ve çıtır kenarlar", resim: "../public/images/kiymali-pide.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 9, ad: "Kavurmali Kaşarlı Pide", kategori: "pide", fiyat: 310, aciklama: "Geleneksel dana kavurma ve uzayan kaşar peynirinin muazzam uyumu", resim: "../public/images/kavurmali-pide.jpg", loading: "eager", oneCikan: false, sefinOnerisi: true, vejetaryen: false },
  { id: 10, ad: "Taş Fırında Peynirli & Otlu Ege Pidesi", kategori: "pide", fiyat: 310, aciklama: "Lor peyniri, ısırgan otu, maydanoz ve zeytinyağı harcıyla odun fırınından çıkan geleneksel kıtır pide.", resim: "../public/images/ege-pidesi.jpg", loading: "eager", oneCikan: false, sefinOnerisi: true, vejetaryen: true },
  { id: 11, ad: "Kasap Sucuklu Pide", kategori: "pide", fiyat: 270, aciklama: "%100 dana kasap sucuğu ve bol kaşar peyniriyle", resim: "../public/images/sucuklu-pide.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 12, ad: "Trabzon Yağlı Pidesi", kategori: "pide", fiyat: 290, aciklama: "Yerel kolot peyniri, ortasına köy yumurtası ve has tereyağı ile", resim: "../public/images/trabzon-pide.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 13, ad: "Terbiye Kuzu Şiş", kategori: "kebap", fiyat: 390, aciklama: "Süt kuzusundan özel marine edilmiş, meşe kömürü ızgarasında pişen lokum etler", resim: "../public/images/kuzu-sis.jpeg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 14, ad: "Meşhur Çöp Şiş", kategori: "kebap", fiyat: 370, aciklama: "Küçük kesim kuzu etleri ve kuyruk yağının ızgarada kekiğe doyduğu lezzet", resim: "../public/images/cop-sis.webp", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 15, ad: "Lokum Tavuk Şiş", kategori: "kebap", fiyat: 260, aciklama: "Süt ve özel baharatlarla marine edilmiş ızgarada pişmiş yumuşacık tavuk eti", resim: "../public/images/tavuk-sis.webp", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 16, ad: "Antep Usulü Ciğer Şiş", kategori: "kebap", fiyat: 340, aciklama: "Taze kuzu ciğeri ve kuyruk yağı ızgara, kimyon ve sumaklı soğan eşliğinde", resim: "../public/images/ciger-sis.jpg", loading: "eager", oneCikan: false, sefinOnerisi: true, vejetaryen: false },
  { id: 2, ad: "Çıtır Lahmacun", kategori: "pide", fiyat: 150, aciklama: "Kıymayı, domatesi, soğanı mükemmel derecede pişen ağızda dağılan mükemmel bir lezzet", resim: "../public/images/lahmacun.jpg", loading: "lazy", oneCikan: true, sefinOnerisi: false, vejetaryen: false },
  { id: 17, ad: "Fındık Lahmacun (3'lü)", kategori: "pide", fiyat: 180, aciklama: "Özel baharatlı harcı ve çıtır hamuruyla geleneksel mini atıştırmalık", resim: "../public/images/findik-lahmacun.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 18, ad: "Antep Usulü Sarımsaklı Lahmacun", kategori: "pide", fiyat: 170, aciklama: "Zırh kıyması, bol taze sarımsak, maydanoz ve nar ekşisinin çıtır hamurla buluşması", resim: "../public/images/sarimsakli-lahmacun.jpg", loading: "eager", oneCikan: false, sefinOnerisi: true, vejetaryen: false },
  { id: 40, ad: "Zeytinyağlı Enginar Dolması", kategori: "zeytinyagli", fiyat: 340, aciklama: "Osmanlı saray mutfağından günümüze; dereotu, dolmalık fıstık ve kuş üzümlü iç pilavla doldurulmuş Ege enginarı.", resim: "../public/images/enginar.jpg", loading: "eager", oneCikan: false, sefinOnerisi: true, vejetaryen: true },
  { id: 41, ad: "Kuru Patlıcan ve Biber Dolması", kategori: "zeytinyagli", fiyat: 320, aciklama: "Antep usulü yazdan kurutulmuş sebzelerin nar ekşili, sumaklı ve bol baharatlı pirinç harcıyla demlenmesi.", resim: "../public/images/kuru-dolma.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 42, ad: "Müceddere Pilavı & Süzme Yoğurt", kategori: "zeytinyagli", fiyat: 290, aciklama: "Orta Doğu ve Doğu Anadolu mutfağının asırlık lezzeti; yeşil mercimek, karamelize soğan ve baharatlı bulgur.", resim: "../public/images/muceddere.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 19, ad: "Gavurdağı Salatası", kategori: "zeytinyagli", fiyat: 140, aciklama: "İnce kıyılmış domates, salatalık, bol ceviz, nar ekşisi ve sızma zeytinyağı ile", resim: "../public/images/gavurdagi.webp", loading: "eager", oneCikan: false, sefinOnerisi: true, vejetaryen: true },
  { id: 20, ad: "Acılı Ezme Salata", kategori: "zeytinyagli", fiyat: 120, aciklama: "Taze domates, biber, sarımsak, maydanoz ve özel baharatlarla harmanlanmış acı lezzet", resim: "../public/images/acili-ezme.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 21, ad: "Klasik Çoban Salatası", kategori: "zeytinyagli", fiyat: 110, aciklama: "Küp doğranmış domates, salatalık, sivri biber, kuru soğan, limon ve zeytinyağı sosuyla", resim: "../public/images/coban-salata.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 22, ad: "Tulum Peynirli Roka Salatası", kategori: "zeytinyagli", fiyat: 150, aciklama: "Taze körpe roka yaprakları, Erzincan tulum peyniri, ceviz ve nar ekşisi eşliğinde", resim: "../public/images/roka-salata.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 23, ad: "Urfa Usulü Bostana", kategori: "zeytinyagli", fiyat: 130, aciklama: "Zar gibi incecik kıyılmış sebzeler, buzlu soğuk sunumu ve bol sumak ekşisiyle", resim: "../public/images/bostana.webp", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 24, ad: "Fıstıklı Künefe", kategori: "tatli", fiyat: 160, aciklama: "Özel Hatay peyniri, çıtır kadayıf ve bol Antep fıstığı ile sıcacık", resim: "../public/images/kunefe.png", loading: "eager", oneCikan: false, sefinOnerisi: true, vejetaryen: true },
  { id: 25, ad: "Havuç Dilim Baklava", kategori: "tatli", fiyat: 180, aciklama: "İncecik yufkalar, bol fıstık ile karşınızda", resim: "../public/images/havuc-dilim.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 26, ad: "Geleneksel Katmer", kategori: "tatli", fiyat: 190, aciklama: "Zar gibi açılmış hamur içerisinde kaymak ve taze çekilmiş Antep fıstığı", resim: "../public/images/katmer.webp", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 27, ad: "Fırın Sütlaç", kategori: "tatli", fiyat: 110, aciklama: "Toprak güveçte nar gibi kızarmış geleneksel lezzet", resim: "../public/images/sutlac.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 28, ad: "Dondurmalı İrmik Helvası", kategori: "tatli", fiyat: 120, aciklama: "Tereyağında kavrulmuş sıcak irmik helvası ortasında keçi sütlü dondurma ile", resim: "../public/images/irmik.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 29, ad: "Köpüklü Yayık Ayranı", kategori: "icecek", fiyat: 50, aciklama: "Bakır maşrapada servis edilen, köy yoğurdundan ev yapımı ayran", resim: "../public/images/ayran.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 30, ad: "Acılı / Acısız Şalgam", kategori: "icecek", fiyat: 45, aciklama: "Geleneksel Adana usulü, havuç taneleriyle servis edilen şalgam suyu", resim: "../public/images/salgam.jpeg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 31, ad: "Ev Yapımı Limonata", kategori: "icecek", fiyat: 60, aciklama: "Taze sıkılmış limon, nane yaprakları ve az şekerli serinletici lezzet", resim: "../public/images/limonata.webp", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 32, ad: "Niğde Gazozu", kategori: "icecek", fiyat: 45, aciklama: "Ahududu aromalı, geleneksel Türk gazozu lezzeti", resim: "../public/images/gazoz.png", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 33, ad: "Türk Kahvesi", kategori: "icecek", fiyat: 60, aciklama: "Çifte kavrulmuş kahve çekirdeklerinden, lokum meşe aromalı su ikramıyla", resim: "../public/images/kahve.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 34, ad: "Taze Demleme Çay", kategori: "icecek", fiyat: 25, aciklama: "İnce belli bardakta, Karadeniz'in en seçkin yapraklarından taze demleme", resim: "../public/images/cay.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true }
];

// Menü API Rotası (GET Request)
app.get('/api/menu', (req, res) => {
  res.json({
    success: true,
    count: yemekler.length,
    data: yemekler
  });
});

// Hakkımızda API Rotası (GET Request)
app.get('/api/hakkimizda', (req, res) => {
  res.json({
    kurulusYili: 1932,
    restoranAdi: "1932 Lezzet Mührü",
    konum: "Gaziantep",
    aciklama: "90 yılı aşkın geleneksel zırh kıyması ve odun ateşinde pişirme gelenekleri."
  });
});

// Gelen Rezervasyonları Saklayacağımız Dizi (Hafızada Kayıt)
const rezervasyonlar = [];

// Rezervasyon Oluşturma API Rotası (POST Request)
app.post('/api/rezervasyon', (req, res) => {
  const { name, phone, date, time, guests, notes } = req.body;

  // Basit Doğrulama (Validation)
  if (!name || !phone || !date || !time) {
    return res.status(400).json({
      success: false,
      message: 'Lütfen ad, telefon, tarih ve saat alanlarını eksiksiz doldurunuz.'
    });
  }

  // Masa No ve Konum Üretme
  const masaNo = String(Math.floor(1 + Math.random() * 18)).padStart(2, '0');
  const konumlar = ['(Geleneksel Odun Ateşi Katı)', '(Tarihi Avlu Tarafı)', '(Taş Fırın Yanı)', '(Üst Kat Balkon)', '(VIP Salon)'];
  const rastgeleKonum = konumlar[Math.floor(Math.random() * konumlar.length)];

  // Yeni Rezervasyon Nesnesi
  const yeniRezervasyon = {
    id: Date.now(),
    name,
    phone,
    date,
    time,
    guests: guests || '1',
    notes: notes || '',
    masaNo,
    konum: rastgeleKonum,
    olusturulmaTarihi: new Date().toLocaleString()
  };

  // Sunucu Hafızasına Kaydetme
  rezervasyonlar.push(yeniRezervasyon);

  console.log('📌 YENİ REZERVASYON SUNUCUYA KAYDEDİLDİ:', yeniRezervasyon);

  // Müşteriye Cevap Gönderme (Response)
  res.status(201).json({
    success: true,
    message: 'Rezervasyonunuz başarıyla alındı ve sunucuya kaydedildi!',
    data: yeniRezervasyon
  });
});

// Kayıtlı Tüm Rezervasyonları Görme API Rotası (GET Request)
app.get('/api/rezervasyonlar', (req, res) => {
  res.json({
    success: true,
    count: rezervasyonlar.length,
    data: rezervasyonlar
  });
});

// Sunucu Sağlık Rotası
app.get('/api/status', (req, res) => {
  res.json({
    status: "online",
    server: "1932 Lezzet Mührü Backend API",
    time: new Date().toLocaleString()
  });
});

// 3. SUNUCUYU BAŞLATMA
app.listen(PORT, () => {
  console.log(`\n================================================`);
  console.log(`🚀 1932 LEZZET MÜHRÜ BACKEND SUNUCUSU CANLI!`);
  console.log(`📍 Web Sitesi: http://localhost:${PORT}`);
  console.log(`📡 Menü API:   http://localhost:${PORT}/api/menu`);
  console.log(`================================================\n`);
});
