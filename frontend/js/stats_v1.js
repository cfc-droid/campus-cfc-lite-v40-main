/* ==========================================================
✅ CFC_FUNC_8_1_20251105 — CFC-STATS V1 (Analítica interna de progreso)
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnStats");
  if (!btn) return;

  btn.addEventListener("click", openStatsModal);
});

/**
 * Abre un panel modal con estadísticas del usuario.
 * Lee y calcula datos desde localStorage.
 */
function openStatsModal() {
  // ============================
  // BLOQUE A — Cálculo principal
  // ============================
  const modules = parseInt(localStorage.getItem("CFC_modulesCompleted") || 0);
  const exams = parseInt(localStorage.getItem("CFC_examsPassed") || 0);
  const timeRaw = parseFloat(localStorage.getItem("CFC_time") || 0);
  const hours = (timeRaw / 3600).toFixed(1);

  // ============================
  // BLOQUE B — Cálculo de días consecutivos
  // ============================
  const today = new Date().toISOString().split("T")[0];
  const lastLogin = localStorage.getItem("CFC_lastLoginDate");
  let streak = parseInt(localStorage.getItem("CFC_days") || 0);

  if (!lastLogin) {
    streak = 1;
  } else {
    const diff =
      (new Date(today) - new Date(lastLogin)) / (1000 * 60 * 60 * 24);
    if (diff === 1) streak += 1;
    else if (diff > 1) streak = 1;
  }
  localStorage.setItem("CFC_lastLoginDate", today);
  localStorage.setItem("CFC_days", streak);

  // ============================
  // BLOQUE C — Limpieza y renderizado
  // ============================
  document.querySelector(".stats-modal")?.remove();

  const html = `
    <div class="stats-modal">
      <h3>📊 Tu progreso</h3>
      <p>Módulos completados: <b>${modules}/20</b></p>
      <p>Exámenes aprobados: <b>${exams}/20</b></p>
      <p>Horas activas: <b>${hours} h</b></p>
      <p>Días consecutivos de estudio: <b>${streak}</b></p>
      <button id="closeStats">Cerrar</button>
    </div>`;
  document.body.insertAdjacentHTML("beforeend", html);

  // ============================
  // BLOQUE D — Cierre del modal
  // ============================
  document.getElementById("closeStats").addEventListener("click", () => {
    document.querySelector(".stats-modal")?.remove();
  });

  console.log(
    `✅ CFC-STATS V1 — Módulos:${modules}, Exámenes:${exams}, Horas:${hours}, Días:${streak}`
  );
}

/* ==========================================================
🔒 CFC-SYNC
# ✅ CFC_FUNC_8_1_20251105 — stats_v1.js final validado QA-SYNC V41
echo "🧩 CFC_SYNC checkpoint: analítica localStorage funcional y estable"
========================================================== */
