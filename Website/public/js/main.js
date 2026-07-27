const yemekler=[
{
    id: 1,
    ad: "Meşhur Adana Kebap",
    kategori: "kebap",
    fiyat: 350,
    aciklama: "İnce ince zırhlanmış kıyma ve leziz baharatlarla önünüzde",
    resim: "../public/images/Adana-Kebab.jpg",
    oneCikan: true
  },
  {
    id: 4,
    ad: "Geleneksel Urfa Kebap",
    kategori: "kebap",
    fiyat: 340,
    aciklama: "Zırh kıymasından acısız lezzet, közlenmiş domates ve biber eşliğinde",
    resim: "../public/images/urfa-kebap.jpg",
    oneCikan: false
  },
  {
    id: 5,
    ad: "Sarma Beyti Kebap",
    kategori: "kebap",
    fiyat: 380,
    aciklama: "Özel lavaşa sarılı zırh kıyması, süzme yoğurt ve tereyağlı domates sosuyla",
    resim: "../public/images/beyti.jpg",
    oneCikan: false
  },
  {
    id: 6,
    ad: "Ali Nazik Kebabı",
    kategori: "kebap",
    fiyat: 400,
    aciklama: "Közlenmiş patlıcanlı süzme yoğurt yatağında lokum gibi zırh kebabı",
    resim: "../public/images/alinazik.jpg",
    oneCikan: false
  },
  {
    id: 7,
    ad: "Antep Fıstıklı Kebap",
    kategori: "kebap",
    fiyat: 390,
    aciklama: "Özel kıyma harcına harmanlanmış bol taze Antep fıstığı ile",
    resim: "../public/images/fistikli-kebap.jpg",
    oneCikan: false
  },

 
  {
    id: 3,
    ad: "Kuşbaşılı Kaşarlı Pide",
    kategori: "pide",
    fiyat: 280,
    aciklama: "Ağızda sünen eti yumuşacık, güzel mi güzel kuşbaşılı kaşarlı pidemiz",
    resim: "../public/images/pide.jpg",
    oneCikan: true
  },
  {
    id: 8,
    ad: "Çıtır Kıymalı Pide",
    kategori: "pide",
    fiyat: 250,
    aciklama: "Özel kavrulmuş kıymalı harç, domates, biber ve çıtır kenarlar",
    resim: "../public/images/kiymali-pide.jpg",
    oneCikan: false
  },
  {
    id: 9,
    ad: "Kavurmalı Kaşarlı Pide",
    kategori: "pide",
    fiyat: 310,
    aciklama: "Geleneksel dana kavurma ve uzayan kaşar peynirinin muazzam uyumu",
    resim: "../public/images/kavurmali-pide.png",
    oneCikan: false
  },
  {
    id: 10,
    ad: "Kasap Sucuklu Pide",
    kategori: "pide",
    fiyat: 270,
    aciklama: "%100 dana kasap sucuğu ve bol kaşar peyniriyle",
    resim: "../public/images/sucuklu-pide.jpg",
    oneCikan: false
  },
  {
    id: 11,
    ad: "Trabzon Yağlı Pidesi",
    kategori: "pide",
    fiyat: 290,
    aciklama: "Yerel kolot peyniri, ortasına köy yumurtası ve has tereyağı ile",
    resim: "../public/images/trabzon-pide.jpg",
    oneCikan: false
  },

 
  {
    id: 12,
    ad: "Terbiye Kuzu Şiş",
    kategori: "sis",
    fiyat: 390,
    aciklama: "Süt kuzusundan özel marine edilmiş, meşe kömüründe pişen lokum etler",
    resim: "../public/images/kuzu-sis.jpeg",
    oneCikan: false
  },
  {
    id: 13,
    ad: "Meşhur Çöp Şiş",
    kategori: "sis",
    fiyat: 370,
    aciklama: "Küçük kesim kuzu etleri ve kuyruk yağının kekiğe doyduğu lezzet",
    resim: "../public/images/cop-sis.webp",
    oneCikan: false
  },
  {
    id: 14,
    ad: "Lokum Tavuk Şiş",
    kategori: "sis",
    fiyat: 260,
    aciklama: "Süt ve özel baharatlarla marine edilmiş yumuşacık tavuk eti",
    resim: "../public/images/tavuk-sis.webp",
    oneCikan: false
  },
  {
    id: 15,
    ad: "Antep Usulü Ciğer Şiş",
    kategori: "sis",
    fiyat: 340,
    aciklama: "Taze kuzu ciğeri ve kuyruk yağı, kimyon ve sumaklı soğan eşliğinde",
    resim: "../public/images/ciger-sis.jpg",
    oneCikan: false
  },

  {
    id: 2,
    ad: "Çıtır Lahmacun",
    kategori: "lahmacun",
    fiyat: 150,
    aciklama: "Kıymayı, domatesi, soğanı mükemmel derecede pişen ağızda dağılan boğazda kalmayan mükemmel bir lezzet",
    resim: "../public/images/lahmacun.jpg",
    oneCikan: true
  },
  {
    id: 17,
    ad: "Fındık Lahmacun (3'lü) ",
    kategori: "lahmacun",
    fiyat: 180,
    aciklama: "Özel baharatlı harcı ve çıtır hamuruyla geleneksel mini atıştırmalık",
    resim: "../public/images/findik-lahmacun.jpg",
    oneCikan: false
  },
  {
    id: 29,
    ad: "Antep Usulü Sarımsaklı Lahmacun",
    kategori: "lahmacun",
    fiyat: 170,
    aciklama: "Zırh kıyması, bol taze sarımsak, maydanoz ve nar ekşisinin çıtır hamurla muhteşem buluşması",
    resim: "../public/images/sarimsakli-lahmacun.jpg",
    oneCikan: false
  },

  
  {
    id: 30,
    ad: "Gavurdağı Salatası",
    kategori: "salata",
    fiyat: 140,
    aciklama: "İnce kıyılmış domates, salatalık, bol ceviz, nar ekşisi ve sızma zeytinyağı ile",
    resim: "../public/images/gavurdagi.webp",
    oneCikan: false
  },
  {
    id: 31,
    ad: "Acılı Ezme Salata",
    kategori: "salata",
    fiyat: 120,
    aciklama: "Taze domates, biber, sarımsak, maydanoz ve özel baharatlarla harmanlanmış acı lezzet",
    resim: "../public/images/acili-ezme.jpg",
    oneCikan: false
  },
  {
    id: 32,
    ad: "Klasik Çoban Salatası",
    kategori: "salata",
    fiyat: 110,
    aciklama: "Küp doğranmış domates, salatalık, sivri biber, kuru soğan, limon ve zeytinyağı sosuyla",
    resim: "../public/images/coban-salata.jpg",
    oneCikan: false
  },
  {
    id: 33,
    ad: "Tulum Peynirli Roka Salatası",
    kategori: "salata",
    fiyat: 150,
    aciklama: "Taze körpe roka yaprakları, Erzincan tulum peyniri, ceviz ve nar ekşisi eşliğinde",
    resim: "../public/images/roka-salata.jpg",
    oneCikan: false
  },
  {
    id: 34,
    ad: "Urfa Usulü Bostana",
    kategori: "salata",
    fiyat: 130,
    aciklama: "Zar gibi incecik kıyılmış sebzeler, buzlu soğuk sunumu ve bol sumak ekşisiyle",
    resim: "../public/images/bostana.webp",
    oneCikan: false
  },

  {
    id: 18,
    ad: "Fıstıklı Künefe",
    kategori: "tatli",
    fiyat: 160,
    aciklama: "Özel Hatay peyniri, çıtır kadayıf ve bol Antep fıstığı ile sıcacık",
    resim: "../public/images/kunefe.png",
    oneCikan: false
  },
  {
    id: 19,
    ad: "Havuç Dilim Baklava",
    kategori: "tatli",
    fiyat: 180,
    aciklama: "İncecik yufkalar, bol fıstık ve yanında kesme Maraş dondurması ile",
    resim: "../public/images/havuc-dilim.jpg",
    oneCikan: false
  },
  {
    id: 20,
    ad: "Geleneksel Katmer",
    kategori: "tatli",
    fiyat: 190,
    aciklama: "Zar gibi açılmış hamur içerisinde kaymak ve taze çekilmiş Antep fıstığı",
    resim: "../public/images/katmer.webp",
    oneCikan: false
  },
  {
    id: 21,
    ad: "Fırın Sütlaç",
    kategori: "tatli",
    fiyat: 110,
    aciklama: "Toprak güveçte nar gibi kızarmış, bol fındık kırığı eşliğinde",
    resim: "../public/images/sutlac.jpg",
    oneCikan: false
  },
  {
    id: 22,
    ad: "Dondurmalı İrmik Helvası",
    kategori: "tatli",
    fiyat: 120,
    aciklama: "Tereyağında kavrulmuş sıcak irmik helvası içinde saklı keçi sütlü dondurma",
    resim: "../public/images/irmik.jpg",
    oneCikan: false
  },

 
  {
    id: 23,
    ad: "Köpüklü Yayık Ayranı",
    kategori: "icecek",
    fiyat: 50,
    aciklama: "Bakır maşrapada servis edilen, köy yoğurdundan ev yapımı ayran",
    resim: "../public/images/ayran.jpg",
    oneCikan: false
  },
  {
    id: 24,
    ad: "Acılı / Acısız Şalgam",
    kategori: "icecek",
    fiyat: 45,
    aciklama: "Geleneksel Adana usulü, havuç taneleriyle servis edilen şalgam suyu",
    resim: "../public/images/salgam.jpeg",
    oneCikan: false
  },
  {
    id: 25,
    ad: "Ev Yapımı Limonata",
    kategori: "icecek",
    fiyat: 60,
    aciklama: "Taze sıkılmış limon, nane yaprakları ve az şekerli serinletici lezzet",
    resim: "../public/images/limonata.webp",
    oneCikan: false
  },
  {
    id: 26,
    ad: "Niğde Gazozu",
    kategori: "icecek",
    fiyat: 45,
    aciklama: "Ahududu aromalı, geleneksel Türk gazozu lezzeti",
    resim: "../public/images/gazoz.jpg",
    oneCikan: false
  },
  {
    id: 27,
    ad: "Türk Kahvesi",
    kategori: "icecek",
    fiyat: 60,
    aciklama: "Çifte kavrulmuş kahve çekirdeklerinden, lokum ve su ikramıyla",
    resim: "../public/images/kahve.jpg",
    oneCikan: false
  },
  {
    id: 28,
    ad: "Taze Demleme Çay",
    kategori: "icecek",
    fiyat: 25,
    aciklama: "İnce belli bardakta, Karadeniz'in en seçkin yapraklarından taze demleme",
    resim: "../public/images/cay.jpg",
    oneCikan: false
  }
];
document.addEventListener("DOMContentLoaded", () => {
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
    const kartHTML = `
       <div class="dish-card" data-kategori="${yemek.kategori}">
        <div class="dish-img-container">
            <img src="${yemek.resim}" alt="${yemek.ad}" class="dish-img">
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
     e.target.classList.add("active");

     const secilenKategori = e.target.dataset.kategori;
                
     if (secilenKategori === "tumu") {
             yemekleriListele(yemekler);
     } else {
        const filtrelenmis = yemekler.filter(
         (yemek) => yemek.kategori === secilenKategori  
             );
     yemekleriListele(filtrelenmis);
    }
});
 });
}
});