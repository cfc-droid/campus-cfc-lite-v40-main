// ✅ CFC_FUNC_8_8_20251102_LEFT — Badge motivacional dorado fijo (posición izquierda)
/* ARCHIVO ANTERIOR — versión 20251102 derecha — reemplazado por versión izquierda 20251102B */

function renderBadge() {
  const p = localStorage.getItem('progressPercent') || 0;

  // Si ya existe el badge, evitar duplicados
  const existing = document.getElementById('cfcBadge');
  if (existing) {
    existing.innerText = p + '%';
    return;
  }

  // Crear el contenedor del badge dorado
  const b = document.createElement('div');
  b.id = 'cfcBadge';
  b.innerText = p + '%';

  // 💎 Estilo visual premium — ahora en esquina superior izquierda
  b.style.cssText = `
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

  // Efecto hover leve
  b.addEventListener('mouseenter', () => {
    b.style.transform = 'scale(1.1)';
    b.style.boxShadow = '0 0 14px #ffd700';
  });
  b.addEventListener('mouseleave', () => {
    b.style.transform = 'scale(1)';
    b.style.boxShadow = '0 0 8px #ffd700';
  });

  // Insertar en el documento
  document.body.appendChild(b);
}

window.addEventListener('load', renderBadge);

// 🧩 Log CFC-SYNC
console.log("🧩 CFC_SYNC checkpoint:", "badge.js | P8.8 izquierda activa", new Date().toLocaleString());
