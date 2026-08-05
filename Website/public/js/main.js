// ==========================================
// 🏛️ 1932 LEZZET MÜHRÜ - FULL-STACK MAIN.JS
// ==========================================

// --- YEMEK VERİLERİ (VARSAYILAN & API DİNAMİK YÜKLEME) ---
let yemekler = [
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

  // --- STICKY NAVBAR SCROLL DİNLEYİCİSİ ---
  const mainHeader = document.querySelector('.main-header');
  if (mainHeader) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }

  // --- BACK TO TOP BUTTON DİNLEYİCİSİ (HER SAYFADA KESİNTİSİZ ÇALIŞAN) ---
  const backToTopBtn = document.getElementById('backToTop') || document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 250) {
        backToTopBtn.classList.add('visible');
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
      } else {
        backToTopBtn.classList.remove('visible');
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
      }
    });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- CANLI "ŞU AN AÇIĞIZ / KAPALIYIZ" DİNAMİK SAAT VE GÜN SİSTEMİ ---
  const liveStatusBadges = document.querySelectorAll('.live-status-badge');
  if (liveStatusBadges.length > 0) {
    const now = new Date();
    const day = now.getDay(); // 0 = Pazar, 1 = Pazartesi, ..., 5 = Cuma, 6 = Cumartesi
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTotalMinutes = currentHour * 60 + currentMinute;

    const openMinutes = 10 * 60; // 10:00

    let isTodayOpen = true;
    let closeHour = 22;

    if (day === 0) {
      isTodayOpen = false; // Pazar: Kapalı
    } else if (day === 5 || day === 6) {
      closeHour = 23; // Cuma & Cumartesi: 10:00 - 23:00
    } else {
      closeHour = 22; // Pazartesi - Perşembe: 10:00 - 22:00
    }

    const closeMinutes = closeHour * 60;
    const isOpenNow = isTodayOpen && (currentTotalMinutes >= openMinutes && currentTotalMinutes < closeMinutes);
    const timeRangeText = isTodayOpen ? `10:00 - ${closeHour}:00` : 'Pazar Kapalı';

    liveStatusBadges.forEach(badge => {
      if (isOpenNow) {
        badge.className = 'live-status-badge status-open';
        badge.innerHTML = `
          <span class="pulse-dot green"></span>
          <span class="status-text">Şu An Açığız <small>(${timeRangeText})</small></span>
        `;
      } else {
        badge.className = 'live-status-badge status-closed';
        const subtext = !isTodayOpen ? 'Pazar Günleri Kapalıyız' : `Açılış 10:00 (${timeRangeText})`;
        badge.innerHTML = `
          <span class="pulse-dot red"></span>
          <span class="status-text">Şu An Kapalıyız <small>(${subtext})</small></span>
        `;
      }
    });
  }

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

    // Debounce Fonksiyonu
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

      // Skeleton Shimmer Listener
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

    // Kategori ve Arama Filtresi
    function menuyuFiltrele() {
      const filtrelenmis = yemekler.filter((yemek) => {
        const kategoriUyumlu = (aktifKategori === "tumu") || (yemek.kategori === aktifKategori);
        const adUyumlu = yemek.ad.toLocaleLowerCase('tr-TR').includes(mevcutAramaMetni);
        const aciklamaUyumlu = yemek.aciklama.toLocaleLowerCase('tr-TR').includes(mevcutAramaMetni);
        
        let kategoriEtiketUyumlu = false;
        if (mevcutAramaMetni.length > 0) {
          if (('izgara'.includes(mevcutAramaMetni) || 'ızgara'.includes(mevcutAramaMetni) || 'kebap'.includes(mevcutAramaMetni)) && yemek.kategori === 'kebap') {
            kategoriEtiketUyumlu = true;
          } else if (('corba'.includes(mevcutAramaMetni) || 'çorba'.includes(mevcutAramaMetni)) && yemek.kategori === 'corba') {
            kategoriEtiketUyumlu = true;
          } else if (('pide'.includes(mevcutAramaMetni) || 'lahmacun'.includes(mevcutAramaMetni)) && yemek.kategori === 'pide') {
            kategoriEtiketUyumlu = true;
          } else if (('zeytinyağlı'.includes(mevcutAramaMetni) || 'salata'.includes(mevcutAramaMetni)) && yemek.kategori === 'zeytinyagli') {
            kategoriEtiketUyumlu = true;
          } else if (('tatli'.includes(mevcutAramaMetni) || 'tatlı'.includes(mevcutAramaMetni)) && yemek.kategori === 'tatli') {
            kategoriEtiketUyumlu = true;
          } else if (('icecek'.includes(mevcutAramaMetni) || 'içecek'.includes(mevcutAramaMetni)) && yemek.kategori === 'icecek') {
            kategoriEtiketUyumlu = true;
          }
        }
        
        return kategoriUyumlu && (adUyumlu || aciklamaUyumlu || kategoriEtiketUyumlu);
      });

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

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        hepsiAcik = true;
        menuyuFiltrele();
        yumusakKaydir(".menu-section") || yumusakKaydir("#menu-grid");
      });
    }

    // --- EXPRESS BACKEND API'DEN CANLI VERİ ÇEKME (FETCH API) ---
    async function backendMenuyuGetir() {
      try {
        const response = await fetch('/api/menu');
        const result = await response.json();
        if (result && result.success && Array.isArray(result.data)) {
          yemekler = result.data;
          menuyuFiltrele();
        }
      } catch (err) {
        console.error('Backend API Fetch Hatası:', err);
      }
    }

    // İlk Yükleme
    menuyuFiltrele();
    backendMenuyuGetir();

    // Kategori Butonları
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        aktifKategori = btn.dataset.kategori;
        menuyuFiltrele();
      });
    });

    if (menuSearchInput) {
      menuSearchInput.addEventListener(
        "input",
        debounce((e) => {
          mevcutAramaMetni = e.target.value.toLocaleLowerCase("tr-TR").trim();
          menuyuFiltrele();
        }, 250)
      );
    }
  }

  // --- REZERVAZYON SİSTEMİ ---
  const reservationForm = document.getElementById('reservationForm');
  const resFormAlert = document.getElementById('resFormAlert');

  const nameInput = document.getElementById('resName');
  const phoneInput = document.getElementById('resPhone');
  const dateInput = document.getElementById('resDate');
  const hiddenNativeDate = document.getElementById('hiddenNativeDate');
  const timeInput = document.getElementById('resTime');
  const hiddenNativeTime = document.getElementById('hiddenNativeTime');
  const guestsInput = document.getElementById('resGuests');
  const notesInput = document.getElementById('resNotes');

  const openDatePicker = () => {
    if (!hiddenNativeDate) return;
    try {
      if (typeof hiddenNativeDate.showPicker === 'function') {
        hiddenNativeDate.showPicker();
      } else {
        hiddenNativeDate.focus();
        hiddenNativeDate.click();
      }
    } catch (e) {
      hiddenNativeDate.focus();
      hiddenNativeDate.click();
    }
  };

  const openTimePicker = () => {
    if (!hiddenNativeTime) return;
    try {
      if (typeof hiddenNativeTime.showPicker === 'function') {
        hiddenNativeTime.showPicker();
      } else {
        hiddenNativeTime.focus();
        hiddenNativeTime.click();
      }
    } catch (e) {
      hiddenNativeTime.focus();
      hiddenNativeTime.click();
    }
  };

  let lastSubmittedTicketData = null;

  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      hatalariTemizle();

      // --- SIRALI DOĞRULAMA (SEQUENTIAL VALIDATION) ---
      // 1. Adınız Soyadınız
      if (!nameInput || !nameInput.value.trim() || nameInput.value.trim().length < 3) {
        hataGoster(nameInput, 'Lütfen adınızı ve soyadınızı giriniz.');
        nameInput.focus();
        return;
      }

      // 2. Telefon Numaranız (05XXXXXXXXX)
      const phoneClean = phoneInput ? phoneInput.value.trim() : '';
      const phoneRegex = /^05[0-9]{9}$/;
      if (!phoneInput || !phoneClean || !phoneRegex.test(phoneClean)) {
        hataGoster(phoneInput, 'Lütfen 05 ile başlayan 11 haneli cep telefonunuzu giriniz.');
        phoneInput.focus();
        return;
      }

      // 3. Rezervasyon Tarihi
      if (!dateInput || !dateInput.value.trim()) {
        hataGoster(dateInput, 'Lütfen rezervasyon tarihini seçiniz.');
        openDatePicker();
        return;
      }

      // 4. Rezervasyon Saati
      const timeValCheck = (hiddenTimeInput && hiddenTimeInput.value) ? hiddenTimeInput.value : (timeInput ? timeInput.value.trim() : '');
      if (!timeInput || !timeValCheck) {
        hataGoster(timeInput, 'Lütfen rezervasyon saatini seçiniz.');
        openTimePicker();
        return;
      }

      // 5. Kişi Sayısı
      if (!guestsInput || !guestsInput.value.trim()) {
        hataGoster(guestsInput, 'Lütfen kişi sayısını giriniz.');
        guestsInput.focus();
        return;
      }

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const dateVal = dateInput ? dateInput.value.trim() : '';
      const timeVal = (hiddenTimeInput && hiddenTimeInput.value) ? hiddenTimeInput.value : (timeInput ? timeInput.value.trim() : '');
      const guestsVal = guestsInput ? guestsInput.value.trim() : '1';
      const notesVal = notesInput ? notesInput.value.trim() : '';

      lastSubmittedTicketData = { name: nameVal, phone: phoneVal, date: dateVal, time: timeVal, guests: guestsVal, notes: notesVal };

      formGonderimSimuleEt(reservationForm, resFormAlert, 'Restorana İletiliyor...', 800);

      // --- EXPRESS BACKEND API'YE POST İSTEĞİ (REZERVASYON KAYDI) ---
      fetch('/api/rezervasyon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nameVal,
          phone: phoneVal,
          date: dateVal,
          time: timeVal,
          guests: guestsVal,
          notes: notesVal
        })
      })
      .then(res => res.json())
      .then(result => {
        if (result && result.success && result.data) {
          const sunucuData = result.data;
          const ticketContainer = document.getElementById('resTicketContainer');
          const ticketData = {
            masaNo: sunucuData.masaNo,
            konum: sunucuData.konum,
            name: sunucuData.name,
            phone: sunucuData.phone,
            dateTime: `${sunucuData.date} • ${sunucuData.time}`,
            guests: `${sunucuData.guests} Kişilik Masa`,
            notes: sunucuData.notes
          };
          setTimeout(() => {
            displayTicketData(ticketData);
            if (ticketContainer) ticketContainer.style.display = 'block';
          }, 1200);
        }
      })
      .catch(err => {
        console.error('Rezervasyon POST Hatası:', err);
      });
    });

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

    // --- NATIVE DATE & TIME PICKER İŞLEYİCİLERİ ---
    const resDateInput = document.getElementById('resDate');
    const hiddenNativeDate = document.getElementById('hiddenNativeDate');
    const resTimeInput = document.getElementById('resTime');
    const hiddenNativeTime = document.getElementById('hiddenNativeTime');

    if (hiddenNativeDate) {
      const today = new Date().toISOString().split('T')[0];
      hiddenNativeDate.setAttribute('min', today);
    }

    if (resDateInput && hiddenNativeDate) {
      const openDatePicker = () => {
        try {
          if (typeof hiddenNativeDate.showPicker === 'function') {
            hiddenNativeDate.showPicker();
          } else {
            hiddenNativeDate.focus();
            hiddenNativeDate.click();
          }
        } catch (e) {
          hiddenNativeDate.focus();
          hiddenNativeDate.click();
        }
      };

      resDateInput.addEventListener('click', openDatePicker);
      if (resDateInput.parentElement) {
        resDateInput.parentElement.addEventListener('click', (e) => {
          if (e.target !== hiddenNativeDate) openDatePicker();
        });
      }

      hiddenNativeDate.addEventListener('change', (e) => {
        if (e.target.value) {
          const parts = e.target.value.split('-');
          if (parts.length === 3) {
            resDateInput.value = `${parts[2]}.${parts[1]}.${parts[0]}`;
            resDateInput.classList.remove('input-error');
          }
        }
      });
    }

    if (resTimeInput && hiddenNativeTime) {
      const openTimePicker = () => {
        try {
          if (typeof hiddenNativeTime.showPicker === 'function') {
            hiddenNativeTime.showPicker();
          } else {
            hiddenNativeTime.focus();
            hiddenNativeTime.click();
          }
        } catch (e) {
          hiddenNativeTime.focus();
          hiddenNativeTime.click();
        }
      };

      resTimeInput.addEventListener('click', openTimePicker);
      if (resTimeInput.parentElement) {
        resTimeInput.parentElement.addEventListener('click', (e) => {
          if (e.target !== hiddenNativeTime) openTimePicker();
        });
      }

      hiddenNativeTime.addEventListener('change', (e) => {
        if (e.target.value) {
          resTimeInput.value = e.target.value;
          resTimeInput.classList.remove('input-error');
        }
      });
    }
  }

  function hataGoster(inputEl, mesaj) {
    if (!inputEl) return;
    inputEl.classList.add('input-error');
    let parent = inputEl.parentElement;
    if (parent) {
      let errSpan = parent.querySelector('.error-msg');
      if (!errSpan) {
        errSpan = document.createElement('span');
        errSpan.className = 'error-msg';
        parent.appendChild(errSpan);
      }
      errSpan.textContent = mesaj;
    }
  }

  function hatalariTemizle() {
    const errorInputs = document.querySelectorAll('.input-error');
    errorInputs.forEach(el => el.classList.remove('input-error'));
    const errorSpans = document.querySelectorAll('.error-msg');
    errorSpans.forEach(el => el.remove());
  }

  // ==========================================
  // ⭐ MÜŞTERİ YORUMLARI İNTERAKTİF SLIDER İŞLEYİCİSİ
  // ==========================================
  const testimonialsTrack = document.getElementById('testimonialsTrack');
  const btnTestimonialPrev = document.getElementById('btnTestimonialPrev');
  const btnTestimonialNext = document.getElementById('btnTestimonialNext');
  const testimonialDots = document.getElementById('testimonialDots');

  if (testimonialsTrack) {
    const slides = testimonialsTrack.querySelectorAll('.testimonial-card-slide');
    let currentSlide = 0;
    const totalSlides = slides.length;

    if (testimonialDots && totalSlides > 0) {
      testimonialDots.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = i === 0 ? 'dot active' : 'dot';
        dot.addEventListener('click', () => goToSlide(i));
        testimonialDots.appendChild(dot);
      }
    }

    function updateSlider() {
      testimonialsTrack.style.transform = `translateX(calc(-${currentSlide} * (100% + 30px)))`;
      if (testimonialDots) {
        const dots = testimonialDots.querySelectorAll('.dot');
        dots.forEach((d, idx) => {
          if (idx === currentSlide) d.classList.add('active');
          else d.classList.remove('active');
        });
      }
    }

    function goToSlide(index) {
      currentSlide = index;
      if (currentSlide < 0) currentSlide = totalSlides - 1;
      if (currentSlide >= totalSlides) currentSlide = 0;
      updateSlider();
    }

    if (btnTestimonialNext) {
      btnTestimonialNext.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentSlide + 1);
      });
    }

    if (btnTestimonialPrev) {
      btnTestimonialPrev.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      });
    }

    setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  }

  // ==========================================
  // 🖼️ GALERİ GÖRSEL BÜYÜTME (LIGHTBOX MODAL) MANTIĞI
  // ==========================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const imageModal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalCounter = document.getElementById('modalCounter');
  const modalClose = document.querySelector('.modal-close');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');

  if (galleryItems.length > 0 && imageModal) {
    let currentGalleryIndex = 0;
    const galleryArray = Array.from(galleryItems);

    function openGalleryModal(index) {
      currentGalleryIndex = index;
      const item = galleryArray[currentGalleryIndex];
      const img = item.querySelector('img');
      const captionText = item.querySelector('.gallery-overlay span') ? item.querySelector('.gallery-overlay span').textContent : (img ? img.alt : '');

      if (img && modalImg) {
        modalImg.src = img.src;
        modalImg.alt = img.alt || captionText;
      }
      if (modalCaption) {
        modalCaption.textContent = captionText;
      }
      if (modalCounter) {
        modalCounter.textContent = `${currentGalleryIndex + 1} / ${galleryArray.length}`;
      }

      imageModal.classList.add('active');
      imageModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function closeGalleryModal() {
      imageModal.classList.remove('active');
      imageModal.style.display = 'none';
      document.body.style.overflow = '';
    }

    galleryArray.forEach((item, idx) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        openGalleryModal(idx);
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', closeGalleryModal);
    }

    if (modalNext) {
      modalNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryArray.length;
        openGalleryModal(currentGalleryIndex);
      });
    }

    if (modalPrev) {
      modalPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryArray.length) % galleryArray.length;
        openGalleryModal(currentGalleryIndex);
      });
    }

    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal || e.target.classList.contains('modal-wrapper')) {
        closeGalleryModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!imageModal.classList.contains('active')) return;
      if (e.key === 'Escape') closeGalleryModal();
      if (e.key === 'ArrowRight') modalNext && modalNext.click();
      if (e.key === 'ArrowLeft') modalPrev && modalPrev.click();
    });
  }

  // ==========================================
  // 🔥 [2'uygula] GERÇEK ODUN KÖZÜ, KIVILCIM & BAHARAT YAPRAĞI ANIMASYONU
  // ==========================================
  function initEmberParticles() {
    let canvas = document.getElementById('emberCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'emberCanvas';
      document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 16), 70);

    const colors = [
      { r: 255, g: 179, b: 0   }, // Amber Altın
      { r: 231, g: 76,  b: 60  }, // Kiremit Odun Kırmızı
      { r: 255, g: 112, b: 67  }, // Kor Ateş Turuncusu
      { r: 241, g: 196, b: 15  }, // Antep Fıstığı Işıltısı
      { r: 255, g: 87,  b: 34  }  // Mangal Alev Kıvılcımı
    ];

    const types = ['spark', 'ember', 'leaf', 'spark', 'ember'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        type: types[Math.floor(Math.random() * types.length)],
        size: Math.random() * 4 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.75 + 0.2,
        speedY: Math.random() * 1.1 + 0.4,
        speedX: (Math.random() - 0.5) * 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        pulseSpeed: Math.random() * 0.02 + 0.01
      });
    }

    function drawSpark(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.8)`;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.lineTo(0, p.size * 2);
        ctx.lineTo(p.size * 0.3, p.size * 0.3);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function drawEmberPebble(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      const radGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
      radGrad.addColorStop(0, `rgba(255, 245, 220, ${p.alpha})`);
      radGrad.addColorStop(0.3, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.85})`);
      radGrad.addColorStop(1, `rgba(120, 25, 10, 0)`);

      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 1.8, p.size * 1.1, p.rotation, 0, Math.PI * 2);
      ctx.fillStyle = radGrad;
      ctx.fill();
      ctx.restore();
    }

    function drawSpiceLeaf(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha * 0.55})`;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 2.2, p.size * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.x += Math.sin(p.y * 0.015) * 0.5 + p.speedX;
        p.rotation += p.rotationSpeed;
        p.alpha += Math.sin(p.y * 0.03) * p.pulseSpeed;

        if (p.alpha < 0.15) p.alpha = 0.15;
        if (p.alpha > 0.85) p.alpha = 0.85;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        if (p.type === 'spark') {
          drawSpark(p);
        } else if (p.type === 'ember') {
          drawEmberPebble(p);
        } else {
          drawSpiceLeaf(p);
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  initEmberParticles();

  // ==========================================
  // 🔥 ARKA PLAN FOTOĞRAFINDAKİ ALEVLERİ DALGALANDIRAN GERÇEK SVG FİLTRESİ
  // ==========================================
  if (!document.getElementById('fireWaveFilterSvg')) {
    const svgNs = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNs, 'svg');
    svg.id = 'fireWaveFilterSvg';
    svg.setAttribute('style', 'position:absolute; width:0; height:0; overflow:hidden; pointer-events:none;');
    
    const filter = document.createElementNS(svgNs, 'filter');
    filter.id = 'fireWaveFilter';
    
    const feTurbulence = document.createElementNS(svgNs, 'feTurbulence');
    feTurbulence.setAttribute('type', 'fractalNoise');
    feTurbulence.setAttribute('baseFrequency', '0.012 0.022');
    feTurbulence.setAttribute('numOctaves', '3');
    feTurbulence.setAttribute('result', 'noise');
    
    const animate = document.createElementNS(svgNs, 'animate');
    animate.setAttribute('attributeName', 'baseFrequency');
    animate.setAttribute('dur', '4s');
    animate.setAttribute('values', '0.01 0.02;0.022 0.045;0.01 0.02');
    animate.setAttribute('repeatCount', 'indefinite');
    feTurbulence.appendChild(animate);
    
    const feDisplacementMap = document.createElementNS(svgNs, 'feDisplacementMap');
    feDisplacementMap.setAttribute('in', 'SourceGraphic');
    feDisplacementMap.setAttribute('in2', 'noise');
    feDisplacementMap.setAttribute('scale', '25');
    feDisplacementMap.setAttribute('xChannelSelector', 'R');
    feDisplacementMap.setAttribute('yChannelSelector', 'G');
    
    filter.appendChild(feTurbulence);
    filter.appendChild(feDisplacementMap);
    svg.appendChild(filter);
    document.body.appendChild(svg);
  }
});