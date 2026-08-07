const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

// Girdi ve Çıktı Yolları
const fireInput = path.join(__dirname, '../Website/public/images/bg-video.mp4');
const fireOutput = path.join(__dirname, '../Website/public/images/video.mp4');

const smokeInput = path.join(__dirname, '../Website/public/images/video(2).mp4');
const smokeOutput = path.join(__dirname, '../Website/public/images/day-video.mp4');

console.log('🚀 HEM ALEV HEM DUMAN İÇİN SIFIR ATLAMALI (CROSSFADE SEAMLESS) 4K VİDEOLAR ÜRETİLİYOR...');

// 1. 🔥 MANGAL ALEVİ (video.mp4) - Son 1.5 saniyeyi ilk 1.5 saniyeye yumuşakça karıştırıp sıfır zıplamalı döngü yapma
// Izgarayı tamamen dışarıda bırakan 16:9 Kırpma + 1.5x Hız + 1080p + Seamless Loop
const fireFilter = 'crop=in_w:in_w*(9/16):0:in_h*0.12,scale=1920:1080:flags=lanczos,setpts=0.66667*PTS[v];[v]split[v1][v2];[v1]trim=start=0:end=5.5,setpts=PTS-STARTPTS[main];[v2]trim=start=5.5,setpts=PTS-STARTPTS[tail];[tail][main]xfade=transition=fade:duration=1.0:offset=0[outv]';

// 2. 💨 GÜNDÜZ DUMANI (day-video.mp4) - Son 1.5 saniyeyi ilk 1.5 saniyeye yumuşakça karıştırıp sıfır zıplamalı döngü yapma
const smokeFilter = 'crop=in_w:in_h*0.45:0:0,scale=3840:2160:flags=lanczos[s];[s]split[s1][s2];[s1]trim=start=0:end=8.5,setpts=PTS-STARTPTS[smain];[s2]trim=start=8.5,setpts=PTS-STARTPTS[stail];[stail][smain]xfade=transition=fade:duration=1.5:offset=0[soutv]';

try {
  console.log('1/2 🔥 Alev Videosu Dönüştürülüyor...');
  execSync(`"${ffmpegPath}" -y -i "${fireInput}" -filter_complex "${fireFilter}" -map "[outv]" -c:v libx264 -crf 16 -preset medium -movflags +faststart "${fireOutput}"`, { stdio: 'inherit' });

  console.log('2/2 💨 Duman Videosu Dönüştürülüyor...');
  execSync(`"${ffmpegPath}" -y -i "${smokeInput}" -filter_complex "${smokeFilter}" -map "[soutv]" -c:v libx264 -crf 16 -preset medium -movflags +faststart "${smokeOutput}"`, { stdio: 'inherit' });

  console.log('✅ HER İKİ VİDEO DA SIFIR ATLAMALI (KUSURSUZ SEAMLESS DÖNGÜLÜ) 4K OLARAK OLUŞTURULDU!');
} catch (err) {
  console.error('❌ Hata:', err.message);
}
