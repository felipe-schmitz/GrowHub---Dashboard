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
      <img src="/assets/icon.png" alt="Logo" style="width: 100%; height: 100%; object-fit: contain;">
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
            <img src="/assets/icon.png" alt="Logo" style="width: 100%; height: 100%; object-fit: contain;">
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
