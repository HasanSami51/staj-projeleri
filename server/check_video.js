const fs = require('fs');
const path = require('path');

function inspectMp4(filename) {
  const filePath = path.join(__dirname, '../Website/public/images', filename);
  if (!fs.existsSync(filePath)) {
    return { error: 'Dosya bulunamadı' };
  }
  const stats = fs.statSync(filePath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  const buf = fs.readFileSync(filePath);

  let width = 0;
  let height = 0;

  // 1. Search for 'avc1' or 'hvc1' or 'vp09' or 'mp4v'
  const codecs = ['avc1', 'hvc1', 'vp09', 'mp4v', 'av01'];
  for (const codec of codecs) {
    const idx = buf.indexOf(Buffer.from(codec));
    if (idx !== -1) {
      // Width is 32 bytes after codec header start, Height is 34 bytes
      const w = buf.readUInt16BE(idx + 32);
      const h = buf.readUInt16BE(idx + 34);
      if (w > 100 && h > 100 && w < 10000 && h < 10000) {
        width = w;
        height = h;
        break;
      }
    }
  }

  // 2. Search for 'tkhd' atom if codec box offset failed
  if (!width) {
    let pos = 0;
    while (pos < buf.length - 8) {
      if (buf.toString('ascii', pos + 4, pos + 8) === 'tkhd') {
        const ver = buf[pos + 8];
        const offset = ver === 1 ? pos + 88 : pos + 76;
        if (offset + 8 <= buf.length) {
          const w = buf.readUInt32BE(offset) >> 16;
          const h = buf.readUInt32BE(offset + 4) >> 16;
          if (w > 100 && h > 100 && w < 10000 && h < 10000) {
            width = w;
            height = h;
            break;
          }
        }
      }
      pos++;
    }
  }

  return {
    filename,
    sizeMB: sizeMB + ' MB',
    width,
    height,
    is4K: width >= 3800 || height >= 2100,
    isFullHD: width >= 1900 || height >= 1080
  };
}

console.log('VIDEO ANALİZ SONUÇLARI:');
console.log('-----------------------');
console.log('1. video.mp4:', inspectMp4('video.mp4'));
console.log('2. bg-video.mp4:', inspectMp4('bg-video.mp4'));
