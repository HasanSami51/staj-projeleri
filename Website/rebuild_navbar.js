const fs = require('fs');
const cssPath = 'C:/Users/ebrar/Desktop/Staj/Website/public/css/style.css';
const lines = fs.readFileSync(cssPath, 'utf8').split('\n');

// Keep lines before the navbar block (index 6716 = line 6717)
const kept = lines.slice(0, 6716);

const newCSS = `
/* ============================================================
   NAVBAR — SON SÜRÜM
   ============================================================ */

/* 1. HEADER — sabit, blur */
.main-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  background: rgba(12, 6, 2, 0.92);
  backdrop-filter: blur(12px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  border-bottom: 1px solid rgba(212,175,55,0.15);
  box-shadow: 0 2px 20px rgba(0,0,0,0.5);
  transition: background .35s ease, box-shadow .35s ease;
}

.main-header.scrolled {
  background: rgba(7, 3, 1, 0.97);
  backdrop-filter: blur(24px) saturate(200%) brightness(0.8);
  -webkit-backdrop-filter: blur(24px) saturate(200%) brightness(0.8);
  box-shadow: 0 4px 32px rgba(0,0,0,0.8);
  border-bottom-color: rgba(212,175,55,0.28);
}

/* 2. TOP BAR */
.top-bar {
  background: rgba(6, 3, 1, 0.98);
  border-bottom: 1px solid rgba(212,175,55,0.1);
  padding: 4px 0;
  display: flex;
  justify-content: center;
}

.top-bar .top-bar-container {
  width: 100%;
  padding: 0 28px;
  box-sizing: border-box;
}

.top-bar .header-status-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.top-bar .lang-selector-container { margin-left: auto; }
.top-bar .header-divider { display: none; }

.top-bar .live-status-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 4px 11px;
  border-radius: 20px;
  letter-spacing: 0.3px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.top-bar .live-status-badge.status-open {
  background: rgba(46,204,113,0.1);
  color: #2edc78;
  border: 1px solid rgba(46,204,113,0.38);
}

.top-bar .live-status-badge .pulse-dot,
.top-bar .live-status-badge .pulse-dot.green {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #2ecc71;
  flex-shrink: 0;
  animation: nbPulse 1.8s ease-in-out infinite;
}

@keyframes nbPulse {
  0%   { box-shadow: 0 0 0 0 rgba(46,204,113,.75); transform: scale(.9); }
  50%  { box-shadow: 0 0 0 6px rgba(46,204,113,0); transform: scale(1.1); }
  100% { box-shadow: 0 0 0 0 rgba(46,204,113,0);   transform: scale(.9); }
}

.top-bar .atmosphere-toggle-btn,
.top-bar .lang-toggle-btn {
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(212,175,55,.2);
  color: #ddd5c8;
  padding: 3px 9px;
  border-radius: 5px;
  font-size: .71rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all .2s;
}
.top-bar .atmosphere-toggle-btn:hover,
.top-bar .lang-toggle-btn:hover {
  background: rgba(212,175,55,.1);
  border-color: rgba(212,175,55,.5);
  color: #f4c842;
}

/* 3. HEADER ROW */
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  min-height: 120px;
  padding: 0 48px;
  box-sizing: border-box;
  width: 100%;
}

/* 4. LOGO */
.logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 6px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo .brand-text-wrapper { display: none; }

.logo-img {
  display: block;
  width: 108px; height: 108px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow:
    0 0 0 2px rgba(212,175,55,.3),
    0 0 16px rgba(212,175,55,.18),
    0 8px 28px rgba(0,0,0,.55);
  transition: box-shadow .3s ease, transform .3s ease;
}

.logo-link:hover .logo-img {
  box-shadow:
    0 0 0 3px rgba(212,175,55,.55),
    0 0 24px rgba(212,175,55,.3),
    0 10px 32px rgba(0,0,0,.65);
  transform: scale(1.05);
}

/* 5. NAV KANATLAR */
.navbar-left, .navbar-right { flex: 1 1 0; }

.navbar-left ul {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
  margin: 0; padding: 0;
  gap: 2.4rem;
  padding-right: 64px;
}

.navbar-right ul {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  margin: 0; padding: 0;
  gap: 2.4rem;
  padding-left: 64px;
}

/* 6. NAV LİNKLER */
.navbar-left ul li a,
.navbar-right ul li a {
  position: relative;
  display: inline-block;
  font-size: .95rem;
  font-weight: 600;
  letter-spacing: .6px;
  color: rgba(235,228,215,.8);
  text-decoration: none;
  padding: 6px 0;
  background: none !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  transition: color .25s;
}

.navbar-left ul li a::after,
.navbar-right ul li a::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 0; height: 2px;
  background: linear-gradient(90deg, #b8860b, #f4c842, #b8860b);
  border-radius: 1px;
  transition: width .3s cubic-bezier(.25,.46,.45,.94);
}

.navbar-left ul li a:hover,
.navbar-right ul li a:hover { color: #f4c842 !important; }

.navbar-left ul li a:hover::after,
.navbar-right ul li a:hover::after { width: 100%; }

.navbar-left ul li a.active,
.navbar-right ul li a.active { color: #f4c842 !important; }

.navbar-left ul li a.active::after,
.navbar-right ul li a.active::after {
  width: 100%;
  box-shadow: 0 0 6px rgba(212,175,55,.55);
}

/* 7. HAMBURGEr */
.hamburger-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px; height: 40px;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(212,175,55,.25);
  border-radius: 8px;
  color: #f0ead8;
  font-size: 1rem;
  cursor: pointer;
  flex-shrink: 0;
  transition: all .2s;
  margin-left: 10px;
}
.hamburger-btn:hover {
  background: rgba(212,175,55,.1);
  border-color: rgba(212,175,55,.5);
  color: #f4c842;
}

/* 8. MOBİL NAVBAR — masaüstünde gizli */
.main-header .mobile-navbar { display: none; }

/* 9. İÇERİK BOŞLUK */
main.main-content:not(:has(.hero-wrapper)):not(:has(.hero-section)) {
  padding-top: 162px;
}

/* TABLET */
@media (max-width: 1100px) {
  .header-container { padding: 0 28px; }
  .navbar-left ul  { gap: 1.8rem; padding-right: 56px; }
  .navbar-right ul { gap: 1.8rem; padding-left:  56px; }
}

@media (max-width: 900px) {
  .header-container { padding: 0 18px; min-height: 108px; }
  .navbar-left ul  { gap: 1.2rem; padding-right: 46px; }
  .navbar-right ul { gap: 1.2rem; padding-left:  46px; }
  .navbar-left ul li a,
  .navbar-right ul li a { font-size: .87rem; }
  .logo-img { width: 96px; height: 96px; }
}

/* MOBİL */
@media (max-width: 768px) {
  .top-bar { padding: 4px 0; }
  .top-bar .top-bar-container { padding: 0 12px; }
  .top-bar .live-status-badge { font-size: .67rem; padding: 3px 8px; }
  .top-bar .lang-toggle-btn,
  .top-bar .atmosphere-toggle-btn { padding: 3px 7px; font-size: .66rem; }

  .header-container {
    min-height: 60px;
    padding: 0 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: visible;
  }

  .logo {
    position: static;
    transform: none;
    top: auto; left: auto;
    flex: 1;
  }
  .logo-img {
    width: 48px; height: 48px;
    box-shadow: 0 0 0 2px rgba(212,175,55,.25), 0 4px 12px rgba(0,0,0,.5);
  }

  .navbar-left, .navbar-right { display: none; }
  .hamburger-btn { display: flex; }

  /* Dropdown menü */
  .main-header .mobile-navbar {
    display: block;
    position: absolute;
    top: 100%; left: 0; right: 0;
    background: rgba(8,3,1,.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(212,175,55,.2);
    box-shadow: 0 10px 30px rgba(0,0,0,.8);
    padding: 6px 14px 12px;
    z-index: 999;
    transform: translateY(-4px);
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
    transition: transform .25s ease, opacity .25s ease, visibility .25s;
  }

  .main-header .mobile-navbar.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
    visibility: visible;
  }

  .main-header .mobile-navbar ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    list-style: none;
    margin: 0; padding: 0;
  }

  .main-header .mobile-navbar ul li a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: rgba(235,228,215,.85);
    font-size: .93rem;
    font-weight: 500;
    text-decoration: none;
    padding: 11px 8px;
    border-radius: 7px;
    border: 1px solid transparent;
    background: none;
    box-shadow: none !important;
    transition: background .18s, color .18s, border-color .18s;
  }

  .main-header .mobile-navbar ul li a::after,
  .main-header .mobile-navbar ul li a::before { display: none; }

  .main-header .mobile-navbar ul li a:hover,
  .main-header .mobile-navbar ul li a.active {
    background: rgba(212,175,55,.1);
    color: #f4c842;
    border-color: rgba(212,175,55,.18);
  }

  .mobile-nav-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.45);
    z-index: 998;
    opacity: 0;
    pointer-events: none;
    transition: opacity .25s;
  }
  .mobile-nav-overlay.active { opacity: 1; pointer-events: all; }

  main.main-content:not(:has(.hero-wrapper)):not(:has(.hero-section)) {
    padding-top: 98px;
  }
}
`;

const final = kept.join('\n') + newCSS;
fs.writeFileSync(cssPath, final, 'utf8');
console.log('Done. Total lines:', final.split('\n').length);
