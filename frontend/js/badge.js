// ✅ CFC_FUNC_8_8_20251102 — Badge motivacional activo
// 🔒 CFC-SYNC V7.5 — PUNTO 8/10 (EXTRAS PREMIUM — CFC-PLUS)
/* ARCHIVO ANTERIOR — versión 20251029 — reemplazado por CFC_FUNC_8_8_20251102 */

function renderBadge() {
  try {
    const p = localStorage.getItem('progressPercent') || 0;
    const b = document.createElement('div');
    b.id = 'cfcBadge';
    b.innerText = p + '%';
    b.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: #ffd700;
      color: #000;
      padding: 6px 10px;
      border-radius: 50%;
      font-weight: 700;
      font-family: Poppins, sans-serif;
      box-shadow: 0 0 8px #ffd700;
      z-index: 9999;
      cursor: default;
      transition: transform 0.3s ease;
    `;
    b.title = "Progreso actual del Campus CFC LITE";
    b.addEventListener('mouseenter', () => (b.style.transform = 'scale(1.15)'));
    b.addEventListener('mouseleave', () => (b.style.transform = 'scale(1)'));
    document.body.appendChild(b);

    console.log(`🏅 Badge renderizado correctamente (${p}%)`);
  } catch (err) {
    console.error("⚠️ Error al renderizar el Badge motivacional:", err);
  }
}

window.addEventListener('load', renderBadge);

console.log("🧩 CFC_SYNC checkpoint:", "badge.js", "| P8.8 actualizado", new Date().toLocaleString());
