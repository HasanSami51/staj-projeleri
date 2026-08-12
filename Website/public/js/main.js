// ==========================================
// 🏛️ 1932 LEZZET MÜHRÜ - FULL-STACK MAIN.JS
// ==========================================

// --- YEMEK VERİLERİ (DİNAMİK REST API / VERİTABANI İLE YÜKLENİR - SABİT DİZİ KALDIRILDI) ---
let yemekler = [];

document.addEventListener("DOMContentLoaded", () => {

  // Helper to translate validation and dynamic message texts
  function t(key, defaultVal) {
    const currentLang = localStorage.getItem('language') || 'tr';
    if (window.translations && window.translations[currentLang] && window.translations[currentLang][key] !== undefined) {
      return window.translations[currentLang][key];
    }
    return defaultVal;
  }

  // --- MULTI-LANGUAGE SYSTEM INITIALIZATION ---
  if (typeof initLanguageSystem === 'function') {
    initLanguageSystem();
  }

  // --- CANLI ARKA PLAN VİDEO SİSTEMİ (TÜM SAYFALARDA OTOMATİK DÖNEN YÜKLEDİĞİNİZ ATEŞ VİDEOSU) ---
  let bgVideo = document.getElementById('globalBgVideo');
  if (!bgVideo) {
    bgVideo = document.createElement('video');
    bgVideo.id = 'globalBgVideo';
    bgVideo.autoplay = true;
    bgVideo.loop = true;
    bgVideo.muted = true;
    bgVideo.playsInline = true;
    bgVideo.setAttribute('muted', '');
    bgVideo.setAttribute('autoplay', '');
    bgVideo.setAttribute('loop', '');
    bgVideo.setAttribute('playsinline', '');
    bgVideo.className = 'global-bg-video';

    const sources = [
      '../public/images/video.mp4',
      '../public/images/bg-video.mp4',
      'public/images/video.mp4',
      'public/images/bg-video.mp4',
      '../images/video.mp4'
    ];

    sources.forEach(src => {
      const sourceElem = document.createElement('source');
      sourceElem.src = src;
      sourceElem.type = 'video/mp4';
      bgVideo.appendChild(sourceElem);
    });

    document.body.prepend(bgVideo);
  }

  // Arka plan videosunun döngü başlarında zıplama/kesinti yapmasını önleyen pürüzsüz geçiş sistemi
  function makeVideoLoopSeamless(video) {
    if (!video) return;
    
    // Geçiş efekti ekle
    video.style.transition = 'opacity 0.6s ease-in-out';
    
    let isFadingOut = false;
    
    video.addEventListener('timeupdate', () => {
      const duration = video.duration;
      if (!duration || isNaN(duration)) return;
      
      const timeLeft = duration - video.currentTime;
      
      // Video bitimine 0.8 saniye kala yavaşça karart
      if (timeLeft <= 0.8 && !isFadingOut) {
        isFadingOut = true;
        video.style.opacity = '0';
      }
      
      // Video yeniden başladığında (döngü başı) geri parlat
      if (video.currentTime < 0.2 && isFadingOut) {
        isFadingOut = false;
        video.style.opacity = '1';
      }
    });
    
    // Güvenlik önlemleri (olası seek ve oynatma durumlarında karartıyı sıfırlama)
    video.addEventListener('seeked', () => {
      if (video.currentTime < 0.5) {
        isFadingOut = false;
        video.style.opacity = '1';
      }
    });
    
    video.addEventListener('play', () => {
      isFadingOut = false;
      video.style.opacity = '1';
    });
  }

  if (bgVideo) {
    bgVideo.muted = true;
    makeVideoLoopSeamless(bgVideo);

    const playPromise = bgVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const forcePlay = () => {
          bgVideo.play();
          window.removeEventListener('scroll', forcePlay);
          window.removeEventListener('click', forcePlay);
          window.removeEventListener('touchstart', forcePlay);
        };
        window.addEventListener('scroll', forcePlay, { once: true });
        window.addEventListener('click', forcePlay, { once: true });
        window.addEventListener('touchstart', forcePlay, { once: true });
      });
    }
  }

  // ==========================================
  // ☀️/🔥 GÜNDÜZ & MANGAL AKŞAMI ATMOSFER DEĞİŞTİRİCİ SİSTEMİ
  // ==========================================
  function initAtmosphereSystem() {
    const statusWrapper = document.querySelector('.header-status-wrapper') || document.querySelector('.logo');
    if (!statusWrapper) return;

    let toggleBtn = document.getElementById('atmosphereToggleBtn');
    if (!toggleBtn) {
      toggleBtn = document.createElement('button');
      toggleBtn.id = 'atmosphereToggleBtn';
      toggleBtn.className = 'atmosphere-toggle-btn';
      toggleBtn.setAttribute('title', 'Atmosfer Modunu Değiştir (Tarihi Antep Gündüzü / Meşe Kömürü Akşamı)');
      toggleBtn.innerHTML = `<i class="fa-solid fa-fire" style="color:#e74c3c;"></i> <span>Meşe Kömürü Akşamı</span>`;
      statusWrapper.appendChild(toggleBtn);
    }

    const savedMode = localStorage.getItem('atmosphereMode') || 'night';
    applyAtmosphere(savedMode);

    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isDay = document.body.classList.contains('day-atmosphere');
      const newMode = isDay ? 'night' : 'day';
      applyAtmosphere(newMode);
    });
  }

  function applyAtmosphere(mode) {
    const toggleBtn = document.getElementById('atmosphereToggleBtn');
    const bgVideo = document.getElementById('globalBgVideo');

    // Sayfa dizin derinliğine göre dinamik video yolu belirleme
    const isPagesDir = window.location.pathname.includes('/pages/') || document.querySelector('script[src*="../public/js"]');
    const basePath = isPagesDir ? '../public/images/' : 'public/images/';
    const dayVideoName = 'day-video.mp4';
    const nightVideoName = 'video.mp4';
    const targetSrc = basePath + (mode === 'day' ? dayVideoName : nightVideoName);

    if (mode === 'day') {
      document.body.classList.add('day-atmosphere');
      localStorage.setItem('atmosphereMode', 'day');
      if (toggleBtn) {
        toggleBtn.innerHTML = `<i class="fa-solid fa-sun" style="color:#f39c12;"></i> <span>Tarihi Antep Gündüzü</span>`;
        toggleBtn.classList.add('day-active');
      }
    } else {
      document.body.classList.remove('day-atmosphere');
      localStorage.setItem('atmosphereMode', 'night');
      if (toggleBtn) {
        toggleBtn.innerHTML = `<i class="fa-solid fa-fire" style="color:#e74c3c;"></i> <span>Meşe Kömürü Akşamı</span>`;
        toggleBtn.classList.remove('day-active');
      }
    }

    // Dil Çevirisini Hemen Uygula
    if (typeof updateAtmosphereBtnTranslation === 'function') {
      updateAtmosphereBtnTranslation(localStorage.getItem('language') || 'tr');
    }

    if (bgVideo) {
      bgVideo.style.filter = mode === 'day' ? 'contrast(100%) brightness(108%)' : 'contrast(104%) brightness(92%)';

      const currentSrc = bgVideo.currentSrc || bgVideo.src || '';
      const isCurrentlyDay = currentSrc.includes('day-video.mp4');
      const isCurrentlyNight = !isCurrentlyDay && currentSrc.includes('video.mp4');

      const needsSwitch = (mode === 'day' && !isCurrentlyDay) || (mode === 'night' && !isCurrentlyNight);

      if (needsSwitch) {
        // HTML5 Video kuralı: İçteki eski <source> etiketlerini temizleyip doğrudan video.src atama
        while (bgVideo.firstChild) {
          bgVideo.removeChild(bgVideo.firstChild);
        }
        bgVideo.src = targetSrc;
        bgVideo.load();
        const playPromise = bgVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    }
  }

  initAtmosphereSystem();

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
          <span class="status-text">Şu An Açığız <small>(Kapanış ${closeHour}:00)</small></span>
        `;
      } else {
        badge.className = 'live-status-badge status-closed';
        const subtext = !isTodayOpen ? 'Pazar Günleri Kapalıyız' : 'Açılış 10:00';
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
      // ⚠️ Alert manipülasyonu kaldırıldı — alertGoster() fonksiyonu kendi yönetir
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
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
        const currentLang = localStorage.getItem('language') || 'tr';
        
        // Dinamik Yemek Çevirisi
        const translatedAd = (window.translations && translations[currentLang] && translations[currentLang][yemek.ad]) 
          ? translations[currentLang][yemek.ad] 
          : yemek.ad;
        const translatedAciklama = (window.translations && translations[currentLang] && translations[currentLang][yemek.aciklama]) 
          ? translations[currentLang][yemek.aciklama] 
          : yemek.aciklama;
        
        // Dinamik Rozet Çevirileri
        const chefSpecialLabel = (window.translations && translations[currentLang] && translations[currentLang]['menu-chef-special']) 
          ? translations[currentLang]['menu-chef-special'] 
          : 'Şefin Önerisi';
        const vegLabel = (window.translations && translations[currentLang] && translations[currentLang]['menu-vegetarian']) 
          ? translations[currentLang]['menu-vegetarian'] 
          : 'Veg';
        const spicyLabel = (window.translations && translations[currentLang] && translations[currentLang]['menu-spicy']) 
          ? translations[currentLang]['menu-spicy'] 
          : 'Acılı';

        const sefinOnerisiHTML = yemek.sefinOnerisi ? `<span class="badge badge-chef">⭐ ${chefSpecialLabel}</span>` : '';
        const vejetaryenHTML = yemek.vejetaryen ? `<span class="badge badge-veg" title="Vejetaryen Dostu">🌱 ${vegLabel}</span>` : '';
        const aciliHTML = (yemek.kategori === 'kebap' && (yemek.ad.includes('Adana') || yemek.ad.includes('Ciğer') || yemek.ad.includes('Sarma'))) || yemek.ad.includes('Acılı') 
          ? `<span class="badge badge-spicy" title="Acılı Lezzet"><i class="fa-solid fa-pepper-hot"></i> ${spicyLabel}</span>` 
          : '';

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
            <img src="${yemek.resim}" alt="${translatedAd}" loading="${yemek.loading}">
          </div>
          <div class="dish-info">
            <h3>${translatedAd}</h3>
            <p>${translatedAciklama}</p>
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
        const currentLang = localStorage.getItem('language') || 'tr';
        const translatedAd = (window.translations && translations[currentLang] && translations[currentLang][yemek.ad]) 
          ? translations[currentLang][yemek.ad] 
          : yemek.ad;
        const translatedAciklama = (window.translations && translations[currentLang] && translations[currentLang][yemek.aciklama]) 
          ? translations[currentLang][yemek.aciklama] 
          : yemek.aciklama;

        const kategoriUyumlu = (aktifKategori === "tumu") || (yemek.kategori === aktifKategori);
        const adUyumlu = yemek.ad.toLocaleLowerCase('tr-TR').includes(mevcutAramaMetni) || 
                         translatedAd.toLocaleLowerCase('tr-TR').includes(mevcutAramaMetni);
        const aciklamaUyumlu = yemek.aciklama.toLocaleLowerCase('tr-TR').includes(mevcutAramaMetni) || 
                               translatedAciklama.toLocaleLowerCase('tr-TR').includes(mevcutAramaMetni);
        
        let kategoriEtiketUyumlu = false;
        if (mevcutAramaMetni.length > 0) {
          if (('izgara'.includes(mevcutAramaMetni) || 'ızgara'.includes(mevcutAramaMetni) || 'kebap'.includes(mevcutAramaMetni) || 'grill'.includes(mevcutAramaMetni) || 'kebab'.includes(mevcutAramaMetni)) && yemek.kategori === 'kebap') {
            kategoriEtiketUyumlu = true;
          } else if (('corba'.includes(mevcutAramaMetni) || 'çorba'.includes(mevcutAramaMetni) || 'soup'.includes(mevcutAramaMetni)) && yemek.kategori === 'corba') {
            kategoriEtiketUyumlu = true;
          } else if (('pide'.includes(mevcutAramaMetni) || 'lahmacun'.includes(mevcutAramaMetni) || 'pita'.includes(mevcutAramaMetni) || 'pizza'.includes(mevcutAramaMetni)) && yemek.kategori === 'pide') {
            kategoriEtiketUyumlu = true;
          } else if (('zeytinyağlı'.includes(mevcutAramaMetni) || 'salata'.includes(mevcutAramaMetni) || 'salad'.includes(mevcutAramaMetni)) && yemek.kategori === 'zeytinyagli') {
            kategoriEtiketUyumlu = true;
          } else if (('tatli'.includes(mevcutAramaMetni) || 'tatlı'.includes(mevcutAramaMetni) || 'dessert'.includes(mevcutAramaMetni) || 'baklava'.includes(mevcutAramaMetni)) && yemek.kategori === 'tatli') {
            kategoriEtiketUyumlu = true;
          } else if (('icecek'.includes(mevcutAramaMetni) || 'içecek'.includes(mevcutAramaMetni) || 'drink'.includes(mevcutAramaMetni) || 'beverage'.includes(mevcutAramaMetni)) && yemek.kategori === 'icecek') {
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

    // --- 1. YÜKLENİYOR (LOADING) SKELETON EKRANI ---
    function gosterYukleniyorState() {
      if (!menuGrid) return;
      let skeletonCardsHTML = '';
      for (let i = 0; i < 6; i++) {
        skeletonCardsHTML += `
          <div class="dish-card skeleton-card" style="pointer-events: none; opacity: 0.85; border: 1px solid rgba(243,156,18,0.15);">
            <div class="dish-img-container skeleton-loading" style="height: 200px; background: linear-gradient(90deg, #2b1f17 25%, #3b2b20 50%, #2b1f17 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite;"></div>
            <div class="dish-info" style="padding: 16px;">
              <div style="height: 20px; width: 70%; background: #3b2b20; border-radius: 4px; margin-bottom: 10px; animation: pulse 1.5s infinite;"></div>
              <div style="height: 14px; width: 90%; background: #33241b; border-radius: 4px; margin-bottom: 6px;"></div>
              <div style="height: 14px; width: 60%; background: #33241b; border-radius: 4px; margin-bottom: 16px;"></div>
              <div style="height: 22px; width: 35%; background: #4a3424; border-radius: 4px;"></div>
            </div>
          </div>
        `;
      }
      menuGrid.innerHTML = skeletonCardsHTML;
    }

    // --- 2. HATA (ERROR) VE TEKRAR DENE EKRANI ---
    function gosterHataState(mesaj = "Menü verileri yüklenirken bir bağlantı hatası oluştu.") {
      if (!menuGrid) return;
      menuGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 45px 20px; background: rgba(30, 20, 15, 0.95); border: 1.5px solid rgba(231, 76, 60, 0.5); border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); margin: 20px 0;">
          <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.8rem; color: #e74c3c; margin-bottom: 16px;"></i>
          <h3 style="color: #f39c12; font-size: 1.3rem; margin-bottom: 8px;">Veri Yükleme Hatası</h3>
          <p style="color: #ddd; font-size: 1rem; max-width: 500px; margin: 0 auto 20px auto; line-height: 1.5;">${mesaj}</p>
          <button id="retryFetchBtn" class="btn-service-action" style="background: linear-gradient(135deg, #e74c3c, #c0392b); color: #fff; border: none; padding: 12px 28px; border-radius: 30px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
            <i class="fa-solid fa-rotate-right"></i> Tekrar Deneyin
          </button>
        </div>
      `;

      const retryBtn = document.getElementById('retryFetchBtn');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          backendMenuyuGetir();
        });
      }
    }

    // --- 3. EXPRESS BACKEND API'DEN CANLI VERİ ÇEKME (FETCH API) ---
    async function backendMenuyuGetir() {
      gosterYukleniyorState();
      try {
        const isLocalHost3000 = window.location.origin.includes(':3000');
        const apiUrl = isLocalHost3000 ? '/api/menu' : 'http://localhost:3000/api/menu';

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Sunucu Yanıt Hatası: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        if (result && result.success && Array.isArray(result.data)) {
          yemekler = result.data;
          menuyuFiltrele();
        } else {
          throw new Error(result.message || 'Geçersiz menü verisi alındı.');
        }
      } catch (err) {
        console.error('Backend API Fetch Hatası:', err);
        gosterHataState(t('err-menu-db', 'Veritabanından menü verileri çekilemedi. Lütfen arka plan sunucusunun (Express & SQLite) aktif olduğunu kontrol edin.'));
      }
    }

    // İlk Yükleme
    backendMenuyuGetir();

    // Kategori Butonları
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        aktifKategori = btn.dataset.kategori;
        menuyuFiltrele();
        // Mobilde veya derindeyken kategori değiştiğinde kullanıcıyı listenin en başına çıkarıyoruz
        const target = document.querySelector(".menu-section") || document.getElementById("menu-grid");
        if (target) {
          yumusakKaydir(target, 130); // Header + Yapışkan bar yüksekliğini hesaba katıyoruz
        }
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

    // ==========================================
    // 🖨️ MENÜYÜ YAZDIR / PDF İÇİN 42 LEZZETİ 6 KATEGORİ BAŞLIĞIYLA HAZIRLAMA
    // ==========================================
    window.menuyuYazdirAninda = function() {
      if (!menuGrid || !Array.isArray(yemekler) || yemekler.length === 0) {
        window.print();
        return;
      }

      hepsiAcik = true;
      const kategoriMap = [
        { id: 'corba', baslik: '🥣 ÇORBALAR & BAŞLANGIÇLAR' },
        { id: 'kebap', baslik: '🔥 KEBAPLAR & IZGARALAR' },
        { id: 'pide', baslik: '🍕 PİDELER & LAHMACUNLAR' },
        { id: 'zeytinyagli', baslik: '🥗 ZEYTİNYAĞLILAR & SALATALAR' },
        { id: 'tatli', baslik: ' BAKLAVALAR & TATLILAR' },
        { id: 'icecek', baslik: '🥤 GELENEKSEL İÇECEKLER' }
      ];

      menuGrid.innerHTML = "";
      const fragment = document.createDocumentFragment();

      kategoriMap.forEach(kat => {
        const katYemekleri = yemekler.filter(y => y.kategori === kat.id);
        if (katYemekleri.length > 0) {
          const currentLang = localStorage.getItem('language') || 'tr';
          
          // E.g. "menu-filter-corba" might map to "Soups" or similar, otherwise fallback to baslik
          const translatedKatTitle = (window.translations && translations[currentLang] && translations[currentLang]['menu-filter-' + kat.id]) 
            ? translations[currentLang]['menu-filter-' + kat.id] 
            : kat.baslik;

          const katHeader = document.createElement("div");
          katHeader.className = "print-category-header";
          katHeader.innerHTML = `<span>${translatedKatTitle}</span>`;
          fragment.appendChild(katHeader);

          katYemekleri.forEach(yemek => {
            const translatedAd = (window.translations && translations[currentLang] && translations[currentLang][yemek.ad]) 
              ? translations[currentLang][yemek.ad] 
              : yemek.ad;
            const translatedAciklama = (window.translations && translations[currentLang] && translations[currentLang][yemek.aciklama]) 
              ? translations[currentLang][yemek.aciklama] 
              : yemek.aciklama;

            const cardDiv = document.createElement("div");
            cardDiv.className = "dish-card";
            cardDiv.dataset.kategori = yemek.kategori;
            cardDiv.innerHTML = `
              <div class="dish-img-container">
                <img src="${yemek.resim}" alt="${translatedAd}" class="loaded" decoding="async" loading="eager">
              </div>
              <div class="dish-info">
                <h3>${translatedAd}</h3>
                <p>${translatedAciklama}</p>
                <span class="dish-price">₺${yemek.fiyat}</span>
              </div>
            `;
            fragment.appendChild(cardDiv);
          });
        }
      });

      menuGrid.appendChild(fragment);

      if (loadMoreContainer) loadMoreContainer.style.display = "none";

      setTimeout(() => {
        window.print();
      }, 150);
    };

    // ==========================================
    // 📄 DİREKT PDF İNDİRME SİSTEMİ (PENCERESİZ DOĞRUDAN .PDF DOSYASI İNDİRME)
    // ==========================================
    window.pdfIndirDirekt = function() {
      if (!menuGrid || !Array.isArray(yemekler) || yemekler.length === 0) return;

      hepsiAcik = true;
      const kategoriMap = [
        { id: 'corba', baslik: '🥣 ÇORBALAR & BAŞLANGIÇLAR' },
        { id: 'kebap', baslik: '🔥 KEBAPLAR & IZGARALAR' },
        { id: 'pide', baslik: '🍕 PİDELER & LAHMACUNLAR' },
        { id: 'zeytinyagli', baslik: '🥗 ZEYTİNYAĞLILAR & SALATALAR' },
        { id: 'tatli', baslik: ' BAKLAVALAR & TATLILAR' },
        { id: 'icecek', baslik: '🥤 GELENEKSEL İÇECEKLER' }
      ];

      menuGrid.innerHTML = "";
      const fragment = document.createDocumentFragment();

      kategoriMap.forEach(kat => {
        const katYemekleri = yemekler.filter(y => y.kategori === kat.id);
        if (katYemekleri.length > 0) {
          const currentLang = localStorage.getItem('language') || 'tr';
          
          const translatedKatTitle = (window.translations && translations[currentLang] && translations[currentLang]['menu-filter-' + kat.id]) 
            ? translations[currentLang]['menu-filter-' + kat.id] 
            : kat.baslik;

          const katHeader = document.createElement("div");
          katHeader.className = "print-category-header";
          katHeader.innerHTML = `<span>${translatedKatTitle}</span>`;
          fragment.appendChild(katHeader);

          katYemekleri.forEach(yemek => {
            const translatedAd = (window.translations && translations[currentLang] && translations[currentLang][yemek.ad]) 
              ? translations[currentLang][yemek.ad] 
              : yemek.ad;
            const translatedAciklama = (window.translations && translations[currentLang] && translations[currentLang][yemek.aciklama]) 
              ? translations[currentLang][yemek.aciklama] 
              : yemek.aciklama;

            const cardDiv = document.createElement("div");
            cardDiv.className = "dish-card";
            cardDiv.dataset.kategori = yemek.kategori;
            cardDiv.innerHTML = `
              <div class="dish-img-container">
                <img src="${yemek.resim}" alt="${translatedAd}" class="loaded" decoding="async" loading="eager">
              </div>
              <div class="dish-info">
                <h3>${translatedAd}</h3>
                <p>${translatedAciklama}</p>
                <span class="dish-price">₺${yemek.fiyat}</span>
              </div>
            `;
            fragment.appendChild(cardDiv);
          });
        }
      });

      menuGrid.appendChild(fragment);
      if (loadMoreContainer) loadMoreContainer.style.display = "none";

      if (typeof html2pdf === 'function') {
        const opt = {
          margin: [6, 6, 6, 6],
          filename: 'Lezzet_Muhru_1932_Dijital_Menu.pdf',
          image: { type: 'jpeg', quality: 0.95 },
          html2canvas: { scale: 2, useCORS: true, logging: false },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        const printWrapper = document.createElement('div');
        printWrapper.style.background = '#ffffff';
        printWrapper.style.padding = '10px';
        printWrapper.style.color = '#111111';
        printWrapper.innerHTML = `
          <div style="text-align: center; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 2px double #c0392b;">
            <h1 style="color: #c0392b; font-family: Georgia, serif; font-size: 20px; margin: 0; font-weight: 800;">LEZZET MÜHRÜ 1932</h1>
            <p style="color: #555; font-size: 11px; margin: 3px 0 0 0; font-style: italic;">Gaziantep Mutfak Mirası • Dijital Yemek Menüsü (42 Lezzet)</p>
          </div>
        ` + menuGrid.outerHTML;

        html2pdf().set(opt).from(printWrapper).save().then(() => {
          setTimeout(() => {
            if (typeof menuyuFiltrele === 'function') menuyuFiltrele();
          }, 400);
        }).catch(err => {
          console.error('PDF Indirme Hatası:', err);
          window.print();
        });
      } else {
        window.print();
      }
    };

    window.addEventListener('beforeprint', () => {
      if (typeof window.menuyuYazdirAninda === 'function' && menuGrid && Array.isArray(yemekler) && yemekler.length > 0) {
        const cards = menuGrid.querySelectorAll('.dish-card');
        if (cards.length < 20) {
          window.menuyuYazdirAninda();
        }
      }
    });

    window.addEventListener('afterprint', () => {
      if (typeof menuyuFiltrele === 'function') {
        menuyuFiltrele();
      }
    });
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

  let lastSubmittedTicketData = null;

  // --- HAMBURGER MENÜ TIKLAMA İŞLEYİCİSİ ---
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mainNavbar = document.getElementById('mainNavbar');

  if (hamburgerBtn && mainNavbar) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mainNavbar.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!mainNavbar.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        mainNavbar.classList.remove('active');
      }
    });
  }

  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      hatalariTemizle();

      let hasError = false;

      // --- SIRALI DOĞRULAMA (1. Ad Soyad, 2. Telefon, 3. Tarih, 4. Saat, 5. Kişi Sayısı) ---
      // 1. Adınız Soyadınız
      if (!nameInput || !nameInput.value.trim() || nameInput.value.trim().length < 3) {
        hataGoster(nameInput, t('err-res-name', 'Lütfen en az 3 karakterden oluşan adınızı ve soyadınızı giriniz.'));
        if (!hasError) { nameInput.focus(); hasError = true; }
      }

      // 2. Telefon Numaranız (05XXXXXXXXX)
      const phoneClean = phoneInput ? phoneInput.value.trim() : '';
      const phoneRegex = /^05[0-9]{9}$/;
      if (!phoneInput || !phoneClean || !phoneRegex.test(phoneClean)) {
        hataGoster(phoneInput, t('err-res-phone', 'Lütfen 05 ile başlayan 11 haneli cep telefonunuzu giriniz.'));
        if (!hasError) { phoneInput.focus(); hasError = true; }
      }

      // 3. Rezervasyon Tarihi
      let isSunday = false;
      let selectedDayOfWeek = -1;
      if (!dateInput || !dateInput.value.trim() || dateInput.value.trim() === 'Tarih Seçiniz') {
        hataGoster(dateInput, t('err-res-date', 'Lütfen rezervasyon tarihini seçiniz.'));
        if (!hasError) { dateInput.focus(); hasError = true; }
      } else {
        const dateVal = dateInput.value.trim();
        const parts = dateVal.split('.');
        if (parts.length === 3) {
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1;
          const year = parseInt(parts[2], 10);
          const localDate = new Date(year, month, day);
          selectedDayOfWeek = localDate.getDay();
          
          if (selectedDayOfWeek === 0) {
            isSunday = true;
            hataGoster(dateInput, t('err-res-sunday', 'Pazar günleri kapalıyız. Lütfen başka bir gün seçiniz.'));
            if (!hasError) { dateInput.focus(); hasError = true; }
          }
        }
      }

      // 4. Rezervasyon Saati
      if (!timeInput || !timeInput.value.trim() || timeInput.value.trim() === 'Saat Seçiniz') {
        hataGoster(timeInput, t('err-res-time', 'Lütfen rezervasyon saatini seçiniz.'));
        if (!hasError) { timeInput.focus(); hasError = true; }
      } else if (!isSunday && selectedDayOfWeek !== -1) {
        const timeVal = timeInput.value.trim();
        const timeParts = timeVal.split(':');
        if (timeParts.length === 2) {
          const hours = parseInt(timeParts[0], 10);
          const minutes = parseInt(timeParts[1], 10);
          const totalMinutes = hours * 60 + minutes;

          // Pazartesi - Perşembe (1-4): 10:00 - 22:00 (600 - 1320 dakika)
          // Cuma - Cumartesi (5-6): 10:00 - 23:00 (600 - 1380 dakika)
          let minTime = "10:00";
          let maxTime = "22:00";
          let minLimit = 600;
          let maxLimit = 1320;

          if (selectedDayOfWeek === 5 || selectedDayOfWeek === 6) {
            maxTime = "23:00";
            maxLimit = 1380;
          }

          if (totalMinutes < minLimit || totalMinutes > maxLimit) {
            const limitMsg = (localStorage.getItem('language') || 'tr') === 'en'
              ? `Working hours for this day are between ${minTime} and ${maxTime}.`
              : `Seçilen gün için mesai saatlerimiz ${minTime} - ${maxTime} arasındadır.`;
            hataGoster(timeInput, limitMsg);
            if (!hasError) { timeInput.focus(); hasError = true; }
          }
        }
      }

      // 5. Kişi Sayısı
      if (!guestsInput || !guestsInput.value.trim() || parseInt(guestsInput.value) < 1 || parseInt(guestsInput.value) > 10) {
        hataGoster(guestsInput, t('err-res-guests', 'Lütfen kişi sayısını giriniz (1-10 arası).'));
        if (!hasError) { guestsInput.focus(); hasError = true; }
      }

      if (hasError) {
        alertGoster(resFormAlert, 'error', `<i class="fa-solid fa-triangle-exclamation"></i> <span>${t('err-res-fill', 'Lütfen tüm zorunlu alanları eksiksiz doldurunuz.')}</span>`);
        return;
      }

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const dateVal = dateInput ? dateInput.value.trim() : '';
      const timeVal = timeInput ? timeInput.value.trim() : '';
      const guestsVal = guestsInput ? guestsInput.value.trim() : '1';
      const notesVal = notesInput ? notesInput.value.trim() : '';

      lastSubmittedTicketData = { name: nameVal, phone: phoneVal, date: dateVal, time: timeVal, guests: guestsVal, notes: notesVal };

      // Butonu yükleniyor moduna al (formGonderimSimuleEt yerine inline)
      const submitBtn = reservationForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Restorana İletiliyor...';
      }

      const renderTicket = (data) => {
        const ticketContainer = document.getElementById('resTicketContainer');
        const ticketData = {
          masaNo: data.masaNo || String(Math.floor(Math.random() * 15) + 1).padStart(2, '0'),
          konum: data.konum || '(Geleneksel Odun Ateşi Katı)',
          name: data.name || nameVal,
          phone: data.phone || phoneVal,
          dateTime: `${data.date || dateVal} • ${data.time || timeVal}`,
          guests: `${data.guests || guestsVal} Kişilik Masa`,
          notes: data.notes || notesVal
        };

        // Yeni rezervasyonda durumu beklemede olarak sıfırla
        const cardTicketStatus = document.getElementById('cardTicketStatus');
        if (cardTicketStatus) {
          cardTicketStatus.innerHTML = '<span class="pulse-dot-amber"></span> ⏳ Restoran Onayı Bekliyor';
          cardTicketStatus.className = 'vintage-status-pill';
        }

        // Yeni rezervasyon için düzenle butonunu göster
        const btnEditReservation = document.getElementById('btnEditReservation');
        if (btnEditReservation) {
          btnEditReservation.style.display = 'inline-block';
        }

        setTimeout(() => {
          displayTicketData(ticketData);
          if (ticketContainer) {
            ticketContainer.style.display = 'block';
            yumusakKaydir(ticketContainer);
          }
        }, 1000);
      };

      // --- EXPRESS BACKEND API POST VEYA YEREL SİMÜLASYON ---
      fetch('/api/rezervasyon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        // Butonu eski haline getir
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalBtnHtml; }

        if (result && result.success && result.data) {
          alertGoster(resFormAlert, 'success', '<i class="fa-solid fa-circle-check"></i> <span>Rezervasyon talebiniz alındı.</span>');
          renderTicket(result.data);
        } else {
          const msg = (result && result.message) ? result.message : 'Rezervasyon gönderilemedi.';
          alertGoster(resFormAlert, 'error', `<i class="fa-solid fa-triangle-exclamation"></i> <span>${msg}</span>`);
          renderTicket({});
        }
      })
      .catch(err => {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalBtnHtml; }
        alertGoster(resFormAlert, 'error', '<i class="fa-solid fa-triangle-exclamation"></i> <span>İşlem sırasında bir hata oluştu.</span>');
        renderTicket({});
      });
    });

    // --- SEKME GEÇİŞLERİ VE REZERVAZYON SORGULAMA ---
    const toggleNewResBtn = document.getElementById('toggleNewResBtn');
    const toggleQueryResBtn = document.getElementById('toggleQueryResBtn');
    const reservationQueryForm = document.getElementById('reservationQueryForm');
    const resQueryAlert = document.getElementById('resQueryAlert');

    if (toggleNewResBtn && toggleQueryResBtn) {
      toggleNewResBtn.addEventListener('click', () => {
        toggleNewResBtn.classList.add('active');
        toggleQueryResBtn.classList.remove('active');
        if (reservationForm) {
          reservationForm.style.display = 'block';
          hatalariTemizle();
        }
        if (reservationQueryForm) reservationQueryForm.style.display = 'none';
        const ticketContainer = document.getElementById('resTicketContainer');
        if (ticketContainer) ticketContainer.style.display = 'none';
      });

      toggleQueryResBtn.addEventListener('click', () => {
        toggleQueryResBtn.classList.add('active');
        toggleNewResBtn.classList.remove('active');
        if (reservationForm) reservationForm.style.display = 'none';
        if (reservationQueryForm) {
          reservationQueryForm.style.display = 'block';
          const queryPhoneInput = document.getElementById('queryPhone');
          if (queryPhoneInput) queryPhoneInput.value = '';
          if (resQueryAlert) resQueryAlert.style.display = 'none';
        }
        const ticketContainer = document.getElementById('resTicketContainer');
        if (ticketContainer) ticketContainer.style.display = 'none';
      });
    }

    if (reservationQueryForm) {
      reservationQueryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const queryPhoneInput = document.getElementById('queryPhone');
        if (!queryPhoneInput) return;

        const phoneVal = queryPhoneInput.value.trim();
        const phoneRegex = /^05[0-9]{9}$/;

        if (!phoneVal) {
          alertGoster(resQueryAlert, 'error', `<i class="fa-solid fa-triangle-exclamation"></i> <span>${t('err-query-phone-empty', 'Lütfen telefon numaranızı giriniz.')}</span>`);
          return;
        }

        if (!phoneRegex.test(phoneVal)) {
          alertGoster(resQueryAlert, 'error', `<i class="fa-solid fa-triangle-exclamation"></i> <span>${t('err-query-phone-invalid', 'Lütfen 05 ile başlayan 11 haneli geçerli bir telefon numarası giriniz.')}</span>`);
          return;
        }

        const querySubmitBtn = reservationQueryForm.querySelector('button[type="submit"]');
        const originalQueryBtnHtml = querySubmitBtn ? querySubmitBtn.innerHTML : '';
        if (querySubmitBtn) {
          querySubmitBtn.disabled = true;
          const searchSpinnerMsg = (localStorage.getItem('language') || 'tr') === 'en' ? 'Searching...' : 'Rezervasyonunuz Aranıyor...';
          querySubmitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${searchSpinnerMsg}`;
        }

        fetch(`/api/rezervasyon-sorgula?telefon=${encodeURIComponent(phoneVal)}`)
          .then(res => {
            if (res.status === 404) {
              throw new Error(t('err-query-not-found', 'Aktif bir rezervasyon kaydı bulunamadı. Lütfen telefon numaranızı kontrol ediniz.'));
            }
            if (!res.ok) {
              const serverErr = (localStorage.getItem('language') || 'tr') === 'en' ? 'A server error occurred during query.' : 'Sorgulama sırasında bir sunucu hatası oluştu.';
              throw new Error(serverErr);
            }
            return res.json();
          })
          .then(result => {
            if (querySubmitBtn) {
              querySubmitBtn.disabled = false;
              querySubmitBtn.innerHTML = originalQueryBtnHtml;
            }

            if (result && result.success && result.data) {
              alertGoster(resQueryAlert, 'success', '<i class="fa-solid fa-circle-check"></i> <span>Rezervasyonunuz başarıyla bulundu!</span>');
              
              // Sorgulama formunu gizle
              if (reservationQueryForm) reservationQueryForm.style.display = 'none';
              
              // Bilet verilerini yerleştir
              const cardTableNumber = document.getElementById('cardTableNumber');
              const cardTicketName = document.getElementById('cardTicketName');
              const cardTicketPhone = document.getElementById('cardTicketPhone');
              const cardTicketDateTime = document.getElementById('cardTicketDateTime');
              const cardTicketGuests = document.getElementById('cardTicketGuests');
              const cardTicketNotes = document.getElementById('cardTicketNotes');
              const cardTicketNotesRow = document.getElementById('cardTicketNotesRow');
              const cardTicketWaBtn = document.getElementById('cardTicketWaBtn');
              const cardTicketStatus = document.getElementById('cardTicketStatus');

              const data = result.data;
              if (cardTableNumber) cardTableNumber.innerHTML = `Masa No: ${data.masaNo} <small>${data.konum}</small>`;
              if (cardTicketName) cardTicketName.textContent = data.name || 'Girilmedi';
              if (cardTicketPhone) cardTicketPhone.textContent = data.phone || '---';
              if (cardTicketDateTime) cardTicketDateTime.textContent = `${data.date} • ${data.time}`;
              if (cardTicketGuests) cardTicketGuests.textContent = `${data.guests} Kişilik Masa`;

              if (cardTicketNotes && cardTicketNotesRow) {
                if (data.notes) {
                  cardTicketNotes.textContent = data.notes;
                  cardTicketNotesRow.style.display = 'flex';
                } else {
                  cardTicketNotesRow.style.display = 'none';
                }
              }

              if (cardTicketStatus) {
                if (data.durum === 'Onaylandı') {
                  cardTicketStatus.innerHTML = '<span class="pulse-dot-green"></span> 🟢 Rezervasyon Onaylandı';
                  cardTicketStatus.className = 'vintage-status-pill approved';
                } else if (data.durum === 'İptal Edildi') {
                  cardTicketStatus.innerHTML = '<span class="pulse-dot-red"></span> 🔴 Rezervasyon İptal Edildi';
                  cardTicketStatus.className = 'vintage-status-pill cancelled';
                } else {
                  cardTicketStatus.innerHTML = '<span class="pulse-dot-amber"></span> ⏳ Restoran Onayı Bekliyor';
                  cardTicketStatus.className = 'vintage-status-pill';
                }
              }

              if (cardTicketWaBtn) {
                cardTicketWaBtn.href = `https://wa.me/902325137567?text=Merhaba,%20Masa%20No:%20${data.masaNo}%20${encodeURIComponent(data.konum)}%20rezervasyonum%20hakkinda%20bilgi%20almak%20istiyorum.`;
              }

              // Bilgileri düzenle butonunu gizle (Sorgulanan biletler için geçerli değildir)
              const btnEditReservation = document.getElementById('btnEditReservation');
              if (btnEditReservation) {
                btnEditReservation.style.display = 'none';
              }

              const ticketContainer = document.getElementById('resTicketContainer');
              if (ticketContainer) {
                ticketContainer.style.display = 'block';
                yumusakKaydir(ticketContainer);
              }
            } else {
              throw new Error('Sorgulama başarısız oldu.');
            }
          })
          .catch(err => {
            if (querySubmitBtn) {
              querySubmitBtn.disabled = false;
              querySubmitBtn.innerHTML = originalQueryBtnHtml;
            }
            alertGoster(resQueryAlert, 'error', `<i class="fa-solid fa-triangle-exclamation"></i> <span>${err.message}</span>`);
          });
      });
    }

    // ==========================================
    // 🔔 FORM ALERT YARDIMCI FONKSİYONU
    // Her buton tıklamasında gösterilir, 5 sn sonra kaybolur.
    // Kendi kendine geri dönmez (CSS --hidden class ile korunur).
    // ==========================================
    function alertGoster(el, type, html) {
      if (!el) return;

      // Önceki aktif timer'ı temizle (elementin kendi üzerindeki dataset'ten oku)
      if (el.dataset.timerId) {
        clearTimeout(parseInt(el.dataset.timerId, 10));
      }
      el.classList.remove('form-alert--hidden');

      el.style.transition = 'none';
      el.style.opacity = '1';
      el.style.display = 'flex';
      el.className = `form-alert ${type}`;
      el.innerHTML = html;
      yumusakKaydir(el);

      const timerId = setTimeout(() => {
        el.style.transition = 'opacity 0.6s ease';
        el.style.opacity = '0';
        setTimeout(() => {
          el.style.display = 'none';
          el.style.opacity = '1';
          el.style.transition = 'none';
          el.classList.add('form-alert--hidden');
        }, 650);
      }, 5000);

      // Yeni timer ID'sini elementin dataset'ine kaydet
      el.dataset.timerId = timerId;
    }

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
      const openDatePicker = (e) => {
        e?.preventDefault();
        try {
          if (typeof hiddenNativeDate.showPicker === 'function') {
            hiddenNativeDate.showPicker();
          } else {
            hiddenNativeDate.focus();
            hiddenNativeDate.click();
          }
        } catch (err) {
          hiddenNativeDate.focus();
          hiddenNativeDate.click();
        }
      };

      resDateInput.addEventListener('click', openDatePicker);
      resDateInput.addEventListener('focus', openDatePicker);
      if (resDateInput.parentElement) {
        resDateInput.parentElement.addEventListener('click', (e) => {
          if (e.target !== hiddenNativeDate) openDatePicker(e);
        });
      }

      hiddenNativeDate.addEventListener('change', (e) => {
        if (e.target.value) {
          const parts = e.target.value.split('-');
          if (parts.length === 3) {
            resDateInput.value = `${parts[2]}.${parts[1]}.${parts[0]}`;
            resDateInput.classList.remove('input-error');

            // Eski uyarı spanlarını temizle
            const errSpan = resDateInput.closest('.form-group')?.querySelector('.error-msg');
            if (errSpan) errSpan.remove();

            // Eski pazar uyarı banner'ını ve yasak ikonunu temizle
            const oldBanner = document.getElementById('sundayWarningBanner');
            if (oldBanner) oldBanner.remove();
            const oldBanIcon = document.getElementById('sundayBanIcon');
            if (oldBanIcon) oldBanIcon.remove();

            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const day = parseInt(parts[2], 10);
            const localDate = new Date(year, month, day);
            const dayOfWeek = localDate.getDay();

            if (dayOfWeek === 0) {
              resDateInput.classList.add('input-error');

              const formGroup = resDateInput.closest('.form-group');
              if (formGroup) {
                const banner = document.createElement('div');
                banner.id = 'sundayWarningBanner';
                banner.style.cssText = `
                  margin-top: 8px;
                  padding: 10px 14px;
                  background: rgba(231, 76, 60, 0.13);
                  border-left: 3px solid #e74c3c;
                  border-radius: 0 8px 8px 0;
                  color: #ff7675;
                  font-size: 0.83rem;
                  font-weight: 500;
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  position: static;
                  transition: opacity 0.6s ease;
                  opacity: 1;
                `;

                const icon = document.createElement('span');
                icon.textContent = '⚠️';
                icon.style.cssText = 'font-size: 0.95rem; flex-shrink: 0; position: static; display: inline;';

                const text = document.createElement('span');
                text.textContent = t('err-res-sunday', 'Pazar günleri kapalıyız. Lütfen başka bir gün seçiniz.');
                text.style.cssText = 'position: static; display: inline;';

                banner.appendChild(icon);
                banner.appendChild(text);
                formGroup.appendChild(banner);

                // 5 saniye sonra yavaşça kaybolur ve DOM'dan silinir
                setTimeout(() => {
                  banner.style.opacity = '0';
                  setTimeout(() => banner.remove(), 650);
                }, 5000);
              }
            } else {
              // Pazar değil — saat inputunun min/max değerlerini güne göre ayarla
              if (hiddenNativeTime) {
                hiddenNativeTime.min = '10:00';
                if (dayOfWeek === 5 || dayOfWeek === 6) {
                  // Cuma - Cumartesi: 23:00'e kadar
                  hiddenNativeTime.max = '23:00';
                } else {
                  // Pazartesi - Perşembe: 22:00'ye kadar
                  hiddenNativeTime.max = '22:00';
                }
              }
            }
          }
        }
      });
    }

    if (resTimeInput && hiddenNativeTime) {
      const openTimePicker = (e) => {
        e?.preventDefault();
        try {
          if (typeof hiddenNativeTime.showPicker === 'function') {
            hiddenNativeTime.showPicker();
          } else {
            hiddenNativeTime.focus();
            hiddenNativeTime.click();
          }
        } catch (err) {
          hiddenNativeTime.focus();
          hiddenNativeTime.click();
        }
      };

      resTimeInput.addEventListener('click', openTimePicker);
      resTimeInput.addEventListener('focus', openTimePicker);
      if (resTimeInput.parentElement) {
        resTimeInput.parentElement.addEventListener('click', (e) => {
          if (e.target !== hiddenNativeTime) openTimePicker(e);
        });
      }

      hiddenNativeTime.addEventListener('change', (e) => {
        if (e.target.value) {
          resTimeInput.value = e.target.value;
          resTimeInput.classList.remove('input-error');
          const errSpan = resTimeInput.closest('.form-group')?.querySelector('.error-msg');
          if (errSpan) errSpan.remove();

          // Seçilen saate göre mesai saati kontrolü
          if (resDateInput.value && resDateInput.value !== 'Tarih Seçiniz') {
            const dateParts = resDateInput.value.split('.');
            if (dateParts.length === 3) {
              const day = parseInt(dateParts[0], 10);
              const month = parseInt(dateParts[1], 10) - 1;
              const year = parseInt(dateParts[2], 10);
              const localDate = new Date(year, month, day);
              const dayOfWeek = localDate.getDay();

              const timeParts = e.target.value.split(':');
              if (timeParts.length === 2) {
                const hours = parseInt(timeParts[0], 10);
                const minutes = parseInt(timeParts[1], 10);
                const totalMinutes = hours * 60 + minutes;

                let minTime = "10:00";
                let maxTime = "22:00";
                let minLimit = 600;
                let maxLimit = 1320;

                if (dayOfWeek === 5 || dayOfWeek === 6) {
                  maxTime = "23:00";
                  maxLimit = 1380;
                }

                if (dayOfWeek === 0) {
                  hataGoster(resTimeInput, 'Pazar günleri kapalıyız.');
                } else if (totalMinutes < minLimit || totalMinutes > maxLimit) {
                  hataGoster(resTimeInput, `Seçilen gün için mesai saatlerimiz ${minTime} - ${maxTime} arasındadır.`);
                }
              }
            }
          }
        }
      });
    }
  }

  // --- İLETİŞİM FORMU SİSTEMİ VE VERİTABANI BAĞLANTISI ---
  const contactForm = document.getElementById('contactForm');
  const contactFormAlert = document.getElementById('formAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      hatalariTemizle();

      const cName = document.getElementById('contactName');
      const cEmail = document.getElementById('contactEmail');
      const cSubject = document.getElementById('contactSubject');
      const cMessage = document.querySelector('#contactForm textarea') || document.getElementById('contactMessage');

      let hasError = false;

      if (!cName || !cName.value.trim() || cName.value.trim().length < 3) {
        hataGoster(cName, t('err-contact-name', 'Lütfen adınızı ve soyadınızı giriniz.'));
        if (!hasError && cName) { cName.focus(); hasError = true; }
      }

      const emailVal = cEmail ? cEmail.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!cEmail || !emailVal || !emailRegex.test(emailVal)) {
        hataGoster(cEmail, t('err-contact-email', 'Lütfen geçerli bir e-posta adresi giriniz.'));
        if (!hasError && cEmail) { cEmail.focus(); hasError = true; }
      }

      if (!cSubject || !cSubject.value.trim() || cSubject.value.trim().length < 3) {
        hataGoster(cSubject, t('err-contact-subject', 'Lütfen mesaj konusunu giriniz.'));
        if (!hasError && cSubject) { cSubject.focus(); hasError = true; }
      }

      if (!cMessage || !cMessage.value.trim() || cMessage.value.trim().length < 5) {
        hataGoster(cMessage, t('err-contact-message', 'Lütfen mesajınızı buraya yazınız.'));
        if (!hasError && cMessage) { cMessage.focus(); hasError = true; }
      }

      if (hasError) {
        alertGoster(contactFormAlert, 'error', `<i class="fa-solid fa-triangle-exclamation"></i> <span>${t('err-contact-fill', 'Lütfen tüm zorunlu alanları eksiksiz ve doğru doldurunuz.')}</span>`);
        return;
      }

      const sendingMsg = (localStorage.getItem('language') || 'tr') === 'en' ? 'Sending Message...' : 'Mesajınız Gönderiliyor...';
      formGonderimSimuleEt(contactForm, contactFormAlert, sendingMsg, 900);

      fetch('/api/iletisim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ad_soyad: cName.value.trim(),
          eposta: cEmail.value.trim(),
          konu: cSubject.value.trim(),
          mesaj: cMessage.value.trim()
        })
      })
      .then(res => {
        // res.ok = HTTP 200-299 arasi (201 dahil basarili)
        // res.ok degil = 400 veya 500, backend hata mesajini al
        return res.json().then(data => ({ ok: res.ok, status: res.status, data }));
      })
      .then(({ ok, status, data }) => {
        if (ok && data.success) {
          // 201: Basarili kayit
          alertGoster(contactFormAlert, 'success', `<i class="fa-solid fa-circle-check"></i> <span>${t('contact-form-success', 'Mesajınız restorana başarıyla iletildi! En kısa sürede sizinle iletişime geçeceğiz.')}</span>`);
          contactForm.reset();
        } else if (status === 400) {
          // 400: Eksik alan, gecersiz e-posta, kisa mesaj vb. (backend mesaji goster)
          let hataMetni = '';
          if ((localStorage.getItem('language') || 'tr') === 'en') {
            hataMetni = (data && data.mesaj_en) ? data.mesaj_en : 'Please fill in all fields completely and correctly.';
          } else {
            hataMetni = (data && data.mesaj) ? data.mesaj : 'Lütfen tüm alanları eksiksiz ve doğru doldurunuz.';
          }
          alertGoster(contactFormAlert, 'error', `<i class="fa-solid fa-triangle-exclamation"></i> <span>${hataMetni}</span>`);
        } else {
          // 500 veya beklenmedik durum
          alertGoster(contactFormAlert, 'error', `<i class="fa-solid fa-triangle-exclamation"></i> <span>${t('err-contact-submit', 'Mesaj gönderilemedi. Lütfen tekrar deneyiniz.')}</span>`);
        }
      })
      .catch((err) => {
        // Sunucuya baglanamadi (internet yok, server kapali vb.)
        console.error('İletişim formu bağlantı hatası:', err);
        alertGoster(contactFormAlert, 'error', `<i class="fa-solid fa-wifi"></i> <span>${t('err-server-connection', 'Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.')}</span>`);
      });
    });
  }

  function hataGoster(inputEl, mesaj) {
    if (!inputEl) return;
    inputEl.classList.add('input-error');
    let formGroup = inputEl.closest('.form-group') || inputEl.parentElement;
    if (formGroup) {
      let errSpan = formGroup.querySelector('.error-msg');
      if (!errSpan) {
        errSpan = document.createElement('span');
        errSpan.className = 'error-msg';
        formGroup.appendChild(errSpan);
      }
      errSpan.textContent = mesaj;
    }
  }

  function hatalariTemizle() {
    const errorInputs = document.querySelectorAll('.input-error');
    errorInputs.forEach(el => el.classList.remove('input-error'));
    const errorSpans = document.querySelectorAll('.error-msg');
    errorSpans.forEach(el => el.remove());
    const inlineErrs = document.querySelectorAll('.input-inline-error');
    inlineErrs.forEach(el => el.remove());

    // Aktif çalışan timer'ları temizle ki sonradan tetiklenip alert'i açmasınlar
    const formAlerts = document.querySelectorAll('.form-alert');
    formAlerts.forEach(alert => {
      if (alert.dataset.timerId) {
        clearTimeout(parseInt(alert.dataset.timerId, 10));
        delete alert.dataset.timerId;
      }
      alert.style.display = 'none';
      alert.classList.add('form-alert--hidden');
      alert.style.opacity = '1';
    });
  }

  // GİRDİ YAPILMAYA VEYA SEÇİM YAPILMAYA BAŞLANDIĞINDA TÜM UYARILARI ANINDA KALDIRMA
  document.addEventListener('input', (e) => {
    if (e.target.matches('input, select, textarea')) {
      hatalariTemizle();
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target.matches('input, select, textarea')) {
      hatalariTemizle();
    }
  });

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
  // 🌐 MULTI-LANGUAGE (TR / EN) SYSTEM
  // ==========================================
  function initLanguageSystem() {
    // 1. Dil seçici butonunu DOM'a ekleme
    const statusWrapper = document.querySelector('.header-status-wrapper') || document.querySelector('.logo');
    if (!statusWrapper) return;

    let langSelector = document.getElementById('langSelector');
    if (!langSelector) {
      langSelector = document.createElement('div');
      langSelector.id = 'langSelector';
      langSelector.className = 'lang-selector-container';
      langSelector.innerHTML = `
        <button class="lang-toggle-btn" id="langToggleBtn" title="Dil Seç / Select Language">
          <i class="fa-solid fa-globe"></i>
          <span>TR</span>
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <div class="lang-dropdown">
          <button class="lang-option" data-lang="tr">
            <span class="lang-flag">🇹🇷</span> Türkçe (TR)
          </button>
          <button class="lang-option" data-lang="en">
            <span class="lang-flag">🇬🇧</span> English (EN)
          </button>
        </div>
      `;
      // Atmosfer butonunun yanına veya status badge'in soluna ekle
      const toggleBtn = document.getElementById('atmosphereToggleBtn');
      if (toggleBtn) {
        statusWrapper.insertBefore(langSelector, toggleBtn);
      } else {
        statusWrapper.appendChild(langSelector);
      }
    }

    const langToggleBtn = document.getElementById('langToggleBtn');
    const dropdownOptions = langSelector.querySelectorAll('.lang-option');

    // Kaydedilen dili oku, yoksa varsayılan TR yap
    const savedLang = localStorage.getItem('language') || 'tr';
    applyLanguage(savedLang);

    // Açılır kutu tetikleyici
    langToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      langSelector.classList.toggle('open');
    });

    // Dil seçimi tıklama olayı
    dropdownOptions.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const selectedLang = opt.getAttribute('data-lang');
        applyLanguage(selectedLang);
        langSelector.classList.remove('open');
      });
    });

    // Dışarı tıklayınca açılır kutuyu kapatma
    document.addEventListener('click', (e) => {
      if (langSelector && !langSelector.contains(e.target)) {
        langSelector.classList.remove('open');
      }
    });
  }

  function applyLanguage(lang) {
    localStorage.setItem('language', lang);
    
    // Buton metnini güncelle
    const toggleBtnText = document.querySelector('#langToggleBtn span');
    if (toggleBtnText) {
      toggleBtnText.textContent = lang.toUpperCase();
    }

    // Seçeneklerin aktiflik durumunu güncelle
    const options = document.querySelectorAll('.lang-option');
    options.forEach(opt => {
      if (opt.getAttribute('data-lang') === lang) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    // Sayfadaki statik metinleri çevir
    translatePage(lang);
  }

  function translatePage(lang) {
    if (!window.translations) {
      console.warn('translations dictionary not loaded yet!');
      return;
    }

    // 1. data-translate niteliğine sahip elemanları çevir
    const translateElements = document.querySelectorAll('[data-translate]');
    translateElements.forEach(el => {
      const key = el.getAttribute('data-translate');
      if (translations[lang] && translations[lang][key] !== undefined) {
        // Metin düğümünü (Text Node) bozmadan değiştirme
        let textNodeFound = false;
        for (let node of el.childNodes) {
          if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
            node.nodeValue = translations[lang][key];
            textNodeFound = true;
            break;
          }
        }
        if (!textNodeFound && el.children.length === 0) {
          el.textContent = translations[lang][key];
        }
      }
    });

    // 2. data-translate-placeholder niteliğine sahip inputları çevir
    const placeholders = document.querySelectorAll('[data-translate-placeholder]');
    placeholders.forEach(el => {
      const key = el.getAttribute('data-translate-placeholder');
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    // 3. Canlı Durum Widget'ını Çevir
    updateStatusBadgeTranslation(lang);

    // 4. Atmosfer Modu Butonunu Çevir
    updateAtmosphereBtnTranslation(lang);
    
    // 5. Eğer menü sayfasındaysak ve yemekler listesi yüklüyse menüyü yeniden filtrele (listeyi güncelle)
    if (typeof menuyuFiltrele === 'function' && window.yemekler && window.yemekler.length > 0) {
      menuyuFiltrele();
    }
  }

  function updateStatusBadgeTranslation(lang) {
    const liveStatusBadges = document.querySelectorAll('.live-status-badge');
    liveStatusBadges.forEach(badge => {
      const isClosed = badge.classList.contains('status-closed');
      const statusTextSpan = badge.querySelector('.status-text');
      if (!statusTextSpan) return;

      const now = new Date();
      const day = now.getDay();
      let isTodayOpen = (day !== 0); // Pazar kapalı
      let closeHour = (day === 5 || day === 6) ? 23 : 22;

      if (lang === 'en') {
        if (!isClosed) {
          statusTextSpan.innerHTML = `We Are Open <small>(Closes ${closeHour}:00)</small>`;
        } else {
          const subtext = !isTodayOpen ? 'Closed on Sundays' : `Opens at 10:00`;
          statusTextSpan.innerHTML = `We Are Closed <small>(${subtext})</small>`;
        }
      } else {
        if (!isClosed) {
          statusTextSpan.innerHTML = `Şu An Açığız <small>(Kapanış ${closeHour}:00)</small>`;
        } else {
          const subtext = !isTodayOpen ? 'Pazar Günleri Kapalıyız' : 'Açılış 10:00';
          statusTextSpan.innerHTML = `Şu An Kapalıyız <small>(${subtext})</small>`;
        }
      }
    });
  }

  function updateAtmosphereBtnTranslation(lang) {
    const toggleBtn = document.getElementById('atmosphereToggleBtn');
    if (toggleBtn) {
      const isDay = document.body.classList.contains('day-atmosphere');
      const span = toggleBtn.querySelector('span');
      if (span) {
        if (lang === 'en') {
          span.textContent = isDay ? 'Historic Antep Day' : 'Oak Charcoal Night';
        } else {
          span.textContent = isDay ? 'Tarihi Antep Gündüzü' : 'Meşe Kömürü Akşamı';
        }
      }
    }
  }

  // Global erişim için fonksiyonları pencere kapsamına atayalım (E.g. translations dictionary tarafından çağrılabilir)
  window.initLanguageSystem = initLanguageSystem;
  window.updateAtmosphereBtnTranslation = updateAtmosphereBtnTranslation;
});