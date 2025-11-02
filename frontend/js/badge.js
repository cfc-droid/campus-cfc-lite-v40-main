// ✅ CFC_FUNC_8_9_20251102_REAL — Badge Motivacional sincronizado en tiempo real (LITE V41)
function renderBadge() {
  // Crear o recuperar el badge
  let badge = document.getElementById('cfcBadge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'cfcBadge';
    badge.style.cssText = `
      position:fixed;
      top:10px;
      left:10px;
      background:#ffd700;
      color:#000;
      padding:6px 10px;
      border-radius:50%;
      font-weight:700;
      box-shadow:0 0 8px #ffd700;
      font-size:0.9rem;
      z-index:9999;
      cursor:default;
      transition:transform 0.2s ease, box-shadow 0.3s ease;
    `;
    badge.addEventListener('mouseenter', () => {
      badge.style.transform = 'scale(1.1)';
      badge.style.boxShadow = '0 0 14px #ffd700';
    });
    badge.addEventListener('mouseleave', () => {
      badge.style.transform = 'scale(1)';
      badge.style.boxShadow = '0 0 8px #ffd700';
    });
    document.body.appendChild(badge);
  }

  // Leer progreso actual
  const updateProgress = () => {
    const p = localStorage.getItem('progressPercent') || 0;
    badge.textContent = p + '%';
  };

  updateProgress();

  // 🔁 Observador para detectar cambios en localStorage (entre páginas)
  window.addEventListener('storage', (e) => {
    if (e.key === 'progressPercent') updateProgress();
  });

  // 🔁 Refresco automático cada 2s (por seguridad)
  setInterval(updateProgress, 2000);
}

window.addEventListener('load', renderBadge);

// 🧩 Log CFC-SYNC
console.log("🧩 CFC_SYNC checkpoint:", "badge.js | progreso sincronizado (P8.9)", new Date().toLocaleString());
