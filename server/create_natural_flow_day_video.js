const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

const inputVideo = path.join(__dirname, '../Website/public/images/video(2).mp4');
const outputVideo = path.join(__dirname, '../Website/public/images/day-video.mp4');

console.log('🚀 Gündüz Sefası İçin Doğal 10-Saniyelik Akıcı 4K Duman Videosu Üretiliyor...');

// Geri sarmayı tamamen kaldırıp, orijinal 10 saniyelik videonun ateşsiz üst kısmını (%45) doğal akışında 4K yapma
const filter = 'crop=in_w:in_h*0.45:0:0,scale=3840:2160:flags=lanczos,unsharp=5:5:0.8:5:5:0.0';
const cmd = `"${ffmpegPath}" -y -i "${inputVideo}" -vf "${filter}" -c:v libx264 -crf 15 -preset medium -movflags +faststart "${outputVideo}"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('✅ Geri Sarmasız, %100 Doğal Akışlı 4K day-video.mp4 Başarıyla Oluşturuldu!');
} catch (err) {
  console.error('❌ Hata:', err.message);
}
