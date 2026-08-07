const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

const inputVideo = path.join(__dirname, '../Website/public/images/video(2).mp4');
const outputVideo = path.join(__dirname, '../Website/public/images/day-video.mp4');

console.log('🚀 video(2).mp4 Ocağı Sıfırlayıp Sadece Duman Kısmı 4K Yapılıyor...');

// Ocağı tamamen yok etmek için sadece dumanın olduğu tavan/duman bölgesine odaklanıp kırpma (crop)
const filter = 'crop=in_w*0.55:in_h*0.45:in_w*0.22:in_h*0.50,scale=3840:2160:flags=lanczos,unsharp=5:5:0.8:5:5:0.0';
const cmd = `"${ffmpegPath}" -y -i "${inputVideo}" -vf "${filter}" -c:v libx264 -crf 15 -preset medium -movflags +faststart "${outputVideo}"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('✅ Ocaksız, Sadece Saf Duman İçeren 4K day-video.mp4 Oluşturuldu!');
} catch (err) {
  console.error('❌ Hata:', err.message);
}
