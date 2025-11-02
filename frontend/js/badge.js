// ✅ CFC_FUNC_8_10_20251102_PERSIST — Sincronización global de progreso (fix rutas relativas)
function renderBadge() {
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

  const updateProgress = () => {
    // Lee el progreso desde el localStorage o cookie espejo
    let p = localStorage.getItem('progressPercent');
    if (!p) {
      const cookie = document.cookie.split('; ').find(r => r.startsWith('progressPercent='));
      if (cookie) p = cookie.split('=')[1];
    }
    if (!p) p = 0;
    badge.textContent = p + '%';
  };

  updateProgress();

  // 🔁 Listener para cambios en localStorage
  window.addEventListener('storage', (e) => {
    if (e.key === 'progressPercent') {
      document.cookie = `progressPercent=${e.newValue}; path=/; max-age=31536000`;
      updateProgress();
    }
  });

  // 🔁 Refresco cada 2s y respaldo en cookie
  setInterval(() => {
    const p = localStorage.getItem('progressPercent') || 0;
    document.cookie = `progressPercent=${p}; path=/; max-age=31536000`;
    updateProgress();
  }, 2000);
}

window.addEventListener('load', renderBadge);

// 🧩 Log CFC-SYNC
console.log("🧩 CFC_SYNC checkpoint:", "badge.js | persistencia global activa (P8.10)", new Date().toLocaleString());
