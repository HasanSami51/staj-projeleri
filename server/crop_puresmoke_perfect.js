const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

const inputVideo = path.join(__dirname, '../Website/public/images/video(2).mp4');
const outputVideo = path.join(__dirname, '../Website/public/images/day-video.mp4');

console.log('🚀 Taş Ocak Tamamen Kesilip Sadece Saf Duman Bölgesi 4K Yapılıyor...');

// Üstteki taş kemer ocağı tamamen kesmek için 35% dikey ofsetten %48 yükseklikteki duman bölgesini alma
const filter = 'crop=in_w:in_h*0.48:0:in_h*0.35,scale=3840:2160:flags=lanczos,unsharp=5:5:0.8:5:5:0.0';
const cmd = `"${ffmpegPath}" -y -i "${inputVideo}" -vf "${filter}" -c:v libx264 -crf 15 -preset medium -movflags +faststart "${outputVideo}"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('✅ Taş Ocaksız, Sadece Saf Duman İçeren 4K day-video.mp4 Başarıyla Oluşturuldu!');
} catch (err) {
  console.error('❌ Hata:', err.message);
}
