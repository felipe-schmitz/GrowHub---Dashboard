/* ============================================
   TerraSync · main.js
   Scripts compartilhados entre todas as páginas
   Fins didáticos · v2.4.1
   ============================================ */

/* ── Scroll reveal (fade-section) ── */
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.1 }
);
document.querySelectorAll('.fade-section').forEach(el => revealObserver.observe(el));

/* ── Smooth scroll para âncoras internas ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── Marca link ativo na nav conforme página atual ── */
(function markActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === current) a.classList.add('active');
  });
})();

/* ============================================
   TerraSync · cookies.js
   Gerenciamento do banner de cookies e popup de localização
   ============================================ */

const CONSENT_KEY = 'terrasync_consent';

/* ── Lê consentimento salvo ── */
function getConsent() {
  try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); } catch { return null; }
}

/* ── Salva consentimento ── */
function saveConsent(obj) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...obj, ts: Date.now() }));
}

/* ── Injeta banner de cookies no DOM ── */
function injectCookieBanner() {
  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Preferências de privacidade');
  banner.innerHTML = `
    <div class="cookie-icon">🍪</div>
    <div class="cookie-text">
      <h4>Privacidade &amp; Cookies</h4>
      <p>
        Usamos cookies para melhorar sua experiência, analisar o uso da plataforma e personalizar conteúdo.
        Seus dados são protegidos conforme nossa
        <a href="pages/termos.html">Política de Privacidade</a> e a LGPD.
      </p>
      <div class="cookie-toggles">
        <label class="cookie-toggle">
          <input type="checkbox" id="ck-essential" checked disabled>
          Cookies essenciais (obrigatório)
        </label>
        <label class="cookie-toggle">
          <input type="checkbox" id="ck-analytics" checked>
          Cookies analíticos
        </label>
        <label class="cookie-toggle">
          <input type="checkbox" id="ck-marketing">
          Cookies de marketing
        </label>
      </div>
    </div>
    <div class="cookie-actions">
      <button class="cookie-btn cookie-btn-accept" id="ck-accept-all">Aceitar tudo</button>
      <button class="cookie-btn cookie-btn-save"   id="ck-save-pref">Salvar preferências</button>
    </div>
  `;
  document.body.appendChild(banner);

  document.getElementById('ck-accept-all').addEventListener('click', () => {
    saveConsent({ essential: true, analytics: true, marketing: true });
    hideCookieBanner();
    showLocationModal();
  });

  document.getElementById('ck-save-pref').addEventListener('click', () => {
    saveConsent({
      essential: true,
      analytics: document.getElementById('ck-analytics').checked,
      marketing: document.getElementById('ck-marketing').checked,
    });
    hideCookieBanner();
    showLocationModal();
  });
}

function hideCookieBanner() {
  const b = document.getElementById('cookie-banner');
  if (b) { b.style.opacity = '0'; b.style.transform = 'translateX(-50%) translateY(20px)'; b.style.transition = 'all 0.3s'; setTimeout(() => b.remove(), 300); }
}

/* ── Injeta modal de localização ── */
function injectLocationModal() {
  const modal = document.createElement('div');
  modal.id = 'location-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-label', 'Permissão de localização');
  modal.innerHTML = `
    <div class="location-box">
      <div class="loc-icon">📍</div>
      <h3>Permitir localização?</h3>
      <p>
        O GrowHub usa sua localização para identificar automaticamente a <strong style="color:var(--sprout)">zona climática Köpper-Geiger</strong>,
        tipo de solo predominante e alertas meteorológicos da sua região.
        Nenhum dado é compartilhado com terceiros. Veja nossa
        <a href="pages/termos.html">Política de Privacidade</a>.
      </p>
      <div class="loc-actions">
        <button class="loc-btn loc-btn-allow" id="loc-allow">Permitir localização</button>
        <button class="loc-btn loc-btn-deny"  id="loc-deny">Agora não</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('loc-allow').addEventListener('click', () => {
    requestGeolocation();
    hideLocationModal();
  });
  document.getElementById('loc-deny').addEventListener('click', () => {
    saveConsent({ ...(getConsent() || {}), location: false });
    hideLocationModal();
  });
}

function hideLocationModal() {
  const m = document.getElementById('location-modal');
  if (m) { m.style.opacity = '0'; m.style.transition = 'opacity 0.3s'; setTimeout(() => m.remove(), 300); }
}

function showLocationModal() {
  const consent = getConsent();
  if (consent && consent.location !== undefined) return;
  setTimeout(injectLocationModal, 400);
}

/* ── Geolocalização fictícia (didático) ── */
function requestGeolocation() {
  if (!navigator.geolocation) {
    saveConsent({ ...(getConsent() || {}), location: false });
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      saveConsent({
        ...(getConsent() || {}),
        location: true,
        lat: pos.coords.latitude.toFixed(4),
        lng: pos.coords.longitude.toFixed(4),
      });
      showLocationToast('Localização obtida com sucesso! Dados climáticos sendo carregados…');
    },
    () => {
      saveConsent({ ...(getConsent() || {}), location: false });
      showLocationToast('Localização não concedida. Você pode alterar nas configurações.');
    }
  );
}

/* ── Toast de notificação ── */
function showLocationToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = `
    position:fixed; bottom:2rem; right:2rem; z-index:9999;
    background:var(--leaf); color:#fff; font-family:'DM Sans',sans-serif;
    font-size:0.82rem; padding:0.85rem 1.25rem; border-radius:10px;
    max-width:320px; line-height:1.5; box-shadow:0 8px 24px rgba(0,0,0,0.2);
    animation:slideUp 0.4s ease;
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.3s'; setTimeout(() => t.remove(), 300); }, 4000);
}

/* ── Inicialização ── */
(function init() {
  const consent = getConsent();
  if (!consent) {
    setTimeout(injectCookieBanner, 1200);
  }
})();
