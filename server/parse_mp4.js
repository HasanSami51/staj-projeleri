const fs = require('fs');
const path = require('path');

function getMp4Details(filename) {
  const filePath = path.join(__dirname, '../Website/public/images', filename);
  if (!fs.existsSync(filePath)) return { error: 'Dosya yok' };

  const stat = fs.statSync(filePath);
  const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
  const buf = fs.readFileSync(filePath);

  let w = 0, h = 0;

  // Scan through buffer for 'stsd' box
  const stsdIdx = buf.indexOf(Buffer.from('stsd'));
  if (stsdIdx !== -1) {
    // 8 bytes stsd header, 4 bytes entry count, 4 bytes entry size, 4 bytes format (avc1/mp4v/etc)
    // At format + 24 (or stsdIdx + 32) lies width (uint16) and height (uint16)
    const formatIdx = stsdIdx + 12;
    w = buf.readUInt16BE(formatIdx + 24);
    h = buf.readUInt16BE(formatIdx + 26);
  }

  // Fallback: search for 'tkhd' and read matrix / track dimensions at end of tkhd box
  if (!w || !h) {
    const tkhdIdx = buf.indexOf(Buffer.from('tkhd'));
    if (tkhdIdx !== -1) {
      const version = buf[tkhdIdx + 4];
      const offset = version === 1 ? tkhdIdx + 88 : tkhdIdx + 76;
      w = buf.readUInt32BE(offset) >> 16;
      h = buf.readUInt32BE(offset + 4) >> 16;
    }
  }

  return {
    filename,
    sizeMB: sizeMB + ' MB',
    width: w,
    height: h,
    is4K: w >= 3800 || h >= 2100,
    isFullHD: w >= 1900 || h >= 1080,
    is720p: w >= 1200 || h >= 700
  };
}

console.log('=== VİDEO ÇÖZÜNÜRLÜK VE DOSYA BOYUTU ANALİZİ ===');
console.log('1. video.mp4  ->', getMp4Details('video.mp4'));
console.log('2. bg-video.mp4 ->', getMp4Details('bg-video.mp4'));
