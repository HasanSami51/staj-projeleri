const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ffmpegPath = require('ffmpeg-static');

const inputVideo = path.join(__dirname, '../Website/public/images/video.mp4');
const outputVideo = path.join(__dirname, '../Website/public/images/video_4k_converted.mp4');

console.log('🚀 Video 4K (3840x2160) Çözünürlüğüne Yükseltiliyor (Upscaling)...');
console.log('FFmpeg Path:', ffmpegPath);

const cmd = `"${ffmpegPath}" -y -i "${inputVideo}" -vf "scale=3840:2160:flags=lanczos,unsharp=5:5:0.8:5:5:0.0" -c:v libx264 -crf 16 -preset medium -movflags +faststart "${outputVideo}"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('✅ 4K Yükseltme Tamamlandı!');

  // Replace video.mp4 with video_4k_converted.mp4
  fs.copyFileSync(outputVideo, inputVideo);
  console.log('🎉 public/images/video.mp4 dosyası gerçek 4K sürümle yenilendi!');
} catch (err) {
  console.error('❌ Hata oluştu:', err.message);
}
