const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

const inputVideo = path.join(__dirname, '../Website/public/images/bg-video.mp4');
const outputVideo = path.join(__dirname, '../Website/public/images/video.mp4');

console.log('🚀 Orijinal Açılı bg-video.mp4 Dosyası 4K (3840x2160) Çözünürlüğüne Yükseltiliyor...');

// FFmpeg komutu: Orijinal açıyı koruyarak 3840x2160 4K kalitesine çıkarır
const cmd = `"${ffmpegPath}" -y -i "${inputVideo}" -vf "scale=3840:2160:flags=lanczos,unsharp=5:5:0.8:5:5:0.0" -c:v libx264 -crf 15 -preset medium -movflags +faststart "${outputVideo}"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('✅ Orijinal Açılı 4K Video Başarıyla Üretildi ve Yenilendi!');
} catch (err) {
  console.error('❌ Hata:', err.message);
}
