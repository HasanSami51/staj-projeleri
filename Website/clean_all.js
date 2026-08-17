const fs = require('fs');
const path = require('path');
const cssPath = 'C:/Users/ebrar/Desktop/Staj/Website/public/css/style.css';

let css = fs.readFileSync(cssPath, 'utf8');

// Normalize line endings to LF for consistent matching
css = css.replace(/\r\n/g, '\n');

// Block 1: Lines 2277 to 2395 (approx)
const block1Target = `/* Mobil ve Tablet (768px ve Altı) */
@media (max-width: 768px) {
  .header-container {
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding: 10px 15px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  .logo, .nav-logo {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 10px !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .header-status-wrapper {
    display: inline-flex !important;
    align-items: center !important;
    margin-left: 4px !important;
  }
  .header-divider {
    display: none !important;
  }
  .live-status-badge {
    padding: 3px 8px !important;
    font-size: 0.68rem !important;
    border-radius: 12px !important;
  }
  .live-status-badge small {
    display: none !important;
  }

  .hamburger-btn {
    display: flex !important;
    position: relative !important;
    top: auto !important;
    right: auto !important;
    transform: none !important;
    margin: 0 !important;
    padding: 6px 10px !important;
    background: transparent !important;
    border: none !important;
    font-size: 1.8rem !important;
    color: #f39c12 !important;
    cursor: pointer !important;
    z-index: 1002 !important;
    pointer-events: auto !important;
  }
  /* Mobil Menü - HEADER MAHOĞANİ UYUMLU AKICI YAPISI */
  .main-navbar {
    position: absolute !important;
    top: 100% !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    background: linear-gradient(180deg, #241108 0%, #150904 100%) !important;
    background-color: #1a0b05 !important;
    backdrop-filter: blur(20px) saturate(200%) !important;
    -webkit-backdrop-filter: blur(20px) saturate(200%) !important;
    border-top: 1px solid rgba(243, 156, 18, 0.25) !important;
    border-bottom: 2px solid rgba(243, 156, 18, 0.4) !important;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.95) !important;
    z-index: 1000 !important;
    /* Akıcı Açılış / Kapanış */
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    pointer-events: none !important;
    visibility: hidden !important;
    transition: max-height 0.3s ease-in-out, opacity 0.25s ease-in-out, visibility 0.3s ease-in-out;
  }

  .main-navbar.active {
    max-height: 500px !important;
    opacity: 1 !important;
    pointer-events: auto !important;
    visibility: visible !important;
  }
  .main-navbar ul {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    width: 100% !important;
    padding: 15px 0 !important;
    margin: 0 !important;
    list-style: none !important;
  }
  .main-navbar li {
    width: 100% !important;
    text-align: center !important;
    margin: 8px 0 !important;
  }

  .main-navbar a,
  .main-navbar a:visited {
    color: #ffffff !important;
    font-size: 1.1rem !important;
    display: block !important;
    width: 100% !important;
    text-decoration: none !important;
    -webkit-tap-highlight-color: transparent !important;
  }
  .main-navbar a.active {
    color: #ff4d4d !important;
  }
  .main-navbar .nav-btn {
    background-color: #8b0000 !important;
    color: #ffffff !important;
    display: inline-block !important;
    width: auto !important;
    padding: 8px 20px !important;
    border-radius: 6px !important;
  }
}`.replace(/\r\n/g, '\n');

console.log('Original css length:', css.length);

if (css.includes(block1Target)) {
  css = css.replace(block1Target, `/* Neutralized duplicate Block 1 */`);
  console.log('Block 1 replaced successfully!');
} else {
  console.log('Warning: Block 1 target match not found.');
}

// Keep lines before the navbar block (cutLine detection)
const lines = css.split('\n');
let cutLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (
    lines[i].includes('NAVBAR — COMPREHENSIVE LUXURY BLOCK') ||
    lines[i].includes('NAVBAR — TEK TEMİZ BLOK') ||
    lines[i].includes('NAVBAR — SON SÜRÜM')
  ) {
    cutLine = i;
    while (cutLine > 0 && !lines[cutLine].includes('/*')) cutLine--;
    break;
  }
}

if (cutLine !== -1) {
  console.log('Cutting from line:', cutLine);
  css = lines.slice(0, cutLine).join('\n') + '\n';
}

const finalNavbarCSS = `
/* ============================================================
   NAVBAR — COMPREHENSIVE LUXURY BLOCK (CLEAN & CONSOLIDATED)
   ============================================================ */

/* ── HEADER CONTAINER & BLUR ── */
.main-header {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  z-index: 99999 !important;
  display: flex !important;
  flex-direction: column !important;
  background: rgba(14, 8, 4, 0.92) !important;
  backdrop-filter: blur(12px) saturate(160%) !important;
  -webkit-backdrop-filter: blur(12px) saturate(160%) !important;
  border-bottom: 1px solid rgba(212, 175, 55, 0.16) !important;
  box-shadow: 0 2px 22px rgba(0, 0, 0, 0.5) !important;
  transition: background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease !important;
}

.main-header.scrolled {
  background: rgba(8, 4, 2, 0.97) !important;
  backdrop-filter: blur(24px) saturate(200%) brightness(0.85) !important;
  -webkit-backdrop-filter: blur(24px) saturate(200%) brightness(0.85) !important;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.75) !important;
  border-bottom-color: rgba(212, 175, 55, 0.28) !important;
}

/* ── TOP BAR ── */
.top-bar {
  background: rgba(22, 11, 4, 0.96) !important;
  border-bottom: 1px solid rgba(212, 175, 55, 0.25) !important;
  padding: 8px 0 6px 0 !important;
  display: block !important;
  width: 100% !important;
  position: relative !important;
  z-index: 100 !important;
}

.top-bar .top-bar-container {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 32px !important;
  box-sizing: border-box !important;
  display: block !important;
}

.top-bar .header-status-wrapper {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  gap: 12px !important;
  width: 100% !important;
}

/* Push lang selector and theme toggler to the far right by pushing status badge to left */
.top-bar .live-status-badge {
  margin-right: auto !important;
}

.top-bar .lang-selector-container {
  position: relative !important;
  display: inline-flex !important;
  align-items: center !important;
  margin-left: 0 !important;
}

.top-bar .atmosphere-toggle-btn {
  margin-left: 10px !important;
  position: relative !important;
  right: auto !important;
  top: auto !important;
  transform: none !important;
}

.top-bar .header-divider { display: none !important; }

/* ── LIVE STATUS BADGE ── */
.top-bar .live-status-badge {
  font-size: 0.72rem !important;
  font-weight: 700 !important;
  padding: 4px 12px !important;
  border-radius: 20px !important;
  letter-spacing: 0.3px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  background: rgba(46, 204, 113, 0.12) !important;
  color: #2edc78 !important;
  border: 1px solid rgba(46, 204, 113, 0.4) !important;
  box-shadow: 0 0 10px rgba(46, 204, 113, 0.15) !important;
}

.top-bar .live-status-badge .pulse-dot,
.top-bar .live-status-badge .pulse-dot.green {
  width: 8px !important;
  height: 8px !important;
  border-radius: 50% !important;
  background: #2ecc71 !important;
  display: inline-block !important;
  box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.8) !important;
  animation: nbPulse 1.8s ease-in-out infinite !important;
  flex-shrink: 0 !important;
}

@keyframes nbPulse {
  0%   { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.75); transform: scale(0.9); }
  50%  { box-shadow: 0 0 0 6px rgba(46, 204, 113, 0); transform: scale(1.15); }
  100% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0); transform: scale(0.9); }
}

/* ── BUTTONS (THEME / LANG) ── */
.top-bar .atmosphere-toggle-btn,
.top-bar .lang-toggle-btn {
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px solid rgba(212, 175, 55, 0.22) !important;
  color: #ddd5c8 !important;
  padding: 4px 10px !important;
  border-radius: 5px !important;
  font-size: 0.71rem !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
  transition: all 0.2s ease !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
}

.top-bar .atmosphere-toggle-btn:hover,
.top-bar .lang-toggle-btn:hover {
  background: rgba(212, 175, 55, 0.12) !important;
  border-color: rgba(212, 175, 55, 0.5) !important;
  transform: translateY(-1px) !important;
}

.top-bar .atmosphere-toggle-btn:hover,
.top-bar .atmosphere-toggle-btn:hover span,
.top-bar .atmosphere-toggle-btn:hover i,
.top-bar .lang-toggle-btn:hover,
.top-bar .lang-toggle-btn:hover span,
.top-bar .lang-toggle-btn:hover i {
  color: #ffffff !important;
}

.top-bar .lang-dropdown {
  background: rgba(10, 5, 2, 0.99) !important;
  border: 1px solid rgba(212, 175, 55, 0.25) !important;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.85) !important;
}

body.day-atmosphere .top-bar .atmosphere-toggle-btn,
body.day-atmosphere .top-bar .lang-toggle-btn {
  color: #ffffff !important;
}

/* ── HEADER ROW ── */
.header-container {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  position: relative !important;
  min-height: 120px !important;
  padding: 0 48px !important;
  box-sizing: border-box !important;
  width: 100% !important;
}

/* ── LOGO (CENTERED & FLOATING) ── */
.logo {
  position: absolute !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  top: 6px !important;
  z-index: 10 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin: 0 !important;
}

.logo .brand-text-wrapper { display: none !important; }

.logo-img {
  display: block !important;
  width: 108px !important;
  height: 108px !important;
  border-radius: 50% !important;
  object-fit: cover !important;
  border: none !important;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.6) !important;
  transition: box-shadow 0.3s ease, transform 0.3s ease !important;
}

.logo-link:hover .logo-img {
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.6) !important;
  transform: none !important;
}

.navbar-left ul {
  display: flex !important;
  justify-content: flex-end !important;
  align-items: center !important;
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
  gap: 1.8rem !important;
  padding-right: 110px !important;
}

.navbar-right ul {
  display: flex !important;
  justify-content: flex-start !important;
  align-items: center !important;
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
  gap: 1.8rem !important;
  padding-left: 110px !important;
}
.navbar-left, .navbar-right {
  display: block !important;
  flex: 1 1 0% !important;
}


/* ── NAV LINKS ── */
.navbar-left ul li a,
.navbar-right ul li a {
  position: relative !important;
  display: inline-block !important;
  font-size: 1.05rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.6px !important;
  color: rgba(235, 228, 215, 0.8) !important;
  text-decoration: none !important;
  padding: 4px 0 !important;
  background: none !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  transition: color 0.25s !important;
}

.navbar-left ul li a::after,
.navbar-right ul li a::after {
  content: '' !important;
  position: absolute !important;
  bottom: 0 !important;
  left: 0 !important;
  width: 0 !important;
  height: 2px !important;
  background: linear-gradient(90deg, #b8860b, #f4c842, #b8860b) !important;
  border-radius: 1px !important;
  transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

.navbar-left ul li a:hover,
.navbar-right ul li a:hover {
  color: #f4c842 !important;
}

.navbar-left ul li a:hover::after,
.navbar-right ul li a:hover::after {
  width: 100% !important;
}

.navbar-left ul li a.active,
.navbar-right ul li a.active {
  color: #f4c842 !important;
}

.navbar-left ul li a.active::after,
.navbar-right ul li a.active::after {
  width: 100% !important;
  box-shadow: 0 0 6px rgba(212, 175, 55, 0.55) !important;
}

/* ── ACTION BUTTON (İLETİŞİM) — Regular link style ── */
header .main-navbar ul li a.nav-btn {
  position: relative !important;
  display: inline-block !important;
  font-size: 1.05rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.6px !important;
  color: rgba(235, 228, 215, 0.8) !important;
  text-decoration: none !important;
  padding: 4px 0 !important;
  background: none !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  transition: color 0.25s !important;
}

header .main-navbar ul li a.nav-btn::after {
  content: '' !important;
  position: absolute !important;
  bottom: 0 !important;
  left: 0 !important;
  width: 0 !important;
  height: 2px !important;
  background: linear-gradient(90deg, #b8860b, #f4c842, #b8860b) !important;
  border-radius: 1px !important;
  transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

header .main-navbar ul li a.nav-btn:hover {
  color: #f4c842 !important;
  background: none !important;
  border: none !important;
  box-shadow: none !important;
  transform: none !important;
}

header .main-navbar ul li a.nav-btn:hover::after {
  width: 100% !important;
}

header .main-navbar ul li a.nav-btn.active::after {
  width: 100% !important;
  box-shadow: 0 0 6px rgba(212, 175, 55, 0.55) !important;
}

/* ── HAMBURGER BUTTON (MOBILE) ── */
.hamburger-btn {
  display: none !important;
  align-items: center !important;
  justify-content: center !important;
  width: 40px !important;
  height: 40px !important;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(212, 175, 55, 0.25) !important;
  border-radius: 8px !important;
  color: #f0ead8 !important;
  font-size: 1rem !important;
  cursor: pointer !important;
  flex-shrink: 0 !important;
  transition: all 0.2s !important;
  margin-left: 10px !important;
}

.hamburger-btn:hover {
  background: rgba(212, 175, 55, 0.1) !important;
  border-color: rgba(212, 175, 55, 0.5) !important;
  color: #f4c842 !important;
}

/* ── MOBILE DROPDOWN NAVBAR ── */
.main-header .mobile-navbar {
  display: none !important;
}

/* ── CONTENT PADDING ADJUSTMENT ── */
main.main-content:not(:has(.hero-wrapper)):not(:has(.hero-section)) {
  padding-top: 162px !important;
}

/* ============================================================
   TABLET RESPONSIVE (769px - 1100px)
   ============================================================ */
@media (max-width: 1100px) {
  .header-container { padding: 0 28px !important; }
  .navbar-left ul  { gap: 1.4rem !important; padding-right: 80px !important; }
  .navbar-right ul { gap: 1.4rem !important; padding-left: 80px !important; }
}

@media (max-width: 900px) {
  .header-container { padding: 0 18px !important; min-height: 108px !important; }
  .navbar-left ul  { gap: 1rem !important; padding-right: 64px !important; }
  .navbar-right ul { gap: 1rem !important; padding-left: 64px !important; }
  .navbar-left ul li a,
  .navbar-right ul li a { font-size: 0.87rem !important; }
  .logo-img { width: 96px !important; height: 96px !important; }
}

/* ============================================================
   MOBILE RESPONSIVE (max 768px)
   ============================================================ */
@media (max-width: 768px) {
  .top-bar { padding: 4px 0 !important; }
  .top-bar .top-bar-container { padding: 0 12px !important; }
  .top-bar .live-status-badge { font-size: 0.67rem !important; padding: 3px 8px !important; }
  .top-bar .live-status-badge small { display: none !important; }

  /* Atmosphere/Language selectors next to each other on the right */
  .top-bar .lang-selector-container {
    margin-left: auto !important;
    position: relative !important;
    display: inline-flex !important;
  }
  .top-bar .atmosphere-toggle-btn {
    display: inline-flex !important;
    position: relative !important;
    right: auto !important;
    top: auto !important;
    transform: none !important;
    margin-left: 6px !important;
  }

  .top-bar .lang-toggle-btn,
  .top-bar .atmosphere-toggle-btn {
    padding: 3px 7px !important;
    font-size: 0.66rem !important;
    border-radius: 5px !important;
    height: auto !important;
    width: auto !important;
    box-shadow: none !important;
  }

  .top-bar .lang-toggle-btn span,
  .top-bar .atmosphere-toggle-btn span {
    display: inline !important; /* Make text visible in mobile top bar! */
  }

  @media (max-width: 500px) {
    .top-bar .lang-toggle-btn span,
    .top-bar .atmosphere-toggle-btn span {
      display: none !important; /* Hide labels under 500px to avoid text wrapping */
    }
  }

  .header-container {
    min-height: 60px !important;
    padding: 0 14px !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
    overflow: visible !important;
  }

  /* Logo positioned on the left on mobile */
  .logo {
    position: static !important;
    transform: none !important;
    top: auto !important;
    left: auto !important;
    flex: 1 !important;
    justify-content: flex-start !important;
  }

  .logo-img {
    width: 48px !important;
    height: 48px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.65) !important;
  }

  .navbar-left, .navbar-right { display: none !important; }

  .hamburger-btn {
    display: flex !important;
    position: relative !important;
    z-index: 10 !important;
  }

  /* Dropdown Menu (Aşağı doğru açılır, all items visible at once) */
  .main-header .mobile-navbar {
    display: block !important;
    position: absolute !important;
    top: 100% !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    background: rgba(8, 3, 1, 0.98) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-bottom: 1px solid rgba(212, 175, 55, 0.2) !important;
    box-shadow: 0 10px 30px rgba(0,0,0,0.8) !important;
    padding: 8px 14px 14px !important;
    z-index: 999 !important;
    /* transition states */
    transform: translateY(-4px) !important;
    opacity: 0 !important;
    pointer-events: none !important;
    visibility: hidden !important;
    transition: transform 0.25s ease, opacity 0.25s ease, visibility 0.25s !important;
    overflow: visible !important;
    max-height: none !important;
  }

  .main-header .mobile-navbar.active {
    transform: translateY(0) !important;
    opacity: 1 !important;
    pointer-events: all !important;
    visibility: visible !important;
  }

  /* 2-column grid to make everything fit without scrolling */
  .main-header .mobile-navbar ul {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 6px !important;
    list-style: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .main-header .mobile-navbar ul li {
    display: block !important;
    width: auto !important;
    margin: 0 !important;
    text-align: center !important;
  }

  .main-header .mobile-navbar ul li a {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
    color: rgba(235, 228, 215, 0.85) !important;
    font-size: 0.93rem !important;
    font-weight: 500 !important;
    text-decoration: none !important;
    padding: 10px 8px !important;
    border-radius: 7px !important;
    border: 1px solid transparent !important;
    background: none !important;
    box-shadow: none !important;
    transition: background 0.18s, color 0.18s, border-color 0.18s !important;
    width: 100% !important;
    min-height: auto !important;
  }

  .main-header .mobile-navbar ul li a::after,
  .main-header .mobile-navbar ul li a::before { display: none !important; }

  .main-header .mobile-navbar ul li a:hover,
  .main-header .mobile-navbar ul li a.active {
    background: none !important;
    color: #f4c842 !important;
    border-color: transparent !important;
  }

  /* Mobile Contact (İletişim) button overrides inside dropdown — regular style */
  .main-header .mobile-navbar ul li a.nav-btn {
    background: none !important;
    color: rgba(235, 228, 215, 0.85) !important;
    font-weight: 500 !important;
    border-color: transparent !important;
  }
  .main-header .mobile-navbar ul li a.nav-btn:hover {
    background: none !important;
    color: #f4c842 !important;
    border-color: transparent !important;
  }

  /* overlay */
  .mobile-nav-overlay {
    position: fixed !important;
    inset: 0 !important;
    background: rgba(0, 0, 0, 0.45) !important;
    z-index: 998 !important;
    opacity: 0 !important;
    pointer-events: none !important;
    transition: opacity 0.25s !important;
  }
  .mobile-nav-overlay.active { opacity: 1 !important; pointer-events: all !important; }

  main.main-content:not(:has(.hero-wrapper)):not(:has(.hero-section)) {
    padding-top: 98px !important;
  }
}

/* ── RESPONSIVE RESERVATION TABS ── */
@media (max-width: 768px) {
  .reservation-tabs {
    gap: 0.8rem !important;
    margin-bottom: 1.8rem !important;
  }
  .tab-btn {
    padding: 0.6rem 1.1rem !important;
    font-size: 0.85rem !important;
  }
}

@media (max-width: 500px) {
  .reservation-tabs {
    flex-direction: column !important;
    align-items: stretch !important;
    gap: 0.6rem !important;
    border-bottom: none !important;
    padding-bottom: 0 !important;
  }
  .tab-btn {
    width: 100% !important;
    justify-content: center !important;
    padding: 0.7rem 1.2rem !important;
    font-size: 0.88rem !important;
  }
}
`;

fs.writeFileSync(cssPath, css + finalNavbarCSS, 'utf8');
console.log('CSS Rebuilt successfully. New total length:', fs.readFileSync(cssPath, 'utf8').split('\n').length);
