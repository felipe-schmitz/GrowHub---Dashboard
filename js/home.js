/* ============================================
   TerraSync · home.js
   Scripts exclusivos da página inicial
   ============================================ */

/* ── Mostrar / ocultar senha ── */
const toggleSenha  = document.getElementById('toggle-senha');
const loginSenha   = document.getElementById('login-senha');
const iconOpen     = document.getElementById('icon-eye-open');
const iconClosed   = document.getElementById('icon-eye-closed');

if (toggleSenha && loginSenha) {
  toggleSenha.addEventListener('click', () => {
    const visible = loginSenha.type === 'text';
    loginSenha.type = visible ? 'password' : 'text';
    iconOpen.style.display   = visible ? 'block' : 'none';
    iconClosed.style.display = visible ? 'none'  : 'block';
    toggleSenha.style.opacity = visible ? '0.5' : '0.9';
    toggleSenha.title = visible ? 'Mostrar senha' : 'Ocultar senha';
  });

  /* opacidade ao hover */
  toggleSenha.addEventListener('mouseenter', () => { toggleSenha.style.opacity = '1'; });
  toggleSenha.addEventListener('mouseleave', () => {
    toggleSenha.style.opacity = loginSenha.type === 'text' ? '0.9' : '0.5';
  });
}

/* ── Validação de formato de e-mail ── */
const emailInput = document.getElementById('login-email');
const emailMsg   = document.getElementById('email-msg');
const EMAIL_RE   = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const senhaMsg   = document.getElementById('senha-msg');
const PASSWORD_RE = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

function showEmailStatus(valid, msg) {
  emailMsg.style.display      = 'block';
  emailMsg.textContent        = msg;
  emailMsg.style.color        = valid ? '#6BAF5E' : '#E06060';
  emailMsg.style.background   = valid ? 'rgba(107,175,94,0.1)' : 'rgba(224,96,96,0.1)';
  emailInput.style.borderColor = valid ? 'var(--sprout)' : '#E06060';
}

function clearEmailStatus() {
  emailMsg.style.display      = 'none';
  emailInput.style.borderColor = '';
}

if (emailInput) {
  /* valida enquanto digita (com leve debounce) */
  let debounce;
  emailInput.addEventListener('input', () => {
    clearTimeout(debounce);
    const val = emailInput.value.trim();
    if (!val) { clearEmailStatus(); return; }
    debounce = setTimeout(() => {
      if (EMAIL_RE.test(val)) {
        showEmailStatus(true, '✓ Formato válido');
      } else {
        showEmailStatus(false, '✗ Digite um e-mail no formato: nome@dominio.com');
      }
    }, 500);
  });

  /* valida ao sair do campo */
  emailInput.addEventListener('blur', () => {
    const val = emailInput.value.trim();
    if (!val) { clearEmailStatus(); return; }
    if (EMAIL_RE.test(val)) {
      showEmailStatus(true, '✓ Formato válido');
    } else {
      showEmailStatus(false, '✗ Digite um e-mail no formato: nome@dominio.com');
    }
  });

  emailInput.addEventListener('focus', () => {
    if (!emailInput.value.trim()) clearEmailStatus();
  });
}

/* ── Login fictício ── */
function getPasswordErrors(value) {
  const errors = [];
  if (value.length < 8) errors.push('8 caracteres');
  if (!/[A-Z]/.test(value)) errors.push('letra maiuscula');
  if (!/\d/.test(value)) errors.push('numero');
  if (!/[^A-Za-z0-9]/.test(value)) errors.push('simbolo');
  return errors;
}

function showPasswordStatus(valid, msg) {
  if (!senhaMsg || !loginSenha) return;
  senhaMsg.style.display = 'block';
  senhaMsg.textContent = msg;
  senhaMsg.style.color = valid ? '#6BAF5E' : '#E06060';
  senhaMsg.style.background = valid ? 'rgba(107,175,94,0.1)' : 'rgba(224,96,96,0.1)';
  loginSenha.style.borderColor = valid ? 'var(--sprout)' : '#E06060';
}

function clearPasswordStatus() {
  if (!senhaMsg || !loginSenha) return;
  senhaMsg.style.display = 'none';
  loginSenha.style.borderColor = '';
}

function validatePassword(showEmpty) {
  if (!loginSenha) return true;
  const value = loginSenha.value;
  if (!value) {
    if (showEmpty) showPasswordStatus(false, 'Digite uma senha com 8 caracteres, maiuscula, numero e simbolo');
    else clearPasswordStatus();
    return false;
  }
  const errors = getPasswordErrors(value);
  if (errors.length) {
    showPasswordStatus(false, `Inclua: ${errors.join(', ')}`);
    return false;
  }
  showPasswordStatus(true, 'Senha atende aos requisitos');
  return true;
}

if (loginSenha) {
  loginSenha.addEventListener('input', () => validatePassword(false));
  loginSenha.addEventListener('blur', () => validatePassword(false));
}

const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    const emailVal = emailInput ? emailInput.value.trim() : '';
    if (emailVal && !EMAIL_RE.test(emailVal)) {
      showEmailStatus(false, '✗ Corrija o e-mail antes de continuar');
      emailInput.focus();
      return;
    }
    loginBtn.textContent  = 'Autenticando…';
    if (!validatePassword(true)) {
      loginBtn.textContent = 'Entrar no GrowHub ->';
      loginSenha.focus();
      return;
    }
    loginBtn.style.background = 'var(--clay)';
    loginBtn.disabled = true;
    setTimeout(() => {
      localStorage.setItem('terrasync_fake_login', 'true');
      window.dispatchEvent(new Event('terrasync-auth-change'));
      loginBtn.textContent = 'Login realizado';
      loginBtn.style.background = 'var(--leaf)';
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
