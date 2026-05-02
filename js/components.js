/* ============================================
   TerraSync · components.js
   Injeta nav e footer compartilhados em todas as páginas.
   Chame no <body> com: injectNav('root' | 'pages'); injectFooter(depth);
   ============================================ */

function injectNav(depth = 'root') {
  const base = depth === 'pages' ? '../' : '';
  const nav = document.createElement('nav');
  nav.innerHTML = `
    <a href="${base}index.html" class="nav-logo">
      <div class="logo-mark" style="width:32px;height:32px;flex-shrink:0;">
        <img src="https://raw.githubusercontent.com/felipe-schmitz/GrowHub---Dashboard/main/assets/icon.png" alt="Logo" style="width:100%;height:100%;object-fit:contain;" onerror="this.style.display='none';">
      </div>
      <span style="color:#2b7533;letter-spacing:-0.01em;">Terra</span><span style="color:#0a5e87;letter-spacing:-0.01em;">Sync</span>
    </a>
    <ul class="nav-links">
      <li><a href="${base}index.html#produtos">Produtos</a></li>
      <li><a href="${base}index.html#growhub">GrowHub</a></li>
      <li><a href="${base}index.html#planos">Planos</a></li>
      <li><a href="${base}index.html#agriflow">AgriFlow</a></li>
      <li><a href="${base}pages/sobre.html">Sobre</a></li>
      <li class="nav-cta-item"><a href="${base}index.html#acesso" class="nav-cta">Acessar</a></li>
      <li class="nav-profile-item">
        <a href="${base}pages/404.html" class="nav-profile" aria-label="Abrir perfil">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 12c2.4 0 4.2-1.8 4.2-4.2S14.4 3.6 12 3.6 7.8 5.4 7.8 7.8 9.6 12 12 12z"/>
            <path d="M4.8 20.4c.7-3.4 3.5-5.4 7.2-5.4s6.5 2 7.2 5.4"/>
          </svg>
          <span>Perfil</span>
        </a>
      </li>
    </ul>
    <button class="nav-toggle" type="button" aria-label="Abrir menu" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>
  `;
  document.body.insertBefore(nav, document.body.firstChild);
}

function injectFooter(depth = 'root') {
  const base = depth === 'pages' ? '../' : '';
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="footer-top">
      <div class="footer-brand">
        <a href="${base}index.html" class="nav-logo" style="color:var(--white);">
          <div class="logo-mark">
            <img src="https://raw.githubusercontent.com/felipe-schmitz/GrowHub---Dashboard/main/assets/icon.png" alt="Logo" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
           <span style="color:#2b7533;letter-spacing:-0.01em;">Terra</span><span style="color:#0a5e87;letter-spacing:-0.01em;">Sync</span>
        </a>
        <p>Tecnologia que nasce do solo. Software de gestão para propriedades rurais brasileiras — do sítio à grande fazenda.</p>
      </div>
      <div>
        <div class="footer-col-title">PRODUTOS</div>
        <ul class="footer-links">
          <li><a href="${base}index.html#growhub">GrowHub</a></li>
          <li><a href="${base}index.html#agriflow">AgriFlow</a></li>
          <li><a href="${base}index.html#planos">Planos e preços</a></li>
          <li><a href="${base}pages/404.html">API para parceiros</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">EMPRESA</div>
        <ul class="footer-links">
          <li><a href="${base}pages/sobre.html">Sobre a TerraSync</a></li>
          <li><a href="${base}pages/404.html">Blog técnico</a></li>
          <li><a href="${base}pages/404.html">Casos de uso</a></li>
          <li><a href="${base}pages/trabalhe.html">Trabalhe conosco</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">SUPORTE</div>
        <ul class="footer-links">
          <li><a href="${base}pages/404.html">Central de ajuda</a></li>
          <li><a href="${base}pages/404.html">Documentação</a></li>
          <li><a href="${base}pages/termos.html">Termos de uso</a></li>
          <li><a href="${base}pages/termos.html#privacidade">Privacidade · LGPD</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">© 2026 TerraSync Tecnologia Agrícola Ltda. · CNPJ 70.030.404/0001-00 · Vilhena, RO</div>
      <div class="footer-tag">v2.4.1 · CuiudoIA engine · fins didáticos</div>
    </div>
  `;
  document.body.appendChild(footer);
}
