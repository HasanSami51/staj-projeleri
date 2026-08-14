// ==========================================
// 🏛️ 1932 LEZZET MÜHRÜ - VERİTABANI TOHUMLAMA (SEED DATA)
// ==========================================

const db = require('./db');

// Sitemizdeki 42 Yemek Verisi
const yemekler = [
  { id: 35, ad: "Geleneksel Süzme Mercimek Çorbası", kategori: "corba", fiyat: 200, aciklama: "Taş değirmen mercimeği, taze tereyağı ve özel baharatlı kıtır ekmekler ile.", resim: "../public/images/mercimek-corbasi.webp", loading: "eager", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 36, ad: "Köz Patlıcanlı Süt Çorbası", kategori: "corba", fiyat: 220, aciklama: "Odun ateşinde közlenmiş patlıcanların süt ve taze otlarla pişirilmesiyle hazırlanan 1930'lar klasiği.", resim: "../public/images/patlican-corbasi.webp", loading: "eager", oneCikan: 0, sefinOnerisi: 1, vejetaryen: 1 },
  { id: 37, ad: "Mahluta Çorbası", kategori: "corba", fiyat: 210, aciklama: "Kırmızı mercimek, kişniş, kimyon ve zeytinyağında sotelenmiş soğan sosuyla Güneydoğu'nun kadim çorbası.", resim: "../public/images/mahluta.webp", loading: "eager", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 38, ad: "Süzme Ezogelin Çorbası", kategori: "corba", fiyat: 200, aciklama: "İnce bulgur, pirinç ve domates salçasıyla harmanlanmış, nane yağlı geleneksel lezzet.", resim: "../public/images/ezogelin.webp", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 39, ad: "Düğün Çorbası ", kategori: "corba", fiyat: 230, aciklama: "Yoğurt, yumurta sarısı ve un meyhanesiyle bağlanan, üzeri pul biberli kızgın tereyağlı süzme çorba.", resim: "../public/images/dugun-corbasi.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 0 },
  { id: 1, ad: "Meşhur Adana Kebap", kategori: "kebap", fiyat: 350, aciklama: "İnce ince zırhlanmış kıyma ve meşe kömürü ızgarasında leziz baharatlarla önünüzde", resim: "../public/images/Adana-Kebab.jpg", loading: "eager", oneCikan: 1, sefinOnerisi: 1, vejetaryen: 0 },
  { id: 4, ad: "Geleneksel Urfa Kebap", kategori: "kebap", fiyat: 340, aciklama: "Zırh kıymasından acısız ızgara lezzet, közlenmiş domates ve biber eşliğinde", resim: "../public/images/urfa-kebap.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 0 },
  { id: 5, ad: "Sarma Beyti Kebap", kategori: "kebap", fiyat: 380, aciklama: "Özel lavaşa sarılı ızgara zırh kıyması, süzme yoğurt ve tereyağlı domates sosuyla", resim: "../public/images/beyti.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 0 },
  { id: 6, ad: "Ali Nazik Kebabı", kategori: "kebap", fiyat: 400, aciklama: "Közlenmiş patlıcanlı süzme yoğurt yatağında lokum gibi ızgara zırh kebabı", resim: "../public/images/alinazik.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 0 },
  { id: 7, ad: "Antep Fıstıklı Kebap", kategori: "kebap", fiyat: 390, aciklama: "Özel kıyma harcına harmanlanmış bol taze Antep fıstıklı ızgara kebap", resim: "../public/images/fistikli-kebap.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 0 },
  { id: 13, ad: "Terbiye Kuzu Şiş", kategori: "kebap", fiyat: 390, aciklama: "Süt kuzusundan özel marine edilmiş, meşe kömürü ızgarasında pişen lokum etler", resim: "../public/images/kuzu-sis.jpeg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 0 },
  { id: 14, ad: "Meşhur Çöp Şiş", kategori: "kebap", fiyat: 370, aciklama: "Küçük kesim kuzu etleri ve kuyruk yağının ızgarada kekiğe doyduğu lezzet", resim: "../public/images/cop-sis.webp", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 0 },
  { id: 15, ad: "Lokum Tavuk Şiş", kategori: "kebap", fiyat: 260, aciklama: "Süt ve özel baharatlarla marine edilmiş ızgarada pişmiş yumuşacık tavuk eti", resim: "../public/images/tavuk-sis.webp", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 0 },
  { id: 16, ad: "Antep Usulü Ciğer Şiş", kategori: "kebap", fiyat: 340, aciklama: "Taze kuzu ciğeri ve kuyruk yağı ızgara, kimyon ve sumaklı soğan eşliğinde", resim: "../public/images/ciger-sis.jpg", loading: "eager", oneCikan: 0, sefinOnerisi: 1, vejetaryen: 0 },
  { id: 3, ad: "Kuşbaşılı Kaşarlı Pide", kategori: "pide", fiyat: 280, aciklama: "Ağızda sünen eti yumuşacık, güzel mi güzel kuşbaşılı kaşarlı pidemiz", resim: "../public/images/pide.jpg", loading: "lazy", oneCikan: 1, sefinOnerisi: 0, vejetaryen: 0 },
  { id: 8, ad: "Çıtır Kıymalı Pide", kategori: "pide", fiyat: 250, aciklama: "Özel kavrulmuş kıymalı harç, domates, biber ve çıtır kenarlar", resim: "../public/images/kiymali-pide.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 0 },
  { id: 9, ad: "Kavurmali Kaşarlı Pide", kategori: "pide", fiyat: 310, aciklama: "Geleneksel dana kavurma ve uzayan kaşar peynirinin muazzam uyumu", resim: "../public/images/kavurmali-pide.jpg", loading: "eager", oneCikan: 0, sefinOnerisi: 1, vejetaryen: 0 },
  { id: 10, ad: "Taş Fırında Peynirli & Otlu Ege Pidesi", kategori: "pide", fiyat: 310, aciklama: "Lor peyniri, ısırgan otu, maydanoz ve zeytinyağı harcıyla odun fırınından çıkan geleneksel kıtır pide.", resim: "../public/images/ege-pidesi.jpg", loading: "eager", oneCikan: 0, sefinOnerisi: 1, vejetaryen: 1 },
  { id: 11, ad: "Kasap Sucuklu Pide", kategori: "pide", fiyat: 270, aciklama: "%100 dana kasap sucuğu ve bol kaşar peyniriyle", resim: "../public/images/sucuklu-pide.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 0 },
  { id: 12, ad: "Trabzon Yağlı Pidesi", kategori: "pide", fiyat: 290, aciklama: "Yerel kolot peyniri, ortasına köy yumurtası ve has tereyağı ile", resim: "../public/images/trabzon-pide.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 2, ad: "Çıtır Lahmacun", kategori: "pide", fiyat: 150, aciklama: "Kıymayı, domatesi, soğanı mükemmel derecede pişen ağızda dağılan mükemmel bir lezzet", resim: "../public/images/lahmacun.jpg", loading: "lazy", oneCikan: 1, sefinOnerisi: 0, vejetaryen: 0 },
  { id: 17, ad: "Fındık Lahmacun (3'lü)", kategori: "pide", fiyat: 180, aciklama: "Özel baharatlı harcı ve çıtır hamuruyla geleneksel mini atıştırmalık", resim: "../public/images/findik-lahmacun.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 0 },
  { id: 18, ad: "Antep Usulü Sarımsaklı Lahmacun", kategori: "pide", fiyat: 170, aciklama: "Zırh kıyması, bol taze sarımsak, maydanoz ve nar ekşisinin çıtır hamurla buluşması", resim: "../public/images/sarimsakli-lahmacun.jpg", loading: "eager", oneCikan: 0, sefinOnerisi: 1, vejetaryen: 0 },
  { id: 40, ad: "Zeytinyağlı Enginar Dolması", kategori: "zeytinyagli", fiyat: 340, aciklama: "Osmanlı saray mutfağından günümüze; dereotu, dolmalık fıstık ve kuş üzümlü iç pilavla doldurulmuş Ege enginarı.", resim: "../public/images/enginar.jpg", loading: "eager", oneCikan: 0, sefinOnerisi: 1, vejetaryen: 1 },
  { id: 41, ad: "Kuru Patlıcan ve Biber Dolması", kategori: "zeytinyagli", fiyat: 320, aciklama: "Antep usulü yazdan kurutulmuş sebzelerin nar ekşili, sumaklı ve bol baharatlı pirinç harcıyla demlenmesi.", resim: "../public/images/kuru-dolma.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 42, ad: "Müceddere Pilavı & Süzme Yoğurt", kategori: "zeytinyagli", fiyat: 290, aciklama: "Orta Doğu ve Doğu Anadolu mutfağının asırlık lezzeti; yeşil mercimek, karamelize soğan ve baharatlı bulgur.", resim: "../public/images/muceddere.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 19, ad: "Gavurdağı Salatası", kategori: "zeytinyagli", fiyat: 140, aciklama: "İnce kıyılmış domates, salatalık, bol ceviz, nar ekşisi ve sızma zeytinyağı ile", resim: "../public/images/gavurdagi.webp", loading: "eager", oneCikan: 0, sefinOnerisi: 1, vejetaryen: 1 },
  { id: 20, ad: "Acılı Ezme Salata", kategori: "zeytinyagli", fiyat: 120, aciklama: "Taze domates, biber, sarımsak, maydanoz ve özel baharatlarla harmanlanmış acı lezzet", resim: "../public/images/acili-ezme.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 21, ad: "Klasik Çoban Salatası", kategori: "zeytinyagli", fiyat: 110, aciklama: "Küp doğranmış domates, salatalık, sivri biber, kuru soğan, limon ve zeytinyağı sosuyla", resim: "../public/images/coban-salata.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 22, ad: "Tulum Peynirli Roka Salatası", kategori: "zeytinyagli", fiyat: 150, aciklama: "Taze körpe roka yaprakları, Erzincan tulum peyniri, ceviz ve nar ekşisi eşliğinde", resim: "../public/images/roka-salata.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 23, ad: "Urfa Usulü Bostana", kategori: "zeytinyagli", fiyat: 130, aciklama: "Zar gibi incecik kıyılmış sebzeler, buzlu soğuk sunumu ve bol sumak ekşisiyle", resim: "../public/images/bostana.webp", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 24, ad: "Fıstıklı Künefe", kategori: "tatli", fiyat: 160, aciklama: "Özel Hatay peyniri, çıtır kadayıf ve bol Antep fıstığı ile sıcacık", resim: "../public/images/kunefe.png", loading: "eager", oneCikan: 0, sefinOnerisi: 1, vejetaryen: 1 },
  { id: 25, ad: "Havuç Dilim Baklava", kategori: "tatli", fiyat: 180, aciklama: "İncecik yufkalar, bol fıstık ile karşınızda", resim: "../public/images/havuc-dilim.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 26, ad: "Geleneksel Katmer", kategori: "tatli", fiyat: 190, aciklama: "Zar gibi açılmış hamur içerisinde kaymak ve taze çekilmiş Antep fıstığı", resim: "../public/images/katmer.webp", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 27, ad: "Fırın Sütlaç", kategori: "tatli", fiyat: 110, aciklama: "Toprak güveçte nar gibi kızarmış geleneksel lezzet", resim: "../public/images/sutlac.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 28, ad: "Dondurmalı İrmik Helvası", kategori: "tatli", fiyat: 120, aciklama: "Tereyağında kavrulmuş sıcak irmik helvası ortasında keçi sütlü dondurma ile", resim: "../public/images/irmik.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 29, ad: "Köpüklü Yayık Ayranı", kategori: "icecek", fiyat: 50, aciklama: "Bakır maşrapada servis edilen, köy yoğurdundan ev yapımı ayran", resim: "../public/images/ayran.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 30, ad: "Acılı / Acısız Şalgam", kategori: "icecek", fiyat: 45, aciklama: "Geleneksel Adana usulü, havuç taneleriyle servis edilen şalgam suyu", resim: "../public/images/salgam.jpeg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 31, ad: "Ev Yapımı Limonata", kategori: "icecek", fiyat: 60, aciklama: "Taze sıkılmış limon, nane yaprakları ve az şekerli serinletici lezzet", resim: "../public/images/limonata.webp", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 32, ad: "Niğde Gazozu", kategori: "icecek", fiyat: 45, aciklama: "Ahududu aromalı, geleneksel Türk gazozu lezzeti", resim: "../public/images/gazoz.png", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 33, ad: "Türk Kahvesi", kategori: "icecek", fiyat: 60, aciklama: "Çifte kavrulmuş kahve çekirdeklerinden, lokum meşe aromalı su ikramıyla", resim: "../public/images/kahve.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 },
  { id: 34, ad: "Taze Demleme Çay", kategori: "icecek", fiyat: 25, aciklama: "İnce belli bardakta, Karadeniz'in en seçkin yapraklarından taze demleme", resim: "../public/images/cay.jpg", loading: "lazy", oneCikan: 0, sefinOnerisi: 0, vejetaryen: 1 }
];

console.log('🌱 Veritabanı Tohumlama (Seed) Başlatılıyor...');

db.serialize(() => {

  // ------------------------------------------
  // 1. KATEGORİLERİ EKLEME
  // ------------------------------------------
 const katStmt = db.prepare(`INSERT OR REPLACE INTO kategoriler (id, ad, slug, sira) VALUES (?, ?, ?, ?)`);
  katStmt.run(1, 'Çorbalar', 'corba', 1);
  katStmt.run(2, 'Kebaplar & Izgaralar', 'kebap', 2);
  katStmt.run(3, 'Pideler & Lahmacunlar', 'pide', 3);
  katStmt.run(4, 'Zeytinyağlılar & Mezeler', 'zeytinyagli', 4);
  katStmt.run(5, 'Geleneksel Tatlılar', 'tatli', 5);
  katStmt.run(6, 'İçecekler', 'icecek', 6);
  katStmt.finalize();

  console.log('✅ Kategoriler eklendi.');

  // Kategori eşleştirme haritası
  const katMap = {
    corba: 1,
    kebap: 2,
    pide: 3,
    zeytinyagli: 4,
    tatli: 5,
    icecek: 6
  };

  // ------------------------------------------
  // 2. ÜRÜNLERİ EKLEME (42 Adet Lezzet)
  // ------------------------------------------
  const urunStmt = db.prepare(`
    INSERT OR REPLACE INTO urunler 
    (id, kategori_id, ad, aciklama, fiyat, resim, loading, one_cikan, sefin_onerisi, vejetaryen)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  yemekler.forEach(y => {
    const kId = katMap[y.kategori] || 1;
    urunStmt.run(
      y.id,
      kId,
      y.ad,
      y.aciklama,
      y.fiyat,
      y.resim,
      y.loading,
      y.oneCikan,
      y.sefinOnerisi,
      y.vejetaryen
    );
  });
  urunStmt.finalize();

  console.log('✅ 43 Adet Lezzet veritabanına eklendi.');

  // ------------------------------------------
  // 3. ÖRNEK ADMİN KULLANICISI EKLEME
  // ------------------------------------------
  const adminStmt = db.prepare(`INSERT OR IGNORE INTO admin (id, kullanici_adi, sifre_hash, eposta) VALUES (?, ?, ?, ?)`);
  adminStmt.run(1, 'admin', 'admin1932_hash_secret', 'admin@lezzetmuhru1932.com');
  adminStmt.finalize();

  console.log('✅ Varsayılan Admin kullanıcısı eklendi.');

  // ------------------------------------------
  // 4. ÖRNEK REZERVASYON VE MESAJ EKLEME
  // ------------------------------------------
  const resStmt = db.prepare(`INSERT OR IGNORE INTO rezervasyonlar (id, ad_soyad, telefon, tarih, saat, kisi_sayisi, notlar) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  resStmt.run(1, 'Ahmet Yılmaz', '05551112233', '2026-08-10', '19:30', 4, 'Cam kenarı masa rica ediyoruz.');
  resStmt.finalize();

  const msgStmt = db.prepare(`INSERT OR IGNORE INTO mesajlar (id, ad_soyad, eposta, konu, mesaj) VALUES (?, ?, ?, ?, ?)`);
  msgStmt.run(1, 'Mehmet Ünal', 'mehmet@example.com', 'Teşekkür', 'Adana kebabınız mükemmeldi, tebrikler!');
  msgStmt.finalize();

  console.log('✅ Örnek rezervasyon ve mesaj verileri eklendi.\n');
});
