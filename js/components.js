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
      <div class="logo-mark">
        <div class="logo-mark" style="width: 24px; height: 24px;">
      <img src="https://raw.githubusercontent.com/felipe-schmitz/GrowHub---Dashboard/main/assets/icon.png"
             alt="TerraSync Logo"
             style="width:100%;height:100%;object-fit:contain;"
             onerror="this.style.display='none';this.parentElement.innerHTML='<svg viewBox=\'0 0 24 24\' style=\'width:18px;height:18px;fill:#FDFEF9\'><path d=\'M17 8C8 10 5.9 16.17 3.82 19.83L5.71 21 7 18.5c.49.27.98.52 1.47.74C11.57 20.74 14.89 21 17 21c2 0 5-1 7-5-3 0-5.5-1-6.5-3.5C19 11 20 9 22 8c-2 1-3.5.5-5 0z\'/></svg>';">
      </div>
      </div>
      Terra<span>Sync</span>
    </a>
    <ul class="nav-links">
      <li><a href="${base}index.html#produtos">Produtos</a></li>
      <li><a href="${base}index.html#growhub">GrowHub</a></li>
      <li><a href="${base}index.html#planos">Planos</a></li>
      <li><a href="${base}index.html#agriflow">AgriFlow</a></li>
      <li><a href="${base}pages/sobre.html">Sobre</a></li>
      <li><a href="${base}index.html#acesso" class="nav-cta">Acessar</a></li>
    </ul>
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
          Terra<span style="color:var(--sprout);">Sync</span>
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
          <li><a href="${base}pages/termos.html">Privacidade · LGPD</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">© 2025 TerraSync Tecnologia Agrícola Ltda. · CNPJ 00.000.000/0001-00 · Vilhena, RO</div>
      <div class="footer-tag">v2.4.1 · CuidoIA engine · fins didáticos</div>
    </div>
  `;
  document.body.appendChild(footer);
}
