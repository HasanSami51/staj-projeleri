// ==========================================
// LEZZET MÜHRÜ - EKSİKSİZ VE HATASIZ MAIN.JS
// ==========================================

// --- YEMEK VERİLERİ (MENU) ---
const yemekler = [
  { id: 35, ad: "Geleneksel Süzme Mercimek Çorbası", kategori: "corba", fiyat: 200, aciklama: "Taş değirmen mercimeği, taze tereyağı ve özel baharatlı kıtır ekmekler ile.", resim: "../public/images/mercimek-corbasi.webp", loading: "eager", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 36, ad: "Köz Patlıcanlı Süt Çorbası", kategori: "corba", fiyat: 220, aciklama: "Odun ateşinde közlenmiş patlıcanların süt ve taze otlarla pişirilmesiyle hazırlanan 1930'lar klasiği.", resim: "../public/images/patlican-corbasi.webp", loading: "eager", oneCikan: false, sefinOnerisi: true, vejetaryen: true },
  { id: 37, ad: "Mahluta Çorbası", kategori: "corba", fiyat: 210, aciklama: "Kırmızı mercimek, kişniş, kimyon ve zeytinyağında sotelenmiş soğan sosuyla Güneydoğu'nun kadim çorbası.", resim: "../public/images/mahluta.webp", loading: "eager", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 38, ad: "Süzme Ezogelin Çorbası", kategori: "corba", fiyat: 200, aciklama: "İnce bulgur, pirinç ve domates salçasıyla harmanlanmış, nane yağlı geleneksel lezzet.", resim: "../public/images/ezogelin.webp", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 39, ad: "Düğün Çorbası ", kategori: "corba", fiyat: 230, aciklama: "Yoğurt, yumurta sarısı ve un meyhanesiyle bağlanan, üzeri pul biberli kızgın tereyağlı süzme çorba.", resim: "../public/images/dugun-corbasi.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 1, ad: "Meşhur Adana Kebap", kategori: "kebap", fiyat: 350, aciklama: "İnce ince zırhlanmış kıyma ve meşe kömürü ızgarasında leziz baharatlarla önünüzde", resim: "../public/images/Adana-Kebab.jpg", loading: "eager", oneCikan: true, sefinOnerisi: true, vejetaryen: false },
  { id: 4, ad: "Geleneksel Urfa Kebap", kategori: "kebap", fiyat: 340, aciklama: "Zırh kıymasından acısız ızgara lezzet, közlenmiş domates ve biber eşliğinde", resim: "../public/images/urfa-kebap.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 5, ad: "Sarma Beyti Kebap", kategori: "kebap", fiyat: 380, aciklama: "Özel lavaşa sarılı ızgara zırh kıyması, süzme yoğurt ve tereyağlı domates sosuyla", resim: "../public/images/beyti.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 6, ad: "Ali Nazik Kebabı", kategori: "kebap", fiyat: 400, aciklama: "Közlenmiş patlıcanlı süzme yoğurt yatağında lokum gibi ızgara zırh kebabı", resim: "../public/images/alinazik.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 7, ad: "Antep Fıstıklı Kebap", kategori: "kebap", fiyat: 390, aciklama: "Özel kıyma harcına harmanlanmış bol taze Antep fıstıklı ızgara kebap", resim: "../public/images/fistikli-kebap.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 3, ad: "Kuşbaşılı Kaşarlı Pide", kategori: "pide", fiyat: 280, aciklama: "Ağızda sünen eti yumuşacık, güzel mi güzel kuşbaşılı kaşarlı pidemiz", resim: "../public/images/pide.jpg", loading: "lazy", oneCikan: true, sefinOnerisi: false, vejetaryen: false },
  { id: 8, ad: "Çıtır Kıymalı Pide", kategori: "pide", fiyat: 250, aciklama: "Özel kavrulmuş kıymalı harç, domates, biber ve çıtır kenarlar", resim: "../public/images/kiymali-pide.jpg", loading: "lazy", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 9, ad: "Kavurmalı Kaşarlı Pide", kategori: "pide", fiyat: 310, aciklama: "Geleneksel dana kavurma ve uzayan kaşar peynirinin muazzam uyumu", resim: "../public/images/kavurmali-pide.jpg", loading: "eager", oneCikan: false, sefinOnerisi: true, vejetaryen: false },
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

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // MODÜLER YARDIMCI FONKSİYONLAR
  // ==========================================

  // 1. Ekranı Yumuşak Kaydırma (Smooth Scroll)
  function yumusakKaydir(hedef, offset = 90) {
    if (!hedef) return;
    const element = typeof hedef === "string" ? document.querySelector(hedef) : hedef;
    if (!element) return;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }

  // 2. Türkçe Karakter Uyumlu Küçük Harfe Çevirici
  function trKucukHarf(metin) {
    return (metin || "").toLocaleLowerCase("tr-TR").trim();
  }

  // 3. Saat Metnini Toplam Dakikaya Çevirici ("10:30" -> 630)
  function saatiDakikayaCevir(saatMetni) {
    if (!saatMetni) return 0;
    const [saat, dakika] = saatMetni.split(":").map(Number);
    return saat * 60 + dakika;
  }

  // 4. Form Gönderim & Yüklenme Simülatörü
  function formGonderimSimuleEt(formEl, alertEl, gonderimMetni = "Gönderiliyor...", beklemeSuresi = 1200) {
    if (!formEl) return;
    const submitBtn = formEl.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : "Gönder";

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${gonderimMetni}`;
    }

    setTimeout(() => {
      if (alertEl) {
        alertEl.style.display = "flex";
        yumusakKaydir(alertEl);
      }
      formEl.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
      setTimeout(() => {
        if (alertEl) alertEl.style.display = "none";
        const ticketContainer = document.getElementById('resTicketContainer');
        if (ticketContainer && ticketContainer.style.display !== 'none') {
          yumusakKaydir(ticketContainer);
        }
      }, 4200);
    }, beklemeSuresi);
  }

  // ==========================================
  // 1. MENÜ FİLTRELEME & CANLI ARAMA İŞLEMLERİ
  // ==========================================
  const menuGrid = document.getElementById("menu-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const menuSearchInput = document.getElementById("menuSearchInput");

  if (menuGrid) {
    let aktifKategori = "tumu";
    let mevcutAramaMetni = "";

    // Debounce Fonksiyonu (Yazarken Donma ve Çökmeyi Engeller)
    function debounce(func, delay = 250) {
      let timer;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
      };
    }

    // Yemek Listesini DOM'a Kasan Olmadan Basma
    function yemekleriListele(Liste) {
      menuGrid.innerHTML = "";

      if (Liste.length === 0) {
        menuGrid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; background: #fff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-top: 20px;">
            <i class="fa-solid fa-utensils" style="font-size: 2.2rem; color: var(--primary-kiremit, #c0392b); margin-bottom: 12px;"></i>
            <p class="no-match" style="font-size: 1.2rem; color: #555; margin-bottom: 4px;">Aradığınız kriterlere uygun lezzet bulunamadı.</p>
            <span style="font-size: 0.9rem; color: #888;">Farklı bir kategori veya arama kelimesi deneyebilirsiniz.</span>
          </div>
        `;
        return;
      }

      const fragment = document.createDocumentFragment();

      Liste.forEach((yemek) => {
        const sefinOnerisiHTML = yemek.sefinOnerisi ? `<span class="badge badge-chef">⭐ Şefin Önerisi</span>` : '';
        const vejetaryenHTML = yemek.vejetaryen ? `<span class="badge badge-veg" title="Vejetaryen Dostu">🌱 Veg</span>` : '';
        const aciliHTML = (yemek.kategori === 'kebap' && (yemek.ad.includes('Adana') || yemek.ad.includes('Ciğer') || yemek.ad.includes('Sarma'))) || yemek.ad.includes('Acılı') ? `<span class="badge badge-spicy" title="Acılı Lezzet"><i class="fa-solid fa-pepper-hot"></i> Acılı</span>` : '';

        const cardDiv = document.createElement("div");
        cardDiv.className = "dish-card";
        cardDiv.dataset.kategori = yemek.kategori;

        cardDiv.innerHTML = `
          <div class="card-badges">
            ${sefinOnerisiHTML}
            ${vejetaryenHTML}
            ${aciliHTML}
          </div>
          <div class="dish-img-container">
            <img src="${yemek.resim}" alt="${yemek.ad}" loading="${yemek.loading}">
          </div>
          <div class="dish-info">
            <h3>${yemek.ad}</h3>
            <p>${yemek.aciklama}</p>
            <span class="dish-price">₺${yemek.fiyat}</span>
          </div>
        `;
        fragment.appendChild(cardDiv);
      });

      menuGrid.appendChild(fragment);

      // 6. ADIM: Skeleton Shimmer & Image Fade-In Event Listeners
      const imgContainers = menuGrid.querySelectorAll('.dish-img-container');
      imgContainers.forEach(container => {
        const img = container.querySelector('img');
        if (img) {
          container.classList.add('skeleton-loading');
          if (img.complete && img.naturalWidth > 0) {
            img.classList.add('loaded');
            container.classList.remove('skeleton-loading');
          } else {
            img.addEventListener('load', () => {
              img.classList.add('loaded');
              container.classList.remove('skeleton-loading');
            });
            img.addEventListener('error', () => {
              img.classList.add('loaded');
              container.classList.remove('skeleton-loading');
            });
          }
        }
      });
    }

    let hepsiAcik = false;
    const loadMoreContainer = document.getElementById("loadMoreContainer");
    const loadMoreBtn = document.getElementById("loadMoreBtn");

    // Hem Kategori Hem de Arama Filtresini Birlikte Çalıştıran Ortak Fonksiyon
    function menuyuFiltrele() {
      const filtrelenmis = yemekler.filter((yemek) => {
        const kategoriUyumlu = (aktifKategori === "tumu") || (yemek.kategori === aktifKategori);
        
        // TÜRKÇE KARAKTER UYUMLU ARAMA (Ad, Açıklama ve Kategori Arama)
        const adUyumlu = yemek.ad.toLocaleLowerCase('tr-TR').includes(mevcutAramaMetni);
        const aciklamaUyumlu = yemek.aciklama.toLocaleLowerCase('tr-TR').includes(mevcutAramaMetni);
        
        // Kategori isimleri ve eş anlamlı terimlerle arama (Örn: "IZGARA", "KEBAP", "ÇORBA" vb.)
        let kategoriEtiketUyumlu = false;
        if (mevcutAramaMetni.length > 0) {
          if (('izgara'.includes(mevcutAramaMetni) || 'ızgara'.includes(mevcutAramaMetni) || 'izgaralar'.includes(mevcutAramaMetni) || 'ızgaralar'.includes(mevcutAramaMetni) || 'kebap'.includes(mevcutAramaMetni) || 'kebaplar'.includes(mevcutAramaMetni)) && yemek.kategori === 'kebap') {
            kategoriEtiketUyumlu = true;
          } else if (('corba'.includes(mevcutAramaMetni) || 'çorba'.includes(mevcutAramaMetni) || 'çorbalar'.includes(mevcutAramaMetni)) && yemek.kategori === 'corba') {
            kategoriEtiketUyumlu = true;
          } else if (('pide'.includes(mevcutAramaMetni) || 'pideler'.includes(mevcutAramaMetni) || 'lahmacun'.includes(mevcutAramaMetni)) && yemek.kategori === 'pide') {
            kategoriEtiketUyumlu = true;
          } else if (('zeytinyağlı'.includes(mevcutAramaMetni) || 'zeytinyagli'.includes(mevcutAramaMetni) || 'salata'.includes(mevcutAramaMetni)) && yemek.kategori === 'zeytinyagli') {
            kategoriEtiketUyumlu = true;
          } else if (('tatli'.includes(mevcutAramaMetni) || 'tatlı'.includes(mevcutAramaMetni) || 'tatlılar'.includes(mevcutAramaMetni)) && yemek.kategori === 'tatli') {
            kategoriEtiketUyumlu = true;
          } else if (('icecek'.includes(mevcutAramaMetni) || 'içecek'.includes(mevcutAramaMetni) || 'içecekler'.includes(mevcutAramaMetni)) && yemek.kategori === 'icecek') {
            kategoriEtiketUyumlu = true;
          }
        }
        
        const aramaUyumlu = adUyumlu || aciklamaUyumlu || kategoriEtiketUyumlu;
        
        return kategoriUyumlu && aramaUyumlu;
      });

      // Eğer "Tüm Lezzetler" seçiliyse, arama yapılmıyorsa ve henüz hepsiAcik tıklanmadıysa Şefin Önerisi 9 yıldız lezzeti yükle
      if (aktifKategori === "tumu" && mevcutAramaMetni === "" && !hepsiAcik) {
        const sefinOnerileri = yemekler.filter(y => y.sefinOnerisi);
        yemekleriListele(sefinOnerileri);
        if (loadMoreContainer) {
          loadMoreContainer.style.display = "block";
          loadMoreBtn.innerHTML = `Tüm Lezzetleri İncele (${yemekler.length} Lezzet) <i class="fa-solid fa-chevron-down"></i>`;
        }
      } else {
        yemekleriListele(filtrelenmis);
        if (loadMoreContainer) loadMoreContainer.style.display = "none";
      }
    }

    const kategoriAdlari = {
      corba: "🍲 Çorbalar",
      kebap: "🥩 Izgaralar & Kebaplar",
      pide: "🍕 Pideler & Lahmacunlar",
      zeytinyagli: "🥗 Zeytinyağlılar & Salatalar",
      tatli: "🍨 Tatlılar",
      icecek: "🥤 İçecekler"
    };

    function tumYemekleriGosterYazdir() {
      hepsiAcik = true;
      aktifKategori = "tumu";
      mevcutAramaMetni = "";
      if (menuSearchInput) menuSearchInput.value = "";
      if (filterBtns) {
        filterBtns.forEach((b) => b.classList.remove("active"));
      }
      const tumuBtn = document.querySelector('.filter-btn[data-kategori="tumu"]');
      if (tumuBtn) tumuBtn.classList.add("active");
      
      if (Array.isArray(yemekler) && menuGrid) {
        menuGrid.innerHTML = "";
        const kategorilerOrder = ["corba", "kebap", "pide", "zeytinyagli", "tatli", "icecek"];
        
        kategorilerOrder.forEach(katKey => {
          const katYemekleri = yemekler.filter(y => y.kategori === katKey);
          if (katYemekleri.length > 0) {
            const catHeader = document.createElement("div");
            catHeader.className = "print-category-header";
            catHeader.innerHTML = `<span>${kategoriAdlari[katKey] || katKey}</span>`;
            menuGrid.appendChild(catHeader);

            katYemekleri.forEach(yemek => {
              const sefinOnerisiHTML = yemek.sefinOnerisi ? `<span class="badge badge-chef">⭐ Şefin Önerisi</span>` : '';
              const vejetaryenHTML = yemek.vejetaryen ? `<span class="badge badge-veg" title="Vejetaryen">🌱 Veg</span>` : '';
              const aciliHTML = (yemek.kategori === 'kebap' && (yemek.ad.includes('Adana') || yemek.ad.includes('Ciğer') || yemek.ad.includes('Sarma'))) || yemek.ad.includes('Acılı') ? `<span class="badge badge-spicy"><i class="fa-solid fa-pepper-hot"></i> Acılı</span>` : '';

              const cardDiv = document.createElement("div");
              cardDiv.className = "dish-card";
              cardDiv.dataset.kategori = yemek.kategori;

              cardDiv.innerHTML = `
                <div class="card-badges">
                  ${sefinOnerisiHTML}
                  ${vejetaryenHTML}
                  ${aciliHTML}
                </div>
                <div class="dish-img-container">
                  <img src="${yemek.resim}" alt="${yemek.ad}" loading="eager">
                </div>
                <div class="dish-info">
                  <h3>${yemek.ad}</h3>
                  <p>${yemek.aciklama}</p>
                  <span class="dish-price">₺${yemek.fiyat}</span>
                </div>
              `;
              menuGrid.appendChild(cardDiv);
            });
          }
        });

        // 6. ADIM: Skeleton Shimmer Listener
        const imgContainers = menuGrid.querySelectorAll('.dish-img-container');
        imgContainers.forEach(container => {
          const img = container.querySelector('img');
          if (img) {
            container.classList.add('skeleton-loading');
            if (img.complete && img.naturalWidth > 0) {
              img.classList.add('loaded');
              container.classList.remove('skeleton-loading');
            } else {
              img.addEventListener('load', () => {
                img.classList.add('loaded');
                container.classList.remove('skeleton-loading');
              });
              img.addEventListener('error', () => {
                img.classList.add('loaded');
                container.classList.remove('skeleton-loading');
              });
            }
          }
        });
      }
      if (loadMoreContainer) loadMoreContainer.style.display = "none";
    }

    window.menuyuYazdirAninda = function() {
      tumYemekleriGosterYazdir();
      setTimeout(() => {
        window.print();
      }, 150);
    };

    const btnPrintMenu = document.getElementById("btnPrintMenu") || document.querySelector(".btn-print-menu");
    if (btnPrintMenu) {
      btnPrintMenu.onclick = function(e) {
        if (e) e.preventDefault();
        window.menuyuYazdirAninda();
      };
    }

    window.addEventListener('beforeprint', tumYemekleriGosterYazdir);

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        hepsiAcik = true;
        menuyuFiltrele();
        yumusakKaydir(".menu-section") || yumusakKaydir("#menu-grid");
      });
    }

    // Sayfa Açılışında İlk Yükleme
    menuyuFiltrele();

    // Kategori Butonları Click Event
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        const targetBtn = e.currentTarget; 
        targetBtn.classList.add("active");

        aktifKategori = targetBtn.dataset.kategori;
        // Eğer Tüm Lezzetler sekmesine tıklanırsa tüm 42 yemeği aç
        if (aktifKategori === "tumu") {
          hepsiAcik = true;
        }
        menuyuFiltrele();
      });
    });

    // Arama Kutusu Input Event (Debounced & Türkçe Karakter Uyumlu)
    if (menuSearchInput) {
      menuSearchInput.addEventListener("input", debounce((e) => {
        mevcutAramaMetni = trKucukHarf(e.target.value);
        menuyuFiltrele();
      }, 250));
    }
  }

  // ==========================================
  // 2. YUKARI ÇIK BUTONU VE GALERİ MODAL
  // ==========================================
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ==========================================
  // 2. GALERİ LIGHTBOX & KLAVYE OK TUŞLARI GEZİNMESİ
  // ==========================================
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");
  const modalCounter = document.getElementById("modalCounter");
  const closeBtn = document.querySelector(".modal-close");
  const prevBtn = document.getElementById("modalPrev");
  const nextBtn = document.getElementById("modalNext");
  const galleryItems = document.querySelectorAll(".gallery-item");

  let currentGalleryIndex = 0;

  if (modal && galleryItems.length > 0) {
    galleryItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        openGalleryModal(index);
      });
    });

    function openGalleryModal(index) {
      currentGalleryIndex = index;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
      updateModalContent();
    }

    function updateModalContent() {
      if (!galleryItems[currentGalleryIndex]) return;

      const item = galleryItems[currentGalleryIndex];
      const img = item.querySelector("img");
      const overlayText = item.querySelector(".gallery-overlay span");
      const captionText = overlayText ? overlayText.textContent : (img ? img.alt : "");

      if (img && modalImg) {
        modalImg.classList.add("change-anim");
        setTimeout(() => {
          modalImg.src = img.src;
          modalImg.alt = img.alt || "";
          if (modalCaption) modalCaption.textContent = captionText;
          if (modalCounter) modalCounter.textContent = `${currentGalleryIndex + 1} / ${galleryItems.length}`;
          modalImg.classList.remove("change-anim");
        }, 120);
      }
    }

    function showNextImage() {
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
      updateModalContent();
    }

    function showPrevImage() {
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
      updateModalContent();
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (nextBtn) nextBtn.addEventListener("click", showNextImage);
    if (prevBtn) prevBtn.addEventListener("click", showPrevImage);

    // Dış boşluğa tıklanınca kapat
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    // Klavye Tuş Dinleyicileri (Sol/Sağ Ok Tuşları & ESC)
    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("active")) return;

      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowRight") {
        showNextImage();
      } else if (e.key === "ArrowLeft") {
        showPrevImage();
      }
    });
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }

  // ==========================================
  // 3. REZERVASYON FORMU VE ADIM ADIM SIRALI KONTROLLER
  // ==========================================
  const customDateInput = document.getElementById('resDate');
  const hiddenNativeDate = document.getElementById('hiddenNativeDate');
  const customTimeInput = document.getElementById('resTime');
  const hiddenNativeTime = document.getElementById('hiddenNativeTime');
  const resNameInput = document.getElementById('resName');
  const resPhoneInput = document.getElementById('resPhone');
  const resGuestsInput = document.getElementById('resGuests');
  const resNotesInput = document.getElementById('resNotes');
  const reservationForm = document.getElementById('reservationForm');
  const resFormAlert = document.getElementById('resFormAlert');

  // --- YARDIMCI DOĞRULAMA FONKSİYONLARI ---
  function hataGoster(inputElement, mesaj) {
    if (!inputElement) return;
    const formGroup = inputElement.closest('.form-group');
    if (!formGroup) return;

    const wrapper = formGroup.querySelector('.input-icon-wrapper') || inputElement;
    wrapper.classList.add('has-error');

    let errorSpan = formGroup.querySelector('.error-msg');
    if (!errorSpan) {
      errorSpan = document.createElement('span');
      errorSpan.className = 'error-msg';
      formGroup.appendChild(errorSpan);
    }
    errorSpan.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${mesaj}`;
  }

  function alanHatasiniTemizle(inputElement) {
    if (!inputElement) return;
    const formGroup = inputElement.closest('.form-group');
    if (!formGroup) return;

    const wrapper = formGroup.querySelector('.input-icon-wrapper') || inputElement;
    wrapper.classList.remove('has-error');
    const errorSpan = formGroup.querySelector('.error-msg');
    if (errorSpan) errorSpan.remove();
  }

  function hatalariTemizle() {
    document.querySelectorAll('.error-msg').forEach((el) => el.remove());
    document.querySelectorAll('.has-error').forEach((el) => el.classList.remove('has-error'));
  }

  // --- ADIM ADIM SIRALAMA VE CANLI ALAN DENETLEYİCİSİ ---
  function adimKontrol(hedefAdim) {
    // 1. Ad Soyad Kontrolü (Adım 1)
    if (hedefAdim > 1 && (!resNameInput || !resNameInput.value.trim() || resNameInput.value.trim().length < 3)) {
      hataGoster(resNameInput, 'Lütfen önce Adınızı ve Soyadınızı tam olarak giriniz.');
      if (resNameInput) {
        resNameInput.focus();
        resNameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }
    // 2. Telefon Kontrolü (Adım 2)
    if (hedefAdim > 2 && (!resPhoneInput || !resPhoneInput.value.trim() || !/^05[0-9]{9}$/.test(resPhoneInput.value.replace(/\s+/g, '')))) {
      hataGoster(resPhoneInput, 'Lütfen önce geçerli bir cep telefonu numarası (05XXXXXXXXX) giriniz.');
      if (resPhoneInput) {
        resPhoneInput.focus();
        resPhoneInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }
    // 3. Tarih Kontrolü (Adım 3)
    if (hedefAdim > 3 && (!customDateInput || !customDateInput.value)) {
      hataGoster(customDateInput, 'Lütfen önce rezervasyon tarihini seçiniz.');
      if (customDateInput) {
        customDateInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }
    // 4. Saat Kontrolü (Adım 4)
    if (hedefAdim > 4 && (!customTimeInput || !customTimeInput.value)) {
      hataGoster(customTimeInput, 'Lütfen önce rezervasyon saatini seçiniz.');
      if (customTimeInput) {
        customTimeInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }
    // 5. Kişi Sayısı Kontrolü (Adım 5)
    if (hedefAdim > 5 && (!resGuestsInput || !resGuestsInput.value)) {
      hataGoster(resGuestsInput, 'Lütfen önce kişi sayısını giriniz.');
      if (resGuestsInput) {
        resGuestsInput.focus();
        resGuestsInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }
    return true;
  }

  // --- KİLİTLİ ALAN KORUYUCUSU (Önceki Adım Tamamlanmadan İlerlenemez) ---
  const adimEngelleri = [
    { el: resPhoneInput, adim: 2 },
    { el: customDateInput, adim: 3 },
    { el: hiddenNativeDate, adim: 3 },
    { el: customTimeInput, adim: 4 },
    { el: hiddenNativeTime, adim: 4 },
    { el: resGuestsInput, adim: 5 },
    { el: resNotesInput, adim: 6 }
  ];

  adimEngelleri.forEach(item => {
    if (item.el) {
      ['mousedown', 'click', 'focus', 'keydown', 'input', 'change'].forEach(evtType => {
        item.el.addEventListener(evtType, (e) => {
          if (!adimKontrol(item.adim)) {
            if (evtType === 'input' || evtType === 'change') {
              item.el.value = '';
            }
            e.preventDefault();
            e.stopPropagation();
          }
        });
      });
    }
  });

  // Kişi Sayısı için Anında Canlı Uarı ve Sınırlama (Live Input Validation)
  if (resGuestsInput) {
    resGuestsInput.addEventListener('input', (e) => {
      if (!adimKontrol(5)) {
        e.target.value = '';
        return;
      }
      const rawVal = e.target.value;
      if (!rawVal) {
        alanHatasiniTemizle(resGuestsInput);
        return;
      }
      const val = parseInt(rawVal, 10);
      if (rawVal.length > 2 || val > 10) {
        hataGoster(resGuestsInput, 'Online en fazla 10 kişilik rezervasyon kabul edilmektedir.');
        e.target.value = rawVal.slice(0, 2);
      } else if (val < 1) {
        hataGoster(resGuestsInput, 'Kişi sayısı en az 1 kişi olmalıdır.');
      } else {
        alanHatasiniTemizle(resGuestsInput);
      }
    });
  }

  // İnput yazıldıkça veya düzeltildikçe hatayı anında temizle
  [resNameInput, resPhoneInput, customDateInput, customTimeInput].forEach(input => {
    if (input) {
      ['input', 'change', 'blur'].forEach(evt => {
        input.addEventListener(evt, () => {
          if (input.value && input.value.trim() !== '') {
            alanHatasiniTemizle(input);
          }
        });
      });
    }
  });

  // Tarih alanına tıklanırsa
  if (customDateInput && hiddenNativeDate) {
    customDateInput.addEventListener('click', () => {
      if (!adimKontrol(3)) return;
      hiddenNativeDate.showPicker();
    });

    hiddenNativeDate.addEventListener('change', (e) => {
      if (!adimKontrol(3)) {
        e.target.value = '';
        return;
      }
      if (e.target.value) {
        alanHatasiniTemizle(customDateInput);
        const selectedDate = new Date(e.target.value + 'T00:00:00');
        const dayOfWeek = selectedDate.getDay(); 

        if (dayOfWeek === 0) {
          hataGoster(customDateInput, 'Restoranımız Pazar günleri kapalıdır. Lütfen başka bir gün seçiniz.');
          customDateInput.value = '';
          hiddenNativeDate.value = '';
          if (customTimeInput) customTimeInput.value = '';
          if (hiddenNativeTime) hiddenNativeTime.value = '';
          return;
        }

        const [year, month, day] = e.target.value.split('-');
        customDateInput.value = `${day}.${month}.${year}`;

        if (hiddenNativeTime) {
          hiddenNativeTime.max = (dayOfWeek === 5 || dayOfWeek === 6) ? "23:00" : "22:00";
          if (customTimeInput) customTimeInput.value = '';
          hiddenNativeTime.value = '';
        }
        if (typeof updateTicketPreview === 'function') updateTicketPreview();
      }
    });
  }

  // Saat alanına tıklanırsa
  if (customTimeInput && hiddenNativeTime) {
    customTimeInput.addEventListener('click', () => {
      if (!adimKontrol(4)) return;
      hiddenNativeTime.showPicker();
    });

    hiddenNativeTime.addEventListener('change', (e) => {
      if (!adimKontrol(4)) {
        e.target.value = '';
        return;
      }
      const selectedTime = e.target.value;
      if (!selectedTime) return;

      alanHatasiniTemizle(customTimeInput);
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes;
      const minMinutes = 10 * 60; 

      const selectedDateVal = hiddenNativeDate ? hiddenNativeDate.value : '';
      const selectedDate = selectedDateVal ? new Date(selectedDateVal + 'T00:00:00') : new Date();
      const dayOfWeek = selectedDate.getDay();

      const isWeekendHeader = (dayOfWeek === 5 || dayOfWeek === 6);
      const maxMinutes = isWeekendHeader ? (23 * 60) : (22 * 60);
      const maxTimeStr = isWeekendHeader ? '23:00' : '22:00';

      if (totalMinutes < minMinutes) {
        hataGoster(customTimeInput, `Çalışma saatlerimiz 10:00 ile ${maxTimeStr} arasındadır. Saat 10:00 olarak ayarlandı.`);
        customTimeInput.value = '10:00';
        hiddenNativeTime.value = '10:00';
      } else if (totalMinutes > maxMinutes) {
        hataGoster(customTimeInput, `Seçtiğiniz günde çalışma saatlerimiz ${maxTimeStr}'a kadardır. Saat ${maxTimeStr} olarak ayarlandı.`);
        customTimeInput.value = maxTimeStr;
        hiddenNativeTime.value = maxTimeStr;
      } else {
        customTimeInput.value = selectedTime;
      }
    });
  }

  let lastSubmittedTicketData = null;

  // --- FORM SUBMIT (DETAYLI DOĞRULAMA: BOŞ ALAN, TELEFON, GEÇMİŞ TARİH, KAPALI SAAT) ---
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Önceki tüm hataları temizle
      hatalariTemizle();

      let formGecerli = true;

      const nameInput = document.getElementById('resName');
      const phoneInput = document.getElementById('resPhone');
      const dateInput = document.getElementById('resDate');
      const hiddenDateInput = document.getElementById('hiddenNativeDate');
      const timeInput = document.getElementById('resTime');
      const hiddenTimeInput = document.getElementById('hiddenNativeTime');
      const guestsInput = document.getElementById('resGuests');
      const notesInput = document.getElementById('resNotes');

      // 1. Ad Soyad Kontrolü (Boş alan ve min hane)
      if (!nameInput || !nameInput.value.trim()) {
        hataGoster(nameInput, 'Lütfen adınızı ve soyadınızı giriniz.');
        formGecerli = false;
      } else if (nameInput.value.trim().length < 3) {
        hataGoster(nameInput, 'Ad Soyad en az 3 karakter olmalıdır.');
        formGecerli = false;
      }

      // 2. Telefon Numarası Kontrolü (05XXXXXXXXX formatı)
      const phoneRegex = /^05[0-9]{9}$/;
      const temizTelefon = phoneInput ? phoneInput.value.replace(/\s+/g, '') : '';
      if (!temizTelefon) {
        hataGoster(phoneInput, 'Lütfen telefon numaranızı giriniz.');
        formGecerli = false;
      } else if (!phoneRegex.test(temizTelefon)) {
        hataGoster(phoneInput, 'Geçersiz telefon numarası. (Örn: 05XXXXXXXXX)');
        formGecerli = false;
      }

      // 3. Geçmiş Tarih Kontrolü
      const secilenTarihMetni = hiddenDateInput && hiddenDateInput.value ? hiddenDateInput.value : (dateInput ? dateInput.value : '');
      if (!secilenTarihMetni) {
        hataGoster(dateInput, 'Lütfen bir rezervasyon tarihi seçiniz.');
        formGecerli = false;
      } else {
        const bugun = new Date();
        bugun.setHours(0, 0, 0, 0);

        const secilenTarih = new Date(secilenTarihMetni);
        secilenTarih.setHours(0, 0, 0, 0);

        if (secilenTarih < bugun) {
          hataGoster(dateInput, 'Geçmiş bir tarih için rezervasyon yapılamaz.');
          formGecerli = false;
        }
      }

      // 4. Kapalı Saat Kontrolü (Açık Saatler: 10:00 - 22:00)
      const secilenSaatMetni = hiddenTimeInput && hiddenTimeInput.value ? hiddenTimeInput.value : (timeInput ? timeInput.value : '');
      if (!secilenSaatMetni) {
        hataGoster(timeInput, 'Lütfen bir rezervasyon saati seçiniz.');
        formGecerli = false;
      } else {
        const [saat, dakika] = secilenSaatMetni.split(':').map(Number);
        const toplamDakika = saat * 60 + dakika;

        const acilisDakika = 10 * 60; // 10:00
        const kapanisDakika = 22 * 60; // 22:00

        if (toplamDakika < acilisDakika || toplamDakika > kapanisDakika) {
          hataGoster(timeInput, 'Restoranımız bu saatte kapalıdır. (Açık saatler: 10:00 - 22:00)');
          formGecerli = false;
        }
      }

      // 5. Kişi Sayısı Kontrolü
      if (!guestsInput || !guestsInput.value || guestsInput.value < 1) {
        hataGoster(guestsInput, 'Lütfen kişi sayısını belirtiniz.');
        formGecerli = false;
      } else if (guestsInput.value > 10) {
        hataGoster(guestsInput, 'Online en fazla 10 kişilik rezervasyon kabul edilmektedir.');
        formGecerli = false;
      }

      // Eğer formda hata varsa gönderimi durdur
      if (!formGecerli) {
        const ilkHata = document.querySelector('.has-error');
        if (ilkHata) {
          yumusakKaydir(ilkHata);
        }
        return;
      }

      // BİLGİLERİ FORM SIFIRLANMADAN ÖNCE (formGonderimSimuleEt ÖNCESİNDE) YAKALA
      const nameVal = nameInput ? nameInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const dateVal = dateInput ? dateInput.value.trim() : '';
      const timeVal = (hiddenTimeInput && hiddenTimeInput.value) ? hiddenTimeInput.value : (timeInput ? timeInput.value.trim() : '');
      const guestsVal = guestsInput ? guestsInput.value.trim() : '1';
      const notesVal = notesInput ? notesInput.value.trim() : '';

      lastSubmittedTicketData = {
        name: nameVal,
        phone: phoneVal,
        date: dateVal,
        time: timeVal,
        guests: guestsVal,
        notes: notesVal
      };

      // Form Geçerliyse Ortak Simülatörle Gönderim (800ms sonra yeşil bildirim görünür)
      formGonderimSimuleEt(reservationForm, resFormAlert, 'Talebiniz İşleniyor...', 800);

      // Kullanıcının yeşil başarı mesajını rahatça okuması için 5.0 saniye sonra bilete kay
      setTimeout(() => {
        const ticketContainer = document.getElementById('resTicketContainer');
        const masaNo = String(Math.floor(1 + Math.random() * 18)).padStart(2, '0');
        const konumlar = ['(Geleneksel Odun Ateşi Katı)', '(Tarihi Avlu Tarafı)', '(Taş Fırın Yanı)', '(Üst Kat Balkon)', '(VIP Salon)'];
        const rastgeleKonum = konumlar[Math.floor(Math.random() * konumlar.length)];

        const ticketData = {
          masaNo,
          konum: rastgeleKonum,
          name: nameVal,
          phone: phoneVal,
          dateTime: `${dateVal} • ${timeVal}`,
          guests: `${guestsVal} Kişilik Masa`,
          notes: notesVal
        };

        displayTicketData(ticketData);
        if (ticketContainer) {
          ticketContainer.style.display = 'block';
        }
      }, 1250);
    });

    // --- BİLET BİLGİLERİNİ EKRANA YAZDIRMA FONKSİYONU ---
    function displayTicketData(data) {
      const cardTableNumber = document.getElementById('cardTableNumber');
      const cardTicketName = document.getElementById('cardTicketName');
      const cardTicketPhone = document.getElementById('cardTicketPhone');
      const cardTicketDateTime = document.getElementById('cardTicketDateTime');
      const cardTicketGuests = document.getElementById('cardTicketGuests');
      const cardTicketNotes = document.getElementById('cardTicketNotes');
      const cardTicketNotesRow = document.getElementById('cardTicketNotesRow');
      const cardTicketWaBtn = document.getElementById('cardTicketWaBtn');

      if (cardTableNumber) cardTableNumber.innerHTML = `Masa No: ${data.masaNo} <small>${data.konum}</small>`;
      if (cardTicketName) cardTicketName.textContent = data.name || 'Girilmedi';
      if (cardTicketPhone) cardTicketPhone.textContent = data.phone || '---';
      if (cardTicketDateTime) cardTicketDateTime.textContent = data.dateTime || 'Tarih ve Saat Seçiniz';
      if (cardTicketGuests) cardTicketGuests.textContent = data.guests || '-- Kişilik Masa';

      if (cardTicketNotes && cardTicketNotesRow) {
        if (data.notes) {
          cardTicketNotes.textContent = data.notes;
          cardTicketNotesRow.style.display = 'flex';
        } else {
          cardTicketNotesRow.style.display = 'none';
        }
      }

      if (cardTicketWaBtn) {
        cardTicketWaBtn.href = `https://wa.me/902325137567?text=Merhaba,%20Masa%20No:%20${data.masaNo}%20${encodeURIComponent(data.konum)}%20rezervasyonum%20hakkinda%20bilgi%20almak%20istiyorum.`;
      }
    }

    // --- SEÇENEK B: SAYFA YENİLENDİĞİNDE (F5) TERTEMİZ BAŞLA ---
    try {
      localStorage.removeItem('lm_lastReservationTicket');
    } catch(e) {}

    // --- BİLGİLERİ DÜZENLE (FORMA GERİ DÖN VE BİLGİLERİ DOLDUR) BUTONU ---
    const btnEditReservation = document.getElementById('btnEditReservation');
    if (btnEditReservation) {
      btnEditReservation.addEventListener('click', () => {
        const ticketContainer = document.getElementById('resTicketContainer');
        if (ticketContainer) {
          ticketContainer.style.display = 'none';
        }
        if (lastSubmittedTicketData) {
          const elName = document.getElementById('resName');
          const elPhone = document.getElementById('resPhone');
          const elDate = document.getElementById('resDate');
          const elNativeDate = document.getElementById('hiddenNativeDate');
          const elTime = document.getElementById('resTime');
          const elNativeTime = document.getElementById('hiddenNativeTime');
          const elGuests = document.getElementById('resGuests');
          const elNotes = document.getElementById('resNotes');

          if (elName) elName.value = lastSubmittedTicketData.name || '';
          if (elPhone) elPhone.value = lastSubmittedTicketData.phone || '';
          if (elDate) elDate.value = lastSubmittedTicketData.date || '';
          if (elNativeDate) elNativeDate.value = lastSubmittedTicketData.date || '';
          if (elTime) elTime.value = lastSubmittedTicketData.time || '';
          if (elNativeTime) elNativeTime.value = lastSubmittedTicketData.time || '';
          if (elGuests) elGuests.value = lastSubmittedTicketData.guests || '1';
          if (elNotes) elNotes.value = lastSubmittedTicketData.notes || '';
        }
        const resFormAlert = document.getElementById('resFormAlert');
        if (resFormAlert) {
          resFormAlert.style.display = 'none';
        }
        hatalariTemizle();
        if (reservationForm) {
          yumusakKaydir(reservationForm);
        }
      });
    }

    // --- 1932 MASA MÜHRÜ KAYIT KARTI CANLI ÖNİZLEME (LIVE PREVIEW SYNC) ---
    function updateTicketPreview() {
      const cardTicketName = document.getElementById('cardTicketName');
      const cardTicketPhone = document.getElementById('cardTicketPhone');
      const cardTicketDateTime = document.getElementById('cardTicketDateTime');
      const cardTicketGuests = document.getElementById('cardTicketGuests');
      const cardTicketNotes = document.getElementById('cardTicketNotes');
      const cardTicketNotesRow = document.getElementById('cardTicketNotesRow');

      const nameVal = document.getElementById('resName')?.value.trim();
      const phoneVal = document.getElementById('resPhone')?.value.trim();
      const dateVal = document.getElementById('resDate')?.value.trim();
      const timeVal = document.getElementById('resTime')?.value.trim();
      const guestsVal = document.getElementById('resGuests')?.value.trim();
      const notesVal = document.getElementById('resNotes')?.value.trim();

      if (cardTicketName) cardTicketName.textContent = nameVal || 'Girilmedi';
      if (cardTicketPhone) cardTicketPhone.textContent = phoneVal || '---';
      if (cardTicketGuests) cardTicketGuests.textContent = (guestsVal && guestsVal > 0) ? `${guestsVal} Kişi` : '-- Kişi';

      if (cardTicketDateTime) {
        if (dateVal && timeVal) {
          cardTicketDateTime.textContent = `${dateVal} • ${timeVal}`;
        } else if (dateVal) {
          cardTicketDateTime.textContent = `${dateVal} • Saat Seçiniz`;
        } else if (timeVal) {
          cardTicketDateTime.textContent = `Tarih Seçiniz • ${timeVal}`;
        } else {
          cardTicketDateTime.textContent = 'Tarih ve Saat Seçiniz';
        }
      }

      if (cardTicketNotes && cardTicketNotesRow) {
        if (notesVal) {
          cardTicketNotes.textContent = notesVal;
          cardTicketNotesRow.style.display = 'flex';
        } else {
          cardTicketNotesRow.style.display = 'none';
        }
      }
    }

    // Tüm İnputlara Canlı Dinleyici Bağla (Form doldurulurken canlı güncellensin)
    ['resName', 'resPhone', 'resDate', 'resTime', 'resGuests', 'resNotes'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        ['input', 'change', 'keyup', 'blur'].forEach(evt => {
          el.addEventListener(evt, updateTicketPreview);
        });
      }
    });
  }

  // ==========================================
  // 4. HAMBURGER MENÜ (NAVBAR MOBO)
  // ==========================================
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mainNavbar = document.querySelector(".main-navbar");

  if (hamburgerBtn && mainNavbar) {
    
    function openMenu() {
      mainNavbar.classList.add("active");
      document.body.classList.add("no-scroll");
    }

    function closeMenu() {
      mainNavbar.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }

    function toggleMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      
      if (mainNavbar.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // Tıklama ve Sağ Tık / Uzun Basma Koruması
    hamburgerBtn.addEventListener("click", toggleMenu);
    hamburgerBtn.addEventListener("contextmenu", (e) => e.preventDefault());

    const navLinks = mainNavbar.querySelectorAll("a");
    navLinks.forEach((link) => {
      // Uzun basmada açılan mobil kısayol menüsünü engelle
      link.addEventListener("contextmenu", (e) => e.preventDefault());

      link.addEventListener("click", () => {
        closeMenu();
      });

      link.addEventListener("touchend", () => {
        closeMenu();
      });
    });

    // Menü açıkken arka alanın kaydırılmasını tamamen engelle
    document.addEventListener("touchmove", (e) => {
      if (mainNavbar.classList.contains("active") && !mainNavbar.contains(e.target)) {
        e.preventDefault();
      }
    }, { passive: false });

    document.addEventListener("click", (e) => {
      if (
        mainNavbar.classList.contains("active") &&
        !mainNavbar.contains(e.target) &&
        !hamburgerBtn.contains(e.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mainNavbar.classList.contains("active")) {
        closeMenu();
      }
    });
  }

  // ==========================================
  // 5. İLETİŞİM FORMU (CONTACT FORM)
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        const ilkGecersiz = contactForm.querySelector(':invalid');
        if (ilkGecersiz) {
          hataGoster(ilkGecersiz, 'Lütfen bu alanı doğru bir şekilde doldurunuz.');
          yumusakKaydir(ilkGecersiz);
        }
        return;
      }

      formGonderimSimuleEt(contactForm, formAlert, 'Gönderiliyor...', 1500);
    });
  }

  // ==========================================
  // 6. CANLI ÇALIŞMA SAATİ KONTROLÜ (LIVE STATUS BADGE)
  // ==========================================
  function calismaSaatleriniKontrolEt() {
    const simdikiZaman = new Date();
    const gun = simdikiZaman.getDay(); // 0: Pazar, 1-4: Pzt-Prş, 5-6: Cum-Cmt
    const saat = simdikiZaman.getHours();
    const dakika = simdikiZaman.getMinutes();
    const toplamDakika = saat * 60 + dakika;

    let acik = false;
    let kapanisSaati = "22:00";

    if (gun === 0) {
      // Pazar Kapalı
      acik = false;
    } else if (gun === 5 || gun === 6) {
      // Cuma - Cumartesi: 10:00 - 23:00
      kapanisSaati = "23:00";
      acik = (toplamDakika >= 10 * 60 && toplamDakika < 23 * 60);
    } else {
      // Pazartesi - Perşembe: 10:00 - 22:00
      kapanisSaati = "22:00";
      acik = (toplamDakika >= 10 * 60 && toplamDakika < 22 * 60);
    }

    const badgeElements = document.querySelectorAll('.live-status-badge');
    badgeElements.forEach(badge => {
      if (acik) {
        badge.className = 'live-status-badge status-open';
        badge.innerHTML = `<span class="pulse-dot green"></span> <span class="status-text">Şu An Açığız <small>(${kapanisSaati}'a kadar)</small></span>`;
      } else {
        badge.className = 'live-status-badge status-closed';
        badge.innerHTML = `<span class="pulse-dot red"></span> <span class="status-text">Şu An Kapalıyız <small>(Açılış 10:00)</small></span>`;
      }
    });
  }

  // Sayfa yüklenince canlı durumu çalıştır
  calismaSaatleriniKontrolEt();

  // ==========================================
  // 7. MÜŞTERİ YORUMLARI İNTERAKTİF SLIDER
  // ==========================================
  const testimonialsTrack = document.getElementById('testimonialsTrack');
  const btnTestimonialPrev = document.getElementById('btnTestimonialPrev');
  const btnTestimonialNext = document.getElementById('btnTestimonialNext');
  const testimonialDots = document.getElementById('testimonialDots');

  if (testimonialsTrack && btnTestimonialPrev && btnTestimonialNext) {
    const slides = testimonialsTrack.querySelectorAll('.testimonial-card-slide');
    let currentSlide = 0;
    let autoSlideTimer = null;

    if (testimonialDots && slides.length > 0) {
      testimonialDots.innerHTML = '';
      slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        testimonialDots.appendChild(dot);
      });
    }

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentSlide = index;
      testimonialsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

      if (testimonialDots) {
        const dots = testimonialDots.querySelectorAll('.slider-dot');
        dots.forEach((d, i) => {
          d.classList.toggle('active', i === currentSlide);
        });
      }
    }

    function resetAutoSlide() {
      if (autoSlideTimer) clearInterval(autoSlideTimer);
      autoSlideTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5500);
    }

    btnTestimonialPrev.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      resetAutoSlide();
    });

    btnTestimonialNext.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      resetAutoSlide();
    });

    resetAutoSlide();
  }

});