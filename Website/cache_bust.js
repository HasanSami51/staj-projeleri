const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const files = ['index.html', 'menu.html', 'galeri.html', 'hakkimizda.html', 'iletisim.html', 'rezervasyon.html'];

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace style.css or style.css?v=X with style.css?v=16
  html = html.replace(/style\.css(\?v=\d+)?/g, 'style.css?v=16');
  // Also replace main.js or main.js?v=X with main.js?v=20
  html = html.replace(/main\.js(\?v=\d+)?/g, 'main.js?v=20');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Cache busted for: ${file}`);
});
