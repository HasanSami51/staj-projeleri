const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

const inputVideo = path.join(__dirname, '../Website/public/images/video(2).mp4');
const outputVideo = path.join(__dirname, '../Website/public/images/day-video.mp4');

console.log('🚀 video(2).mp4 İçindeki Ocak Tamamen Kesilip Sadece Dumanlar 4K (3840x2160) Yapılıyor...');

// Üst %60'lık duman alanını alıp alttaki ocağı tamamen kesme ve 4K'ya yükseltme
const filter = 'crop=in_w:in_h*0.60:0:0,scale=3840:2160:flags=lanczos,unsharp=5:5:0.8:5:5:0.0';
const cmd = `"${ffmpegPath}" -y -i "${inputVideo}" -vf "${filter}" -c:v libx264 -crf 15 -preset medium -movflags +faststart "${outputVideo}"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('✅ Gündüz Sefası İçin Sadece Duman İçeren 4K Video Başarıyla Üretildi: day-video.mp4');
} catch (err) {
  console.error('❌ Hata:', err.message);
}
