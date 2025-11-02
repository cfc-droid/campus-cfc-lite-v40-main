/* ==========================================================
   ✅ CFC_FUNC_7_3BIS_20251103_AUDIO — Mini Guía Visual + Sonido Dorado
   ========================================================== */

function playGoldBell() {
  try {
    const audio = new Audio("../audio/bell-gold.wav");
    audio.volume = 0.35; // volumen moderado
    audio.play().catch(err => console.warn("⚠️ No se pudo reproducir el sonido:", err));
  } catch (e) {
    console.warn("⚠️ Error al reproducir audio dorado:", e);
  }
}

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
  playGoldBell(); // 🔔 sonido dorado cada vez que se abre

  // 🔒 Registrar primera vez si es automático
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

// 🔒 CFC-SYNC — QA-SYNC V8.0
console.log("🧩 CFC_SYNC checkpoint: Mini Guía + Sonido Dorado (7_3BIS_20251103_AUDIO)", new Date().toLocaleString());
