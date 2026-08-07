const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

const inputVideo = path.join(__dirname, '../Website/public/images/bg-video.mp4');
const outputVideo = path.join(__dirname, '../Website/public/images/video.mp4');

console.log('🚀 Alt Izgara ve Yıldız Kesilip Sadece Alevler 4K Yükseltiliyor...');

// Crop bottom 22% (metal grill & watermark star), scale top 78% to 3840x2160 4K
const filter = 'crop=in_w:in_h*0.78:0:0,scale=3840:2160:flags=lanczos,unsharp=5:5:0.8:5:5:0.0';
const cmd = `"${ffmpegPath}" -y -i "${inputVideo}" -vf "${filter}" -c:v libx264 -crf 15 -preset medium -movflags +faststart "${outputVideo}"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('✅ Sadece Alev & Duman İçeren 4K Video Başarıyla Üretildi!');
} catch (err) {
  console.error('❌ Hata:', err.message);
}
