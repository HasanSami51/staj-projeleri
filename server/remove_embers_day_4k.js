const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

const inputVideo = path.join(__dirname, '../Website/public/images/video(2).mp4');
const outputVideo = path.join(__dirname, '../Website/public/images/day-video.mp4');

console.log('🚀 Gündüz Sefası İçin Ocağın İçindeki Ateş Kesilip Sadece Taş Ocak & Duman 4K Yapılıyor...');

// Alttaki kızıl kor/ateş bölgesini (%28) tamamen kesip sadece üst ve orta dumanlı taş bölgeyi alma
const filter = 'crop=in_w:in_h*0.72:0:0,scale=3840:2160:flags=lanczos,unsharp=5:5:0.8:5:5:0.0';
const cmd = `"${ffmpegPath}" -y -i "${inputVideo}" -vf "${filter}" -c:v libx264 -crf 15 -preset medium -movflags +faststart "${outputVideo}"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('✅ Ateşsiz, Sadece Taş Ocak & Süzülen Duman İçeren 4K day-video.mp4 Oluşturuldu!');
} catch (err) {
  console.error('❌ Hata:', err.message);
}
