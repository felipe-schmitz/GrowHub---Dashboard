/* ============================================
   TerraSync · home.js
   Scripts exclusivos da página inicial
   ============================================ */

/* ── Login fictício ── */
const formBtn = document.querySelector('.form-btn');
if (formBtn) {
  formBtn.addEventListener('click', () => {
    formBtn.textContent = 'Autenticando…';
    formBtn.style.background = 'var(--clay)';
    formBtn.disabled = true;
    setTimeout(() => {
      formBtn.textContent = '✓ Login fictício — fins didáticos';
      formBtn.style.background = 'var(--leaf)';
    }, 1600);
  });
}

/* ── Botões de plano → scroll para acesso ── */
document.querySelectorAll('.plan-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const acesso = document.getElementById('acesso');
    if (acesso) acesso.scrollIntoView({ behavior: 'smooth' });
  });
});
