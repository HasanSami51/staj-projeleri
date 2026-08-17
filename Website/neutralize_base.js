const fs = require('fs');
const cssPath = 'C:/Users/ebrar/Desktop/Staj/Website/public/css/style.css';

let css = fs.readFileSync(cssPath, 'utf8');

// Normalize line endings to LF for consistent replacement
css = css.replace(/\r\n/g, '\n');

const targetBlock = `header .main-navbar ul li a.nav-btn {
  color: #ffffff !important;
  background-color: var(--primary-kiremit) !important;
  padding: 0.55rem 1.4rem !important; 
  font-size: 1.1rem !important;      
  border-radius: 8px !important;      
  letter-spacing: 0.5px !important;
  display: inline-flex !important;
  align-items: center !important;
  transition: all 0.3s ease !important;
}

header .main-navbar ul li a.nav-btn.active {
  color: #ffffff !important;
  background-color: var(--accent-baharat) !important;
  padding: 0.55rem 1.4rem !important; 
  font-size: 1.1rem !important;      
  border-radius: 8px !important;      
  letter-spacing: 0.5px !important;
  display: inline-flex !important;
  align-items: center !important;
  border: 2px solid #ffffff !important;
  box-shadow: 0 4px 14px rgba(211, 84, 0, 0.5) !important;
}

header .main-navbar ul li a.nav-btn:hover {
  background-color: var(--accent-baharat) !important;
  color: #ffffff !important;
  transform: translateY(-2px);
}`;

if (css.includes(targetBlock)) {
  css = css.replace(targetBlock, '/* Neutralized old nav-btn overrides */');
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Success: neutralized old nav-btn base styles.');
} else {
  console.log('Error: target block not found.');
}
