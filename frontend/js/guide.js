/* ==========================================================
   ✅ CFC_FUNC_7_3_AUTO_20251103 — Mini Guía Visual (auto primer ingreso)
   ========================================================== */

function showGuide(auto = false) {
  // Evitar múltiples instancias
  if (document.querySelector(".guide-overlay")) return;

  const guide = document.createElement("div");
  guide.className = "guide-overlay";
  guide.innerHTML = `
    <div class="guide-box">
      <h2>🧭 Cómo usar el Campus</h2>
      <ul>
        <li>📘 Completá <b>1 módulo por día</b> para avanzar de forma constante.</li>
        <li>🧠 Revisá tu <b>emocionalidad diaria</b> antes de estudiar.</li>
        <li>🏆 Guardá y revisá tu <b>progreso regularmente</b>.</li>
      </ul>
      <button class="btn-guide" onclick="this.closest('.guide-overlay').remove()">Entendido ✅</button>
    </div>
  `;

  document.body.appendChild(guide);

  // 🔒 Registrar primera vez
  if (auto) localStorage.setItem("guide_seen", "true");
}

/* ==========================================================
   ✅ AUTO-MOSTRAR EN PRIMER INGRESO (una sola vez)
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  try {
    const seen = localStorage.getItem("guide_seen");
    if (!seen) {
      // Espera 1.2s para no superponerse al splash
      setTimeout(() => showGuide(true), 1200);
    }
  } catch (e) {
    console.warn("⚠️ guide.js: no se pudo acceder a localStorage:", e);
  }
});

// 🔒 CFC-SYNC — QA-SYNC V7.9
console.log("🧩 CFC_SYNC checkpoint: Mini Guía AUTO OK 7_3_AUTO", new Date().toLocaleString());
