const http = require('http');

const BASE_URL = 'http://localhost:3000';
let adminCookie = '';

// Helper function for HTTP requests
function request(url, method = 'GET', data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 80,
      path: parsedUrl.pathname + parsedUrl.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (adminCookie) {
      options.headers['Cookie'] = adminCookie;
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        // Extract Set-Cookie header if present
        const setCookie = res.headers['set-cookie'];
        if (setCookie) {
          adminCookie = setCookie.map(c => c.split(';')[0]).join('; ');
        }

        try {
          const json = body ? JSON.parse(body) : null;
          resolve({ statusCode: res.statusCode, headers: res.headers, body: json });
        } catch (e) {
          resolve({ statusCode: res.statusCode, headers: res.headers, body });
        }
      });
    });

    req.on('error', (e) => reject(e));

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🤖 BAŞLIYOR: 1932 Lezzet Mührü Entegrasyon Senaryo Testleri\n');

  let testReservationId = null;
  let testProductId = null;
  const testPhone = '05991112233';

  try {
    // ==========================================
    // 📅 SENARYO 1: Müşteri Rezervasyon Yapar
    // ==========================================
    console.log('Step 1: Müşteri rezervasyon yapıyor...');
    const resPost = await request(`${BASE_URL}/api/rezervasyon`, 'POST', {
      name: 'Test Kullanıcı',
      phone: testPhone,
      date: '2026-09-17', // Gelecekte bir tarih (Perşembe)
      time: '18:30',
      guests: '4',
      area: 'İç Mekan',
      notes: 'Test notu'
    });

    if (resPost.statusCode !== 201 || !resPost.body.success) {
      throw new Error(`Masa rezervasyonu yapılamadı! Status: ${resPost.statusCode}, Response: ${JSON.stringify(resPost.body)}`);
    }

    testReservationId = resPost.body.data.id;
    console.log(`✅ Rezervasyon başarıyla yapıldı. ID: ${testReservationId}\n`);

    // ==========================================
    // 🔑 Admin Giriş Yapar
    // ==========================================
    console.log('Step 2: Admin giriş yapıyor...');
    const loginRes = await request(`${BASE_URL}/api/admin/login`, 'POST', {
      username: 'admin',
      password: 'admin1932'
    });

    if (loginRes.statusCode !== 200 || !loginRes.body.success) {
      throw new Error(`Admin girişi başarısız! Status: ${loginRes.statusCode}, Response: ${JSON.stringify(loginRes.body)}`);
    }
    console.log('✅ Admin girişi başarılı. Session Cookie alındı.\n');

    // ==========================================
    // 📊 Admin Rezervasyonu Panelde Görür
    // ==========================================
    console.log('Step 3: Admin rezervasyonları listeliyor...');
    const listRes = await request(`${BASE_URL}/api/rezervasyonlar`, 'GET');
    
    if (listRes.statusCode !== 200 || !listRes.body.success) {
      throw new Error(`Admin rezervasyonları çekemedi! Status: ${listRes.statusCode}`);
    }

    const foundRes = listRes.body.data.find(r => r.id === testReservationId);
    if (!foundRes) {
      throw new Error(`Oluşturulan rezervasyon (ID: ${testReservationId}) listede bulunamadı!`);
    }
    console.log(`✅ Rezervasyon admin panelinde görüldü. Durum: ${foundRes.durum}\n`);

    // ==========================================
    // ✍️ Admin Rezervasyonu Onaylar
    // ==========================================
    console.log('Step 4: Admin rezervasyonu onaylıyor...');
    const approveRes = await request(`${BASE_URL}/api/rezervasyonlar/durum/${testReservationId}`, 'POST', {
      durum: 'Onaylandı'
    });

    if (approveRes.statusCode !== 200 || !approveRes.body.success) {
      throw new Error(`Rezervasyon onaylanamadı! Status: ${approveRes.statusCode}`);
    }
    console.log('✅ Rezervasyon admin tarafından onaylandı.\n');

    // ==========================================
    // 🔍 Müşteri Rezervasyonunu Sorgular
    // ==========================================
    console.log('Step 5: Müşteri rezervasyon durumunu sorguluyor...');
    const queryRes = await request(`${BASE_URL}/api/rezervasyon-sorgula?telefon=${testPhone}`, 'GET');
    
    if (queryRes.statusCode !== 200 || !queryRes.body.success) {
      throw new Error(`Müşteri rezervasyon sorgulayamadı! Status: ${queryRes.statusCode}`);
    }

    if (queryRes.body.data.durum !== 'Onaylandı') {
      throw new Error(`Beklenen durum 'Onaylandı' ama gelen durum: '${queryRes.body.data.durum}'`);
    }
    console.log('✅ Müşteri sorgulamada rezervasyon durumunun "Onaylandı" olduğunu gördü!\n');

    // ==========================================
    // 🧪 Hata Doğrulamaları: Rezervasyon Güncelleme (PUT) Validasyon Testleri
    // ==========================================
    console.log('Step 5b: Rezervasyon güncelleme (PUT) validasyonları test ediliyor...');
    
    // Test 1: Geçersiz kişi sayısı (50) gönderiliyor (Hata vermeli: 400)
    const putInvalidGuests = await request(`${BASE_URL}/api/rezervasyon/${testReservationId}`, 'PUT', {
      name: 'Test Kullanıcı',
      phone: testPhone,
      date: '2026-09-17',
      time: '18:30',
      guests: '50',
      area: 'Geleneksel Odun Ateşi Katı'
    });
    if (putInvalidGuests.statusCode !== 400) {
      throw new Error(`Hata Verilmeliydi! 50 kişi sayısı için status: ${putInvalidGuests.statusCode} (400 olmalıydı)`);
    }
    console.log('✅ Geçersiz kişi sayısı (50) başarıyla reddedildi.');

    // Test 2: Pazar günü tarihi gönderiliyor (Hata vermeli: 400)
    const putSunday = await request(`${BASE_URL}/api/rezervasyon/${testReservationId}`, 'PUT', {
      name: 'Test Kullanıcı',
      phone: testPhone,
      date: '2026-09-20', // Pazar
      time: '18:30',
      guests: '4',
      area: 'Geleneksel Odun Ateşi Katı'
    });
    if (putSunday.statusCode !== 400) {
      throw new Error(`Hata Verilmeliydi! Pazar günü güncellemesi için status: ${putSunday.statusCode} (400 olmalıydı)`);
    }
    console.log('✅ Pazar günü rezervasyon güncellemesi başarıyla reddedildi.');

    // Test 3: İç Mekan Bölgesi seçiliyor (Yeni Eklenen Seçenek - Başarılı olmalı: 200)
    const putIndoor = await request(`${BASE_URL}/api/rezervasyon/${testReservationId}`, 'PUT', {
      name: 'Test Kullanıcı',
      phone: testPhone,
      date: '2026-09-17',
      time: '18:30',
      guests: '4',
      area: 'İç Mekan',
      notes: 'Test güncellemesi'
    });
    if (putIndoor.statusCode !== 200 || !putIndoor.body.success) {
      throw new Error(`İç Mekan rezervasyon güncellemesi başarısız! Status: ${putIndoor.statusCode}, Response: ${JSON.stringify(putIndoor.body)}`);
    }
    console.log('✅ İç Mekan bölgesiyle rezervasyon güncellemesi başarıyla tamamlandı.\n');

    // ==========================================
    // 🍔 SENARYO 2: Admin Yeni Yemek Ekler
    // ==========================================
    console.log('Step 6: Admin yeni bir yemek ekliyor...');
    const addFoodRes = await request(`${BASE_URL}/api/admin/urun`, 'POST', {
      kategori_id: 2, // Kebaplar
      ad: 'Eşsiz Test Kebabı',
      aciklama: 'Test amaçlı eklenmiş özel kebap.',
      fiyat: 450,
      resim: 'test_resim.jpg',
      one_cikan: 1,
      sefin_onerisi: 1,
      vejetaryen: 0
    });

    if (addFoodRes.statusCode !== 200 || !addFoodRes.body.success) {
      throw new Error(`Yemek eklenemedi! Status: ${addFoodRes.statusCode}, Response: ${JSON.stringify(addFoodRes.body)}`);
    }

    testProductId = addFoodRes.body.id;
    console.log(`✅ Yeni yemek başarıyla eklendi. ID: ${testProductId}\n`);

    // ==========================================
    // 🍽️ Müşteri Menüsünde Yemek Anında Görünür
    // ==========================================
    console.log('Step 7: Müşteri menü listesini çekiyor...');
    const menuRes = await request(`${BASE_URL}/api/menu`, 'GET');

    if (menuRes.statusCode !== 200 || !menuRes.body.success) {
      throw new Error(`Müşteri menüyü çekemedi! Status: ${menuRes.statusCode}`);
    }

    const foundFood = menuRes.body.data.find(f => f.id === testProductId);
    if (!foundFood) {
      throw new Error(`Yeni eklenen yemek (ID: ${testProductId}) müşteri menüsünde bulunamadı!`);
    }
    console.log(`✅ Yeni yemek müşteri menüsünde başarıyla görüldü! Yemek Adı: ${foundFood.ad}\n`);

    console.log('🎉 TÜM TEST SENARYOLARI BAŞARIYLA TAMAMLANDI! 🚀');

  } catch (error) {
    console.error('❌ TEST BAŞARISIZ:', error.message);
  } finally {
    // ==========================================
    // 🧹 Temizlik: Eklenen Test Verilerini Sil
    // ==========================================
    console.log('\n🧹 Temizlik işlemi başlatılıyor...');

    if (testProductId) {
      console.log(`- Test yemeği siliniyor (ID: ${testProductId})...`);
      await request(`${BASE_URL}/api/admin/urun/${testProductId}`, 'DELETE');
    }

    if (testReservationId) {
      console.log(`- Test rezervasyonu siliniyor (ID: ${testReservationId})...`);
      await request(`${BASE_URL}/api/rezervasyonlar/${testReservationId}`, 'DELETE');
    }

    console.log('🧹 Temizlik tamamlandı.\n');
  }
}

runTests();
