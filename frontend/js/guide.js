/* ==========================================================
   ✅ CFC_FUNC_7_2BIS_20251102 — Mini Guía Visual Interactiva
   ========================================================== */
function showGuide() {
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
}

// 🔒 CFC-SYNC — QA-SYNC V7.8
console.log("🧩 CFC_SYNC checkpoint: Mini Guía QA OK 7_2BIS", new Date().toLocaleString());
