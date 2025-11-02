/* ==========================================================
   ✅ CFC_FUNC_7_3BIS_20251103 — Mini Guía Visual + Sonido Dorado
   ========================================================== */

function playGoldBell() {
  try {
    const audio = new Audio("../audio/guide-gold.wav");
    audio.volume = 0.35;

    // 🔊 Fade-out suave (0.6 s)
    audio.addEventListener("timeupdate", () => {
      if (audio.currentTime > audio.duration - 0.6) {
        audio.volume = Math.max(0, audio.volume - 0.015);
      }
    });

    audio.play().catch(err => console.warn("⚠️ No se pudo reproducir el sonido dorado:", err));
  } catch (e) {
    console.warn("⚠️ Error al reproducir audio guía:", e);
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
  playGoldBell(); // 🔔 sonido al abrir

  // Registrar primera vez si es automático
  if (auto) localStorage.setItem("guide_seen", "true");
}

/* ==========================================================
   ✅ AUTO-MOSTRAR EN PRIMER INGRESO (una sola vez)
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  try {
    const seen = localStorage.getItem("guide_seen");
    if (!seen) {
      setTimeout(() => showGuide(true), 1200); // espera para no solaparse con splash
    }
  } catch (e) {
    console.warn("⚠️ guide.js: no se pudo acceder a localStorage:", e);
  }
});

// 🔒 QA-SYNC — Registro de control
console.log("🧩 CFC_SYNC checkpoint:", "Mini Guía Visual + Sonido Dorado V7_3BIS_OK", new Date().toLocaleString());
