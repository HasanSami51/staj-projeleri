// ==========================================
// LEZZET MÜHRÜ - EKSİKSİZ VE HATASIZ MAIN.JS
// ==========================================

// --- YEMEK VERİLERİ (MENU) ---
const yemekler = [
  { id: 35, ad: "Geleneksel Süzme Mercimek Çorbası", kategori: "corba", fiyat: 200, aciklama: "Taş değirmen mercimeği, taze tereyağı ve özel baharatlı kıtır ekmekler ile.", resim: "../public/images/mercimek-corbasi.webp", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 36, ad: "Köz Patlıcanlı Süt Çorbası", kategori: "corba", fiyat: 220, aciklama: "Odun ateşinde közlenmiş patlıcanların süt ve taze otlarla pişirilmesiyle hazırlanan 1930'lar klasiği.", resim: "../public/images/patlican-corbasi.webp", oneCikan: false, sefinOnerisi: true, vejetaryen: true },
  { id: 37, ad: "Mahluta Çorbası", kategori: "corba", fiyat: 210, aciklama: "Kırmızı mercimek, kişniş, kimyon ve zeytinyağında sotelenmiş soğan sosuyla Güneydoğu'nun kadim çorbası.", resim: "../public/images/mahluta.webp", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 38, ad: "Süzme Ezogelin Çorbası", kategori: "corba", fiyat: 200, aciklama: "İnce bulgur, pirinç ve domates salçasıyla harmanlanmış, nane yağlı geleneksel lezzet.", resim: "../public/images/ezogelin.webp", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 39, ad: "Düğün Çorbası ", kategori: "corba", fiyat: 230, aciklama: "Yoğurt, yumurta sarısı ve un meyhanesiyle bağlanan, üzeri pul biberli kızgın tereyağlı süzme çorba.", resim: "../public/images/dugun-corbasi.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 1, ad: "Meşhur Adana Kebap", kategori: "kebap", fiyat: 350, aciklama: "İnce ince zırhlanmış kıyma ve leziz baharatlarla önünüzde", resim: "../public/images/Adana-Kebab.jpg", oneCikan: true, sefinOnerisi: true, vejetaryen: false },
  { id: 4, ad: "Geleneksel Urfa Kebap", kategori: "kebap", fiyat: 340, aciklama: "Zırh kıymasından acısız lezzet, közlenmiş domates ve biber eşliğinde", resim: "../public/images/urfa-kebap.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 5, ad: "Sarma Beyti Kebap", kategori: "kebap", fiyat: 380, aciklama: "Özel lavaşa sarılı zırh kıyması, süzme yoğurt ve tereyağlı domates sosuyla", resim: "../public/images/beyti.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 6, ad: "Ali Nazik Kebabı", kategori: "kebap", fiyat: 400, aciklama: "Közlenmiş patlıcanlı süzme yoğurt yatağında lokum gibi zırh kebabı", resim: "../public/images/alinazik.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 7, ad: "Antep Fıstıklı Kebap", kategori: "kebap", fiyat: 390, aciklama: "Özel kıyma harcına harmanlanmış bol taze Antep fıstığı ile", resim: "../public/images/fistikli-kebap.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 3, ad: "Kuşbaşılı Kaşarlı Pide", kategori: "pide", fiyat: 280, aciklama: "Ağızda sünen eti yumuşacık, güzel mi güzel kuşbaşılı kaşarlı pidemiz", resim: "../public/images/pide.jpg", oneCikan: true, sefinOnerisi: false, vejetaryen: false },
  { id: 8, ad: "Çıtır Kıymalı Pide", kategori: "pide", fiyat: 250, aciklama: "Özel kavrulmuş kıymalı harç, domates, biber ve çıtır kenarlar", resim: "../public/images/kiymali-pide.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 9, ad: "Kavurmalı Kaşarlı Pide", kategori: "pide", fiyat: 310, aciklama: "Geleneksel dana kavurma ve uzayan kaşar peynirinin muazzam uyumu", resim: "../public/images/kavurmali-pide.jpg", oneCikan: false, sefinOnerisi: true, vejetaryen: false },
  { id: 10, ad: "Taş Fırında Peynirli & Otlu Ege Pidesi", kategori: "pide", fiyat: 310, aciklama: "Lor peyniri, ısırgan otu, maydanoz ve zeytinyağı harcıyla odun fırınından çıkan geleneksel kıtır pide.", resim: "../public/images/ege-pidesi.jpg", oneCikan: false, sefinOnerisi: true, vejetaryen: true },
  { id: 11, ad: "Kasap Sucuklu Pide", kategori: "pide", fiyat: 270, aciklama: "%100 dana kasap sucuğu ve bol kaşar peyniriyle", resim: "../public/images/sucuklu-pide.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 12, ad: "Trabzon Yağlı Pidesi", kategori: "pide", fiyat: 290, aciklama: "Yerel kolot peyniri, ortasına köy yumurtası ve has tereyağı ile", resim: "../public/images/trabzon-pide.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 13, ad: "Terbiye Kuzu Şiş", kategori: "kebap", fiyat: 390, aciklama: "Süt kuzusundan özel marine edilmiş, meşe kömüründe pişen lokum etler", resim: "../public/images/kuzu-sis.jpeg", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 14, ad: "Meşhur Çöp Şiş", kategori: "kebap", fiyat: 370, aciklama: "Küçük kesim kuzu etleri ve kuyruk yağının kekiğe doyduğu lezzet", resim: "../public/images/cop-sis.webp", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 15, ad: "Lokum Tavuk Şiş", kategori: "kebap", fiyat: 260, aciklama: "Süt ve özel baharatlarla marine edilmiş yumuşacık tavuk eti", resim: "../public/images/tavuk-sis.webp", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 16, ad: "Antep Usulü Ciğer Şiş", kategori: "kebap", fiyat: 340, aciklama: "Taze kuzu ciğeri ve kuyruk yağı, kimyon ve sumaklı soğan eşliğinde", resim: "../public/images/ciger-sis.jpg", oneCikan: false, sefinOnerisi: true, vejetaryen: false },
  { id: 2, ad: "Çıtır Lahmacun", kategori: "pide", fiyat: 150, aciklama: "Kıymayı, domatesi, soğanı mükemmel derecede pişen ağızda dağılan mükemmel bir lezzet", resim: "../public/images/lahmacun.jpg", oneCikan: true, sefinOnerisi: false, vejetaryen: false },
  { id: 17, ad: "Fındık Lahmacun (3'lü)", kategori: "pide", fiyat: 180, aciklama: "Özel baharatlı harcı ve çıtır hamuruyla geleneksel mini atıştırmalık", resim: "../public/images/findik-lahmacun.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: false },
  { id: 18, ad: "Antep Usulü Sarımsaklı Lahmacun", kategori: "pide", fiyat: 170, aciklama: "Zırh kıyması, bol taze sarımsak, maydanoz ve nar ekşisinin çıtır hamurla buluşması", resim: "../public/images/sarimsakli-lahmacun.jpg", oneCikan: false, sefinOnerisi: true, vejetaryen: false },
  { id: 40, ad: "Zeytinyağlı Enginar Dolması", kategori: "zeytinyagli", fiyat: 340, aciklama: "Osmanlı saray mutfağından günümüze; dereotu, dolmalık fıstık ve kuş üzümlü iç pilavla doldurulmuş Ege enginarı.", resim: "../public/images/enginar.jpg", oneCikan: false, sefinOnerisi: true, vejetaryen: true },
  { id: 41, ad: "Kuru Patlıcan ve Biber Dolması", kategori: "zeytinyagli", fiyat: 320, aciklama: "Antep usulü yazdan kurutulmuş sebzelerin nar ekşili, sumaklı ve bol baharatlı pirinç harcıyla demlenmesi.", resim: "../public/images/kuru-dolma.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 42, ad: "Müceddere Pilavı & Süzme Yoğurt", kategori: "zeytinyagli", fiyat: 290, aciklama: "Orta Doğu ve Doğu Anadolu mutfağının asırlık lezzeti; yeşil mercimek, karamelize soğan ve baharatlı bulgur.", resim: "../public/images/muceddere.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 19, ad: "Gavurdağı Salatası", kategori: "zeytinyagli", fiyat: 140, aciklama: "İnce kıyılmış domates, salatalık, bol ceviz, nar ekşisi ve sızma zeytinyağı ile", resim: "../public/images/gavurdagi.webp", oneCikan: false, sefinOnerisi: true, vejetaryen: true },
  { id: 20, ad: "Acılı Ezme Salata", kategori: "zeytinyagli", fiyat: 120, aciklama: "Taze domates, biber, sarımsak, maydanoz ve özel baharatlarla harmanlanmış acı lezzet", resim: "../public/images/acili-ezme.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 21, ad: "Klasik Çoban Salatası", kategori: "zeytinyagli", fiyat: 110, aciklama: "Küp doğranmış domates, salatalık, sivri biber, kuru soğan, limon ve zeytinyağı sosuyla", resim: "../public/images/coban-salata.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 22, ad: "Tulum Peynirli Roka Salatası", kategori: "zeytinyagli", fiyat: 150, aciklama: "Taze körpe roka yaprakları, Erzincan tulum peyniri, ceviz ve nar ekşisi eşliğinde", resim: "../public/images/roka-salata.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 23, ad: "Urfa Usulü Bostana", kategori: "zeytinyagli", fiyat: 130, aciklama: "Zar gibi incecik kıyılmış sebzeler, buzlu soğuk sunumu ve bol sumak ekşisiyle", resim: "../public/images/bostana.webp", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 24, ad: "Fıstıklı Künefe", kategori: "tatli", fiyat: 160, aciklama: "Özel Hatay peyniri, çıtır kadayıf ve bol Antep fıstığı ile sıcacık", resim: "../public/images/kunefe.png", oneCikan: false, sefinOnerisi: true, vejetaryen: true },
  { id: 25, ad: "Havuç Dilim Baklava", kategori: "tatli", fiyat: 180, aciklama: "İncecik yufkalar, bol fıstık ile karşınızda", resim: "../public/images/havuc-dilim.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 26, ad: "Geleneksel Katmer", kategori: "tatli", fiyat: 190, aciklama: "Zar gibi açılmış hamur içerisinde kaymak ve taze çekilmiş Antep fıstığı", resim: "../public/images/katmer.webp", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 27, ad: "Fırın Sütlaç", kategori: "tatli", fiyat: 110, aciklama: "Toprak güveçte nar gibi kızarmış geleneksel lezzet", resim: "../public/images/sutlac.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 28, ad: "Dondurmalı İrmik Helvası", kategori: "tatli", fiyat: 120, aciklama: "Tereyağında kavrulmuş sıcak irmik helvası ortasında keçi sütlü dondurma ile", resim: "../public/images/irmik.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 29, ad: "Köpüklü Yayık Ayranı", kategori: "icecek", fiyat: 50, aciklama: "Bakır maşrapada servis edilen, köy yoğurdundan ev yapımı ayran", resim: "../public/images/ayran.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 30, ad: "Acılı / Acısız Şalgam", kategori: "icecek", fiyat: 45, aciklama: "Geleneksel Adana usulü, havuç taneleriyle servis edilen şalgam suyu", resim: "../public/images/salgam.jpeg", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 31, ad: "Ev Yapımı Limonata", kategori: "icecek", fiyat: 60, aciklama: "Taze sıkılmış limon, nane yaprakları ve az şekerli serinletici lezzet", resim: "../public/images/limonata.webp", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 32, ad: "Niğde Gazozu", kategori: "icecek", fiyat: 45, aciklama: "Ahududu aromalı, geleneksel Türk gazozu lezzeti", resim: "../public/images/gazoz.png", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 33, ad: "Türk Kahvesi", kategori: "icecek", fiyat: 60, aciklama: "Çifte kavrulmuş kahve çekirdeklerinden, lokum ve su ikramıyla", resim: "../public/images/kahve.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: true },
  { id: 34, ad: "Taze Demleme Çay", kategori: "icecek", fiyat: 25, aciklama: "İnce belli bardakta, Karadeniz'in en seçkin yapraklarından taze demleme", resim: "../public/images/cay.jpg", oneCikan: false, sefinOnerisi: false, vejetaryen: true }
];

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. MENÜ FİLTRELEME İŞLEMLERİ
  // ==========================================
  const menuGrid = document.getElementById("menu-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  if (menuGrid) {
    function yemekleriListele(Liste) {
      menuGrid.innerHTML = "";

      if (Liste.length === 0) {
        menuGrid.innerHTML = `<p class="no-match" style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; margin-top: 30px;">Bu kategoride henüz ürün bulunmamaktadır.</p>`;
        return;
      }

      Liste.forEach((yemek) => {
        const sefinOnerisiHTML = yemek.sefinOnerisi ? `<span class="badge badge-chef">⭐ Şefin Önerisi</span>` : '';
        const vejetaryenHTML = yemek.vejetaryen ? `<span class="badge badge-veg" title="Vejetaryen Dostu">🌱 Veg</span>` : '';

        const kartHTML = `
          <div class="dish-card" data-kategori="${yemek.kategori}">
            <div class="card-badges">
              ${sefinOnerisiHTML}
              ${vejetaryenHTML}
            </div>
            <div class="dish-img-container">
             <img src="${yemek.resim}" alt="${yemek.ad}" class="dish-img" loading="lazy" decoding="async">
            </div>
            <div class="dish-info">
              <h3>${yemek.ad}</h3>
              <p>${yemek.aciklama}</p>
              <span class="dish-price">₺${yemek.fiyat}</span>
            </div>
          </div>
        `;
        menuGrid.innerHTML += kartHTML;
      });
    }

    yemekleriListele(yemekler);

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        const targetBtn = e.currentTarget; 
        targetBtn.classList.add("active");

        const secilenKategori = targetBtn.dataset.kategori;

        if (secilenKategori === "tumu") {
          yemekleriListele(yemekler);
        } else {
          const filtrelenmis = yemekler.filter((yemek) => yemek.kategori === secilenKategori);
          yemekleriListele(filtrelenmis);
        }
      });
    });
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

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");
  const closeBtn = document.querySelector(".modal-close");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (modal && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        const caption = item.querySelector(".gallery-caption");

        if (img && img.src) {
          modal.classList.add("active");
          modalImg.src = img.src;
          modalImg.alt = img.alt;
          modalCaption.textContent = caption ? caption.textContent : img.alt;
          document.body.style.overflow = "hidden"; 
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
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

  // --- ADIM ADIM SIRALAMA DENETLEYİCİSİ ---
// --- ADIM ADIM SIRALAMA DENETLEYİCİSİ (SPAM FİX) ---
  function adimKontrol(hedefAdim) {
    // 1. Ad Soyad Kontrolü
    if (hedefAdim > 1 && (!resNameInput || !resNameInput.value.trim() || resNameInput.value.trim().length < 3)) {
      alert('Lütfen önce Adınızı ve Soyadınızı tam olarak giriniz.');
      if (resNameInput) resNameInput.focus();
      return false;
    }
    // 2. Telefon Kontrolü
    if (hedefAdim > 2 && (!resPhoneInput || !resPhoneInput.checkValidity())) {
      alert('Lütfen önce geçerli bir cep telefonu numarası (05XXXXXXXXX) giriniz.');
      if (resPhoneInput) resPhoneInput.focus();
      return false;
    }
    // 3. Tarih Kontrolü
    if (hedefAdim > 3 && (!customDateInput || !customDateInput.value)) {
      alert('Lütfen önce rezervasyon tarihini seçiniz.');
      // click() kaldırıldı, sonsuz döngü engellendi
      return false;
    }
    // 4. Saat Kontrolü
    if (hedefAdim > 4 && (!customTimeInput || !customTimeInput.value)) {
      alert('Lütfen önce rezervasyon saatini seçiniz.');
      // click() kaldırıldı, sonsuz döngü engellendi
      return false;
    }
    // 5. Kişi Sayısı Kontrolü
    if (hedefAdim > 5 && (!resGuestsInput || !resGuestsInput.value)) {
      alert('Lütfen önce kişi sayısını giriniz.');
      if (resGuestsInput) resGuestsInput.focus();
      return false;
    }
    return true;
  }

  // --- TIKLAMA VE ODAKLANMA OYLAMALARI ---

  // Telefon alanına tıklanırsa -> Ad Soyad dolu mu?
 if (resPhoneInput) {
    resPhoneInput.addEventListener('click', () => adimKontrol(2));
  }

  // Tarih alanına tıklanırsa
  if (customDateInput && hiddenNativeDate) {
    customDateInput.addEventListener('click', () => {
      if (!adimKontrol(3)) return;
      hiddenNativeDate.showPicker();
    });

    hiddenNativeDate.addEventListener('change', (e) => {
      if (e.target.value) {
        const selectedDate = new Date(e.target.value);
        const dayOfWeek = selectedDate.getDay(); 

        if (dayOfWeek === 0) {
          alert('Restoranımız Pazar günleri kapalıdır. Lütfen başka bir gün seçiniz.');
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
      const selectedTime = e.target.value;
      if (!selectedTime) return;

      const [hours, minutes] = selectedTime.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes;
      const minMinutes = 10 * 60; 

      const selectedDateVal = hiddenNativeDate.value;
      const selectedDate = new Date(selectedDateVal);
      const dayOfWeek = selectedDate.getDay();

      const isWeekendHeader = (dayOfWeek === 5 || dayOfWeek === 6);
      const maxMinutes = isWeekendHeader ? (23 * 60) : (22 * 60);
      const maxTimeStr = isWeekendHeader ? '23:00' : '22:00';

      if (totalMinutes < minMinutes) {
        alert(`Çalışma saatlerimiz 10:00 ile ${maxTimeStr} arasındadır. Saat 10:00 olarak ayarlandı.`);
        customTimeInput.value = '10:00';
        hiddenNativeTime.value = '10:00';
      } else if (totalMinutes > maxMinutes) {
        alert(`Seçtiğiniz günde çalışma saatlerimiz ${maxTimeStr}'a kadardır. Saat ${maxTimeStr} olarak ayarlandı.`);
        customTimeInput.value = maxTimeStr;
        hiddenNativeTime.value = maxTimeStr;
      } else {
        customTimeInput.value = selectedTime;
      }
    });
  }

  // Kişi Sayısına tıklanırsa
  if (resGuestsInput) {
    resGuestsInput.addEventListener('click', () => adimKontrol(5));
  }

  // Notlar alanına tıklanırsa
  if (resNotesInput) {
    resNotesInput.addEventListener('click', () => adimKontrol(6));
  }

  // --- FORM SUBMIT (GENEL DOĞRULAMA) ---
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const resDate = document.getElementById('resDate').value;
      const resTime = document.getElementById('resTime').value;

      if (!reservationForm.checkValidity() || !resDate || !resTime) {
        alert('Lütfen tüm zorunlu alanları doğru bir şekilde doldurunuz.');
        reservationForm.reportValidity();
        return;
      }

      const submitBtn = reservationForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Gönderiliyor...';

      setTimeout(() => {
        if (resFormAlert) {
          resFormAlert.style.display = 'flex';
          resFormAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        reservationForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        setTimeout(() => {
          if (resFormAlert) {
            resFormAlert.style.display = 'none';
          }
        }, 5000);

      }, 1500);
    });
  }

}); // <-- Hata veren eksik kapanış parantezi buradaydı, düzeltildi!