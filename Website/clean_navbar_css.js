const fs = require('fs');
const path = require('path');
const cssPath = 'C:/Users/ebrar/Desktop/Staj/Website/public/css/style.css';

let css = fs.readFileSync(cssPath, 'utf8');
const lines = css.split('\n');

console.log('Total lines before:', lines.length);

// Step 1: Find line 6716 (0-indexed: 6715) - the start of "YENİ ÜST KAT" or "PREMIUM NAVBAR"
// We'll keep lines 0..6714 and replace everything from 6715 onward
let cutLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (
    lines[i].includes('YENİ ÜST KAT') ||
    lines[i].includes('PREMIUM NAVBAR OVERHAUL') ||
    lines[i].includes('✨ PREMIUM NAVBAR OVERHAUL')
  ) {
    // Go back to find the /* comment block start
    cutLine = i;
    while (cutLine > 0 && !lines[cutLine].includes('/*')) cutLine--;
    break;
  }
}

if (cutLine === -1) {
  // Fallback: cut from line 6715
  cutLine = 6714;
}

console.log('Cutting from line (0-indexed):', cutLine, '→ 1-indexed:', cutLine + 1);
console.log('Sample line at cut:', lines[cutLine]);

// Step 2: Also neutralize old .main-navbar rules at lines ~291-355 (0-indexed: 290-354)
// We'll comment them out by replacing with empty space
for (let i = 290; i <= 355 && i < lines.length; i++) {
  // Keep the line but neutralize selectors that cause conflicts
  // We target: .main-nav ul/a, .main-navbar a/ul, .nav-btn, .nav-buton
  const l = lines[i];
  if (
    /^\.(main-nav|main-navbar|nav-btn|nav-buton)/.test(l.trim()) ||
    (l.includes('.main-nav') && !l.includes('main-navbar.active'))
  ) {
    lines[i] = '/* [NEUTRALIZED - see navbar section at end of file] */';
  }
}

// Step 3: Build the new clean navbar CSS
const newNavbarCSS = `
/* ================================================================
   NAVBAR — TEK TEMİZ BLOK (Tüm önceki navbar kurallarını geçersiz kılar)
   Özellik: split-nav, logo halo, altın hover çizgisi,
   scroll blur, pulsing nokta, drawer mobil menü.
   ================================================================ */

/* ── HEADER TEMEL ── */
.main-header {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: fixed;
  top: 0; left: 0; right: 0;
  width: 100%;
  z-index: 99999;
  margin: 0;
  background: rgba(14, 8, 4, 0.93);
  backdrop-filter: blur(10px) saturate(160%);
  -webkit-backdrop-filter: blur(10px) saturate(160%);
  border-bottom: 1px solid rgba(212, 175, 55, 0.18);
  box-shadow: 0 2px 18px rgba(0,0,0,0.45);
  transition: background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
}

/* Scroll blur — daha koyu cam */
.main-header.scrolled {
  background: rgba(9, 4, 2, 0.97);
  backdrop-filter: blur(22px) saturate(200%) brightness(0.82);
  -webkit-backdrop-filter: blur(22px) saturate(200%) brightness(0.82);
  box-shadow: 0 4px 30px rgba(0,0,0,0.75), 0 1px 0 rgba(212,175,55,0.22);
  border-bottom-color: rgba(212, 175, 55, 0.32);
}

/* ── TOP BAR ── */
.top-bar {
  width: 100%;
  background: rgba(8, 4, 2, 0.98);
  border-bottom: 1px solid rgba(212, 175, 55, 0.12);
  padding: 5px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.top-bar .top-bar-container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0 28px;
}

.top-bar .header-status-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
}

.top-bar .lang-selector-container {
  margin-left: auto;
  position: relative;
}

.top-bar .header-divider { display: none; }

/* ── ŞU AN AÇIĞIZ — pulsing nokta ── */
.top-bar .live-status-badge {
  font-size: 0.73rem;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 700;
  letter-spacing: 0.4px;
}

.top-bar .live-status-badge.status-open {
  background: rgba(46, 204, 113, 0.12);
  color: #27e87e;
  border: 1px solid rgba(46, 204, 113, 0.4);
  box-shadow: 0 0 10px rgba(46, 204, 113, 0.15);
}

.top-bar .live-status-badge .pulse-dot,
.top-bar .live-status-badge .pulse-dot.green {
  width: 9px;
  height: 9px;
  background: #2ecc71;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.8);
  animation: navPulseGreen 1.6s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes navPulseGreen {
  0%   { transform: scale(0.92); box-shadow: 0 0 0 0   rgba(46, 204, 113, 0.8); }
  40%  { transform: scale(1.15); box-shadow: 0 0 0 7px rgba(46, 204, 113, 0);   }
  100% { transform: scale(0.92); box-shadow: 0 0 0 0   rgba(46, 204, 113, 0);   }
}

/* ── TOP BAR BUTONLARI ── */
.top-bar .atmosphere-toggle-btn,
.top-bar .lang-toggle-btn {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(212,175,55,0.22);
  color: #e8e2d9;
  padding: 4px 10px;
  border-radius: 5px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  cursor: pointer;
  transition: all 0.22s ease;
  display: flex;
  align-items: center;
  gap: 5px;
}

.top-bar .atmosphere-toggle-btn:hover,
.top-bar .lang-toggle-btn:hover {
  background: rgba(212,175,55,0.1);
  border-color: rgba(212,175,55,0.5);
  color: #f4c842;
}

.top-bar .lang-dropdown {
  background: rgba(10,5,2,0.99);
  border: 1px solid rgba(212,175,55,0.25);
  box-shadow: 0 10px 28px rgba(0,0,0,0.85);
}

/* Day atmosphere override */
body.day-atmosphere .top-bar .atmosphere-toggle-btn,
body.day-atmosphere .top-bar .lang-toggle-btn {
  color: #ffffff;
}
body.day-atmosphere .top-bar .atmosphere-toggle-btn span,
body.day-atmosphere .top-bar .lang-toggle-btn span {
  color: #ffffff;
}

/* ── HEADER CONTAINER (SPLIT NAV ROW) ── */
.header-container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  box-sizing: border-box;
  min-height: 130px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 52px;
}

/* ── LOGO ── */
.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 8px;
  z-index: 10;
}

.logo-img {
  height: 110px;
  width: 110px;
  border-radius: 50%;
  object-fit: cover;
  border: none;
  box-shadow:
    0 0 0 2.5px rgba(212,175,55,0.32),
    0 0 13px rgba(212,175,55,0.16),
    0 6px 22px rgba(0,0,0,0.5);
  background: transparent;
  transition: box-shadow 0.32s ease, transform 0.32s ease;
}

.logo-link:hover .logo-img {
  box-shadow:
    0 0 0 3px rgba(212,175,55,0.58),
    0 0 20px rgba(212,175,55,0.28),
    0 8px 26px rgba(0,0,0,0.62);
  transform: scale(1.04);
}

.logo .brand-text-wrapper { display: none; }

/* ── SOL / SAĞ NAV KANATLAR ── */
.navbar-left,
.navbar-right {
  display: block;
  flex: 1 1 0%;
}

.navbar-left ul {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
  gap: 2.5rem;
  margin: 0;
  margin-right: 68px;
  padding: 0;
}

.navbar-right ul {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  gap: 2.5rem;
  margin: 0;
  margin-left: 68px;
  padding: 0;
}

.navbar-left ul li,
.navbar-right ul li {
  display: flex;
  align-items: center;
}

/* ── NAV LİNK STİLİ ── */
.navbar-left ul li a,
.navbar-right ul li a,
header .main-navbar ul li a,
header .main-navbar ul li a.nav-btn {
  font-size: 0.96rem;
  font-weight: 600;
  color: rgba(240,234,220,0.82);
  text-decoration: none;
  letter-spacing: 0.6px;
  transition: color 0.26s ease;
  position: relative;
  padding: 7px 0;
  background: none;
  border: none;
  border-radius: 0;
  box-shadow: none;
  display: inline-block;
  -webkit-user-select: none;
  user-select: none;
}

/* ── HOVER & AKTİF ALTIN ALT ÇİZGİ ── */
.navbar-left ul li a::after,
.navbar-right ul li a::after,
header .main-navbar ul li a::after,
header .main-navbar ul li a.nav-btn::after {
  content: '';
  position: absolute;
  bottom: 1px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #c9a227, #f4c842, #c9a227);
  border-radius: 2px;
  transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.navbar-left ul li a:hover,
.navbar-right ul li a:hover,
header .main-navbar ul li a:hover,
header .main-navbar ul li a.nav-btn:hover {
  color: #f4c842;
}

.navbar-left ul li a:hover::after,
.navbar-right ul li a:hover::after,
header .main-navbar ul li a:hover::after,
header .main-navbar ul li a.nav-btn:hover::after {
  width: 88%;
}

.navbar-left ul li a.active,
.navbar-right ul li a.active,
header .main-navbar ul li a.active,
header .main-navbar ul li a.nav-btn.active {
  color: #f4c842;
}

.navbar-left ul li a.active::after,
.navbar-right ul li a.active::after,
header .main-navbar ul li a.active::after,
header .main-navbar ul li a.nav-btn.active::after {
  width: 100%;
  box-shadow: 0 0 8px rgba(212,175,55,0.6);
}

/* ── MOBİL NAVBAR: masaüstünde gizli ── */
.mobile-navbar { display: none; }

/* ── HAMBURGEr: masaüstünde gizli ── */
.hamburger-btn {
  display: none;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(212,175,55,0.25);
  color: #f0ead8;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
}

.hamburger-btn:hover {
  background: rgba(212,175,55,0.1);
  border-color: rgba(212,175,55,0.5);
  color: #f4c842;
}

/* ── MAIN-CONTENT TOP PADDING ── */
main.main-content { margin-top: 0; }

main.main-content:not(:has(.hero-wrapper)):not(:has(.hero-section)) {
  padding-top: 168px;
}

/* ================================================================
   RESPONSIVE — TABLET ≤ 1199px
   ================================================================ */
@media (max-width: 1199px) {
  .header-container { padding: 0 34px; }
  .navbar-left ul  { gap: 1.9rem; margin-right: 56px; }
  .navbar-right ul { gap: 1.9rem; margin-left:  56px; }
}

@media (max-width: 991px) {
  .header-container { padding: 0 22px; }
  .navbar-left ul  { gap: 1.3rem; margin-right: 44px; }
  .navbar-right ul { gap: 1.3rem; margin-left:  44px; }
  .navbar-left ul li a,
  .navbar-right ul li a { font-size: 0.88rem; }
}

/* ================================================================
   RESPONSIVE — MOBİL ≤ 768px
   ================================================================ */
@media (max-width: 768px) {

  /* --- TOP BAR --- */
  .top-bar { padding: 4px 12px; }
  .top-bar .top-bar-container { padding: 0 12px; }
  .top-bar .atmosphere-toggle-btn { display: none; }
  .top-bar .lang-toggle-btn { padding: 3px 7px; font-size: 0.67rem; }
  .top-bar .live-status-badge { font-size: 0.67rem; padding: 3px 8px; }

  /* --- HEADER ROW --- */
  .header-container {
    min-height: 64px;
    padding: 8px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* Nav kanatları gizle */
  .navbar-left,
  .navbar-right { display: none; }

  /* Logo: sol hizalı, static */
  .logo {
    position: static;
    transform: none;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin: 0;
    flex: 1;
  }

  .logo-img {
    height: 46px;
    width: 46px;
    box-shadow: 0 0 0 2px rgba(212,175,55,0.28), 0 3px 10px rgba(0,0,0,0.5);
  }

  /* Hamburger: sağda */
  .hamburger-btn {
    display: flex;
    margin-left: 10px;
  }

  /* --- DRAWER MENÜ --- */
  .main-header .mobile-navbar {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(78vw, 280px);
    background: rgba(10,5,2,0.98);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-left: 1px solid rgba(212,175,55,0.18);
    box-shadow: -5px 0 30px rgba(0,0,0,0.9);
    padding: 80px 0 24px;
    z-index: 999999;
    transform: translateX(100%);
    transition: transform 0.32s cubic-bezier(0.22,1,0.36,1);
    overflow-y: auto;
    visibility: hidden;
  }

  .main-header .mobile-navbar.active {
    transform: translateX(0);
    visibility: visible;
  }

  /* Ayırıcı çizgi */
  .main-header .mobile-navbar::before {
    content: '';
    display: block;
    position: absolute;
    top: 68px;
    left: 14px; right: 14px;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(212,175,55,0.32), transparent);
  }

  /* Drawer menü linkleri */
  .main-header .mobile-navbar ul {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px 14px;
    margin: 0;
    list-style: none;
  }

  .main-header .mobile-navbar ul li a {
    display: flex;
    align-items: center;
    color: rgba(240,234,220,0.88);
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    padding: 12px 14px;
    border-radius: 7px;
    border: 1px solid transparent;
    position: relative;
    transition: background 0.2s, color 0.2s, padding-left 0.2s;
    letter-spacing: 0.3px;
    background: none;
    box-shadow: none;
  }

  /* Alt çizgi yok drawer içinde */
  .main-header .mobile-navbar ul li a::after { display: none; }

  /* Sol altın şerit */
  .main-header .mobile-navbar ul li a::before {
    content: '';
    position: absolute;
    left: 0; top: 20%; height: 60%;
    width: 0;
    border-radius: 0 2px 2px 0;
    background: #d4af37;
    transition: width 0.2s ease;
  }

  .main-header .mobile-navbar ul li a:hover,
  .main-header .mobile-navbar ul li a.active {
    background: rgba(212,175,55,0.08);
    color: #f4c842;
    border-color: rgba(212,175,55,0.13);
    padding-left: 20px;
  }

  .main-header .mobile-navbar ul li a:hover::before,
  .main-header .mobile-navbar ul li a.active::before {
    width: 3px;
  }

  /* Overlay */
  .mobile-nav-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.52);
    backdrop-filter: blur(2px);
    z-index: 99998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.28s ease;
  }

  .mobile-nav-overlay.active {
    opacity: 1;
    pointer-events: all;
  }

  /* İçerik üst boşluk */
  main.main-content:not(:has(.hero-wrapper)):not(:has(.hero-section)) {
    padding-top: 100px;
  }
}
`;

// Rebuild: keep lines 0..(cutLine-1), then append clean block
const keptLines = lines.slice(0, cutLine);
const newContent = keptLines.join('\n') + newNavbarCSS;

fs.writeFileSync(cssPath, newContent, 'utf8');
const finalLines = newContent.split('\n').length;
console.log('Done! Lines kept:', cutLine, '| Final total lines:', finalLines);
