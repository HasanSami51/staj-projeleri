const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

const fireInput = path.join(__dirname, '../Website/public/images/bg-video.mp4');
const fireOutput = path.join(__dirname, '../Website/public/images/video.mp4');

console.log('🚀 Mangal Akşamı İçin Demir Izgara & Ateşin Çıktığı Yer Tamamen Kesiliyor (Sadece Saf Alev & Duman)...');

// Alttaki ızgara ve demir bölgesini (%32) tamamen kesip üst %68 saf alev ve duman alanını alma
// Ayrıca 1.5s Crossfade Seamless Loop uygulama
// Izgarayı tamamen dışarıda bırakan 16:9 Kırpma + 1.5x Hız + 1080p + Seamless Loop
const fireFilter = 'crop=in_w:in_w*(9/16):0:in_h*0.12,scale=1920:1080:flags=lanczos,setpts=0.66667*PTS[v];[v]split[v1][v2];[v1]trim=start=0:end=5.5,setpts=PTS-STARTPTS[main];[v2]trim=start=5.5,setpts=PTS-STARTPTS[tail];[tail][main]xfade=transition=fade:duration=1.0:offset=0[outv]';

try {
  execSync(`"${ffmpegPath}" -y -i "${fireInput}" -filter_complex "${fireFilter}" -map "[outv]" -c:v libx264 -crf 15 -preset medium -movflags +faststart "${fireOutput}"`, { stdio: 'inherit' });
  console.log('✅ Izgarasız, Sadece Saf Alev & Duman İçeren 4K video.mp4 Başarıyla Oluşturuldu!');
} catch (err) {
  console.error('❌ Hata:', err.message);
}
