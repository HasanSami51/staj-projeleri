const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

const inputVideo = path.join(__dirname, '../Website/public/images/video(2).mp4');
const outputVideo = path.join(__dirname, '../Website/public/images/day-video.mp4');

console.log('🚀 Gündüz Sefası İçin Kesintisiz (Seamless Boomerang) 4K Duman Videosu Üretiliyor...');

// 1. Taş kemeri ve dumanı kırpma (%45)
// 2. İleri-geri kesintisiz sonsuz döngü (reverse boomerang) filtresi
const filter = '[0:v]crop=in_w:in_h*0.45:0:0,scale=3840:2160:flags=lanczos[v1];[v1]split[main][tmp];[tmp]reverse[rev];[main][rev]concat=n=2:v=1:a=0[outv]';

const cmd = `"${ffmpegPath}" -y -i "${inputVideo}" -filter_complex "${filter}" -map "[outv]" -c:v libx264 -crf 16 -preset medium -movflags +faststart "${outputVideo}"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('✅ Kesintisiz (Sonsuz Döngülü, Atlamasız) 4K day-video.mp4 Başarıyla Oluşturuldu!');
} catch (err) {
  console.error('❌ Hata:', err.message);
}
